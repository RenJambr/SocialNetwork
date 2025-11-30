import UserAvatar from "../ui/UserAvatar";

function UnavailablePost({ user, formattedDate }) {
  return (
    <div className="flex flex-col m-2">
      <div className="flex w-full justify-between">
        {user && (
          <UserAvatar
            type="username"
            username={user.username}
            image={user.profileimage}
            userId={user.id}
            date={formattedDate}
          />
        )}
      </div>
      <div className="bg-gray-500 w-auto rounded flex justify-center items-center mt-3 p-2">
        <p className="text-white text-sm ">
          Post unavailable — The original post was deleted or you no longer have
          permission to view it.
        </p>
      </div>
    </div>
  );
}

export default UnavailablePost;
