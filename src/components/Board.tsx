import {
  FunctionComponent,
  useState,
  useEffect,
  type ChangeEvent,
} from "react";
import { ISquare } from "../types";
import { Cell } from "./Cell";
import { TextField, Box } from "@mui/material";
import { createStarSchema, createMatrixSchema } from "./schema/zodSchema";
import { createBoard } from "./utils/helpers";
import * as z from "zod";

export const Board: FunctionComponent = () => {
  const [matrixSize, setMatrixSize] = useState(1);
  const [stars, setStars] = useState(0);
  const [matrixErrorMessage, setMatrixErrorMessage] = useState("");
  const [starsErrorMessage, setStarsErrorMessage] = useState("");

  useEffect(() => {
    createBoard(matrixSize, stars);
  }, [matrixSize]);

  const handleSizeChange = () => (e: ChangeEvent<HTMLInputElement>) => {
    const schema = createMatrixSchema(stars, 20, setStars);
    const value = parseInt(e.target.value, 10);
    const result = schema.safeParse({ size: value });
    if (result.success) {
      const size = result.data.size;
      if (size * size < stars) {
        setStars(0);
      }
      setMatrixErrorMessage("");
      setMatrixSize(size);
    } else {
      const error = result.error.errors[0];
      const errorMessage = error.message;
      setMatrixErrorMessage(errorMessage);
    }
  };

  const handleStarsChange = () => (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    const schema = createStarSchema(matrixSize ** 2);

    const result = schema.safeParse(value);

    if (result.success) {
      setStars(result.data);
      setStarsErrorMessage("");
    } else {
      const error = result.error.errors[0];
      const errorMessage = error.message;
      setStarsErrorMessage(errorMessage);
    }
  };

  const renderCells = (squares: ISquare[]): JSX.Element[] => {
    return squares.map((square: ISquare) => (
      <Cell key={square.x} hasDot={square.hasDot} />
    ));
  };
  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}
      >
        <TextField
          sx={{ m: 4 }}
          id="outlined-number"
          label="Number"
          type="number"
          value={matrixSize}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleSizeChange()}
        />
        Number of columns {matrixErrorMessage && `(${matrixErrorMessage})`}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}
      >
        <TextField
          sx={{ m: 4 }}
          id="outlined-number"
          label="Stars"
          type="number"
          value={stars}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleStarsChange()}
        />
        Number of stars {starsErrorMessage && `(${starsErrorMessage})`}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${matrixSize}, 30px)`,
          gridTemplateRows: `repeat(${matrixSize}, 30px)`,
          gap: "1px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderCells(createBoard(matrixSize, stars))}
      </Box>
    </Box>
  );
};
