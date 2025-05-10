import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  let { register, handleSubmit, getValues, reset } = useForm();
  const { signUp, isSigning } = useSignup();

  function submitForm(data) {
    const { email, password, fullName } = data;
    signUp(
      { email, password, fullName },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <FormRow label="Full name" error={""}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigning}
          {...register("fullName", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={""}>
        <Input
          type="email"
          id="email"
          disabled={isSigning}
          {...register("email", {
            required: "this field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={""}>
        <Input
          type="password"
          id="password"
          disabled={isSigning}
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "Please provide a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={""}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigning}
          {...register("passwordConfirm", {
            required: "this field is required",
            message: "Password doesn't match",
            validate: (value) => value === getValues().password,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>

        <Button disabled={isSigning}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
