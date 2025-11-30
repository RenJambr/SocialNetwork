import imageCompression from "browser-image-compression";
import { createNotification, deleteNotification } from "./apiNotifications";
import supabase from "./supabase";

//API function for create post
export async function createpost({
  userid,
  content,
  likes,
  original_post_id = null,
  original_post_user_id = null,
}) {
  /// 1. Update image content
  if (content.imageContent) {
    // 1.1 Create a uniq file name
    const contentImageFileName = `image-${userid}-${Math.random()}`;

    // 1.2 Compress image
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };

    const compressedImage = await imageCompression(
      content.imageContent,
      options
    );

    // 1.3 Upload image in the storage
    const { error: storageError } = await supabase.storage
      .from("posts")
      .upload(contentImageFileName, compressedImage);

    if (storageError) throw new Error(storageError.message);

    // 1.4 Get URL of uploaded image
    const {
      data: { publicUrl },
    } = supabase.storage.from("posts").getPublicUrl(`${contentImageFileName}`);

    // 1.5 Add image URL to the content object
    content = {
      ...content,
      imageContent: publicUrl,
    };
  }

  //2. Insert new post to the posts bucket
  const { data: createdPost, error } = await supabase
    .from("posts")
    .insert([
      {
        userid,
        content,
        likes,
        original_post_id,
        original_post_user_id,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  // In case if user share his own post don't make notification
  if (original_post_user_id === userid) return createdPost;

  // Create notification
  createNotification({
    action: "share",
    type: "post",
    made_action_userid: userid,
    notification_userid: original_post_user_id,
    postId: createdPost.id,
  });

  return createdPost;
}

//API function for get all posts
export async function getPosts() {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) throw new Error(error.message);

  return data;
}

//API function for get posts of one user by id
export async function getPostsByUserId(userId) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("userid", userId);

  if (error) throw new Error(error.message);

  return data;
}

//API function for get post by id
export async function getPost(postId) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

//API function for toggling like of post
export async function toggleLikePost({
  postId,
  updatedLikes,
  made_action_userid,
  notification_userid,
  isLikedPost,
}) {
  // 1. Update likes
  const { data, error } = await supabase
    .from("posts")
    .update({
      likes: updatedLikes,
    })
    .eq("id", postId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  //In case if user likes his own post don't make notification
  if (notification_userid === made_action_userid) return data;

  // 2. Handle notification logic
  if (!isLikedPost) {
    // isLikedPost needs invert boolean value because isLikedPost is value of status before interaction
    // Insert notification on like, calling API function from apiNotifications.js
    createNotification({
      action: "like",
      type: "post",
      made_action_userid,
      notification_userid,
      postId: postId,
    });
  } else {
    // Delete notification on unlike, calling API function from apiNotifications.js
    deleteNotification({
      action: "like",
      type: "post",
      made_action_userid,
      notification_userid,
      postId: postId,
    });
  }
  return data;
}

//API function for edit post
export async function editPost({ id, content }) {
  const { data, error } = await supabase
    .from("posts")
    .update({ content, isEdited: true })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

//APi function for delete post
export async function deletePost({ id }) {
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  // 1. This is deleting image from storage if there is image content in the post
  if (post.content.imageContent) {
    // 1.1 Split the file name of URL
    const imageFileName = post.content.imageContent.split("/").pop();

    // 1.2 Remove image from storage
    const { error } = await supabase.storage
      .from("posts")
      .remove([imageFileName]);

    if (error) throw new Error("Failed to delete image.");
  }

  // 1.3 Delete post from posts bucket
  const { error } = await supabase
    .from("posts")
    .delete({ returning: "minimal" })
    .eq("id", id);

  // 1.4 Delete all comments of deleted post from comments bucket
  const { commentError } = await supabase
    .from("comments")
    .delete({ returning: "minimal" })
    .eq("postid", id);

  // 1.5 Check posts that have original_post_id of deleted post and update column is_original_deleted to true
  const { sharedPostsError } = await supabase
    .from("posts")
    .update({ is_original_deleted: true })
    .eq("original_post_id", id)
    .select("*");

  if (error || commentError || sharedPostsError) throw new Error(error.message);
}
