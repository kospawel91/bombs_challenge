import { useState, useEffect, Suspense, Fragment } from "react";
import { ISquare } from "../types";
import { createUseStyles } from "react-jss";

import { sort } from "timsort";
const useStyles = createUseStyles({
  cell: {
    width: "30px",
    height: "30px",
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

interface RenderSquareInChunksProps {
  data: ISquare[];
}

function Cell({ data }: RenderSquareInChunksProps) {
  const [chunks, setChunks] = useState<ISquare[][]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [renderedItems, setRenderedItems] = useState<number>(0);
  const classes = useStyles();
  useEffect(() => {
    if (data.length > 0) {
      sort(data, (a: ISquare, b: ISquare) => {
        if (a.x !== undefined && b.x !== undefined) {
          return a.x - b.x;
        } else {
          return 0; // or some other default value if x is undefined
        }
      });
      const chunkSize = 10000;
      const chunks: ISquare[][] = [];
      for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
      }
      setChunks(chunks);
    } else {
      setChunks([]);
    }
  }, [data]);

  useEffect(() => {
    if (chunks[currentIndex] != undefined) {
      const chunk = chunks[currentIndex];
      const timeout = setTimeout(() => {
        setRenderedItems((prev) => prev + chunk.length);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [chunks, currentIndex, renderedItems]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {chunks.slice(0, currentIndex).map((chunk, index) => (
          <Fragment key={index}>
            {chunk.map((item, innerIndex) => (
              <div
                key={`${index}-${innerIndex}`}
                className={`${classes.cell} ${
                  item.hasStar ? classes.star : ""
                }`}
              ></div>
            ))}
          </Fragment>
        ))}
      </Suspense>
    </>
  );
}

export default Cell;
