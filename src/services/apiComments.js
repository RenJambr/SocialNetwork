import { createNotification, deleteNotification } from "./apiNotifications";
import supabase from "./supabase";

//API function for get comments by post id
export async function getComments(postId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("postid", postId);

  if (error) throw new Error(error.message);

  return data;
}

//API function for toggling like of comment
export async function toggleLikeComment({
  commentId,
  postId,
  updatedLikes,
  made_action_userid,
  notification_userid,
  isLikedComment,
}) {
  // 1. Update likes
  const { data, error } = await supabase
    .from("comments")
    .update({
      likes: updatedLikes,
    })
    .eq("id", commentId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  //In case if user likes his own comment don't make notification
  if (notification_userid === made_action_userid) return data;

  // 2. Handle notification logic
  if (!isLikedComment) {
    // isLikedComment needs invert boolean value because isLikedComment is value of status before interaction
    // Insert notification on like, calling API function from apiNotifications.js

    createNotification({
      action: "like",
      type: "comment",
      made_action_userid,
      notification_userid,
      postId: postId,
      commentId: commentId,
    });
  } else {
    // Delete notification on unlike, calling API function from apiNotifications.js

    deleteNotification({
      action: "like",
      type: "comment",
      made_action_userid,
      notification_userid,
      postId: postId,
      commentId: commentId,
    });
  }

  return data;
}

//API function for get the comment by id
export async function getComment(commentId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("id", commentId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

//API function for creating comment
export async function createComment({
  userid,
  content,
  likes,
  postid,
  made_action_userid,
  notification_userid,
}) {
  // 1. Create comment
  const { data: createdComment, error } = await supabase
    .from("comments")
    .insert([{ userid, content, likes, postid }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  // In case if user comments his own post don't make notification
  if (notification_userid === made_action_userid) return createdComment;

  // 2. Create a notification

  createNotification({
    action: "comment",
    type: "post",
    made_action_userid,
    notification_userid,
    postId: postid,
    commentId: createdComment.id,
  });

  return createdComment;
}

//API function for editing comment
export async function editComment({ id, content }) {
  const { data, error } = await supabase
    .from("comments")
    .update({ content, isEdited: true })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

//API function for deleting comment
//(returning minimal) is used to not burden network with returning data about deleted comment
export async function deleteComment({ id }) {
  // 1. Delete comment from bucket
  const { error } = await supabase
    .from("comments")
    .delete({ returning: "minimal" })
    .eq("id", id);

  if (error) throw new Error(error.message);

  // 2. Delete notification from bucket

  deleteNotification({ action: "comment", commentId: id });
}
