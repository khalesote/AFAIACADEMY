import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { openDatabaseSync, SQLiteDatabase } from 'expo-sqlite';

const DB_NAME = 'diccionario.db';
const TABLE_NAME = 'diccionario';
const DB_PATH = FileSystem.documentDirectory + DB_NAME;

let db: SQLiteDatabase | null = null;


type DiccionarioEntry = {
  id: number;
  palabra_es: string;
  palabra_ar: string;
};

export default function DiccionarioScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<DiccionarioEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbReady, setDbReady] = useState(false);

  // Copia la base de datos desde assets a documentDirectory si es necesario
  useEffect(() => {
    async function prepareDb() {
      try {
        // Verifica si la base de datos ya existe en documentDirectory
        const dbInfo = await FileSystem.getInfoAsync(DB_PATH);
        if (!dbInfo.exists) {
          // Busca el asset en assets/app o assets/ según corresponda
          const asset = Asset.fromModule(require('../../assets/diccionario.db'));
          await asset.downloadAsync();
          await FileSystem.copyAsync({ from: asset.localUri!, to: DB_PATH });
        }
        db = openDatabaseSync(DB_PATH);
        setDbReady(true);
      } catch (e) {
        console.log('Error preparando la base de datos:', e);
      }
    }
    prepareDb();
  }, []);

  // Crear tabla si no existe (opcional, puedes quitar si solo lees)
  useEffect(() => {
    if (!dbReady || !db) return;
    try {
      db.execSync(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (id INTEGER PRIMARY KEY AUTOINCREMENT, es TEXT, ar TEXT);`);
    } catch (e) {
      console.log('Error creando tabla:', e);
    }
  }, [dbReady]);

  // Consultar datos
  useEffect(() => {
    if (!dbReady || !db) return;
    setLoading(true);
    let query = `SELECT * FROM ${TABLE_NAME}`;
    let params: any[] = [];
    if (search.trim() !== '') {
      query += ' WHERE palabra_es LIKE ? OR palabra_ar LIKE ?';
      params = [`%${search}%`, `%${search}%`];
    }
    try {
      const rows = db.getAllSync(query, params) as DiccionarioEntry[];
      setResults(rows);
    } catch (e) {
      console.log(e);
      setResults([]);
    }
    setLoading(false);
  }, [search, dbReady]);

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 36, left: 10, zIndex: 10, padding: 8 }}
        onPress={() => router.replace('/')}
      >
        <Ionicons name="arrow-back" size={28} color="#1976d2" />
      </TouchableOpacity>
      <Text style={styles.title}>Diccionario Español-Árabe</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar palabra en español o árabe..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#1976d2" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id?.toString() || item.palabra_es + item.palabra_ar}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.es}>{item.palabra_es}</Text>
              <Text style={styles.ar}>{item.palabra_ar}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginTop: 30 }}>No se encontraron resultados.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 18,
    fontSize: 18,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  es: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  ar: {
    fontSize: 20,
    color: '#1976d2',
    flex: 1,
    textAlign: 'right',
    fontFamily: 'System',
    writingDirection: 'rtl',
  },
});
