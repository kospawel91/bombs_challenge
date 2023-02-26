import { ISquare } from "../../types";
export const createBoard = (size: number, stars: number): ISquare[] => {
    const squares: ISquare[] = [];

    for (let i = 0; i < size ** 2; i++) {
        squares.push({
            x: i,
            hasDot: false,
        });
    }

    for (let i = 0; i < stars; i++) {
        let randomIndex = Math.floor(Math.random() * size ** 2);
        let cell = squares[randomIndex];

        cell.hasDot ? i-- : (cell.hasDot = true);
    }
    return squares;
};