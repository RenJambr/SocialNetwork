import { useForm } from "react-hook-form";
import { DatePicker } from "antd";
import countries from "../../data/data-countries";
import FormRowVertical from "../../ui/FormRowVertical";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import FormRow from "../../ui/FormRow";
import RadioInput from "../../ui/RadioInput";
import Button from "../../ui/Button";
import { useEffect } from "react";
import { calculateAge } from "../../utils/helpers";
import { useSignup } from "./useSignUp";
import { checkIfDataExists } from "../../services/apiAuth";
import { Link } from "react-router";
import SpinnerMini from "../../ui/SpinnerMini";

function RegisterForm() {
  const { signup, isPending } = useSignup();
  const {
    register,
    formState,
    getValues,
    setValue,
    handleSubmit,
    watch,
    setError,
  } = useForm();
  const { errors } = formState;
  const gender = watch("gender");

  //effect for set profile image on gender change
  useEffect(() => {
    if (gender) {
      setValue("profileImage", `${gender}-avatar.png`, {
        shouldValidate: true,
      });
    }
  }, [gender, setValue]);

  function onChangeDateOfBirth(_, dateString) {
    setValue("dateOfBirth", dateString, { shouldValidate: true });
  }

  async function onSubmit(data) {
    //split nationality and country flag from the object
    const nationality = JSON.parse(data.nationality).nationality;
    const countryFlag = JSON.parse(data.nationality).countryFlag;

    const age = calculateAge(data.dateOfBirth);
    const coverImage =
      "https://utjttkibkkfwyepsfyie.supabase.co/storage/v1/object/public/covers//cover.jpg";

    const { email, password, dateOfBirth, username, profileImage } = data;

    //check email and username and if exist throw error
    const ifEmailExists = await checkIfDataExists({ email: email });
    const ifUsernameExists = await checkIfDataExists({ username: username });

    !ifEmailExists && !ifUsernameExists
      ? signup({
          email,
          password,
          gender,
          dateOfBirth,
          username,
          nationality,
          countryFlag,
          profileImage,
          coverImage,
          age,
        })
      : (ifEmailExists &&
          setError("email", {
            type: "manual",
            message: "Email already exists.",
          })) ||
        (ifUsernameExists &&
          setError("username", {
            type: "manual",
            message: "Username already exists.",
          }));
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 rounded-md bg-gray-800 max-w-[550px] sm:w-full w-[90%]"
    >
      <Heading as="h3" form="register/login">
        Register form
      </Heading>
      <FormRowVertical label="Username" error={errors?.username?.message}>
        <Input
          type="text"
          placeholder="Renato Jambrek"
          {...register("username", {
            required: "This field is required",
          })}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          placeholder={"user@gmail.com"}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address.",
            },
          })}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRow
        padding="px-0"
        itemsPlace="items-start flex-col sm:items-center sm:flex-row"
      >
        <FormRowVertical
          label="Select your country"
          error={errors?.nationality?.message}
        >
          <Select
            selectType="nationality"
            options={countries}
            {...register("nationality", {
              required: "This field is required",
            })}
            onChange={(e) => setValue("nationality", e.target.value)}
            disabled={isPending}
          />
        </FormRowVertical>
        <FormRowVertical
          label="Date of birth"
          error={errors?.dateOfBirth?.message}
        >
          <DatePicker
            {...register("dateOfBirth", {
              required: "This field is required",
              validate: (value) =>
                calculateAge(value) >= 18 ||
                "You must be at least 18 years old",
            })}
            className="w-[200px] rounded-xs"
            name="dateOfBirth"
            onChange={onChangeDateOfBirth}
            disabled={isPending}
          />
        </FormRowVertical>
      </FormRow>
      <FormRowVertical
        label="Gender"
        gap="gap-0"
        error={errors?.gender?.message}
      >
        <FormRow width="100px" padding="px-0">
          <RadioInput
            label="Male"
            name="gender"
            value="male"
            {...register("gender", { required: "Please select a gender" })}
            disabled={isPending}
          />
          <RadioInput
            label="Female"
            name="gender"
            value="female"
            {...register("gender", { required: "Please select a gender" })}
            disabled={isPending}
          />
          <Input
            {...register("profileImage")}
            type="text"
            value={gender ? `${gender}-avatar.png` : ""}
            hidden={true}
          />
        </FormRow>
      </FormRowVertical>
      <FormRow
        width="100px"
        padding="px-0"
        marginYAxis="my-0"
        itemsPlace="items-start flex-col xs:items-center xs:flex-row"
        version="passwords-mobile"
      >
        <FormRowVertical
          label="Password"
          width="w-full"
          marginYAxis="mb-4"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            placeholder="********"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
            disabled={isPending}
          />
        </FormRowVertical>
        <FormRowVertical
          label="Repeat password"
          marginYAxis="mb-4"
          width="w-full"
          error={errors?.confirmPassword?.message}
        >
          <Input
            type="password"
            placeholder="********"
            {...register("confirmPassword", {
              required: "This field is required",
              minLength: 8,
              validate: {
                matchesPassword: (value) =>
                  value === getValues().password || "Passwords need to match.",
                strongPassword: () =>
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(
                    getValues().password
                  ) ||
                  "Password must contain uppercase and lowercase letter and number.",
              },
            })}
            disabled={isPending}
          />
        </FormRowVertical>
      </FormRow>

      <FormRowVertical alignItems="items-center">
        <Button type="loginSignup">
          {isPending ? <SpinnerMini size="1.2rem" /> : "Sign up"}
        </Button>
        <p className="text-white text-sm">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            Login now
          </Link>
        </p>
      </FormRowVertical>
    </form>
  );
}

export default RegisterForm;
