import Lottie from "lottie-react";
import successAnimation from "../styles/success.json";
import Button from "./Button";
import { HiArrowRight } from "react-icons/hi2";

function SuccessfullyChangedPassword() {
  function redirectHome() {
    window.location.href = `${window.location.origin}/home`;
  }
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h2 className="text-white text-[1.5rem] sm:text-[2rem] font-semibold p-[1rem] text-center">
        Successfully changed password.
      </h2>
      <Lottie
        animationData={successAnimation}
        loop={false}
        className="w-25 h-25 sm:w-30 sm:h-30"
      />
      <Button
        type="loginSignup"
        className="mt-5 flex items-center justify-between"
        onClick={redirectHome}
      >
        Home <HiArrowRight className="ms-2" />
      </Button>
    </div>
  );
}

export default SuccessfullyChangedPassword;
