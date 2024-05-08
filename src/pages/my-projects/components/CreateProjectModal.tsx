/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDoc, collection } from "firebase/firestore";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Control, Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { setSnack } from "src/redux/reducers/snack.reducer";
import { db } from "src/service/firebase";
import Creatable from "react-select/creatable";
import { skillOptions } from "utils/data/projects";
import { getAllProjects } from "src/service/api/api.firebase";
import { ProjectTypes } from "utils/types/project.types";
import { setProjects } from "src/redux/reducers/project.reducer";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

interface CustomComponentProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
}

function CustomInputComponent(props: CustomComponentProps) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">{props.label}</InputGroup.Text>
          <Form.Control
            {...field}
            placeholder={props.placeholder}
            aria-label={props.placeholder}
          />
        </InputGroup>
      )}
    />
  );
}

export default function CreateProjectModal({
  open,
  onClose,
}: CreateProjectModalProps) {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { reset, control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
      location: "",
      required_skills: "",
      time_required: "",
      volunteers: [],
    },
  });
  async function createProject(data: any) {
    try {
      addDoc(collection(db, "projects"), { ...data, owner: user });
      onClose();
      dispatch(
        setSnack({
          message: "Project created successfully",
          type: "success",
          open: true,
        })
      );
      getAllProjects().then((data: ProjectTypes[]) =>
        dispatch(setProjects(data))
      );
      reset();
    } catch (error: any) {
      dispatch(setSnack({ message: error.message, type: "error", open: true }));
    }
  }
  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomInputComponent control={control} name="name" label="Name" />
        <CustomInputComponent
          control={control}
          name="description"
          label="Description"
        />
        <CustomInputComponent
          control={control}
          name="location"
          label="Location"
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
                    width: 405,
                    borderRadius: "0px 4px 4px 0px",
                  }),
                }}
                placeholder="Select or create options"
              />
            </InputGroup>
          )}
        />
        <CustomInputComponent
          control={control}
          name="time_required"
          label="Time"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit(createProject)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
