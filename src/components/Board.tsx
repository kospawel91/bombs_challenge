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

export const Board: FunctionComponent = () => {
  const [matrixSize, setMatrixSize] = useState("");
  const [stars, setStars] = useState("");

  const [matrixErrorMessage, setMatrixErrorMessage] = useState("");
  const [starsErrorMessage, setStarsErrorMessage] = useState("");

  useEffect(() => {
    createBoard(matrixSize, stars);
  }, [matrixSize, stars]);

  const handleSizeChange = () => (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const starsNumber = parseInt(stars, 10);

    const schema = createMatrixSchema(stars, setStars);
    const result = schema.safeParse({ size: value });

    if (result.success) {
      const size = result.data.size;

      if (size ** 2 < starsNumber) {
        setStars("");
        setMatrixErrorMessage("");
        setStarsErrorMessage("");
      }

      setMatrixSize(size.toString());
      setMatrixErrorMessage("");
      setStarsErrorMessage("");
    } else {
      const error = result.error.errors[0];
      const errorMessage = error.message;

      if (errorMessage.includes("nan")) {
        setMatrixSize(value.toString());
        setMatrixErrorMessage("");
      } else {
        setMatrixErrorMessage(errorMessage);
      }
    }
  };

  const handleStarsChange = () => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const matrixSizeSquared = parseInt(matrixSize) ** 2;
    const schema = createStarSchema(matrixSizeSquared);
    const result = schema.safeParse(parseInt(value));
    if (!matrixSizeSquared || Number.isNaN(matrixSizeSquared)) {
      setStars("");
      setStarsErrorMessage("First create matrix");

      return;
    }

    if (!result.success) {
      const errorMessage = result.error.errors[0].message;
      setStarsErrorMessage(errorMessage);
      if (errorMessage.includes("nan")) {
        setStars("");
        setStarsErrorMessage("");
      }
      return;
    }

    const parsedValue = result.data;
    setStars(parsedValue.toString());
    setStarsErrorMessage("");
  };

  const renderCells = (squares: ISquare[]): JSX.Element[] => {
    return squares.map((square: ISquare) => (
      <Cell key={square.x} hasStar={square.hasStar} />
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
          label="Matrix"
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
