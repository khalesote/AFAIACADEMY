import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Cell = {
  value: string;
  isBlack: boolean;
  number?: number;
  isSelected: boolean;
  isHighlighted: boolean;
};

type Clue = {
  number: number;
  clue: string;
  row: number;
  col: number;
  direction: 'horizontal' | 'vertical';
  length: number;
};

const GRID_SIZE = 10;
const CELL_SIZE = Math.floor((Dimensions.get('window').width - 60) / GRID_SIZE);

// Definición del crucigrama (0 = celda negra, 1 = celda blanca)
const GRID_TEMPLATE = [
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
];

// Solución del crucigrama
const SOLUTION = [
  'CASA'.split(''), 'MESA'.split(''), 'SILLA'.split(''), 'SOFA'.split(''), 'LAMPARA'.split(''),
  'CUADRO'.split(''), 'ESPEJO'.split(''), 'ESTANTE'.split(''), 'RELOJ'.split(''), 'ALFOMBRA'.split('')
];

// Pistas horizontales
const HORIZONTAL_CLUES: Clue[] = [
  { number: 1, clue: 'Lugar donde vives', row: 0, col: 0, direction: 'horizontal', length: 4 },
  { number: 2, clue: 'Mueble donde comes', row: 0, col: 7, direction: 'horizontal', length: 4 },
  { number: 3, clue: 'Para sentarse', row: 2, col: 0, direction: 'horizontal', length: 5 },
  { number: 4, clue: 'Mueble para varias personas', row: 2, col: 5, direction: 'horizontal', length: 4 },
  { number: 5, clue: 'Fuente de luz', row: 4, col: 0, direction: 'horizontal', length: 7 },
];

// Pistas verticales
const VERTICAL_CLUES: Clue[] = [
  { number: 1, clue: 'Objeto que muestra la hora', row: 0, col: 0, direction: 'vertical', length: 5 },
  { number: 2, clue: 'Fuente de luz', row: 0, col: 3, direction: 'vertical', length: 8 },
  { number: 3, clue: 'Para decorar el suelo', row: 0, col: 7, direction: 'vertical', length: 7 },
  { number: 4, clue: 'Muestra tu reflejo', row: 0, col: 9, direction: 'vertical', length: 6 },
  { number: 5, clue: 'Para colgar en la pared', row: 2, col: 5, direction: 'vertical', length: 6 },
];

const CrucigramaMejorado = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [currentDirection, setCurrentDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [timer, setTimer] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [activeClue, setActiveClue] = useState<Clue | null>(null);

  // Inicializar el crucigrama
  useEffect(() => {
    initializeGrid();
    
    // Iniciar temporizador
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const initializeGrid = () => {
    const newGrid: Cell[][] = [];
    let clueNumber = 1;

    for (let i = 0; i < GRID_SIZE; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        const isBlack = GRID_TEMPLATE[i][j] === 0;
        let number: number | undefined;
        
        // Asignar números a las celdas que inician palabras
        if (!isBlack) {
          const isStartOfWord = 
            (j === 0 || GRID_TEMPLATE[i][j - 1] === 0) || // Inicio de palabra horizontal
            (i === 0 || GRID_TEMPLATE[i - 1][j] === 0);   // Inicio de palabra vertical
          
          if (isStartOfWord) {
            number = clueNumber++;
          }
        }


        row.push({
          value: '',
          number,
          isBlack,
          isSelected: false,
          isHighlighted: false,
        });
      }
      newGrid.push(row);
    }

    setGrid(newGrid);
  };

  const handleCellPress = (row: number, col: number) => {
    if (grid[row][col].isBlack) return;

    // Cambiar la dirección si se hace clic en la celda seleccionada
    if (selectedCell && selectedCell[0] === row && selectedCell[1] === col) {
      setCurrentDirection(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
    } else {
      setSelectedCell([row, col]);
      // Encontrar la pista correspondiente
      const clues = currentDirection === 'horizontal' ? HORIZONTAL_CLUES : VERTICAL_CLUES;
      const clue = clues.find(c => 
        c.direction === currentDirection && 
        c.row === row && 
        c.col === col
      );
      setActiveClue(clue || null);
    }
  };

  const handleInput = (text: string) => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    const newGrid = [...grid];
    const newValue = text.toUpperCase().slice(-1); // Tomar solo la última letra
    
    // Actualizar la celda actual
    newGrid[row][col] = {
      ...newGrid[row][col],
      value: newValue,
    };

    // Mover a la siguiente celda según la dirección
    if (newValue && currentDirection === 'horizontal' && col < GRID_SIZE - 1) {
      let nextCol = col + 1;
      while (nextCol < GRID_SIZE && newGrid[row][nextCol].isBlack) {
        nextCol++;
      }
      if (nextCol < GRID_SIZE) {
        setSelectedCell([row, nextCol]);
      }
    } else if (newValue && currentDirection === 'vertical' && row < GRID_SIZE - 1) {
      let nextRow = row + 1;
      while (nextRow < GRID_SIZE && newGrid[nextRow][col].isBlack) {
        nextRow++;
      }
      if (nextRow < GRID_SIZE) {
        setSelectedCell([nextRow, col]);
      }
    }

    setGrid(newGrid);
    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: Cell[][]) => {
    let complete = true;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (!currentGrid[i][j].isBlack && currentGrid[i][j].value === '') {
          complete = false;
          break;
        }
      }
      if (!complete) break;
    }
    
    if (complete) {
      setIsComplete(true);
      Alert.alert(
        '¡Felicidades!',
        `¡Has completado el crucigrama en ${formatTime(timer)}!`,
        [{ text: 'OK' }]
      );
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    const newGrid = [...grid];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (!newGrid[i][j].isBlack) {
          newGrid[i][j] = {
            ...newGrid[i][j],
            value: SOLUTION[i]?.[j] || '',
          };
        }
      }
    }
    setGrid(newGrid);
  };

  const handleReset = () => {
    initializeGrid();
    setSelectedCell(null);
    setTimer(0);
    setIsComplete(false);
    setShowSolution(false);
    setActiveClue(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CRUCIGRAMA</Text>
        <View style={styles.timerContainer}>
          <MaterialIcons name="timer" size={24} color="#4a90e2" />
          <Text style={styles.timer}>{formatTime(timer)}</Text>
        </View>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <TouchableOpacity
                  key={`${rowIndex}-${colIndex}`}
                  style={[
                    styles.cell,
                    cell.isBlack && styles.blackCell,
                    selectedCell && 
                      selectedCell[0] === rowIndex && 
                      selectedCell[1] === colIndex && 
                      styles.selectedCell,
                    cell.isHighlighted && styles.highlightedCell,
                  ]}
                  onPress={() => handleCellPress(rowIndex, colIndex)}
                  disabled={cell.isBlack || showSolution}
                >
                  {cell.number && (
                    <Text style={styles.cellNumber}>{cell.number}</Text>
                  )}
                  {!cell.isBlack && (
                    <TextInput
                      style={styles.input}
                      value={cell.value}
                      onChangeText={handleInput}
                      maxLength={1}
                      editable={!showSolution}
                      selectTextOnFocus
                      textAlign="center"
                      keyboardType="default"
                      autoCapitalize="characters"
                      autoComplete="off"
                      autoCorrect={false}
                      selectionColor="transparent"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.cluesContainer}>
        <ScrollView style={styles.cluesScroll}>
          <View style={styles.cluesSection}>
            <Text style={styles.sectionTitle}>HORIZONTALES</Text>
            {HORIZONTAL_CLUES.map((clue, index) => (
              <Text 
                key={`h-${index}`} 
                style={[
                  styles.clue,
                  activeClue?.number === clue.number && styles.activeClue
                ]}
                onPress={() => {
                  setSelectedCell([clue.row, clue.col]);
                  setCurrentDirection('horizontal');
                  setActiveClue(clue);
                }}
              >
                <Text style={styles.clueNumber}>{clue.number}.</Text> {clue.clue}
              </Text>
            ))}
          </View>
          
          <View style={styles.cluesSection}>
            <Text style={styles.sectionTitle}>VERTICALES</Text>
            {VERTICAL_CLUES.map((clue, index) => (
              <Text 
                key={`v-${index}`}
                style={[
                  styles.clue,
                  activeClue?.number === clue.number && styles.activeClue
                ]}
                onPress={() => {
                  setSelectedCell([clue.row, clue.col]);
                  setCurrentDirection('vertical');
                  setActiveClue(clue);
                }}
              >
                <Text style={styles.clueNumber}>{clue.number}.</Text> {clue.clue}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.button, styles.resetButton]} 
          onPress={handleReset}
        >
          <MaterialIcons name="replay" size={20} color="#fff" />
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.solutionButton]} 
          onPress={handleShowSolution}
          disabled={showSolution}
        >
          <MaterialIcons name="visibility" size={20} color="#fff" />
          <Text style={styles.buttonText}>Ver Solución</Text>
        </TouchableOpacity>
      </View>

      {isComplete && (
        <View style={styles.completionMessage}>
          <Text style={styles.completionText}>¡Crucigrama completado en {formatTime(timer)}!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    letterSpacing: 0.5,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2f7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timer: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#4a90e2',
  },
  gridContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  grid: {
    backgroundColor: '#2c3e50',
    padding: 4,
    borderRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#bdc3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackCell: {
    backgroundColor: '#2c3e50',
    borderColor: '#2c3e50',
  },
  selectedCell: {
    backgroundColor: '#e3f2fd',
    borderColor: '#4a90e2',
    borderWidth: 2,
  },
  highlightedCell: {
    backgroundColor: '#f0f7ff',
  },
  cellNumber: {
    position: 'absolute',
    top: 2,
    left: 2,
    fontSize: 8,
    color: '#7f8c8d',
  },
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: CELL_SIZE * 0.5,
    fontWeight: 'bold',
    color: '#2c3e50',
    padding: 0,
  },
  cluesContainer: {
    flex: 1,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  cluesScroll: {
    flex: 1,
  },
  cluesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 4,
  },
  clue: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 6,
    lineHeight: 20,
    padding: 4,
    borderRadius: 4,
  },
  activeClue: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    fontWeight: '600',
  },
  clueNumber: {
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    flex: 1,
    marginHorizontal: 4,
  },
  resetButton: {
    backgroundColor: '#95a5a6',
  },
  solutionButton: {
    backgroundColor: '#4a90e2',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 14,
  },
  completionMessage: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  completionText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CrucigramaMejorado;
