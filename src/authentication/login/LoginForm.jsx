import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import FormRowVertical from "../../ui/FormRowVertical";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import { useState } from "react";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("Test1234");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-md bg-gray-800 max-w-[450px] w-[90%] sm:w-full"
    >
      <Heading as="h3" form="register/login">
        Login Form
      </Heading>
      <FormRowVertical label="Email Address">
        <Input
          type="email"
          placeholder="user@gmail.com"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          placeholder="********"
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical alignItems={"items-center"}>
        <Button type="loginSignup" disabled={isLoading}>
          {isLoading ? <SpinnerMini size="1.2rem" /> : "Login"}
        </Button>
        <p className="text-white text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/register">
            Register now
          </Link>
        </p>
      </FormRowVertical>
    </form>
  );
}

export default LoginForm;
