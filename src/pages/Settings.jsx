import { HiOutlineCog } from "react-icons/hi2";
import Heading from "../ui/Heading";
import BlockedUsers from "../friendships/BlockedUsers";
import ChangePassword from "../authentication/change password/ChangePassword";
import { useEffect } from "react";

function Settings() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <Heading as="h1" className="inline-flex items-center justify-between">
        Settings <HiOutlineCog className="ms-4 mt-2" />
      </Heading>
      <div className="w-full mt-5 rounded-lg flex flex-col items-start justify-start drop-shadow-lg p-3 bg-gray-600">
        <ChangePassword />
        <BlockedUsers />
      </div>
      {/* This feature is unavailable, because this app serves for some kind of test, if email verification works then user has to input real email 
      to register, because Supabase available that option only if you verify email before using the app*/}
      {/* <div className="mt-5 w-full rounded-lg flex flex-col items-start justify-start drop-shadow-lg p-3 bg-gray-600">
        <EmailVerification />
      </div> */}
    </div>
  );
}

export default Settings;
