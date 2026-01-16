import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, I18nManager, ActivityIndicator, Alert } from "react-native";
import { openDatabaseSync } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

const DB_NAME = "diccionario.db";
const DB_INTERNAL_PATH = FileSystem.documentDirectory + DB_NAME;
const DB_ASSET_PATH = FileSystem.bundleDirectory + "assets/" + DB_NAME; // Ruta en assets bundle


export default function DiccionarioSQLiteScreen() {
  const [busqueda, setBusqueda] = useState("");
  const [modo, setModo] = useState<"es-ar" | "ar-es">("es-ar");
  const [resultados, setResultados] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await inicializarDB();
        buscarPalabras("");
      } catch (e) {
        Alert.alert("Error", "No se pudo inicializar la base de datos: " + e);
      }
      setCargando(false);
    })();
  }, []);

  useEffect(() => {
    buscarPalabras(busqueda);
  }, [busqueda, modo]);

  async function inicializarDB() {
    // Verificar si la base de datos ya existe en almacenamiento interno
    const dbFile = await FileSystem.getInfoAsync(DB_INTERNAL_PATH);
    if (!dbFile.exists) {
      // Copiar desde assets solo si no existe
      const assetDbFile = await FileSystem.getInfoAsync(DB_ASSET_PATH);
      if (!assetDbFile.exists) {
        throw new Error("El archivo diccionario.db no se encuentra en assets. Asegúrate de incluirlo en la carpeta assets al compilar la app.");
      }
      await FileSystem.copyAsync({ from: DB_ASSET_PATH, to: DB_INTERNAL_PATH });
    }
    // SQLite.openDatabase usará el archivo en documentDirectory automáticamente
  }

  // Ya no es necesario importar desde CSV, la base de datos viene pre-cargada desde assets.

  function buscarPalabras(q: string) {
  setCargando(true);
  const db: any = openDatabaseSync(DB_NAME);
  let sql = "SELECT es, ar FROM diccionario ";
  let args: any[] = [];
  if (q.trim() !== "") {
    if (modo === "es-ar") {
      sql += "WHERE es LIKE ? ORDER BY es LIMIT 100;";
      args = [q + "%"];
    } else {
      sql += "WHERE ar LIKE ? ORDER BY ar LIMIT 100;";
      args = [q + "%"];
    }
  } else {
    sql += "ORDER BY es LIMIT 100;";
  }
  try {
    const result = db.execSync(sql, args);
    setResultados(result.rows ?? []);
  } catch (e) {
    setResultados([]);
    Alert.alert("Error", "No se pudo ejecutar la consulta: " + e);
  }
  setCargando(false);
}

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Diccionario Español/Árabe (offline)</Text>
      <View style={styles.switchRow}>
        <TouchableOpacity
          style={[styles.switchBtn, modo === "es-ar" && styles.switchBtnActive]}
          onPress={() => setModo("es-ar")}
        >
          <Text style={styles.switchBtnText}>ES → AR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchBtn, modo === "ar-es" && styles.switchBtnActive]}
          onPress={() => setModo("ar-es")}
        >
          <Text style={styles.switchBtnText}>AR → ES</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder={modo === "es-ar" ? "Buscar palabra en español" : "ابحث عن كلمة بالعربية"}
        value={busqueda}
        onChangeText={setBusqueda}
        textAlign={modo === "ar-es" ? "right" : "left"}
      />
      {cargando ? <ActivityIndicator size="large" color="#c62828" style={{marginVertical: 24}} /> : (
        <FlatList
          data={resultados}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultRow}>
              <Text style={styles.resultES}>{item.es}</Text>
              <Text style={styles.resultAR}>{item.ar}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{textAlign:'center',marginTop:24}}>No hay resultados</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 40 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: '#c62828' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 16, fontSize: 18 },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12 },
  switchBtn: { paddingVertical: 6, paddingHorizontal: 18, borderRadius: 20, backgroundColor: '#eee', marginHorizontal: 8 },
  switchBtnActive: { backgroundColor: '#c62828' },
  switchBtnText: { color: '#222', fontWeight: 'bold' },
  resultRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
  resultES: { flex: 1, fontSize: 18, color: '#444', textAlign: 'left' },
  resultAR: { flex: 1, fontSize: 20, color: '#00897b', textAlign: 'right', fontFamily: I18nManager.isRTL ? undefined : 'System' },
});
