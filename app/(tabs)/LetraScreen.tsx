import React from "react";
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
// @ts-ignore
const window = typeof global !== "undefined" ? global.window : undefined;
import * as Speech from "expo-speech";
import { useLocalSearchParams, useRouter } from "expo-router";

// Importa el objeto alfabetos y las imágenes desde indice.tsx
import { alfabetos, imagenes } from "./indice";

export default function LetraScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = React.useState(() => {
    const letraParam = Array.isArray(params.letra) ? params.letra[0] : params.letra;
    return alfabetos.findIndex((a) => a.letra === letraParam);
  });

  React.useEffect(() => {
    const letraParam = Array.isArray(params.letra) ? params.letra[0] : params.letra;
    const idx = alfabetos.findIndex((a) => a.letra === letraParam);
    if (idx !== -1) setCurrentIdx(idx);
  }, [params.letra]);

  const item = alfabetos[currentIdx];
  if (!item) return <Text>Letra no encontrada</Text>;
  const imagenSource = imagenes[item.imagen];

  const hablar = () => {
    Speech.speak(`${item.letra}. Ejemplo: ${item.ejemplo}`);
  };

  // Navegación entre letras, saltando letras repetidas
  const goToLetra = (targetIdx: number, direction: 'next' | 'prev' = 'next') => {
    let idx = targetIdx;
    const actualLetra = item.letra;
    while (idx >= 0 && idx < alfabetos.length && alfabetos[idx].letra === actualLetra) {
      idx = direction === 'next' ? idx + 1 : idx - 1;
    }
    if (idx >= 0 && idx < alfabetos.length) {
      const nuevaLetra = alfabetos[idx].letra;
      router.push({ pathname: '/(tabs)/LetraScreen', params: { letra: nuevaLetra } });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("/(tabs)/indice")} style={styles.volverBtn}>
        <Text style={styles.volverTxt}>← Volver</Text>
      </TouchableOpacity>
      <Text style={styles.letra}>{item.letra}</Text>
      <Text style={styles.arabe}>{item.arabe}</Text>
      <Text style={styles.ejemplo}>
        {item.ejemplo} — <Text style={styles.traduccion}>{item.traduccion}</Text>
      </Text>
      {imagenSource && <Image source={imagenSource} style={styles.imagen} resizeMode="contain" />}
      <View style={styles.flechasBox}>
        <TouchableOpacity
          onPress={() => goToLetra(currentIdx - 1, 'prev')}
          disabled={currentIdx <= 0}
          style={[styles.flechaBtn, currentIdx <= 0 && styles.flechaBtnDisabled]}
        >
          <Text style={styles.flechaTxt}>{'←'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => goToLetra(currentIdx + 1, 'next')}
          disabled={currentIdx >= alfabetos.length - 1}
          style={[styles.flechaBtn, currentIdx >= alfabetos.length - 1 && styles.flechaBtnDisabled]}
        >
          <Text style={styles.flechaTxt}>{'→'}</Text>
        </TouchableOpacity>
      </View>
      <Button title="Escuchar" onPress={hablar} />
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => router.replace('/(tabs)/indice')}
      >
        <Text style={styles.menuBtnTxt}>Volver al menú principal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  volverBtn: {
    position: "absolute",
    top: 32,
    left: 16,
    padding: 8,
    zIndex: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  volverTxt: {
    fontSize: 18,
    color: "#333",
  },
  letra: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 12,
  },
  arabe: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 12,
  },
  ejemplo: {
    fontSize: 28,
    color: "#333",
    marginBottom: 12,
  },
  traduccion: {
    fontSize: 28,
    color: "#388e3c",
    fontWeight: "bold",
  },
  imagen: {
    width: 180,
    height: 180,
    marginVertical: 16,
  },
  flechasBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    gap: 32,
  },
  flechaBtn: {
    backgroundColor: '#1976d2',
    borderRadius: 32,
    padding: 14,
    marginHorizontal: 16,
    opacity: 1,
  },
  flechaBtnDisabled: {
    opacity: 0.3,
  },
  flechaTxt: {
    fontSize: 34,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuBtn: {
    marginTop: 24,
    backgroundColor: '#d32f2f',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
  },
  menuBtnTxt: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

// Exporta alfabetos e imagenes para usarlos en otros archivos
export { alfabetos, imagenes };
