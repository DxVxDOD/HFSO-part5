import { Button } from "@mui/material";
import { useState, forwardRef, useImperativeHandle, ReactNode } from "react";
import '../styles/loginPage.css'

export type VisibilityHandle = {
  toggleVisibility: () => void;
};

const Togglable = forwardRef(
  (
    { buttonLabel, children }: { buttonLabel: string; children: ReactNode },
    refs,
  ) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => setVisible(!visible);

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <>
        <div style={hideWhenVisible}>
          <Button color="success" variant="outlined" size="small" onClick={toggleVisibility}>{buttonLabel}</Button>
        </div>
        <div style={showWhenVisible} className="togglableContent">
          {children}
          <Button color="secondary" className="cancel-bttn" variant="outlined" size="small" onClick={toggleVisibility}>Cancel</Button>
        </div>
      </>
    );
  },
);

Togglable.displayName = "Togglable";

export default Togglable;
