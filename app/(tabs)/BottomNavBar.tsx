import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { RouteType } from "./indice";

// Props: active indica la pantalla actual (home, vocabulario, gramatica)
export type BottomNavBarProps = {
  active: "home" | "vocabulario" | "gramatica";
};

const NAV_ITEMS = [
  {
    key: "juegos",
    label: "Juegos de Tareas",
    icon: "game-controller",
    route: "/(tabs)/JuegosDeTareasScreen",
  },
  {
    key: "vocabulario",
    label: "Vocabulario",
    icon: "book",
    route: "/(tabs)/VocabularioScreen",
  },
  {
    key: "carpeta",
    label: "Carpeta Ciudadana",
    icon: "folder",
    route: "/(tabs)/CarpetaCiudadanaScreen",
  },
  {
    key: "gestiones",
    label: "Gestiones",
    icon: "briefcase",
    route: "/(tabs)/AprendeGestionarPapelesScreen",
  },
  {
    key: "verbos",
    label: "Verbos",
    icon: "school",
    route: "/(tabs)/VerbosScreen",
  },
  {
    key: "cultura",
    label: "Cultura",
    icon: "globe",
    route: "/(tabs)/CulturaGeneralScreen",
  },
];

export default function BottomNavBar({ active }: BottomNavBarProps) {
  const router = useRouter();
  return (
    <View style={styles.bottomNav}>
      {NAV_ITEMS.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[styles.navBtn, active === item.key && styles.navBtnActive]}
          onPress={() => {
            if (active !== item.key) router.replace(item.route as RouteType);
          }}
        >
          <Ionicons
            name={item.icon as any}
            size={28}
            color={active === item.key ? "#fffde7" : "#fff"}
          />
          <Text style={[styles.navBtnText, active === item.key && { color: "#fffde7" }]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#79A890",
    paddingVertical: 8,
    paddingBottom: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    zIndex: 99,
  },
  navBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    opacity: 0.8,
  },
  navBtnActive: {
    opacity: 1,
  },
  navBtnText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 2,
    fontWeight: "bold",
  },
});
