import RegisterForm from "../authentication/register/RegisterForm";
import Logo from "../ui/Logo";

function Register() {
  return (
    <div className="py-5 bg-gray-700 h-full sm:h-[100vh] w-full flex justify-center items-center gap-y-4 flex-col">
      <Logo classname="max-w-[150px] sm:max-w-[150px]" />
      <RegisterForm />
    </div>
  );
}

export default Register;
