import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';

const CELL_SIZE = 28;
const BOARD_SIZE = 10; // 10x10
const INIT_SNAKE = [
  { x: 4, y: 5 },
  { x: 3, y: 5 },
  { x: 2, y: 5 },
];
const LEVELS = [
  'SOL', 'CASA', 'GATO', 'PERRO', 'LIBRO', 'ESCUELA', 'AMIGO', 'FAMILIA', 'CIUDAD', 'COCINA',
  'JARDIN', 'FIESTA', 'VENTANA', 'CANCION', 'MUSICA', 'CAMISA', 'ZAPATO', 'CABEZA', 'CUADERNO', 'ORDENADOR',
  'MONTAÑA', 'TELEFONO', 'HOSPITAL', 'UNIVERSIDAD', 'COMPUTADORA', 'AEROPUERTO', 'FERROCARRIL', 'BIBLIOTECA', 'RELOJ', 'ELEFANTE'
];
const OBSTACLES_PER_LEVEL = [
  [], // nivel 1 sin obstaculos
  [{x:4,y:4}],
  [{x:2,y:2},{x:7,y:7}],
  [{x:1,y:5},{x:8,y:5},{x:5,y:1}],
  [{x:3,y:3},{x:6,y:6},{x:5,y:8}],
  [{x:0,y:9},{x:9,y:0},{x:5,y:5}],
  [{x:4,y:2},{x:2,y:7},{x:7,y:2},{x:2,y:2}],
  [{x:8,y:1},{x:1,y:8},{x:3,y:6},{x:6,y:3}],
  [{x:0,y:4},{x:9,y:5},{x:4,y:0},{x:5,y:9}],
  [{x:3,y:7},{x:7,y:3},{x:5,y:5},{x:2,y:2},{x:7,y:7}],
  [{x:1,y:1},{x:8,y:8},{x:1,y:8},{x:8,y:1}],
  [{x:5,y:0},{x:0,y:5},{x:9,y:4},{x:4,y:9}],
  [{x:2,y:4},{x:7,y:5},{x:4,y:2},{x:5,y:7}],
  [{x:3,y:1},{x:6,y:8},{x:1,y:3},{x:8,y:6}],
  [{x:2,y:8},{x:8,y:2},{x:5,y:5},{x:0,y:0}],
  [{x:9,y:9},{x:0,y:9},{x:9,y:0},{x:0,y:0}],
  [{x:4,y:4},{x:5,y:5},{x:4,y:5},{x:5,y:4}],
  [{x:3,y:3},{x:6,y:6},{x:3,y:6},{x:6,y:3}],
  [{x:2,y:2},{x:7,y:7},{x:2,y:7},{x:7,y:2}],
  [{x:1,y:5},{x:8,y:5},{x:5,y:1},{x:5,y:8}],
  [{x:3,y:3},{x:6,y:6},{x:5,y:5},{x:4,y:4}],
  [{x:0,y:9},{x:9,y:0},{x:0,y:0},{x:9,y:9}],
  [{x:4,y:2},{x:2,y:7},{x:7,y:2},{x:2,y:2},{x:5,y:5}],
  [{x:8,y:1},{x:1,y:8},{x:3,y:6},{x:6,y:3},{x:5,y:5}],
  [{x:0,y:4},{x:9,y:5},{x:4,y:0},{x:5,y:9},{x:5,y:5}],
  [{x:3,y:7},{x:7,y:3},{x:5,y:5},{x:2,y:2},{x:7,y:7},{x:4,y:4}],
  [{x:1,y:1},{x:8,y:8},{x:1,y:8},{x:8,y:1},{x:5,y:5}],
  [{x:5,y:0},{x:0,y:5},{x:9,y:4},{x:4,y:9},{x:5,y:5}],
  [{x:2,y:4},{x:7,y:5},{x:4,y:2},{x:5,y:7},{x:5,y:5}],
];

const INIT_DIRECTION = 'RIGHT';
const SPEED = 400; // ms
const LETRAS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

function getRandomLetter() {
  return LETRAS[Math.floor(Math.random() * LETRAS.length)];
}

// Cambia la firma de getRandomPosition para que obstacles sea del tipo correcto
function getRandomPosition(
  snakeArr: {x: number, y: number}[] = INIT_SNAKE,
  obstacles: {x: number, y: number}[] = [],
  foodPos?: {x:number,y:number}
) {
  let pos: {x: number, y: number};
  do {
    pos = { x: Math.floor(Math.random() * BOARD_SIZE), y: Math.floor(Math.random() * BOARD_SIZE) };
  } while (
    snakeArr.some(seg => seg.x === pos.x && seg.y === pos.y) ||
    (foodPos && pos.x === foodPos.x && pos.y === foodPos.y) ||
    obstacles.some(obs => obs.x === pos.x && obs.y === pos.y)
  );
  return pos;
}

export default function SnakeLetrasScreen() {
  const [snake, setSnake] = useState(INIT_SNAKE);
  const [direction, setDirection] = useState(INIT_DIRECTION);
  const [letra, setLetra] = useState(getRandomLetter());
  // Cambia el estado food para que tenga el tipo correcto
  const [food, setFood] = useState<{x: number, y: number}>(getRandomPosition(INIT_SNAKE, [], undefined));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(0);
  const [targetWord, setTargetWord] = useState(LEVELS[0]);
  const [collected, setCollected] = useState('');
  const moveRef = useRef(direction);
  const timerRef = useRef(null as null | ReturnType<typeof setInterval>);
  const router = useRouter();

  // Música de fondo
  const [musicPlaying, setMusicPlaying] = useState(true);
  const musicRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function playMusic() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/snake-music.mp3'),
          { shouldPlay: true, isLooping: true, volume: 0.5 }
        );
        musicRef.current = sound;
        if (musicPlaying && isMounted) {
          await sound.playAsync();
        }
      } catch (e) {}
    }
    playMusic();
    return () => {
      isMounted = false;
      if (musicRef.current) {
        musicRef.current.stopAsync();
        musicRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (musicRef.current) {
      if (musicPlaying) musicRef.current.playAsync();
      else musicRef.current.pauseAsync();
    }
  }, [musicPlaying]);

  useEffect(() => { moveRef.current = direction; }, [direction]);

  useEffect(() => {
    if (gameOver) return;
    timerRef.current = setInterval(move, SPEED);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  });

  function move(dirOverride?: string) {
    let head = { ...snake[0] };
    const dir = dirOverride || moveRef.current;
    const obstacles = OBSTACLES_PER_LEVEL[level] || [];
    switch (dir) {
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'RIGHT': head.x += 1; break;
    }
    // Colisión
    if (
      head.x < 0 || head.x >= BOARD_SIZE ||
      head.y < 0 || head.y >= BOARD_SIZE ||
      snake.some(seg => seg.x === head.x && seg.y === head.y) ||
      obstacles.some(obs => obs.x === head.x && obs.y === head.y)
    ) {
      setGameOver(true);
      return;
    }
    let newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      // Si la letra es la siguiente de la palabra objetivo
      if (letra === targetWord[collected.length]) {
        setCollected(collected + letra);
        setScore(score + 1);
        // ¿Completó la palabra?
        if (collected.length + 1 === targetWord.length) {
          if (level + 1 < LEVELS.length) {
            Alert.alert('¡Felicidades!', `Completaste el nivel ${level + 1} y la palabra: ${targetWord}`,[
              { text: 'Siguiente nivel', onPress: () => restart(true) }
            ]);
          } else {
            Alert.alert('¡Felicidades!', `Completaste el último nivel y la palabra: ${targetWord}`);
          }
          setGameOver(true);
          return;
        }
      }
      setLetra(getRandomLetter());
      setFood(getRandomPosition(newSnake, obstacles, food));
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  // Gestos para controlar la serpiente
  const onGestureEvent = (event: any) => {
    if (event.nativeEvent.state !== State.ACTIVE) return;
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0 && direction !== 'LEFT') handleDirectionChange('RIGHT');
      else if (translationX < 0 && direction !== 'RIGHT') handleDirectionChange('LEFT');
    } else {
      if (translationY > 0 && direction !== 'UP') handleDirectionChange('DOWN');
      else if (translationY < 0 && direction !== 'DOWN') handleDirectionChange('UP');
    }
  };

  // Cambia dirección y mueve la serpiente inmediatamente
  function handleDirectionChange(newDir: string) {
    setDirection(newDir);
    move(newDir);
  }

  // Cambia la firma de restart para que acepte un evento opcional de TouchableOpacity
  const restart = (event?: GestureResponderEvent | boolean) => {
    let nextLevel = false;
    if (typeof event === 'boolean') nextLevel = event;
    const newLevel = nextLevel ? level + 1 : level;
    setLevel(newLevel);
    setTargetWord(LEVELS[newLevel] || LEVELS[LEVELS.length-1]);
    setSnake(INIT_SNAKE);
    setDirection(INIT_DIRECTION);
    setFood(getRandomPosition(INIT_SNAKE, OBSTACLES_PER_LEVEL[newLevel] || [], undefined));
    setLetra(getRandomLetter());
    setCollected('');
    setScore(0);
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snake de Letras</Text>
      <Text style={styles.score}>Puntos: {score}</Text>
      <Text style={styles.word}>Palabra objetivo: <Text style={{ color: '#43a047' }}>{targetWord}</Text></Text>
      <Text style={styles.collected}>Llevas: <Text style={{ color: '#1565c0' }}>{collected}</Text></Text>
      {gameOver && (
        <TouchableOpacity style={styles.restartBtn} onPress={restart}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Reiniciar</Text>
        </TouchableOpacity>
      )}
      <PanGestureHandler onHandlerStateChange={onGestureEvent}>
        <View>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>Nivel {level + 1} / {LEVELS.length}</Text>
          <View style={{
            borderWidth: 2,
            borderColor: '#fff',
            marginBottom: 18,
            backgroundColor: '#22223b',
          }}>
            {[...Array(BOARD_SIZE)].map((_, y) => (
              <View key={y} style={{ flexDirection: 'row' }}>
                {[...Array(BOARD_SIZE)].map((_, x) => {
                  const isSnake = snake.some(seg => seg.x === x && seg.y === y);
                  const isHead = snake[0].x === x && snake[0].y === y;
                  const isFood = food.x === x && food.y === y;
                  const isObstacle = (OBSTACLES_PER_LEVEL[level] || []).some(obs => obs.x === x && obs.y === y);
                  return (
                    <View
                      key={x}
                      style={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        backgroundColor: isHead ? '#43a047' : isSnake ? '#81c784' : isFood ? '#fbc02d' : isObstacle ? '#b71c1c' : '#22223b',
                        borderWidth: isHead || isFood || isObstacle ? 2 : 1,
                        borderColor: isHead ? '#fff' : isFood ? '#fffde7' : isObstacle ? '#fff' : '#393e46',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isFood && <Text style={{ color: '#22223b', fontWeight: 'bold', fontSize: 16 }}>{letra}</Text>}
                      {isObstacle && <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>X</Text>}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </PanGestureHandler>
      <TouchableOpacity
        style={[styles.musicBtn, {backgroundColor: musicPlaying ? '#43a047' : '#b71c1c'}]}
        onPress={() => setMusicPlaying(p => !p)}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>{musicPlaying ? 'Pausar música' : 'Reanudar música'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bigArrowButton}
        activeOpacity={1}
      >
        <View style={styles.arrowGrid}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: 44 }} />
            <TouchableOpacity
              style={styles.arrowBtn}
              onPress={() => direction !== 'DOWN' && handleDirectionChange('UP')}
            >
              <Text style={styles.arrowText}>↑</Text>
            </TouchableOpacity>
            <View style={{ width: 44 }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.arrowBtn}
              onPress={() => direction !== 'RIGHT' && handleDirectionChange('LEFT')}
            >
              <Text style={styles.arrowText}>←</Text>
            </TouchableOpacity>
            <View style={{ width: 44 }} />
            <TouchableOpacity
              style={styles.arrowBtn}
              onPress={() => direction !== 'LEFT' && handleDirectionChange('RIGHT')}
            >
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: 44 }} />
            <TouchableOpacity
              style={styles.arrowBtn}
              onPress={() => direction !== 'UP' && handleDirectionChange('DOWN')}
            >
              <Text style={styles.arrowText}>↓</Text>
            </TouchableOpacity>
            <View style={{ width: 44 }} />
          </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.swipeHint}>Desliza o usa las flechas para mover la serpiente</Text>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.replace("/")}> 
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Volver al menú</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bigArrowButton: {
    backgroundColor: '#22223b',
    borderRadius: 18,
    padding: 18,
    marginTop: 10,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 3,
    minWidth: 180,
  },
  arrowGrid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowBtn: {
    backgroundColor: '#393e46',
    borderRadius: 8,
    padding: 10,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    minWidth: 44,
    minHeight: 44,
  },
  arrowText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

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
    marginBottom: 6,
  },
  word: {
    color: '#fff',
    fontSize: 19,
    marginBottom: 4,
  },
  collected: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
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
    alignItems: 'center',
    justifyContent: 'center',
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
  letra: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  swipeHint: {
    color: '#fff',
    fontSize: 14,
    marginTop: 12,
    opacity: 0.7,
  },
  restartBtn: {
    backgroundColor: '#43a047',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  musicBtn: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 4,
  },
  backBtn: {
    backgroundColor: '#1976d2',
    padding: 10,
    borderRadius: 8,
    marginTop: 18,
  },
});
