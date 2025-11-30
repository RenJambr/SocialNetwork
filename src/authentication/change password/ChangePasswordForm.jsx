import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUser } from "../useUser";
import { useChangePassword } from "./useChangePassword";

function ChangePasswordForm({ onSuccess }) {
  const { user, isLoading } = useUser();
  const { changePassword, isPending } = useChangePassword(onSuccess);
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  if (isLoading) return <SpinnerMini />;

  async function onSubmit(data) {
    const password = data.confirmPassword;

    changePassword({ password: password });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center w-full"
    >
      <h2 className="text-white text-[1.5rem] sm:text-[2rem] font-semibold p-[1rem] text-center">
        Change Password
      </h2>
      <div className="my-3 xs:my-5 flex justify-center items-center flex-col">
        <div className="h-15 w-15 rounded-full mb-2 xs:mb-3">
          <img
            src={user?.profileImage}
            alt="Profile"
            className="w-full h-full"
          />
        </div>
        <p className="text-sm text-white">{user?.username}</p>
      </div>
      <div className="flex w-full flex-row">
        <FormRowVertical alignItems="items-centar" width="w-full">
          <FormRowVertical
            label="New Password"
            error={errors?.newPassword?.message}
            width="w-full"
            marginYAxis="my-2"
          >
            <Input
              type="password"
              disabled={isPending}
              placeholder="New password"
              {...register("newPassword", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
            />
          </FormRowVertical>
          <FormRowVertical
            label="Repeat Password"
            error={errors?.confirmPassword?.message}
            width="w-full"
            marginYAxis="my-2"
          >
            <Input
              type="password"
              placeholder="Repeat password"
              disabled={isPending}
              {...register("confirmPassword", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
                validate: {
                  matchesPassword: (value) =>
                    value === getValues().newPassword ||
                    "Passwords need to match.",
                  strongPassword: () =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(
                      getValues().newPassword
                    ) ||
                    "Password must contain uppercase and lowercase letter and number.",
                },
              })}
            />
          </FormRowVertical>
          <Button
            type="loginSignup"
            className="mt-5 w-32 self-center"
            buttonType="submit"
            disabled={isPending}
          >
            {isPending ? <SpinnerMini /> : "Submit"}
          </Button>
        </FormRowVertical>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
