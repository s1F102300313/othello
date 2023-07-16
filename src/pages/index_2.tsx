import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 2],
  ]);

  let newBoard: number[][];

  const onClick = (x: number, y: number) => {
    console.log(x, y);
    newBoard = JSON.parse(JSON.stringify(board));
    let count = 0;
    for (let dy = -1; dy < 2; dy++) {
      for (let dx = -1; dx < 2; dx++) {
        if (dy === 0 && dx === 0) {
          continue;
        }
        count += turnStone(x, y, dx, dy);
      }
    }
    if (count > 0) {
      newBoard[y][x] = turnColor;
      setTurnColor(3 - turnColor);
    }
    setBoard(newBoard);
  };

  const turnStone = (x: number, y: number, dx: number, dy: number): number => {
    let count = 0;
    for (let i = 0; i < 8; i++) {
      x += dx;
      y += dy;
      if (x < 0 || x >= 8 || y < 0 || y >= 8) {
        return 0;
      }
      const color = newBoard[y][x];
      if (color === 0) {
        return 0;
      }
      if (color === turnColor) {
        break;
      }
      count += 1;
    }
    for (let i = 0; i < count; i++) {
      x -= dx;
      y -= dy;
      newBoard[y][x] = turnColor;
    }
    return count;
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
