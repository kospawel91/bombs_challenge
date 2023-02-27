import * as z from "zod";

export const createStarSchema = (maxValue: number) => {
  return z
    .number()
    .nonnegative()
    .max(maxValue, `Value cannot be bigger than ${maxValue}}`);
};

export const createMatrixSchema = (
  stars: string,
  updateFunction: (value: string) => void
) =>
  z.object({
    size: z
      .number()
      .nonnegative()
      .transform((value) => {
        if (value ** 2 < parseInt(stars)) {
          updateFunction("");
        }
        return value;
      }),
  });
