import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const CELL_SIZE = 24;
const BOARD_SIZE = 12; // 12x12
const INIT_SNAKE = [
  { x: 5, y: 6 },
  { x: 4, y: 6 },
  { x: 3, y: 6 },
];
const INIT_DIRECTION = 'RIGHT';
const SPEED = 120; // ms

function getRandomPosition(snake: {x:number, y:number}[]) {
  let pos: { x: number, y: number };
  do {
    pos = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some(seg => seg.x === pos.x && seg.y === pos.y));
  return pos;
}

const SnakeGameScreen = () => {
  const [snake, setSnake] = useState(INIT_SNAKE);
  const [direction, setDirection] = useState(INIT_DIRECTION);
  const [food, setFood] = useState(getRandomPosition(INIT_SNAKE));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const moveRef = useRef(direction);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { moveRef.current = direction; }, [direction]);

  useEffect(() => {
    if (gameOver) return;
    timerRef.current = setInterval(move, SPEED);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [snake, direction, gameOver]);

  const move = () => {
    let head = { ...snake[0] };
    switch (moveRef.current) {
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'RIGHT': head.x += 1; break;
    }
    // Check collisions
    if (
      head.x < 0 || head.x >= BOARD_SIZE ||
      head.y < 0 || head.y >= BOARD_SIZE ||
      snake.some(seg => seg.x === head.x && seg.y === head.y)
    ) {
      setGameOver(true);
      return;
    }
    let newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1);
      setFood(getRandomPosition(newSnake));
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const restart = () => {
    setSnake(INIT_SNAKE);
    setDirection(INIT_DIRECTION);
    setFood(getRandomPosition(INIT_SNAKE));
    setScore(0);
    setGameOver(false);
  };

  // Swipe gesture handler
  const onGestureEvent = (event: any) => {
    if (event.nativeEvent.state !== State.ACTIVE) return;
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0 && direction !== 'LEFT') setDirection('RIGHT');
      else if (translationX < 0 && direction !== 'RIGHT') setDirection('LEFT');
    } else {
      if (translationY > 0 && direction !== 'UP') setDirection('DOWN');
      else if (translationY < 0 && direction !== 'DOWN') setDirection('UP');
    }
  };

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        Alert.alert('¡Juego terminado!', `Puntuación: ${score}`, [
          { text: 'Reiniciar', onPress: restart },
        ]);
      }, 300);
    }
  }, [gameOver]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snake</Text>
      <Text style={styles.score}>Puntuación: {score}</Text>
      <PanGestureHandler onHandlerStateChange={onGestureEvent}>
        <View style={styles.board}>
          {[...Array(BOARD_SIZE)].map((_, y) => (
            <View key={y} style={{ flexDirection: 'row' }}>
              {[...Array(BOARD_SIZE)].map((_, x) => {
                const isHead = snake[0].x === x && snake[0].y === y;
                const isBody = snake.some((seg, idx) => seg.x === x && seg.y === y && idx !== 0);
                const isFood = food.x === x && food.y === y;
                return (
                  <View
                    key={x}
                    style={[
                      styles.cell,
                      isHead ? styles.head : isBody ? styles.body : {},
                      isFood ? styles.food : {},
                    ]}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </PanGestureHandler>
      <Text style={styles.swipeHint}>Desliza para mover la serpiente</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  score: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 12,
  },
  board: {
    backgroundColor: '#22223b',
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#393e46',
    margin: 1,
    borderRadius: 4,
  },
  head: {
    backgroundColor: '#00adb5',
  },
  body: {
    backgroundColor: '#f8b400',
  },
  food: {
    backgroundColor: '#ff2e63',
  },
  swipeHint: {
    color: '#fff',
    fontSize: 14,
    marginTop: 12,
    opacity: 0.7,
  },
});

export default SnakeGameScreen;
