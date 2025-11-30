import Main from "../ui/Main";
import Container from "../ui/Container";
import Footer from "../ui/Footer";
import Logo from "../ui/Logo";
import SuccessfullyChangedPassword from "../ui/SuccessfullyChangedPassword";
import ChangePasswordForm from "../authentication/change password/ChangePasswordForm";
import { useState } from "react";

function ResetPassword() {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  return (
    <Main classname="!p-0">
      <div className="min-h-[100vh] flex flex-col justify-center items-center">
        <Container classname="w-full">
          <div className="w-full rounded-md bg-gray-600 p-5 sm:p-10 flex flex-col justify-between items-center h-full">
            <Logo classname="max-w-[150px] sm:max-w-[170px] md:max-w-[180px]" />
            {!isPasswordChanged ? (
              <ChangePasswordForm
                onSuccess={() => setIsPasswordChanged(true)}
              />
            ) : (
              <SuccessfullyChangedPassword />
            )}
          </div>
        </Container>
        <Footer />
      </div>
    </Main>
  );
}

export default ResetPassword;
