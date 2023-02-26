import * as z from "zod";

export const createStarSchema = (maxValue: number) => {
  return z
    .number()
    .nonnegative()
    .max(maxValue, `Value cannot be bigger than ${maxValue}`);
};

export const createMatrixSchema = (
  dots: number,
  maxSize: number,
  updateFunction: (value: number) => void
) =>
  z.object({
    size: z
      .number()
      .positive("Only positive number")
      .max(maxSize, `Maximum matrix size is ${maxSize}`)
      .transform((value) => {
        if (value ** 2 < dots) {
          updateFunction(0);
        }
        return value;
      }),
  });
