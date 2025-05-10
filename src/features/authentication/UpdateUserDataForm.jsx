import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useAuthUser } from "./useAuthUser";
import useUpdateUser from "./useUpdateUser";
// import { updateUser as updateUserFunc } from "../../services/apiLogin";
// import { useForm } from "react-hook-form";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  // const { handleSubmit } = useForm();
  const { updateUser } = useUpdateUser();
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useAuthUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    updateUser(
      { fullName, avatar },
      {
        onSettled: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }
  function handleClick() {
    setAvatar(null);
    setFullName(currentFullName);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName ? fullName : ""}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" onClick={handleClick}>
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
