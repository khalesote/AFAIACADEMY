import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Ejemplo de datos para un crucigrama 5x5
const GRID_SIZE = 5;

const solution = [
  ['C', 'A', 'S', 'A', 'S'],
  ['O', '', '', '', 'I'],
  ['C', '', 'S', '', 'L'],
  ['H', '', '', '', 'O'],
  ['E', 'S', 'T', 'O', 'S'],
];

const horizontalClues = [
  '1. Lugar donde vives',
  '5. Pronombre demostrativo (plural, masculino)',
];

const verticalClues = [
  '1. Animal doméstico que dice miau',
  '2. Lo contrario de NO',
];

const Crucigrama = () => {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const handleInput = (text: string, row: number, col: number) => {
    const newGrid = grid.map(arr => [...arr]);
    newGrid[row][col] = text.toUpperCase().slice(-1); // Solo una letra y en mayúscula
    setGrid(newGrid);
  };

  const checkCorrect = (row: number, col: number) => {
    return grid[row][col] === solution[row][col];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crucigrama</Text>
      <View style={styles.grid}>
        {solution.map((rowArr, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {rowArr.map((cell, colIdx) => (
              <View key={colIdx} style={styles.cellWrapper}>
                {cell ? (
                  <TextInput
                    style={[
                      styles.cell,
                      selectedCell && selectedCell[0] === rowIdx && selectedCell[1] === colIdx
                        ? styles.selectedCell
                        : {},
                      grid[rowIdx][colIdx] && checkCorrect(rowIdx, colIdx)
                        ? styles.correctCell
                        : {},
                    ]}
                    maxLength={1}
                    value={grid[rowIdx][colIdx]}
                    onChangeText={text => handleInput(text, rowIdx, colIdx)}
                    onFocus={() => setSelectedCell([rowIdx, colIdx])}
                    editable={!showSolution}
                  />
                ) : (
                  <View style={styles.emptyCell} />
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowSolution(!showSolution)}
      >
        <Text style={styles.buttonText}>
          {showSolution ? 'Ocultar solución' : 'Mostrar solución'}
        </Text>
      </TouchableOpacity>
      {showSolution && (
        <View style={styles.solutionBox}>
          <Text style={styles.solutionTitle}>Solución:</Text>
          {solution.map((row, i) => (
            <Text key={i} style={styles.solutionRow}>{row.join(' ')}</Text>
          ))}
        </View>
      )}
      <View style={styles.cluesBox}>
        <Text style={styles.cluesTitle}>Horizontales:</Text>
        {horizontalClues.map((clue, i) => (
          <Text key={i} style={styles.clue}>{clue}</Text>
        ))}
        <Text style={styles.cluesTitle}>Verticales:</Text>
        {verticalClues.map((clue, i) => (
          <Text key={i} style={styles.clue}>{clue}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  grid: {
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  cellWrapper: {
    margin: 1,
  },
  cell: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  selectedCell: {
    backgroundColor: '#cce5ff',
  },
  correctCell: {
    backgroundColor: '#c8e6c9',
  },
  emptyCell: {
    width: 36,
    height: 36,
    backgroundColor: '#bbb',
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  solutionBox: {
    marginVertical: 10,
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  solutionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
  },
  solutionRow: {
    fontFamily: 'monospace',
    fontSize: 18,
    letterSpacing: 8,
  },
  cluesBox: {
    marginTop: 16,
    alignSelf: 'stretch',
  },
  cluesTitle: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  clue: {
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 2,
  },
});

export default Crucigrama;
