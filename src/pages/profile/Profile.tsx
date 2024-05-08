/* eslint-disable @typescript-eslint/no-explicit-any */
import Page from "components/Page";
import { useEffect } from "react";
import { InputGroup, Form, Button, Container } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Icon } from "@iconify/react";
import { setSnack } from "src/redux/reducers/snack.reducer";
import Creatable from "react-select/creatable";
import { getProfile, updateDocument } from "src/service/api/api.firebase";
import { skillOptions } from "utils/data/projects";

export default function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      displayName: "",
      email: "",
      address: "",
      required_skills: [],
    },
  });

  async function onSubmit(values: any) {
    try {
      updateDocument("users", `${user?.uid}`, values);
      dispatch(
        setSnack({ message: "Profile updated", type: "success", open: true })
      );
    } catch (error: any) {
      dispatch(setSnack({ message: error.message, type: "error", open: true }));
    }
  }

  useEffect(() => {
    if (user) {
      getProfile(user.uid).then((data: any) => {
        reset(data);
      });
    }
  }, [user, reset]);

  return (
    <Page title="Profile">
      <Container style={{ maxWidth: 500 }}>
        <h2>Profile</h2>
        <hr />
        <Controller
          control={control}
          name="displayName"
          render={({ field }) => (
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Full Name</InputGroup.Text>
              <Form.Control
                {...field}
                placeholder="Full name"
                aria-label="Full name"
              />
            </InputGroup>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
              <Form.Control
                disabled
                {...field}
                placeholder="Email"
                aria-label="Email"
              />
            </InputGroup>
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({ field }) => (
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Address</InputGroup.Text>
              <Form.Control
                {...field}
                placeholder="Address"
                aria-label="Address"
              />
            </InputGroup>
          )}
        />
        <Controller
          name="required_skills"
          control={control}
          render={({ field }) => (
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Skills</InputGroup.Text>
              <Creatable
                {...field}
                options={skillOptions as any}
                isMulti
                styles={{
                  control: (styles) => ({
                    ...styles,
                    width: 415,
                    borderRadius: "0px 4px 4px 0px",
                    border: "0.1px solid #ced4da",
                  }),
                }}
                placeholder="Select or create options"
              />
            </InputGroup>
          )}
        />
        <Button
          disabled={!isDirty}
          onClick={handleSubmit(onSubmit)}
          variant="light"
        >
          <Icon className="me-1" icon="ic:round-save" />
          Save
        </Button>
      </Container>
    </Page>
  );
}
