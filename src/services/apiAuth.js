import supabase, { supabaseUrl } from "./supabase";
import imageCompression from "browser-image-compression";

//API function for login
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

//API function for logout
export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

//API function for signup new user
export async function signup({
  email,
  password,
  dateOfBirth,
  gender,
  username,
  nationality,
  countryFlag,
  profileImage,
  coverImage,
  age,
}) {
  //1. Get a profile image by the gender
  let { data: profileImageUrl } = supabase.storage
    .from("avatars")
    .getPublicUrl(profileImage);
  profileImageUrl = profileImageUrl.publicUrl;

  //2. Sign up user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        countryFlag,
        dateOfBirth,
        age,
        gender,
        nationality,
        coverImage,
        profileImage: profileImageUrl,
      },
    },
  });

  if (error) throw new Error(error.message);

  //3. Get user ID
  const userId = data.user?.id;
  if (!userId) throw new Error("User ID not found after sign-up.");

  //4. Insert user in the users bucket
  const { error: insertError } = await supabase.from("users").insert([
    {
      id: userId,
      email,
      username,
      countryflag: countryFlag,
      dateofbirth: dateOfBirth,
      age,
      gender,
      nationality,
      profileimage: profileImageUrl,
      coverimage: coverImage,
    },
  ]);

  if (insertError)
    throw new Error("Error with inserting users data into users table.");

  return data;
}

//API function for checking data (email and username) already exists at another user
export async function checkIfDataExists(userData) {
  const { data } = await supabase
    .from("users")
    .select(`${Object.keys(userData)[0]}`)
    .eq(`${Object.keys(userData)[0]}`, Object.values(userData)[0])
    .single();

  return data === null ? false : true;
}

//API function for getting authenticated user
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

//API function for get user by id
export async function getUserById(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

//API function for updating authenticated user data
export async function updateCurrentUser({
  username,
  profileImage,
  coverImage,
}) {
  // Options for compress image
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
  };

  //1. Update username
  let updateData;
  if (username) updateData = { data: { username } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  const { error: tableUsernameError } = await supabase
    .from("users")
    .update([{ username: username }])
    .eq("id", data.user.id);

  if (error) throw new Error(error.message);
  if (tableUsernameError) throw new Error(tableUsernameError.message);

  // 2. Upload profileImage
  if (profileImage) {
    // 2.1 Create a uniq file name
    const profileImageFileName = `avatar-${data.user.id}-${Math.random()}`;

    // 2.2 Compress image
    const compressedImage = await imageCompression(profileImage, options);

    // 2.3 Upload image in the storage
    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(profileImageFileName, compressedImage);

    if (storageError) throw new Error(storageError.message);

    // 2.4 Update profileImage in the users data
    const { data: updatedUser, error: error2 } = await supabase.auth.updateUser(
      {
        data: {
          profileImage: `${supabaseUrl}/storage/v1/object/public/avatars/${profileImageFileName}`,
        },
      }
    );

    // 2.5 Update profileImage in the users bucket
    const { error: tableProfileImageError } = await supabase
      .from("users")
      .update([{ profileimage: updatedUser.user.user_metadata.profileImage }])
      .eq("id", updatedUser.user.id);

    if (error2) throw new Error(error2.message);
    if (tableProfileImageError) throw new Error(tableProfileImageError.message);
  }

  // 3. Upload coverImage
  if (coverImage) {
    // 3.1 Create a uniq file name
    const coverImageFileName = `cover-${data.user.id}-${Math.random()}`;

    // 3.2 Compress image
    const compressedImage = await imageCompression(coverImage, options);

    // 3.3 Upload image in the storage
    const { error: storageError } = await supabase.storage
      .from("covers")
      .upload(coverImageFileName, compressedImage);

    if (storageError) throw new Error(storageError.message);

    // 3.4 Update coverImage in the users data
    const { data: updatedUser, error: error2 } = await supabase.auth.updateUser(
      {
        data: {
          coverImage: `${supabaseUrl}/storage/v1/object/public/covers/${coverImageFileName}`,
        },
      }
    );

    // 3.5 Update coverImage in the users bucket
    const { error: tableCoverImageError } = await supabase
      .from("users")
      .update([{ coverimage: updatedUser.user.user_metadata.coverImage }])
      .eq("id", updatedUser.user.id);

    if (error2) throw new Error(error2.message);
    if (tableCoverImageError) throw new Error(tableCoverImageError.message);
  }
  return data?.user;
}

//API function for getting users by search query
export async function getUsersByQuery(query) {
  let { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("username", `%${query}%`);

  if (error) throw new Error(error.message);

  return data;
}

//API function for verify email
export async function sendVerificationCode({ email }) {
  const { error } = await supabase.auth.admin.generateLink({
    type: "signup",
    email: email,
  });

  if (error) throw new Error(error.message);
}

//API function send link for change password
export async function sendLinkForChangePassword({ email }) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw new Error(error.message);
}

//API function for change password
export async function changePassword({ password }) {
  const { error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) throw new Error(error.message);
}
