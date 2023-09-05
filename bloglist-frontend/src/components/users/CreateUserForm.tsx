import { FormEvent } from "react";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../app/hooks";
import { createUsers } from "../../reducers/userArrayReducer";
import { VisibilityHandle } from "../Togglable";

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
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="username" {...username} />
        </div>
        <div>
          <input placeholder="name" {...name} />
        </div>
        <div>
          <input placeholder="password" {...password} />
        </div>
        <button>Create</button>
        <button type="button" onClick={handleReset}>
          Reset fields
        </button>
      </form>
    </>
  );
};

export default CreateUserForm;
