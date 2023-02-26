import { ISquare } from "../types";
import { Box } from "@mui/material";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  cell: {
    width: "30px",
    height: "30px",
    background: "white",
    border: "1px solid black",
    position: "relative",
  },
  star: {
    "&::before": {
      content: "'★'",
      display: "block",
      position: "absolute",
      width: "10px",
      height: "10px",
      top: "4px",
      right: "12px",
    },
  },
});
export const Cell = ({ hasDot }: ISquare) => {
  const classes = useStyles();
  let cell = () => {
    return (
      <Box
        className={`${
          hasDot ? `${classes.cell} ${classes.star}` : classes.cell
        }`}
      ></Box>
    );
  };

  return cell();
};
