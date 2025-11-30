import { createNotification, deleteNotification } from "./apiNotifications";
import supabase from "./supabase";

//API function for send friend request
export async function sendRequest(p_sender, p_receiver) {
  const { data, error } = await supabase.rpc("send_friend_request", {
    p_sender: p_sender,
    p_receiver: p_receiver,
  });

  if (error) throw new Error(error.message);

  return data;
}

//API function for accept friend request
export async function acceptRequest(p_sender, p_receiver) {
  // 1. Update request
  const { data, error } = await supabase.rpc("accept_request", {
    p_sender: p_sender,
    p_receiver: p_receiver,
  });

  if (error) throw new Error(error.message);
  // 2. Create notification
  createNotification({
    action: "acceptedRequest",
    type: "friendships",
    made_action_userid: p_receiver,
    notification_userid: p_sender,
  });

  return data;
}

//API function for reject friend request
export async function rejectRequest(p_sender, p_receiver) {
  const { data, error } = await supabase.rpc("reject_request", {
    p_sender: p_sender,
    p_receiver: p_receiver,
  });

  if (error) throw new Error(error.message);

  return data;
}

//API function for delete friend
export async function deleteFriend(p_user1, p_user2) {
  // 1. Delete friendship
  const { data, error } = await supabase.rpc("delete_friend", {
    p_user1: p_user1,
    p_user2: p_user2,
  });

  if (error) throw new Error(error.message);

  // 2. Delete notification for friendship
  deleteNotification({
    action: "acceptedRequest",
    type: "friendships",
    made_action_userid: p_user1,
    notification_userid: p_user2,
  });
  return data;
}

//API function for block user
export async function blockUser(p_blocker, p_blocked) {
  // 1. Block user
  const { data, error } = await supabase.rpc("block_user", {
    p_blocker: p_blocker,
    p_blocked: p_blocked,
  });

  if (error) throw new Error(error.message);

  // 2. Delete notification for friendship
  deleteNotification({
    action: "acceptedRequest",
    type: "friendships",
    made_action_userid: p_blocker,
    notification_userid: p_blocked,
  });

  return data;
}

//API function for unblock user
export async function unblockUser(p_blocker, p_blocked) {
  const { data, error } = await supabase.rpc("unblock_user", {
    p_blocker: p_blocker,
    p_blocked: p_blocked,
  });

  if (error) throw new Error(error.message);

  return data;
}

//API function for check friendship
export async function checkFriendship(p_user1, p_user2) {
  if (p_user1 === p_user2) return "own profile";

  const { data, error } = await supabase.rpc("check_friendship", {
    p_user1: p_user1,
    p_user2: p_user2,
  });

  if (error) throw new Error(error.message);

  return data;
}

//API function for get friends by user id
export async function getFriendsById(userId) {
  const { data, error } = await supabase.rpc("get_friends_by_id", {
    user_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
}

//API function for get friend requests
export async function getFriendRequests() {
  const { data, error } = await supabase.rpc("get_friend_requests");

  if (error) throw new Error(error.message);

  return data;
}

//API function for get friendship statuses by user id and array of other users id
export async function getFriendshipsStatuses(userId, otherUsersIds) {
  const { data, error } = await supabase.rpc("get_friendships_statuses", {
    p_user_id: userId,
    p_other_user_ids: otherUsersIds,
  });

  if (error) throw new Error(error.message);

  return data;
}

//API function for get blocked users by user id
export async function getBlockedUsers(userId) {
  const { data: blocks, error } = await supabase
    .from("friend_blocks")
    .select("blocked_id")
    .eq("blocker_id", userId);

  if (error) throw new Error(error.message);

  if (!blocks || blocks.length === 0) return [];

  const blockedIds = blocks.map((block) => block.blocked_id);

  //selecting blocked users from users table by their ids
  const { data: blockedUsers, error: blockedUsersError } = await supabase
    .from("users")
    .select("*")
    .in("id", blockedIds);

  if (blockedUsersError) throw new Error(blockedUsersError.message);

  return blockedUsers;
}
