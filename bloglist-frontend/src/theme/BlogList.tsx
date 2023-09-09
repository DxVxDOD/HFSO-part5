import { makeStyles } from "tss-react/mui";

const blogList = makeStyles()((theme) => {
  return {
    h2: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.2rem",
      },
    },
    listItem: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
        padding: 0,
        margin: "0",
      },
    },
    icon: {
      [theme.breakpoints.down("sm")]: {
        padding: 0,
        margin: 0,
      },
    },
  };
});

export default blogList;
