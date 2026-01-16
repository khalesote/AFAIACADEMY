import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import HumanBodyDiagram from "../components/HumanBodyDiagram";
import HouseDiagram from "../components/HouseDiagram";

// BottomNavBar eliminado en esta pantalla

import { useRouter } from "expo-router";
import * as Speech from 'expo-speech';

function speakEs(text: string) {
  try {
    const t = (text || '').trim();
    if (!t) return;
    Speech.stop();
    Speech.speak(t, { language: 'es-ES', rate: 0.98, pitch: 1.0 });
  } catch {}
}

function RowEsAr({ es, ar }: { es: string; ar: string }) {
  return (
    <View style={styles.rowEsAr}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 1 }}>
        <Text style={styles.bodyPart}><Text style={styles.bodyPartName}>{es}</Text> — {ar}</Text>
      </View>
      <TouchableOpacity accessibilityLabel={`Reproducir ${es}`} onPress={() => speakEs(es)} style={styles.audioBtn}>
        <Ionicons name="volume-high" size={20} color="#1976d2" />
      </TouchableOpacity>
    </View>
  );
}

export default function VocabularioScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.volverBtn}
          onPress={() => router.push('/(tabs)/A1_Acceso')}
        >
          <Text style={styles.volverBtnText}>⟵ Volver al Menú A1</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Vocabulario</Text>
        <Text style={styles.subtitle}>¡Bienvenido a la sección de vocabulario!</Text>

        {/* --- El cuerpo humano --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>El cuerpo humano</Text>
          <HumanBodyDiagram />
          <Text style={styles.subtitleSmall}>Partes principales y traducción al árabe</Text>
          <View style={styles.bodyList}>
            {[
              ['Cabeza','الرأس'], ['Ojo','عين'], ['Nariz','أنف'], ['Boca','فم'], ['Oreja','أذن'],
              ['Cuello','عنق'], ['Hombro','كتف'], ['Brazo','ذراع'], ['Mano','يد'], ['Dedo','إصبع'],
              ['Pecho','صدر'], ['Espalda','ظهر'], ['Pierna','ساق'], ['Rodilla','ركبة'], ['Pie','قدم'], ['Corazón','قلب'],
            ].map(([es, ar]) => (
              <RowEsAr key={es} es={es} ar={ar as string} />
            ))}
          </View>
        </View>

        {/* --- Partes de la casa --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Partes de la casa</Text>
          <HouseDiagram />
          <Text style={styles.subtitleSmall}>
            Habitaciones y partes principales con traducción al árabe
          </Text>
          <View style={styles.bodyList}>
            {[
              ['Tejado','سقف'], ['Ventana','نافذة'], ['Puerta','باب'], ['Salón','غرفة الجلوس'],
              ['Cocina','مطبخ'], ['Dormitorio','غرفة النوم'], ['Baño','حمام'],
            ].map(([es, ar]) => (
              <RowEsAr key={es} es={es} ar={ar as string} />
            ))}
          </View>
        </View>

        {/* --- Objetos por habitación --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>¿Qué se puede encontrar en cada parte de la casa?</Text>
          <View style={styles.bodyList}>
            <Text style={styles.bodyPartName}>Cocina</Text>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="table-furniture" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Mesa — طاولة</Text>
            </View>
            <View style={styles.iconRow}>
              <FontAwesome5 name="chair" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Silla — كرسي</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="fridge-outline" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Nevera — ثلاجة</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="stove" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Estufa — موقد</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="water-pump" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Fregadero — مغسلة</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Cubiertos — أدوات المائدة</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="cup" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Taza — كوب</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="pot-mix" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Olla — قدر</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="microwave" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Microondas — ميكروويف</Text>
            </View>

            <Text style={styles.bodyPartName}>Baño</Text>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="shower" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Ducha — دش</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="water-pump" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Lavabo — مغسلة</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="toilet" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Inodoro — مرحاض</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="square-outline" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Espejo — مرآة</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="hand-okay" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Toalla — منشفة</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="bottle-tonic" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Jabón — صابون</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="toothbrush-paste" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Cepillo de dientes — فرشاة أسنان</Text>
            </View>

            <Text style={styles.bodyPartName}>Dormitorio</Text>
            <View style={styles.iconRow}>
              <FontAwesome5 name="bed" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Cama — سرير</Text>
            </View>
            <View style={styles.iconRow}>
              <FontAwesome5 name="wardrobe" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Armario — خزانة</Text>
            </View>
            <View style={styles.iconRow}>
              <Feather name="sun" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Lámpara — مصباح</Text>
            </View>
            <View style={styles.iconRow}>
              <FontAwesome5 name="grip-lines" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Sábana — ملاءة</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="pill" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Almohada — وسادة</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="alarm" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Despertador — منبه</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="book-open-page-variant" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Libro — كتاب</Text>
            </View>

            <Text style={styles.bodyPartName}>Salón</Text>
            <View style={styles.iconRow}>
              <FontAwesome5 name="couch" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Sofá — أريكة</Text>
            </View>
            <View style={styles.iconRow}>
              <Entypo name="tv" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Televisor — تلفاز</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="rug" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Alfombra — سجادة</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="table-furniture" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Mesa de centro — طاولة قهوة</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="bookshelf" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Estantería — رف كتب</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="remote" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Mando — جهاز تحكم</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="clock" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Reloj — ساعة</Text>
            </View>

            <Text style={styles.bodyPartName}>Puerta</Text>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="doorbell-video" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Timbre — جرس الباب</Text>
            </View>
            <View style={styles.iconRow}>
              <FontAwesome5 name="lock" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Cerradura — قفل</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="key-variant" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Llave — مفتاح</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="key-variant" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Llave — مفتاح</Text>
            </View>

            <Text style={styles.bodyPartName}>Ventana</Text>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="window-closed" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Cortina — ستارة</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="leaf" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Planta — نبتة</Text>
            </View>
          </View>
          <View style={styles.iconRow}>
            <FontAwesome5 name="wardrobe" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Armario — خزانة</Text>
          </View>
          <View style={styles.iconRow}>
            <Feather name="sun" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Lámpara — مصباح</Text>
          </View>
          <View style={styles.iconRow}>
            <FontAwesome5 name="grip-lines" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Sábana — ملاءة</Text>
          </View>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="pill" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Almohada — وسادة</Text>
          </View>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="alarm" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Despertador — منبه</Text>
          </View>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="book-open-page-variant" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Libro — كتاب</Text>
          </View>

          <Text style={styles.bodyPartName}>Salón</Text>
          <View style={styles.iconRow}>
            <FontAwesome5 name="couch" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Sofá — أريكة</Text>
          </View>
          <View style={styles.iconRow}>
            <Entypo name="tv" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Televisor — تلفاز</Text>
          </View>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="rug" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Alfombra — سجادة</Text>
          </View>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="table-furniture" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Mesa de centro — طاولة قهوة</Text>
          </View>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="bookshelf" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Estantería — رف كتب</Text>
          </View>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="remote" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Mando — جهاز تحكم</Text>
          </View>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="clock" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Reloj — ساعة</Text>
          </View>

          <Text style={styles.bodyPartName}>Puerta</Text>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="doorbell-video" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Timbre — جرس الباب</Text>
          </View>
          <View style={styles.iconRow}>
            <FontAwesome5 name="lock" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Cerradura — قفل</Text>
          </View>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="key-variant" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Llave — مفتاح</Text>
          </View>

          <Text style={styles.bodyPartName}>Ventana</Text>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="window-closed" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Cortina — ستارة</Text>
          </View>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="leaf" size={20} color="#1976d2" />
            <Text style={styles.bodyPart}> Planta — نبتة</Text>
          </View>
        </View>

        {/* --- Estaciones del año --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Estaciones del año</Text>
          <View style={styles.bodyList}>
            <View style={styles.iconRow}>
              <Feather name="sun" size={22} color="#e67e22" />
              <Text style={styles.bodyPart}> Verano — الصيف</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Verano')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="snowflake" size={22} color="#3498db" />
              <Text style={styles.bodyPart}> Invierno — الشتاء</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Invierno')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="leaf" size={22} color="#27ae60" />
              <Text style={styles.bodyPart}> Primavera — الربيع</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Primavera')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="weather-windy" size={22} color="#b9770e" />
              <Text style={styles.bodyPart}> Otoño — الخريف</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Otoño')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- Días de la semana --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Días de la semana</Text>
          <View style={styles.bodyList}>
            <View style={styles.iconRow}>
              <Feather name="moon" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Lunes — الاثنين</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Lunes')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="calendar-check" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Martes — الثلاثاء</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Martes')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="calendar-edit" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Miércoles — الأربعاء</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Miércoles')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="calendar-clock" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Jueves — الخميس</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Jueves')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="calendar-star" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Viernes — الجمعة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Viernes')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="calendar-weekend" size={20} color="#1976d2" />
              <Text style={styles.bodyPart}> Sábado — السبت</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Sábado')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <Feather name="sun" size={20} color="#e67e22" />
              <Text style={styles.bodyPart}> Domingo — الأحد</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Domingo')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- Meses del año --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Meses del año</Text>
          <View style={styles.bodyList}>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="snowflake" size={20} color="#3498db" />
              <Text style={styles.bodyPart}> Enero — يناير</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Enero')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="heart" size={20} color="#e74c3c" />
              <Text style={styles.bodyPart}> Febrero — فبراير</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Febrero')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="leaf" size={20} color="#27ae60" />
              <Text style={styles.bodyPart}> Marzo — مارس</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Marzo')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="flower" size={20} color="#f1c40f" />
              <Text style={styles.bodyPart}> Abril — إبريل</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Abril')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="weather-sunny" size={20} color="#f7ca18" />
              <Text style={styles.bodyPart}> Mayo — مايو</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Mayo')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="guitar-acoustic" size={28} color="#2980b9" />
              <Text style={styles.bodyPart}> Junio — يونيو</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Junio')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="beach" size={20} color="#f5b041" />
              <Text style={styles.bodyPart}> Julio — يوليو</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Julio')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="weather-sunset" size={20} color="#e67e22" />
              <Text style={styles.bodyPart}> Agosto — أغسطس</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Agosto')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="school" size={20} color="#8e44ad" />
              <Text style={styles.bodyPart}> Septiembre — سبتمبر</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Septiembre')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="leaf-maple" size={20} color="#b9770e" />
              <Text style={styles.bodyPart}> Octubre — أكتوبر</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Octubre')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="cloud" size={20} color="#95a5a6" />
              <Text style={styles.bodyPart}> Noviembre — نوفمبر</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Noviembre')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="gift" size={20} color="#e74c3c" />
              <Text style={styles.bodyPart}> Diciembre — ديسمبر</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Diciembre')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* --- Colores --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Colores</Text>
          <View style={styles.bodyList}>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="circle" size={30} color="#e74c3c" />
              <Text style={styles.bodyPart}> Rojo — أحمر</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Rojo')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="circle" size={30} color="#2980b9" />
              <Text style={styles.bodyPart}> Azul — أزرق</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Azul')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="circle" size={30} color="#27ae60" />
              <Text style={styles.bodyPart}> Verde — أخضر</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Verde')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="circle" size={30} color="#f1c40f" />
              <Text style={styles.bodyPart}> Amarillo — أصفر</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Amarillo')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons
                name="circle"
                size={30}
                color="#fff"
                style={{ borderWidth: 1, borderColor: "#bbb" }}
              />
              <Text style={styles.bodyPart}> Blanco — أبيض</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Blanco')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="circle" size={30} color="#222" />
              <Text style={styles.bodyPart}> Negro — أسود</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Negro')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="circle" size={30} color="#a569bd" />
              <Text style={styles.bodyPart}> Morado — بنفسجي</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Morado')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="circle" size={30} color="#f39c12" />
              <Text style={styles.bodyPart}> Naranja — برتقالي</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="circle" size={30} color="#d35400" />
              <Text style={styles.bodyPart}> Marrón — بني</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="circle" size={30} color="#f5cba7" />
              <Text style={styles.bodyPart}> Beige — بيج</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="circle" size={30} color="#f8c471" />
              <Text style={styles.bodyPart}> Dorado — ذهبي</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="circle" size={30} color="#b2bec3" />
              <Text style={styles.bodyPart}> Gris — رمادي</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="circle" size={30} color="#fd79a8" />
              <Text style={styles.bodyPart}> Rosa — وردي</Text>
            </View>
          </View>
        </View>
        {/* --- Instrumentos musicales --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Instrumentos musicales</Text>
          <View style={styles.bodyList}>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="piano" size={28} color="#34495e" />
              <Text style={styles.bodyPart}> Piano — بيانو</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Piano')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="guitar-electric" size={28} color="#e67e22" />
              <Text style={styles.bodyPart}> Guitarra — غيتار</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Guitarra')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="violin" size={28} color="#8e44ad" />
              <Text style={styles.bodyPart}> Violín — كمان</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Violín')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="music-note" size={28} color="#2ecc71" />
              <Text style={styles.bodyPart}> Flauta — فلوت</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Flauta')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="trumpet" size={28} color="#d35400" />
              <Text style={styles.bodyPart}> Trompeta — بوق</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Trompeta')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="music" size={28} color="#b9770e" />
              <Text style={styles.bodyPart}> Batería — طبلة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Batería')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="saxophone" size={28} color="#f1c40f" />
              <Text style={styles.bodyPart}> Saxofón — ساكسفون</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Saxofón')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="piano" size={28} color="#27ae60" />
              <Text style={styles.bodyPart}> Acordeón — أكورديون</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Acordeón')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="guitar-acoustic" size={28} color="#2980b9" />
              <Text style={styles.bodyPart}> Arpa — قيثارة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Arpa')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="music-clef-treble" size={28} color="#c0392b" />
              <Text style={styles.bodyPart}> Clarinete — كلارينيت</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Clarinete')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- Números --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Números</Text>
          <View style={styles.bodyList}>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="numeric-0-circle" size={30} color="#1976d2" />
              <Text style={styles.bodyPart}> Cero — صفر</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Cero')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="numeric-1-circle" size={30} color="#1976d2" />
              <Text style={styles.bodyPart}> Uno — واحد</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Uno')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="numeric-2-circle" size={30} color="#1976d2" />
              <Text style={styles.bodyPart}> Dos — اثنان</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Dos')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="numeric-3-circle" size={30} color="#1976d2" />
              <Text style={styles.bodyPart}> Tres — ثلاثة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Tres')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="numeric-4-circle" size={30} color="#1976d2" />
              <Text style={styles.bodyPart}> Cuatro — أربعة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Cuatro')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="numeric-5-circle" size={30} color="#1976d2" />
              <Text style={styles.bodyPart}> Cinco — خمسة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Cinco')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="numeric-6-circle" size={30} color="#1976d2" />
              <Text style={styles.bodyPart}> Seis — ستة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Seis')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="numeric-7-circle" size={30} color="#1976d2" />
              <Text style={styles.bodyPart}> Siete — سبعة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Siete')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="numeric-8-circle" size={30} color="#1976d2" />
              <Text style={styles.bodyPart}> Ocho — ثمانية</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Ocho')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="numeric-9-circle" size={30} color="#1976d2" />
              <Text style={styles.bodyPart}> Nueve — تسعة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Nueve')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="numeric-10-circle" size={30} color="#1976d2" />
              <Text style={styles.bodyPart}> Diez — عشرة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Diez')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <Text
                style={{
                  fontSize: 32,
                  color: "#e67e22",
                  width: 42,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                11
              </Text>
              <Text style={styles.bodyPart}> Once — أحد عشر</Text>
            </View>
            <View style={styles.iconRow}>
              <Text
                style={{
                  fontSize: 32,
                  color: "#e67e22",
                  width: 42,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                12
              </Text>
              <Text style={styles.bodyPart}> Doce — اثنا عشر</Text>
            </View>
            <View style={styles.iconRow}>
              <Text
                style={{
                  fontSize: 32,
                  color: "#e67e22",
                  width: 42,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                13
              </Text>
              <Text style={styles.bodyPart}> Trece — ثلاثة عشر</Text>
            </View>
            <View style={styles.iconRow}>
              <Text
                style={{
                  fontSize: 32,
                  color: "#e67e22",
                  width: 42,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                14
              </Text>
              <Text style={styles.bodyPart}> Catorce — أربعة عشر</Text>
            </View>
            <View style={styles.iconRow}>
              <Text
                style={{
                  fontSize: 32,
                  color: "#e67e22",
                  width: 42,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                15
              </Text>
              <Text style={styles.bodyPart}> Quince — خمسة عشر</Text>
            </View>
            <View style={styles.iconRow}>
              <Text
                style={{
                  fontSize: 32,
                  color: "#e67e22",
                  width: 42,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                16
              </Text>
              <Text style={styles.bodyPart}> Dieciséis — ستة عشر</Text>
            </View>
            <View style={styles.iconRow}>
              <Text
                style={{
                  fontSize: 32,
                  color: "#e67e22",
                  width: 42,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                17
              </Text>
              <Text style={styles.bodyPart}> Diecisiete — سبعة عشر</Text>
            </View>
            <View style={styles.iconRow}>
              <Text
                style={{
                  fontSize: 32,
                  color: "#e67e22",
                  width: 42,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                18
              </Text>
              <Text style={styles.bodyPart}> Dieciocho — ثمانية عشر</Text>
            </View>
            <View style={styles.iconRow}>
              <Text
                style={{
                  fontSize: 32,
                  color: "#e67e22",
                  width: 42,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                19
              </Text>
              <Text style={styles.bodyPart}> Diecinueve — تسعة عشر</Text>
            </View>
            <View style={styles.iconRow}>
              <Text
                style={{
                  fontSize: 32,
                  color: "#e67e22",
                  width: 42,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                20
              </Text>
              <Text style={styles.bodyPart}> Veinte — عشرون</Text>
            </View>
          </View>
        </View>

        {/* --- Frutas --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Frutas</Text>
          <View style={styles.bodyList}>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="apple" size={34} color="#e74c3c" />
              <Text style={styles.bodyPart}> Manzana — تفاح</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Manzana')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="fruit-citrus" size={34} color="#229954" />
              <Text style={styles.bodyPart}> Pera — كمثرى</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Pera')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="fruit-citrus" size={34} color="#f1c40f" />
              <Text style={styles.bodyPart}> Naranja — برتقال</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Naranja')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="fruit-watermelon" size={34} color="#e74c3c" />
              <Text style={styles.bodyPart}> Sandía — بطيخ</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Sandía')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="fruit-grapes" size={34} color="#8e44ad" />
              <Text style={styles.bodyPart}> Uva — عنب</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Uva')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="fruit-pineapple" size={34} color="#f7ca18" />
              <Text style={styles.bodyPart}> Piña — أناناس</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Piña')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="food-apple-outline" size={34} color="#fd79a8" />
              <Text style={styles.bodyPart}> Melocotón — خوخ</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Melocotón')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="fruit-cherries" size={34} color="#c0392b" />
              <Text style={styles.bodyPart}> Cereza — كرز</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Cereza')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="fruit-citrus" size={34} color="#f39c12" />
              <Text style={styles.bodyPart}> Limón — ليمون</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Limón')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="fruit-cherries" size={34} color="#c0392b" />
              <Text style={styles.bodyPart}> Granada — رمان</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Granada')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="fruit-pineapple" size={34} color="#229954" />
              <Text style={styles.bodyPart}> Plátano — موز</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Plátano')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- Animales --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Animales</Text>
          <View style={styles.bodyList}>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="dog" size={34} color="#b9770e" />
              <Text style={styles.bodyPart}> Perro — كلب</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Perro')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="cat" size={34} color="#8e44ad" />
              <Text style={styles.bodyPart}> Gato — قط</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Gato')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>

            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="fish" size={34} color="#2980b9" />
              <Text style={styles.bodyPart}> Pez — سمك</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Pez')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="bird" size={34} color="#f7ca18" />
              <Text style={styles.bodyPart}> Pájaro — طائر</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Pájaro')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="turtle" size={34} color="#27ae60" />
              <Text style={styles.bodyPart}> Tortuga — سلحفاة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Tortuga')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="paw" size={34} color="#b9770e" />
              <Text style={styles.bodyPart}> León — أسد</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('León')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="paw" size={34} color="#b9770e" />
              <Text style={styles.bodyPart}> Tigre — نمر</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Tigre')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- Familia --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Miembros de la familia</Text>
          <View style={styles.bodyList}>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="account" size={34} color="#2980b9" />
              <Text style={styles.bodyPart}> Padre — أب</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Padre')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="account-outline" size={34} color="#e67e22" />
              <Text style={styles.bodyPart}> Madre — أم</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Madre')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="human-male-child" size={34} color="#fd79a8" />
              <Text style={styles.bodyPart}> Hija — ابنة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Hija')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="account-multiple" size={34} color="#8e44ad" />
              <Text style={styles.bodyPart}> Hermano — أخ</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Hermano')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="account-multiple-outline" size={34} color="#f1c40f" />
              <Text style={styles.bodyPart}> Hermana — أخت</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Hermana')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="human-male" size={34} color="#b9770e" />
              <Text style={styles.bodyPart}> Abuelo — جد</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Abuelo')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="human-female" size={34} color="#b2bec3" />
              <Text style={styles.bodyPart}> Abuela — جدة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Abuela')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>

            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="face-woman" size={34} color="#f1948a" />
              <Text style={styles.bodyPart}> Prima — ابنة عمة / ابنة خالة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Prima')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="human-male-child" size={34} color="#f5b041" />
              <Text style={styles.bodyPart}> Nieto — حفيد</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Nieto')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="human-male-child" size={34} color="#aed6f1" />
              <Text style={styles.bodyPart}> Nieta — حفيدة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Nieta')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="account-tie" size={34} color="#34495e" />
              <Text style={styles.bodyPart}> Suegro — حمو</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Suegro')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="account-tie-hat" size={34} color="#f7cac9" />
              <Text style={styles.bodyPart}> Suegra — حماة</Text>
              <TouchableOpacity style={styles.audioBtn} onPress={() => speakEs('Suegra')}>
                <Ionicons name="volume-high" size={18} color="#1976d2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- Estaciones del año --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Estaciones del año</Text>
          <View style={styles.bodyList}>
            <View style={styles.rowEsAr}>
              <Text style={styles.bodyPart}> Primavera — ربيع</Text>
              <TouchableOpacity style={styles.audioBtn}>
                <MaterialCommunityIcons name="volume-high" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.rowEsAr}>
              <Text style={styles.bodyPart}> Verano — صيف</Text>
              <TouchableOpacity style={styles.audioBtn}>
                <MaterialCommunityIcons name="volume-high" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.rowEsAr}>
              <Text style={styles.bodyPart}> Otoño — خريف</Text>
              <TouchableOpacity style={styles.audioBtn}>
                <MaterialCommunityIcons name="volume-high" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.rowEsAr}>
              <Text style={styles.bodyPart}> Invierno — شتاء</Text>
              <TouchableOpacity style={styles.audioBtn}>
                <MaterialCommunityIcons name="volume-high" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- Instrumentos musicales --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Instrumentos musicales</Text>
          <View style={styles.bodyList}>
            <View style={styles.rowEsAr}>
              <Text style={styles.bodyPart}> Guitarra — قيثارة</Text>
              <TouchableOpacity style={styles.audioBtn}>
                <MaterialCommunityIcons name="volume-high" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.rowEsAr}>
              <Text style={styles.bodyPart}> Piano — بيانو</Text>
              <TouchableOpacity style={styles.audioBtn}>
                <MaterialCommunityIcons name="volume-high" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.rowEsAr}>
              <Text style={styles.bodyPart}> Violín — كمان</Text>
              <TouchableOpacity style={styles.audioBtn}>
                <MaterialCommunityIcons name="volume-high" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.rowEsAr}>
              <Text style={styles.bodyPart}> Batería — طبول</Text>
              <TouchableOpacity style={styles.audioBtn}>
                <MaterialCommunityIcons name="volume-high" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rowEsAr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  audioBtn: {
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 14,
    backgroundColor: '#e8f4ff',
  },
  volverBtn: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginBottom: 16,
    marginTop: 36,
    alignSelf: "flex-start",
    shadowColor: "#0003",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
  },
  volverBtnText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
    textAlign: "center",
  },
  container: {
    backgroundColor: "#f2f6fc",
    alignItems: "stretch",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 7,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1a237e",
    letterSpacing: 0.5,
    textAlign: "left",
  },
  bodyList: {
    marginBottom: 0,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 2,
  },
  bodyPart: {
    fontSize: 19,
    color: "#263238",
    marginLeft: 16,
    flexShrink: 1,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  bodyPartName: {
    fontWeight: "bold",
    color: "#8e44ad",
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#512da8",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 18,
  },
  subtitleSmall: {
    fontSize: 15,
    color: "#555",
    textAlign: "left",
    marginBottom: 8,
  },
});
