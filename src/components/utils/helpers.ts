import { ISquare } from "../../types";
export const createBoard = (size: string, stars: string): ISquare[] => {
    const squares: ISquare[] = [];
    const matrixSize = parseInt(size) ** 2
    const starsNumber = parseInt(stars)
    for (let i = 0; i < matrixSize; i++) {
        squares.push({
            x: i,
            hasStar: false,
        });
    }
    if (squares.length > 0) {
        for (let i = 0; i < starsNumber; i++) {
            let randomIndex = Math.floor(Math.random() * matrixSize);
            let cell = squares[randomIndex];

            cell.hasStar ? i-- : (cell.hasStar = true);
        }
    }

    return squares;
};