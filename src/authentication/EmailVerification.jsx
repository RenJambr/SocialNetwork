import { HiCheck } from "react-icons/hi2";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import SkeletonSettingsLoader from "../ui/SkeletonSettingsLoader";
import { useUser } from "./useUser";
import { useVerifyEmail } from "./useVerifiyEmail";

//this component is made for vrify the email in the settings

function EmailVerification() {
  const { user, isLoading } = useUser();
  const { verifyEmail, isPending } = useVerifyEmail();

  if (isLoading) return <SkeletonSettingsLoader />;

  return (
    <div className="w-full flex justify-between items-center pe-[1.2rem]">
      <Heading as="h3" className="!xs:text-[1.8rem]">
        Email Verification
      </Heading>
      {user?.is_verified ? (
        <div className="flex items-center">
          <p className="text-gray-400">Your email is verified.</p>
          <HiCheck className="text-white ms-2" />
        </div>
      ) : (
        <Button
          disabled={isPending}
          type="loginSignup"
          className="w-28 sm:w-31"
          onClick={() => verifyEmail({ email: user?.email })}
        >
          Verify
        </Button>
      )}
    </div>
  );
}

export default EmailVerification;
