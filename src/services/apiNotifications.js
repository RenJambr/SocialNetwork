import supabase from "./supabase";

//API function for get notifications for user by id (authenticated user)
export async function getNotificationsByUserId(userId) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("notification_userid", userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function checkNotification({ notificationId }) {
  const { data, error } = await supabase
    .from("notifications")
    .update({ seen: true })
    .eq("id", notificationId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

//APi function for create notification
export async function createNotification({
  action, // (like, comment, share)
  type, // (post, comment)
  made_action_userid, // uuid
  notification_userid, // uuid
  postId, // uuid of post which is interacted to
  commentId = null, // uuid of comment which is liked or new created comment
}) {
  const { error } = await supabase
    .from("notifications")
    .insert({
      action: action,
      type: type,
      made_action_userid,
      notification_userid,
      seen: false,
      postId: postId,
      commentId: commentId,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
}

//APi function for delete notification
export async function deleteNotification({
  action,
  type,
  made_action_userid,
  notification_userid,
  postId,
  commentId = null,
}) {
  // In case if action is like, it has to check all this columns, if action is comment, only prop which is important is commentId.
  // There's no deleting for action share because it will show deleted post if post is deleted
  if (action === "like") {
    let query = supabase
      .from("notifications")
      .delete()
      .eq("action", action)
      .eq("type", type)
      .eq("made_action_userid", made_action_userid)
      .eq("notification_userid", notification_userid)
      .eq("postId", postId);

    // Handle nullable commentId
    if (commentId === null) {
      query = query.is("commentId", null);
    } else {
      query = query.eq("commentId", commentId);
    }

    const { error } = await query;
    if (error) throw new Error(error.message);
  } else if (action === "acceptedRequest") {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("action", action)
      .eq("type", type)
      .or(
        `and(made_action_userid.eq.${JSON.stringify(
          made_action_userid
        )},notification_userid.eq.${JSON.stringify(
          notification_userid
        )}),and(made_action_userid.eq.${JSON.stringify(
          notification_userid
        )},notification_userid.eq.${JSON.stringify(made_action_userid)})`
      );

    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("notifications")
      .delete({ returning: "minimal" })
      .eq("commentId", commentId);

    if (error) throw new Error(error.message);
  }
}
