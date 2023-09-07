import { FormEvent } from "react";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../app/hooks";
import { createUsers } from "../../reducers/userArrayReducer";
import { VisibilityHandle } from "../Togglable";
import { Button, TextField } from "@mui/material";

const CreateUserForm = ({
  signUpRef,
}: {
  signUpRef: React.MutableRefObject<VisibilityHandle | undefined>;
}) => {
  const { reset: resetUsername, ...username } = useForm("text");
  const { reset: resetPassword, ...password } = useForm("password");
  const { reset: resetName, ...name } = useForm("text");

  const dispatch = useAppDispatch();

  const handleReset = () => {
    resetPassword();
    resetUsername();
    resetName();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    signUpRef.current?.toggleVisibility();

    dispatch(
      createUsers({
        username: username.value,
        name: name.value,
        password: password.value,
      }),
    );
  };

  return (
    <>
      <h2>Create an account</h2>
      <form className="from-field" onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            label="Username"
            variant="standard"
            placeholder="Username"
            {...username}
          />
        </div>
        <div>
          <TextField
            required
            label="name"
            placeholder="Name"
            variant="standard"
            {...name}
          />
        </div>
        <div>
          <TextField
            required
            label="Password"
            variant="standard"
            placeholder="Password"
            {...password}
          />
        </div>
        <div className="bttn-field">
          <Button size="small" variant="outlined" color="success">
            Create
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            type="button"
            onClick={handleReset}
          >
            Reset fields
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateUserForm;
