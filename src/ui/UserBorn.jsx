import { formatDateBorn } from "../utils/helpers";
import UserAvatar from "./UserAvatar";

function UserBorn({ user }) {
  return (
    <div className="w-full my-7 drop-shadow-lg">
      <div className="text-md rounded-sm bg-[#f5f0e6] text-[#364153] p-3 md:p-5 mt-3 flex flex-col items-center justify-center">
        <div className="w-[100%] pb-5 text-sm md:text-lg text-start">
          <UserAvatar
            type="username"
            image={user.profileimage}
            username={user.username}
            userId={user.id}
            justifyContent={"justify-start"}
            textColor="text-[#364153]"
          />
          <div className="flex flex-col justify-center items-center">
            <div className="rounded-full bg-[#cec7b9] p-2 mb-2">
              <p className="font-medium font-mono text-xs sm:text-sm">
                BIRTH ANNOUNCEMENT
              </p>
            </div>
            <div className="rounded-full bg-white p-2">
              <img
                src="https://utjttkibkkfwyepsfyie.supabase.co/storage/v1/object/public/avatars/born-image.png"
                alt="bornImg"
                className="w-15 sm:w-20"
              />
            </div>
            <p className="mt-3 font-bold font-mono text-xl sm:text-3xl">
              Born on {formatDateBorn(user.dateofbirth)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBorn;
