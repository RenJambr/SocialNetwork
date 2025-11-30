import LoginForm from "../authentication/login/LoginForm";
import Logo from "../ui/Logo";

function Login() {
  return (
    <div className="bg-gray-700 h-[100vh] w-full flex justify-center items-center gap-y-4 flex-col">
      <Logo classname=" max-w-[150px] sm:max-w-[150px]" />
      <LoginForm />
    </div>
  );
}

export default Login;
