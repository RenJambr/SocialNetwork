import { useState } from "react";
import FormRowVertical from "../ui/FormRowVertical";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import { useUser } from "./useUser";
import FileInput from "../ui/FileInput";
import FormRow from "../ui/FormRow";
import Button from "../ui/Button";
import { useUpdateUser } from "./useUpdateUser";
import SpinnerMini from "../ui/SpinnerMini";

function UpdateUserDataForm({ onCloseModal }) {
  //onCloseModal function is getting from the Modal component

  const { user } = useUser();
  const [username, setUsername] = useState(user.username);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const { updateUser, isPending } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;

    updateUser(
      {
        username,
        profileImage,
        coverImage,
      },
      {
        onSuccess: () => {
          setProfileImage(null);
          setCoverImage(null);
          e.target.reset();
          onCloseModal?.();
        },
      }
    );
  }

  function handleReset() {
    setUsername(user.username);
    setProfileImage(null);
    setCoverImage(null);
    onCloseModal?.();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Heading as="h3">Edit profile</Heading>
      <FormRowVertical label="Username">
        <Input
          type="text"
          value={username}
          disabled={isPending}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Profile image">
        <FileInput
          id="profileImage"
          accept="image/*"
          disabled={isPending}
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
      </FormRowVertical>
      <FormRowVertical label="Cover image">
        <FileInput
          id="coverImage"
          accept="image/*"
          disabled={isPending}
          onChange={(e) => setCoverImage(e.target.files[0])}
        />
      </FormRowVertical>
      <FormRow>
        <Button buttonType="reset" onClick={handleReset} disabled={isPending}>
          Cancel
        </Button>
        <Button buttonType="submit" type="loginSignup" disabled={isPending}>
          {isPending ? <SpinnerMini size="1.2rem" /> : "Update account"}
        </Button>
      </FormRow>
    </form>
  );
}

export default UpdateUserDataForm;
