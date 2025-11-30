import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import SkeletonSettingsLoader from "../../ui/SkeletonSettingsLoader";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUser } from "../useUser";
import { useSendLinkChangePass } from "./useSendLinkChangePass";

function ChangePassword() {
  const { user, isLoading } = useUser();
  const { sendLinkChangePass, isPending } = useSendLinkChangePass();

  if (isLoading) return <SkeletonSettingsLoader />;

  return (
    <div className="w-full flex justify-between items-center pe-[1.2rem]">
      <Heading as="h3">Change Password</Heading>
      <Button
        disabled={isPending}
        type="loginSignup"
        className="w-28 sm:w-31 !px-5 flex justify-center items-center"
        onClick={() => sendLinkChangePass({ email: user?.email })}
      >
        {isPending ? <SpinnerMini size="1.5rem" /> : "Send link"}
      </Button>
    </div>
  );
}

export default ChangePassword;
