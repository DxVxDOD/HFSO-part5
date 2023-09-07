import { FormEvent } from "react";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../app/hooks";
import { createUsers } from "../../reducers/userArrayReducer";
import { VisibilityHandle } from "../Togglable";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

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
    <Paper sx={{
      padding: '1.5em',
    }} >
      <Typography variant="h5" component='h2' >Create an account</Typography>
      <form className="from-field" onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2} >
          <TextField
            required
            size="small"
            label="Username"
            variant="standard"
            placeholder="Username"
            {...username}
          />
          <TextField
            size="small"
            required
            label="name"
            placeholder="Name"
            variant="standard"
            {...name}
          />
          <TextField
            size="small"
            required
            label="Password"
            variant="standard"
            placeholder="Password"
            {...password}
          />
        </Stack>
        <Stack className="bttn-field">
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
        </Stack>
      </form>
    </Paper>
  );
};

export default CreateUserForm;
