
import { View, Text, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

// Datos del alfabeto español, palabra ejemplo, traducción y nombre de imagen
const alfabetos = [
  {
    letra: "A",
    arabe: "ا",
    ejemplo: "Avion",
    traduccion: "طائرة",
    imagen: "avion",
  },
  {
    letra: "A",
    arabe: "ا",
    ejemplo: "Agua",
    traduccion: "ماء",
    imagen: "agua",
  },
  {
    letra: "B",
    arabe: "ب",
    ejemplo: "Barco",
    traduccion: "سفينة",
    imagen: "barco",
  },
  {
    letra: "B",
    arabe: "ب",
    ejemplo: "Banco",
    traduccion: "بنك",
    imagen: "banco",
  },
  {
    letra: "C",
    arabe: "ث",
    ejemplo: "Cero",
    traduccion: "صفر",
    imagen: "cero",
  },
  {
    letra: "C",
    arabe: "ث",
    ejemplo: "Casa",
    traduccion: "بيت",
    imagen: "casa",
  },
  {
    letra: "D",
    arabe: "د",
    ejemplo: "Dado",
    traduccion: "نرد",
    imagen: "dado",
  },
  {
    letra: "D",
    arabe: "د",
    ejemplo: "Delfin",
    traduccion: "دلفين",
    imagen: "delfin",
  },
  {
    letra: "E",
    arabe: "إ",
    ejemplo: "Elefante",
    traduccion: "فيل",
    imagen: "elefante",
  },
  {
    letra: "E",
    arabe: "إ",
    ejemplo: "Escuela",
    traduccion: "مدرسة",
    imagen: "escuela",
  },
  {
    letra: "F",
    arabe: "ف",
    ejemplo: "Familia",
    traduccion: "عائلة",
    imagen: "familia",
  },
  {
    letra: "F",
    arabe: "ف",
    ejemplo: "Fruta",
    traduccion: "فاكهة",
    imagen: "fruta",
  },
  { letra: "G", arabe: "ج", ejemplo: "Gato", traduccion: "قط", imagen: "gato" },
  {
    letra: "G",
    arabe: "ج",
    ejemplo: "Guitarra",
    traduccion: "قيثارة",
    imagen: "guitarra",
  },
  {
    letra: "H",
    arabe: "ه",
    ejemplo: "Hoja",
    traduccion: "ورقة",
    imagen: "hoja",
  },
  {
    letra: "H",
    arabe: "ه",
    ejemplo: "Helado",
    traduccion: "مثلجات",
    imagen: "helado",
  },
  {
    letra: "I",
    arabe: "ي",
    ejemplo: "Iglesia",
    traduccion: "كنيسة",
    imagen: "iglesia",
  },
  {
    letra: "I",
    arabe: "ي",
    ejemplo: "Isla",
    traduccion: "جزيرة",
    imagen: "isla",
  },
  {
    letra: "J",
    arabe: "خ",
    ejemplo: "Jamon",
    traduccion: "لحم خنزير",
    imagen: "jamon",
  },
  {
    letra: "J",
    arabe: "خ",
    ejemplo: "Jirafa",
    traduccion: "زرافة",
    imagen: "jirafa",
  },
  {
    letra: "K",
    arabe: "ك",
    ejemplo: "Kilo",
    traduccion: "كيلو",
    imagen: "kilo",
  },
  {
    letra: "K",
    arabe: "ك",
    ejemplo: "Kiwi",
    traduccion: "كيوي",
    imagen: "kiwi",
  },
  {
    letra: "L",
    arabe: "ل",
    ejemplo: "Luna",
    traduccion: "قمر",
    imagen: "luna",
  },
  {
    letra: "L",
    arabe: "ل",
    ejemplo: "Libro",
    traduccion: "كتاب",
    imagen: "libro",
  },
  {
    letra: "M",
    arabe: "م",
    ejemplo: "Mezquita",
    traduccion: "مسجد",
    imagen: "mezquita",
  },
  {
    letra: "M",
    arabe: "م",
    ejemplo: "Manzana",
    traduccion: "تفاحة",
    imagen: "manzana",
  },
  {
    letra: "N",
    arabe: "ن",
    ejemplo: "Nariz",
    traduccion: "أنف",
    imagen: "nariz",
  },
  {
    letra: "N",
    arabe: "ن",
    ejemplo: "Nube",
    traduccion: "سحابة",
    imagen: "nube",
  },
  {
    letra: "Ñ",
    arabe: "ني",
    ejemplo: "Leña",
    traduccion: "حطب",
    imagen: "lena",
  },
  { letra: "O", arabe: "و", ejemplo: "Oso", traduccion: "دب", imagen: "oso" },
  {
    letra: "O",
    arabe: "و",
    ejemplo: "Oreja",
    traduccion: "أذن",
    imagen: "oreja",
  },
  {
    letra: "P",
    arabe: "ب",
    ejemplo: "Perro",
    traduccion: "كلب",
    imagen: "perro",
  },
  {
    letra: "P",
    arabe: "ب",
    ejemplo: "Pato",
    traduccion: "بطة",
    imagen: "pato",
  },
  {
    letra: "Q",
    arabe: "ق",
    ejemplo: "Queso",
    traduccion: "جبن",
    imagen: "queso",
  },
  {
    letra: "Q",
    arabe: "ق",
    ejemplo: "Quinto",
    traduccion: "الخامس",
    imagen: "quinto",
  },
  {
    letra: "R",
    arabe: "ر",
    ejemplo: "Raton",
    traduccion: "فأر",
    imagen: "raton",
  },
  {
    letra: "R",
    arabe: "ر",
    ejemplo: "Rosa",
    traduccion: "وردة",
    imagen: "rosa",
  },
  { letra: "S", arabe: "س", ejemplo: "Sol", traduccion: "شمس", imagen: "sol" },
  {
    letra: "S",
    arabe: "س",
    ejemplo: "Silla",
    traduccion: "كرسي",
    imagen: "silla",
  },
  {
    letra: "T",
    arabe: "ت",
    ejemplo: "Taza",
    traduccion: "كوب",
    imagen: "taza",
  },
  {
    letra: "T",
    arabe: "ت",
    ejemplo: "Tigre",
    traduccion: "نمر",
    imagen: "tigre",
  },
  { letra: "U", arabe: "و", ejemplo: "Uva", traduccion: "عنب", imagen: "uva" },
  {
    letra: "U",
    arabe: "و",
    ejemplo: "Universo",
    traduccion: "كون",
    imagen: "universo",
  },
  {
    letra: "V",
    arabe: "ف",
    ejemplo: "Vaca",
    traduccion: "بقرة",
    imagen: "vaca",
  },
  {
    letra: "V",
    arabe: "ف",
    ejemplo: "Ventana",
    traduccion: "نافذة",
    imagen: "ventana",
  },
  {
    letra: "W",
    arabe: "و",
    ejemplo: "Wifi",
    traduccion: "واي فاي",
    imagen: "wifi",
  },
  {
    letra: "X",
    arabe: "كس",
    ejemplo: "Xilofono",
    traduccion: "إكسيليفون",
    imagen: "xilofono",
  },
  {
    letra: "Y",
    arabe: "ي",
    ejemplo: "Yate",
    traduccion: "يخت",
    imagen: "yate",
  },
  {
    letra: "Y",
    arabe: "ي",
    ejemplo: "Yogur",
    traduccion: "زبادي",
    imagen: "yogur",
  },
  {
    letra: "Z",
    arabe: "ز",
    ejemplo: "Zapato",
    traduccion: "حذاء",
    imagen: "zapato",
  },
  {
    letra: "Z",
    arabe: "ز",
    ejemplo: "Zorro",
    traduccion: "ثعلب",
    imagen: "zorro",
  },
];

const imagenes: { [key: string]: any } = {
  avion: require("../../assets/images/avion.png"),
  agua: require("../../assets/images/agua.png"),
  banco: require("../../assets/images/banco.png"),
  barco: require("../../assets/images/barco.png"),
  casa: require("../../assets/images/casa.png"),
  cero: require("../../assets/images/cero.png"),
  dado: require("../../assets/images/dado.png"),
  delfin: require("../../assets/images/delfin.png"),
  elefante: require("../../assets/images/elefante.png"),
  escuela: require("../../assets/images/escuela.png"),
  familia: require("../../assets/images/familia.png"),
  fruta: require("../../assets/images/fruta.png"),
  gato: require("../../assets/images/gato.png"),
  guitarra: require("../../assets/images/guitarra.png"),
  hoja: require("../../assets/images/hoja.png"),
  helado: require("../../assets/images/helado.png"),
  iglesia: require("../../assets/images/iglesia.png"),
  isla: require("../../assets/images/isla.png"),
  jamon: require("../../assets/images/jamon.png"),
  jirafa: require("../../assets/images/jirafa.png"),
  kilo: require("../../assets/images/kilo.png"),
  kiwi: require("../../assets/images/kiwi.png"),
  luna: require("../../assets/images/luna.png"),
  libro: require("../../assets/images/libro.png"),
  mezquita: require("../../assets/images/mezquita.png"),
  manzana: require("../../assets/images/manzana.png"),
  nariz: require("../../assets/images/nariz.png"),
  nube: require("../../assets/images/nube.png"),
  lena: require("../../assets/images/lena.png"),
  oso: require("../../assets/images/oso.png"),
  oreja: require("../../assets/images/oreja.png"),
  perro: require("../../assets/images/perro.png"),
  pato: require("../../assets/images/pato.png"),
  queso: require("../../assets/images/queso.png"),
  quinto: require("../../assets/images/quinto.png"),
  raton: require("../../assets/images/raton.png"),
  rosa: require("../../assets/images/rosa.png"),
  sol: require("../../assets/images/sol.png"),
  silla: require("../../assets/images/silla.png"),
  taza: require("../../assets/images/taza.png"),
  tigre: require("../../assets/images/tigre.png"),
  uva: require("../../assets/images/uva.png"),
  universo: require("../../assets/images/universo.png"),
  vaca: require("../../assets/images/vaca.png"),
  ventana: require("../../assets/images/ventana.png"),
  wifi: require("../../assets/images/wifi.png"),
  xilofono: require("../../assets/images/xilofono.png"),
  yate: require("../../assets/images/yate.png"),
  yogur: require("../../assets/images/yogur.png"),
  zapato: require("../../assets/images/zapato.png"),
  zorro: require("../../assets/images/zorro.png"),
};

const allowedRoutes = [
  "/(tabs)/JuegosDeTareasScreen",
  "/(tabs)/VocabularioScreen",
  "/(tabs)/CarpetaCiudadanaScreen",
  "/(tabs)/AprendeGestionarPapelesScreen",
  "/(tabs)/VerbosScreen",
  "/(tabs)/CulturaGeneralScreen",
] as const;

export type RouteType = (typeof allowedRoutes)[number];

const menuButtons: { label: string; route: RouteType }[] = [
  { label: "Juegos de Tareas", route: "/(tabs)/JuegosDeTareasScreen" },
  { label: "Juego de Verbos", route: "/(tabs)/VerbosScreen" },
  {
    label: "Gestiones Administrativas",
    route: "/(tabs)/AprendeGestionarPapelesScreen",
  },
  { label: "Carpeta Ciudadana", route: "/(tabs)/CarpetaCiudadanaScreen" },
  { label: "Vocabulario Interactivo", route: "/(tabs)/VocabularioScreen" },
];

export default function IndiceScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <TouchableOpacity onPress={() => {
        // Volver al menú de unidades de A1
        router.replace('/A1_Acceso');
      }} style={{position: 'absolute', top: 32, left: 16, padding: 8, zIndex: 10, backgroundColor: '#fff', borderRadius: 8, borderWidth: 2, borderColor: '#d32f2f'}}>
        <Text style={{fontSize: 32, color: '#d32f2f', fontWeight: 'bold'}}>{'←'}</Text>
      </TouchableOpacity>
      <Text style={styles.titleSecundario}>Alfabeto español y árabe</Text>
      {alfabetos.map((item, idx) => {
        const imagenSource = imagenes[item.imagen];
        return (
          <Pressable
            key={item.letra + "-" + item.ejemplo + "-" + idx}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/LetraScreen",
                params: { letra: item.letra },
              })
            }
          >
            <Text style={styles.letra}>{item.letra}</Text>
            <Text style={styles.arabe}>{item.arabe}</Text>
            <Text style={styles.ejemplo}>
              {item.ejemplo} — <Text style={styles.traduccion}>{item.traduccion}</Text>
            </Text>
            {imagenSource && (
              <Image source={imagenSource} style={styles.imagen} resizeMode="contain" />
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export { alfabetos, imagenes };

const styles = StyleSheet.create({
  // Estilos para la sección CEFR
  cefrBox: {
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#90caf9',
    width: '95%',
    alignSelf: 'center',
    elevation: 2,
  },
  cefrTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
    textAlign: 'center',
  },
  cefrRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    width: '100%',
  },
  cefrLevelBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b3e5fc',
    elevation: 1,
  },
  cefrLevel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  cefrDesc: {
    fontSize: 14,
    color: '#388e3c',
    fontWeight: 'bold',
    marginTop: 2,
  },
  cefrNote: {
    fontSize: 13,
    color: '#1976d2',
    marginTop: 8,
    textAlign: 'center',
  },
  menuJuegos: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
    marginBottom: 20,
    backgroundColor: "#ffe082", // color de fondo amarillo para depuración
    borderWidth: 2,
    borderColor: "red",
    padding: 10,
  },
  botonJuego: {
    backgroundColor: "#1976d2",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  textoBotonJuego: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleSecundario: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  container: {
    paddingVertical: 24,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    width: "90%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  letra: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#d32f2f",
  },
  arabe: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 8,
  },
  ejemplo: {
    fontSize: 20,
    color: "#333",
  },
  traduccion: {
    fontSize: 20,
    color: "#388e3c",
    fontWeight: "bold",
  },
  imagen: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
});
