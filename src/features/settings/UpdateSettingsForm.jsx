import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 9rem;
  margin-top: 1rem;
`;

function UpdateSettingsForm() {
  // const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [maxg, setMaxg] = useState();
  const [breakfast, setBreakfast] = useState();
  const { isloading, settings = {} } = useSettings();
  const {
    maxBookingLength,
    minBookingLength,
    maxGuestPerBooking,
    breakfastPrice,
  } = settings;

  const { isUpdating, updateSetting } = useUpdateSetting();
  if (isloading) return <Spinner />;

  // function handleUpdate(e, field) {
  //   const { value } = e.target;
  //   if (!value) return;
  //   updateSetting({ [field]: value });
  // }

  function handleUpdate(e) {
    e.preventDefault();
    const newData = {
      maxBookingLength: Number(max) || maxBookingLength,
      minBookingLength: Number(min) || minBookingLength,
      maxGuestPerBooking: Number(maxg) || maxGuestPerBooking,
      breakfastPrice: Number(breakfast) || breakfastPrice,
    };

    updateSetting(newData);
    navigate("/dashboard");

    // if (error) throw new Error(error.message);
  }

  return (
    <Form onSubmit={handleUpdate}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onChange={(e) => setMin(e.target.value)}
          disabled={isUpdating}
          // onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onChange={(e) => setMax(e.target.value)}

          // onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          disabled={isUpdating}
          onChange={(e) => setMaxg(e.target.value)}

          // onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onChange={(e) => setBreakfast(e.target.value)}
          // onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
      <Div>
        <Button>update</Button>
      </Div>
      {/* <Button */}
    </Form>
  );
}

export default UpdateSettingsForm;
