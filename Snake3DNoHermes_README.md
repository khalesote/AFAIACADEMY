# Snake3DNoHermes: 3D Snake Game en Expo sin Hermes

## Pasos para crear el nuevo proyecto y migrar tu juego

### 1. Crear el proyecto Expo limpio
```sh
expo init Snake3DNoHermes
```
Selecciona plantilla "blank" (TypeScript recomendado).

### 2. Entra en el directorio del proyecto
```sh
cd Snake3DNoHermes
```

### 3. Desactiva Hermes en `app.json`
Agrega dentro de "expo":
```json
  "jsEngine": "jsc",
```

### 4. Instala dependencias compatibles
```sh
npm install three@0.137.5 expo-three@6.0.0 @react-three/fiber @react-three/drei expo-asset
```

### 5. Copia tus imágenes a `assets/`
Coloca tus imágenes (por ejemplo, `serpiente.png`, `pyramid_bg.jpg`) en la carpeta `assets/`.

### 6. Copia el código del juego
Crea el archivo `Snake3DGame.tsx` en la carpeta `app/` (o `components/` si prefieres) y pega el código que te proporciono abajo.

### 7. Ejecuta el proyecto
```sh
expo start -c
expo run:android
```

---

## Código base para `Snake3DGame.tsx`

Copia y pega este código en tu nuevo archivo. Asegúrate de ajustar las rutas de las imágenes si las pones en una subcarpeta dentro de `assets/`.

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { Asset } from 'expo-asset';
import { loadTextureAsync } from 'expo-three';

// Hook para cargar texturas en Expo
function useExpoTexture(assetModule: any, label: string) {
  const [texture, setTexture] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const asset = Asset.fromModule(assetModule);
        await asset.downloadAsync();
        const tex = await loadTextureAsync({ asset });
        setTexture(tex);
      } catch (err) {
        console.log(`[Snake3D] ERROR loading texture for ${label}:`, err);
      }
    })();
  }, [assetModule, label]);

  return texture;
}

function SnakeCube() {
  const texture = useExpoTexture(require('../assets/serpiente.png'), 'serpiente');
  return (
    <mesh position={[1, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      {texture ? (
        <meshStandardMaterial map={texture} />
      ) : (
        <meshStandardMaterial color={0x00ff00} />
      )}
    </mesh>
  );
}

function PyramidBackground() {
  const texture = useExpoTexture(require('../assets/pyramid_bg.jpg'), 'pyramid_bg');
  return (
    <mesh position={[0, 0, -3]} rotation={[0, 0, 0]}>
      <planeGeometry args={[5, 3]} />
      {texture ? (
        <meshBasicMaterial map={texture} />
      ) : (
        <meshBasicMaterial color={0xffe4b5} />
      )}
    </mesh>
  );
}

// Lógica runner
const LANES = [-1, 0, 1];
const LANE_WIDTH = 1.5;
const OBSTACLE_COLOR = 0xff4444;
const LETTER_COLOR = 0x44ff44;
const SPEED = 0.07;
const SPAWN_DISTANCE = 18;
const OBSTACLE_FREQ = 0.18;
const LETTER_FREQ = 0.08;
const WORD = 'EXPO';

function Snake3DScene({ lane, objects, collected, setCollected, setObjects, setGameOver, gameOver }: any) {
  useFrame(() => {
    if (gameOver) return;
    setObjects((prev: any[]) =>
      prev.map(obj => ({ ...obj, z: obj.z - SPEED })).filter(obj => obj.z > -2)
    );
    if (Math.random() < OBSTACLE_FREQ) {
      setObjects((prev: any[]) => [
        ...prev,
        { z: SPAWN_DISTANCE, lane: LANES[Math.floor(Math.random() * 3)], type: 'obstacle' }
      ]);
    }
    if (Math.random() < LETTER_FREQ) {
      const remaining = WORD.split('').filter(l => !collected.includes(l));
      if (remaining.length > 0) {
        const letter = remaining[Math.floor(Math.random() * remaining.length)];
        setObjects((prev: any[]) => [
          ...prev,
          { z: SPAWN_DISTANCE, lane: LANES[Math.floor(Math.random() * 3)], type: 'letter', letter }
        ]);
      }
    }
    objects.forEach((obj: any) => {
      if (Math.abs(obj.z) < 0.5 && obj.lane === lane) {
        if (obj.type === 'obstacle') setGameOver(true);
        if (obj.type === 'letter' && !collected.includes(obj.letter)) {
          setCollected((c: string[]) => [...c, obj.letter]);
          setObjects((prev: any[]) => prev.filter(o => o !== obj));
        }
      }
    });
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <PyramidBackground />
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[4.5, 0.2, 22]} />
        <meshStandardMaterial color={0xe7d9b8} />
      </mesh>
      {objects.map((obj: any, i: number) => (
        obj.type === 'obstacle' ? (
          <mesh key={i} position={[obj.lane * LANE_WIDTH, 0.2, obj.z]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={OBSTACLE_COLOR} />
          </mesh>
        ) : (
          <mesh key={i} position={[obj.lane * LANE_WIDTH, 0.2, obj.z]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={LETTER_COLOR} />
          </mesh>
        )
      ))}
      <mesh position={[lane * LANE_WIDTH, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={0x44aaff} />
      </mesh>
    </>
  );
}

export default function Snake3DGame() {
  const [lane, setLane] = useState(0);
  const [collected, setCollected] = useState<string[]>([]);
  const [objects, setObjects] = useState<any[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const resetGame = () => {
    setLane(0);
    setCollected([]);
    setObjects([]);
    setGameOver(false);
  };

  const moveLeft = () => setLane(l => Math.max(-1, l - 1));
  const moveRight = () => setLane(l => Math.min(1, l + 1));
  const hasWon = WORD.split('').every(l => collected.includes(l));

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 16, left: 0, right: 0, alignItems: 'center', zIndex: 10 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button title="Izquierda" onPress={moveLeft} disabled={lane === -1 || gameOver || hasWon} />
          <Button title="Derecha" onPress={moveRight} disabled={lane === 1 || gameOver || hasWon} />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 6 }}>
          <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>Palabra: {WORD}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 2 }}>
          <Text style={{ color: '#1976d2', fontSize: 16 }}>Letras recogidas: {collected.join(' ')}</Text>
        </View>
        {gameOver && <Text style={{ color: 'red', fontSize: 20, marginTop: 8 }}>¡Perdiste! Toca reiniciar.</Text>}
        {hasWon && <Text style={{ color: 'green', fontSize: 20, marginTop: 8 }}>¡Ganaste!</Text>}
        {(gameOver || hasWon) && (
          <View style={{ marginTop: 10 }}>
            <Button title="Reiniciar" onPress={resetGame} />
          </View>
        )}
      </View>
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <Snake3DScene
          lane={lane}
          objects={objects}
          collected={collected}
          setCollected={setCollected}
          setObjects={setObjects}
          setGameOver={setGameOver}
          gameOver={gameOver}
        />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
```

---

## Notas
- Si tienes problemas con las rutas de imágenes, asegúrate de que estén en la carpeta correcta y usa `require('../assets/tuimagen.png')`.
- Si quieres customizar la palabra, obstáculos o lógica, solo cambia las constantes en el archivo.
- Si quieres soporte para swipe o mejoras visuales, ¡pídelo!
