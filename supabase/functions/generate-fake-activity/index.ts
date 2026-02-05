import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";


const sources = [
  "the-verge",
  "techcrunch",
  "wired",
  "engadget",
  "business-insider",
  "forbes",
  "financial-post",
  "new-scientist",
  "national-geographic",
  "espn",
  "bbc-sport",
  "talksport",
  "bleacher-report",
];

function getRandomItem(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomItems(arr: any[], count: number) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
}

async function getRandomNews(existingFakeIds: Set<string>, logs: string[]) {
  const api_key = Deno.env.get("NEWS_API_KEY");
  if (!api_key) {
    logs.push("NEWS_API_KEY missing");
    return null;
  }

  const max_attempts = 20;

  for (let i = 0; i < max_attempts; i++) {
    const source = getRandomItem(sources);

    logs.push(`Trying source: ${source}`);

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${api_key}`
    );

    const data = await response.json();

    if (!data?.articles?.length) {
      logs.push("No articles found");
      continue;
    }

    const validPosts = data.articles.filter((post: any) => {
      const hasDescription =
        post.description && post.description.length <= 120;

      const hasValidImage =
        post.urlToImage &&
        typeof post.urlToImage === "string" &&
        post.urlToImage.trim() !== "" &&
        post.urlToImage.toLowerCase() !== "null" &&
        (post.urlToImage.startsWith("http://") ||
          post.urlToImage.startsWith("https://"));

      return hasDescription && hasValidImage;
    });

    if (!validPosts.length) {
      logs.push("No valid posts in this source");
      continue;
    }

    const randomPost = getRandomItem(validPosts);

    const fake_post_id = `${randomPost.source?.id}-${randomPost.title}-${randomPost.publishedAt}`;

    if (existingFakeIds.has(fake_post_id)) {
      logs.push("Duplicate fake_post_id, skipping");
      continue;
    }

    logs.push("Valid news found!");
    return { ...randomPost, fake_post_id };
  }

  logs.push("Failed to find valid news after max attempts");
  return null;
}

Deno.serve(async () => {
  const logs: string[] = [];

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" }),
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    logs.push("Fetching posts fake_post_id...");

    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("fake_post_id");

    if (postsError) {
      logs.push(postsError.message);
      return new Response(JSON.stringify({ error: postsError.message, logs }), {
        status: 500,
      });
    }

    logs.push(`Posts count: ${posts?.length}`);

    const existingFakeIds = new Set(
      (posts || []).map((p: any) => p.fake_post_id).filter(Boolean)
    );

    logs.push("Fetching users...");

    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*");

    if (usersError) {
      logs.push(usersError.message);
      return new Response(JSON.stringify({ error: usersError.message, logs }), {
        status: 500,
      });
    }

    logs.push(`Users count: ${users?.length}`);

    if (!users || users.length < 4) {
      return new Response(JSON.stringify({ message: "Not enough users", logs }), {
        status: 200,
      });
    }

    const author = getRandomItem(users);

    logs.push(`Author picked: ${author.username}`);

    const news = await getRandomNews(existingFakeIds, logs);

    if (!news) {
      return new Response(JSON.stringify({ message: "No valid news found", logs }), {
        status: 200,
      });
    }

    const [likeUser1, likeUser2, likeUser3] = getRandomItems(users, 3);

    logs.push("Inserting post...");

    const { error: insertError } = await supabase.from("posts").insert({
      userid: author.id,
      content: {
        imageContent: news.urlToImage,
        textContent: news.description,
      },
      likes: {
        usersIds: [
          { id: likeUser1.id, username: likeUser1.username },
          { id: likeUser2.id, username: likeUser2.username },
          { id: likeUser3.id, username: likeUser3.username },
        ],
        length: 3,
      },
      fake_post_id: news.fake_post_id,
    });

    if (insertError) {
      logs.push(insertError.message);
      return new Response(JSON.stringify({ error: insertError.message, logs }), {
        status: 500,
      });
    }

    logs.push("Post inserted successfully!");

    return new Response(JSON.stringify({ success: true, logs }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    logs.push(String(err));
    return new Response(JSON.stringify({ error: String(err), logs }), {
      status: 500,
    });
  }
});
