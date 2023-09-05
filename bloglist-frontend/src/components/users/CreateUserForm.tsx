import { FormEvent } from "react";
import { useForm } from "../../hooks/useForm";

const CreateUserForm = () => {
  const { reset: resetUsername, ...username } = useForm("text");
  const { reset: resetPassword, ...password } = useForm("text");

  const handleReset = () => {
    resetPassword();
    resetUsername();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input {...username} />
        </div>
        <div>
          <input {...password} />
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
