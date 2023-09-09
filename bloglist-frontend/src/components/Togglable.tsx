import { Box, Button } from "@mui/material";
import { useState, forwardRef, useImperativeHandle, ReactNode } from "react";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: "2rem",
        }}
        component="section"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          style={hideWhenVisible}
        >
          <Button
            color="success"
            variant="outlined"
            size="small"
            onClick={toggleVisibility}
          >
            {buttonLabel}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          style={showWhenVisible}
          className="togglableContent"
        >
          {children}
          <Button
            sx={{
              marginTop: "1rem",
            }}
            color="secondary"
            className="cancel-bttn"
            variant="outlined"
            size="small"
            onClick={toggleVisibility}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    );
  },
);

Togglable.displayName = "Togglable";

export default Togglable;
