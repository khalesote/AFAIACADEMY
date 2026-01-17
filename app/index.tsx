import React, { useRef, useEffect, useState } from 'react';
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated, PanResponder, View as RNView, StyleSheet as RNStyleSheet, Platform, Alert } from 'react-native';
// REMOVED: import LottieView from 'lottie-react-native'; // Not used in this component
import { userDB, userStorage, User, UserProgress, getFullName } from '../utils/userDatabase';
import { fetchLatestNews, NewsItem } from '../services/newsService';
import { initializeB1Progress, syncA1A2FromLegacy } from '../utils/unitProgress';
import { testAsyncStorage } from '../utils/asyncStorageTest';
import { useUser } from '../contexts/UserContext';

// Variables de texto
const TITLE_ES = "Academia de Inmigrantes";
const AUTHOR_ES = "Antonio de Nebrija";
const AUTHOR_AR = "أنطونيو دي نبريخا";

import {
  Text,
  Linking,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
  ImageBackground,
  ActivityIndicator,
  Dimensions
} from "react-native";

import MaskedView from '@react-native-masked-view/masked-view';
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function HomeScreenContent() {
  const videoRef = useRef<any>(null);
  // Ticker de frases de propaganda (scroll automático y ligero)
  const promoTickerRef = useRef<ScrollView>(null);
  const promoScrollPosRef = useRef<number>(0);
  const [promoContentWidth, setPromoContentWidth] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  const newsScrollRef = useRef<ScrollView>(null);
  const newsScrollPosition = useRef(0);
  const [newsContentWidth, setNewsContentWidth] = useState(0);
  
  // Scroll automático para horarios de oración
  const prayerTimesScrollRef = useRef<ScrollView>(null);
  const prayerTimesScrollPosition = useRef(0);
  const [prayerTimesContentWidth, setPrayerTimesContentWidth] = useState(0);
  const [prayerTimesByProvince, setPrayerTimesByProvince] = useState<Array<{
    province: string;
    prayers: Array<{nameAr: string, time: string}>;
  }>>([]);
  const [prayerTimesLoading, setPrayerTimesLoading] = useState(true);

  // Obtener estado de autenticación desde UserContext
  const { user, firebaseUser, isAuthenticated, loading: userLoading } = useUser();

  // Mapeo de provincias a coordenadas (lat, lon)
  const PROVINCE_COORDINATES: Record<string, { lat: number; lon: number }> = {
    'Álava': { lat: 42.8467, lon: -2.6716 },
    'Albacete': { lat: 38.9942, lon: -1.8564 },
    'Alicante': { lat: 38.3452, lon: -0.4810 },
    'Almería': { lat: 36.8381, lon: -2.4597 },
    'Asturias': { lat: 43.3619, lon: -5.8494 },
    'Ávila': { lat: 40.6564, lon: -4.6944 },
    'Badajoz': { lat: 38.8786, lon: -6.9706 },
    'Barcelona': { lat: 41.3851, lon: 2.1734 },
    'Burgos': { lat: 42.3439, lon: -3.6969 },
    'Cáceres': { lat: 39.4753, lon: -6.3724 },
    'Cádiz': { lat: 36.5270, lon: -6.2886 },
    'Cantabria': { lat: 43.4623, lon: -3.8099 },
    'Castellón': { lat: 39.9864, lon: -0.0513 },
    'Ciudad Real': { lat: 38.9863, lon: -3.9293 },
    'Córdoba': { lat: 37.8882, lon: -4.7794 },
    'La Coruña': { lat: 43.3623, lon: -8.4115 },
    'Cuenca': { lat: 40.0718, lon: -2.1340 },
    'Gerona': { lat: 41.9794, lon: 2.8214 },
    'Granada': { lat: 37.1773, lon: -3.5986 },
    'Guadalajara': { lat: 40.6286, lon: -3.1618 },
    'Guipúzcoa': { lat: 43.3183, lon: -1.9812 },
    'Huelva': { lat: 37.2614, lon: -6.9447 },
    'Huesca': { lat: 42.1361, lon: -0.4087 },
    'Islas Baleares': { lat: 39.5696, lon: 2.6502 },
    'Jaén': { lat: 37.7796, lon: -3.7849 },
    'León': { lat: 42.5987, lon: -5.5671 },
    'Lérida': { lat: 41.6176, lon: 0.6200 },
    'Lugo': { lat: 43.0097, lon: -7.5568 },
    'Madrid': { lat: 40.4168, lon: -3.7038 },
    'Málaga': { lat: 36.7213, lon: -4.4214 },
    'Murcia': { lat: 37.9922, lon: -1.1307 },
    'Navarra': { lat: 42.8125, lon: -1.6458 },
    'Orense': { lat: 42.3360, lon: -7.8642 },
    'Palencia': { lat: 42.0096, lon: -4.5240 },
    'Las Palmas': { lat: 28.1248, lon: -15.4300 },
    'Pontevedra': { lat: 42.4336, lon: -8.6480 },
    'La Rioja': { lat: 42.4650, lon: -2.4456 },
    'Salamanca': { lat: 40.9701, lon: -5.6635 },
    'Segovia': { lat: 40.9429, lon: -4.1088 },
    'Sevilla': { lat: 37.3891, lon: -5.9845 },
    'Soria': { lat: 41.7640, lon: -2.4688 },
    'Tarragona': { lat: 41.1189, lon: 1.2445 },
    'Santa Cruz de Tenerife': { lat: 28.4636, lon: -16.2518 },
    'Teruel': { lat: 40.3440, lon: -1.1069 },
    'Toledo': { lat: 39.8628, lon: -4.0273 },
    'Valencia': { lat: 39.4699, lon: -0.3763 },
    'Valladolid': { lat: 41.6523, lon: -4.7245 },
    'Vizcaya': { lat: 43.2627, lon: -2.9253 },
    'Zamora': { lat: 41.5036, lon: -5.7438 },
    'Zaragoza': { lat: 41.6488, lon: -0.8891 },
  };

  // Función para ejecutar la acción del menú - VERIFICAR AUTENTICACIÓN
  const handleMenuPress = async (originalAction: () => void) => {
    console.log('🔍 handleMenuPress llamado:', {
      isAuthenticated,
      userLoading,
      firebaseUser: !!firebaseUser,
      userEmail: firebaseUser?.email
    });
    
    // Verificar si el usuario está autenticado
    if (!isAuthenticated && !userLoading) {
      console.log('❌ Usuario no autenticado, mostrando alerta');
      Alert.alert(
        '🔐 Autenticación Requerida',
        'Debes registrarte o iniciar sesión para acceder a esta función.',
        [
          {
            text: 'Registrarse',
            onPress: () => router.push('/RegisterScreen'),
            style: 'default',
          },
          {
            text: 'Iniciar Sesión',
            onPress: () => router.push('/LoginScreen'),
            style: 'default',
          },
          {
            text: 'Cancelar',
            style: 'cancel',
          },
        ]
      );
      return;
    }
    
    console.log('✅ Usuario autenticado, ejecutando acción');
    // Si está autenticado, ejecutar la acción
    originalAction();
  }

  const [showStarVideo, setShowStarVideo] = useState(false);
  const [showFoneticaModal, setShowFoneticaModal] = useState(false);

  const router = useRouter();
  
  // Auto-scroll continuo de frases (ticker). Español y su traducción al árabe por separado.
  const promoPhrasesEs = [
    '🎓 Aprende español paso a paso',
    '📚 Recursos y Biblioteca Digital',
    '🎯 Progreso por niveles A1 → A2 → B1 → B2',
    '🔥 Descuento de matrícula 50% por tiempo limitado',
    '📝 Exámenes finales y diplomas',
    '📄 Modelos oficiales de extranjería - Ministerio del Interior',
    '🏢 Localiza oficinas para trámites de inmigración',
    '📋 Impresos descargables para todos los trámites',
  ];
  const promoPhrasesAr = [
    '🎓 تعلّم الإسبانية خطوة بخطوة',
    '📚 موارد ومكتبة رقمية',
    '🎯 التقدّم حسب المستويات A1 → A2 → B1 → B2',
    '🔥 خصم 50% على التسجيل لفترة محدودة',
    '📝 امتحانات نهائية وشهادات',
    '📄 نماذج رسمية لشؤون الأجانب - وزارة الداخلية',
    '🏢 حدد موقع المكاتب لإجراءات الهجرة',
    '📋 طلبات قابلة للتحميل لجميع الإجراءات',
  ];
  const promoPhrases = [...promoPhrasesEs, ...promoPhrasesAr];

  useEffect(() => {
    const stepPx = 1; // velocidad del ticker (px por frame)
    const intervalMs = 16; // ~60fps
    const timer = setInterval(() => {
      if (!promoTickerRef.current || promoContentWidth <= 0) return;
      promoScrollPosRef.current += stepPx;
      // Reiniciar cuando hemos recorrido la mitad (porque duplicamos el contenido)
      const loopWidth = promoContentWidth / 2;
      if (promoScrollPosRef.current >= loopWidth) {
        promoScrollPosRef.current = 0;
      }
      promoTickerRef.current.scrollTo({ x: promoScrollPosRef.current, animated: false });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [promoContentWidth]);

  // Inicializar progreso unificado y sincronizar claves legacy (una vez al arrancar)
  useEffect(() => {
    (async () => {
      try {
        // Test AsyncStorage first
        console.log('🚀 Iniciando test de AsyncStorage...');
        const asyncStorageWorking = await testAsyncStorage();
        if (!asyncStorageWorking) {
          console.error('❌ AsyncStorage no está funcionando correctamente');
          // You could show an alert or handle this error
        } else {
          console.log('✅ AsyncStorage funcionando correctamente');
        }
        
        await initializeB1Progress();
        await syncA1A2FromLegacy();
      } catch (e) {
        console.warn('No se pudo inicializar/sincronizar progreso:', e);
      }
    })();
  }, []);

  // Cargar usuario actual y verificar permisos de administrador
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await userStorage.getCurrentUser();
        setCurrentUser(user);

        // Verificar si el usuario es el administrador específico
        if (user?.email) {
          const adminStatus = user.email === 'admin@academiadeinmigrantes.es';
          setIsAdmin(adminStatus);
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadNews = async () => {
      try {
        setNewsLoading(true);
        setNewsError(null);
        const data = await fetchLatestNews(6);
        if (isMounted) {
          setNewsItems(data);
        }
      } catch (error) {
        console.error('Error cargando noticias:', error);
        if (isMounted) {
          setNewsError('No se pudieron cargar las noticias.');
          setNewsItems([]);
        }
      } finally {
        if (isMounted) {
          setNewsLoading(false);
        }
      }
    };
    loadNews();
    return () => {
      isMounted = false;
    };
  }, []);

  // Cargar horarios de oración para todas las provincias
  useEffect(() => {
    let isMounted = true;
    const loadPrayerTimes = async () => {
      try {
        console.log('🕌 Iniciando carga de horarios de oración...');
        setPrayerTimesLoading(true);
        
        // No usar fecha específica, la API devolverá la fecha actual automáticamente
        console.log('📅 Usando fecha actual de la API');
        
        // Lista de provincias principales (usando nombres exactos del mapeo)
        const provinces = [
          'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Málaga', 
          'Vizcaya', 'Zaragoza', 'Murcia', 'Islas Baleares', 'Las Palmas',
          'Santa Cruz de Tenerife', 'Córdoba', 'Valladolid', 'Alicante', 'Pontevedra'
        ];
        
        console.log('📍 Provincias a cargar:', provinces.length);
        
        const prayerTimesData: Array<{province: string; prayers: Array<{nameAr: string, time: string}>}> = [];
        
        // Cargar horarios para cada provincia secuencialmente con delay para evitar rate limiting
        const results: Array<{province: string; prayers: Array<{nameAr: string, time: string}>} | null> = [];
        
        for (let i = 0; i < provinces.length; i++) {
          const province = provinces[i];
          try {
            const coordinates = PROVINCE_COORDINATES[province];
            if (!coordinates) {
              console.warn(`⚠️ No se encontraron coordenadas para ${province}`);
              results.push(null);
              continue;
            }
            
            console.log(`🔄 Cargando ${province} (${i + 1}/${provinces.length})...`);
            // Usar endpoint sin fecha para obtener la fecha actual automáticamente
            const url = `https://api.aladhan.com/v1/timings?latitude=${coordinates.lat}&longitude=${coordinates.lon}&method=2`;
            console.log(`🔗 URL: ${url}`);
            
            const response = await fetch(url, { 
              method: 'GET',
              headers: { 'Accept': 'application/json' }
            });
            
            console.log(`📡 Respuesta para ${province}:`, response.status, response.statusText);
            
            if (!response.ok) {
              const errorText = await response.text().catch(() => 'No se pudo leer el error');
              console.warn(`❌ Error HTTP para ${province}: ${response.status} - ${errorText.substring(0, 100)}`);
              results.push(null);
              continue;
            }
            
            const data = await response.json();
            const timings = data.data?.timings;
            
            if (timings) {
              const prayers = [
                { nameAr: 'الفجر', time: timings.Fajr?.substring(0, 5) || '05:30' },
                { nameAr: 'الظهر', time: timings.Dhuhr?.substring(0, 5) || '13:00' },
                { nameAr: 'العصر', time: timings.Asr?.substring(0, 5) || '16:30' },
                { nameAr: 'المغرب', time: timings.Maghrib?.substring(0, 5) || '19:00' },
                { nameAr: 'العشاء', time: timings.Isha?.substring(0, 5) || '20:30' },
              ];
              console.log(`✅ ${province} cargada correctamente`);
              results.push({ province, prayers });
            } else {
              console.warn(`⚠️ No se encontraron timings para ${province}`);
              results.push(null);
            }
            
            // Pequeño delay entre peticiones para evitar rate limiting (excepto en la última)
            if (i < provinces.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 200));
            }
          } catch (error) {
            console.error(`❌ Error cargando horarios para ${province}:`, error);
            results.push(null);
          }
        }
        console.log('📊 Resultados recibidos:', results.length);
        
        results.forEach(result => {
          if (result) {
            prayerTimesData.push(result);
          }
        });
        
        console.log('✅ Provincias cargadas exitosamente:', prayerTimesData.length);
        console.log('📍 Provincias:', prayerTimesData.map(p => p.province).join(', '));
        
        if (isMounted) {
          // Si no se cargaron datos, usar datos por defecto
          if (prayerTimesData.length === 0) {
            console.warn('⚠️ No se cargaron provincias, usando Madrid por defecto');
            setPrayerTimesByProvince([
              {
                province: 'Madrid',
                prayers: [
                  { nameAr: 'الفجر', time: '05:30' },
                  { nameAr: 'الظهر', time: '13:00' },
                  { nameAr: 'العصر', time: '16:30' },
                  { nameAr: 'المغرب', time: '19:00' },
                  { nameAr: 'العشاء', time: '20:30' },
                ]
              }
            ]);
          } else {
            console.log('✅ Estableciendo provincias en el estado');
            setPrayerTimesByProvince(prayerTimesData);
          }
        }
      } catch (error) {
        console.error('❌ Error cargando horarios de oración:', error);
        // En caso de error, usar horarios por defecto
        if (isMounted) {
          setPrayerTimesByProvince([
            {
              province: 'Madrid',
              prayers: [
                { nameAr: 'الفجر', time: '05:30' },
                { nameAr: 'الظهر', time: '13:00' },
                { nameAr: 'العصر', time: '16:30' },
                { nameAr: 'المغرب', time: '19:00' },
                { nameAr: 'العشاء', time: '20:30' },
              ]
            }
          ]);
        }
      } finally {
        if (isMounted) {
          setPrayerTimesLoading(false);
        }
      }
    };
    
    loadPrayerTimes();
    
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!newsScrollRef.current || newsItems.length <= 1) {
      return undefined;
    }

    const stepPx = 1;
    const intervalMs = 24;
    const totalWidth = newsContentWidth;

    const intervalId = setInterval(() => {
      if (!newsScrollRef.current) {
        return;
      }

      newsScrollPosition.current += stepPx;
      if (newsScrollPosition.current >= totalWidth) {
        newsScrollPosition.current = 0;
      }

      newsScrollRef.current.scrollTo({
        x: newsScrollPosition.current,
        animated: false,
      });
    }, intervalMs);

    return () => {
      clearInterval(intervalId);
    };
  }, [newsItems.length, newsContentWidth]);

  // Scroll automático para horarios de oración
  useEffect(() => {
    if (!prayerTimesScrollRef.current || prayerTimesContentWidth <= 0 || prayerTimesByProvince.length === 0) {
      return undefined;
    }

    // El contenido está duplicado; usar la mitad del ancho para un loop suave.
    const totalWidth = Math.max(prayerTimesContentWidth / 2, 1);
    prayerTimesScrollPosition.current = 0;

    const stepPx = 1;
    const intervalMs = 20; // Velocidad del scroll

    const intervalId = setInterval(() => {
      if (!prayerTimesScrollRef.current) {
        return;
      }

      prayerTimesScrollPosition.current += stepPx;
      if (prayerTimesScrollPosition.current >= totalWidth) {
        prayerTimesScrollPosition.current = 0;
      }

      prayerTimesScrollRef.current.scrollTo({
        x: prayerTimesScrollPosition.current,
        animated: false,
      });
    }, intervalMs);

    return () => {
      clearInterval(intervalId);
    };
  }, [prayerTimesContentWidth, prayerTimesByProvince.length]);

  const newsTickerContent = newsItems
    .map((item) => `${item.source}: ${item.title}`)
    .join('   •   ');

  return (
    <View style={styles.container}>
      {/* Header Dashboard */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>¡Bienvenido!</Text>
            <Text style={styles.welcomeTextAr}>مرحباً!</Text>
          </View>
          <View style={styles.profileSection}>
            {isAuthenticated && firebaseUser ? (
              // Usuario autenticado: mostrar nombre (usar perfil original)
              <TouchableOpacity
                style={styles.profileDisplay}
                onPress={() => router.push("/UserProfileScreen")}
              >
                <Ionicons name="person-circle" size={20} color="#007AFF" />
                <Text style={styles.userNameText}>
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : firebaseUser.displayName || user?.email || firebaseUser.email || 'Usuario'}
                </Text>
              </TouchableOpacity>
            ) : (
              // Usuario NO autenticado: mostrar botón de registro
              <TouchableOpacity
                style={styles.registerButtonHeader}
                onPress={() => router.push('/RegisterScreen')}
              >
                <Ionicons name="person-add" size={18} color="#FFD700" />
                <Text style={styles.registerButtonText}>Regístrate</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Ticker de frases (auto-scroll, compacto) */}
        <View style={styles.tickerSection}>
          <ScrollView
            ref={promoTickerRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            onContentSizeChange={(w) => setPromoContentWidth(w)}
          >
            {/* Duplicamos el contenido para que el bucle sea suave */}
            <View style={styles.tickerInner}>
              {promoPhrases.map((p, idx) => {
                const isArabic = idx >= promoPhrasesEs.length;
                return (
                  <TouchableOpacity
                    key={`t1-${idx}`}
                    onPress={() => {
                      // Enlaces rápidos opcionales según la frase (aplican a ES y AR)
                      if (p.includes('A1')) router.push('/(tabs)/A1_Acceso');
                      else if (p.includes('B2')) router.push('/(tabs)/B2_Avanzado');
                      else if (p.includes('Ministerio') || p.includes('oficinas') || p.includes('Impresos') || p.includes('نماذج') || p.includes('مكاتب') || p.includes('قابلة')) {
                        router.push('/(tabs)/NoticiasInmigracionScreen');
                      }
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tickerText,
                        ...(isArabic ? styles.tickerTextAr : {}),
                      }}
                    >
                      {p}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {promoPhrases.map((p, idx) => {
                const isArabic = idx >= promoPhrasesEs.length;
                return (
                  <TouchableOpacity
                    key={`t2-${idx}`}
                    onPress={() => {
                      if (p.includes('A1')) router.push('/(tabs)/A1_Acceso');
                      else if (p.includes('B2')) router.push('/(tabs)/B2_Avanzado');
                      else if (p.includes('Ministerio') || p.includes('oficinas') || p.includes('Impresos') || p.includes('نماذج') || p.includes('مكاتب') || p.includes('قابلة')) {
                        router.push('/(tabs)/NoticiasInmigracionScreen');
                      }
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tickerText,
                        ...(isArabic ? styles.tickerTextAr : {}),
                      }}
                    >
                      {p}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Horarios de Oración - Scroll automático */}
        <View style={styles.prayerTimesSection}>
          {prayerTimesLoading ? (
            <View style={styles.prayerTimesLoading}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          ) : (
            <ScrollView
              ref={prayerTimesScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={styles.prayerTimesScrollContent}
              onContentSizeChange={(w) => setPrayerTimesContentWidth(w)}
            >
              <View style={styles.prayerTimesInner}>
                {(() => {
                  console.log('🎨 Renderizando provincias:', prayerTimesByProvince.length);
                  return null;
                })()}
                {/* Duplicamos el contenido para scroll continuo */}
                {prayerTimesByProvince.length > 0 ? (
                  <>
                    {prayerTimesByProvince.map((provinceData, provinceIdx) => (
                      <View key={`province-${provinceIdx}`} style={styles.provinceContainer}>
                        <Text style={styles.provinceName}>{provinceData.province}</Text>
                        <Text style={styles.provinceArrow}>→</Text>
                        {provinceData.prayers.map((prayer, prayerIdx) => (
                          <View key={`prayer-${provinceIdx}-${prayerIdx}`} style={styles.prayerTimeItem}>
                            <Text style={styles.prayerTimeValue}>{prayer.time}</Text>
                            <Text style={styles.prayerTimeSeparator}> : </Text>
                            <Text style={styles.prayerTimeNameAr}>{prayer.nameAr}</Text>
                          </View>
                        ))}
                      </View>
                    ))}
                    {/* Duplicamos para scroll continuo */}
                    {prayerTimesByProvince.map((provinceData, provinceIdx) => (
                      <View key={`province-dup-${provinceIdx}`} style={styles.provinceContainer}>
                        <Text style={styles.provinceName}>{provinceData.province}</Text>
                        <Text style={styles.provinceArrow}>→</Text>
                        {provinceData.prayers.map((prayer, prayerIdx) => (
                          <View key={`prayer-dup-${provinceIdx}-${prayerIdx}`} style={styles.prayerTimeItem}>
                            <Text style={styles.prayerTimeValue}>{prayer.time}</Text>
                            <Text style={styles.prayerTimeSeparator}> : </Text>
                            <Text style={styles.prayerTimeNameAr}>{prayer.nameAr}</Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </>
                ) : (
                  <Text style={styles.provinceName}>Cargando provincias...</Text>
                )}
              </View>
            </ScrollView>
          )}
        </View>

        <View style={styles.newsSection}>
          <Text style={styles.newsSectionTitle}>Noticias</Text>
          <ScrollView
            ref={newsScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newsScrollContent}
            onContentSizeChange={(w) => setNewsContentWidth(w)}
          >
            {newsLoading ? (
              <View style={styles.newsFallback}>
                <ActivityIndicator size="small" color="#000" />
              </View>
            ) : newsError ? (
              <View style={styles.newsFallback}>
                <Text style={styles.newsFallbackText}>{newsError}</Text>
              </View>
            ) : newsItems.length === 0 ? (
              <View style={styles.newsFallback}>
                <Text style={styles.newsFallbackText}>Sin noticias disponibles.</Text>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push('/(tabs)/NoticiasInmigracionScreen')}
                style={styles.newsTickerTouchable}
              >
                <Text style={styles.newsTickerText}>{newsTickerContent}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>

      {/* Mostrar loading mientras se carga el usuario */}
      {loading ? (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
          <ActivityIndicator size="large" color="#9DC3AA" />
          <Text style={{ marginTop: 16, color: '#666' }}>Cargando...</Text>
        </View>
      ) : (
        <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Logo Principal */}
        <View style={styles.mainLogoContainer}>
          <Image
            source={require('../assets/images/logo.jpg')}
            style={styles.mainLogo}
            resizeMode="contain"
          />
          <Text style={styles.arabicText}>
            مدرستك لتعلم الإسبانية. نساعدك على تعلم اللغة الإسبانية والاندماج في المجتمع الإسباني والحصول على شهادة من أكاديميتنا
          </Text>
        </View>

        {/* Escuela Virtual - Botón Principal */}
        <View style={styles.mainSchoolSection}>
          <TouchableOpacity
            style={styles.mainSchoolButton}
            onPress={() => handleMenuPress(() => router.replace("/SchoolScreen"))}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1a1a1a', '#000000']}
              style={styles.mainSchoolButtonGradient}
            >
              <View style={styles.mainSchoolContent}>
                <View style={styles.mainSchoolIconContainer}>
                  <Ionicons name="school" size={48} color="#FFD700" />
                </View>
                <View style={styles.mainSchoolTextContainer}>
                  <Text style={[styles.mainSchoolTitle, {color: '#FFD700'}]}>Tu Escuela Virtual de Español</Text>
                  <Text style={[styles.mainSchoolTitleAr, {color: '#FFD700'}]}>مدرستك الافتراضية للإسبانية</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Formación Profesional - Botón Principal */}
        <View style={[styles.mainSchoolSection, {marginTop: 10}]}>
          <TouchableOpacity
            style={styles.mainSchoolButton}
            onPress={() => handleMenuPress(() => router.push("/PreFormacionScreen"))}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1a1a1a', '#000000']}
              style={styles.mainSchoolButtonGradient}
            >
              <View style={styles.mainSchoolContent}>
                <View style={styles.mainSchoolIconContainer}>
                  <Ionicons name="briefcase" size={40} color="#FFD700" />
                </View>
                <View style={styles.mainSchoolTextContainer}>
                  <Text style={[styles.mainSchoolTitle, {marginTop: 30, color: '#FFD700'}]}>Tu Centro de Preformación</Text>
                  <Text style={[styles.mainSchoolTitleAr, {color: '#FFD700'}]}>مركزك للتدريب المسبق</Text>
                  <Text style={[styles.mainSchoolSubtitle, {color: '#FFD700'}]}>Cursos profesionales</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Alfabetización - Botón Principal */}
        <View style={[styles.mainSchoolSection, {marginTop: 10}]}>
          <TouchableOpacity
            style={styles.mainSchoolButton}
            onPress={() => handleMenuPress(() => router.push("/(tabs)/AlfabetizacionScreen"))}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1a1a1a', '#000000']}
              style={styles.mainSchoolButtonGradient}
            >
              <View style={styles.mainSchoolContent}>
                <View style={styles.mainSchoolIconContainer}>
                  <Ionicons name="school" size={40} color="#FFD700" />
                </View>
                <View style={styles.mainSchoolTextContainer}>
                  <Text style={[styles.mainSchoolTitle, {marginTop: 30, color: '#FFD700'}]}>Alfabetización</Text>
                  <Text style={[styles.mainSchoolTitleAr, {color: '#FFD700'}]}>محو الأمية</Text>
                  <Text style={[styles.mainSchoolSubtitle, {color: '#FFD700'}]}>Leer y escribir</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Integración de la Mujer - Botón Principal */}
        <View style={[styles.mainSchoolSection, {marginTop: 10}]}>
          <TouchableOpacity
            style={styles.mainSchoolButton}
            onPress={() => handleMenuPress(() => router.push("/(tabs)/IntegracionMujerScreen"))}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1a1a1a', '#000000']}
              style={styles.mainSchoolButtonGradient}
            >
              <View style={styles.mainSchoolContent}>
                <View style={styles.mainSchoolIconContainer}>
                  <Ionicons name="people" size={40} color="#FFD700" />
                </View>
                <View style={styles.mainSchoolTextContainer}>
                  <Text style={[styles.mainSchoolTitle, {marginTop: 30, color: '#FFD700'}]}>Integración de la Mujer</Text>
                  <Text style={[styles.mainSchoolTitleAr, {color: '#FFD700'}]}>اندماج المرأة</Text>
                  <Text style={[styles.mainSchoolSubtitle, {color: '#FFD700'}]}>Recursos y apoyo</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.highlightButton, { marginBottom: 20 }]}
          onPress={() => router.push("/(tabs)/CreadorCVProScreen")}
          activeOpacity={0.8}
        >
          <Ionicons name="document-text" size={18} color="#FFD700" />
          <Text style={styles.highlightButtonText}>Creador de CV</Text>
        </TouchableOpacity>

        {/* Categorías Principales */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorías Principales</Text>

          <View style={styles.categoriesGrid}>
            {/* Diccionario */}
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleMenuPress(() => router.push("/DiccionarioScreen"))}
            >
              <LinearGradient
                colors={['#1a1a1a', '#000000']}
                style={styles.categoryGradient}
              >
                <Ionicons name="book" size={32} color="#FFD700" />
                                 <Text style={[styles.categoryTitle, {color: '#FFD700'}]}>Diccionario</Text>
                 <Text style={[styles.categoryTitleAr, {color: '#FFD700'}]}>قاموس</Text>
                 <Text style={[styles.categorySubtitle, {color: '#FFD700'}]}>Traducciones</Text>
                 <Text style={[styles.categorySubtitleAr, {color: '#FFD700'}]}>ترجمات</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Cultura */}
             <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleMenuPress(() => router.push("/CulturaGeneralScreen"))}
            >
               <LinearGradient
                colors={['#1a1a1a', '#000000']}
                style={styles.categoryGradient}
              >
                <Ionicons name="globe" size={32} color="#FFD700" />
                                 <Text style={[styles.categoryTitle, {color: '#FFD700'}]}>Cultura</Text>
                 <Text style={[styles.categoryTitleAr, {color: '#FFD700'}]}>ثقافة</Text>
                 <Text style={[styles.categorySubtitle, {color: '#FFD700'}]}>España</Text>
                 <Text style={[styles.categorySubtitleAr, {color: '#FFD700'}]}>إسبانيا</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Biblioteca */}
             <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleMenuPress(() => router.push("/BibliotecaDigitalScreen"))}
            >
               <LinearGradient
                colors={['#1a1a1a', '#000000']}
                style={styles.categoryGradient}
              >
                <Ionicons name="library" size={32} color="#FFD700" />
                                 <Text style={[styles.categoryTitle, {color: '#FFD700'}]}>Biblioteca</Text>
                 <Text style={[styles.categoryTitleAr, {color: '#FFD700'}]}>مكتبة</Text>
                 <Text style={[styles.categorySubtitle, {color: '#FFD700'}]}>Recursos</Text>
                 <Text style={[styles.categorySubtitleAr, {color: '#FFD700'}]}>موارد</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Noticias */}
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleMenuPress(() => router.push("/NoticiasInmigracionScreen"))}
            >
              <LinearGradient
                colors={['#1a1a1a', '#000000']}
                style={styles.categoryGradient}
              >
                <Ionicons name="newspaper" size={32} color="#FFD700" />
                <Text style={[styles.categoryTitle, {color: '#FFD700'}]}>Noticias</Text>
                <Text style={[styles.categoryTitleAr, {color: '#FFD700'}]}>أخبار</Text>
                <Text style={[styles.categorySubtitle, {color: '#FFD700'}]}>Inmigración</Text>
                <Text style={[styles.categorySubtitleAr, {color: '#FFD700'}]}>هجرة</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Asesoría */}
             <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleMenuPress(() => router.push("/AsesoriaScreen"))}
            >
               <LinearGradient
                colors={['#1a1a1a', '#000000']}
                style={styles.categoryGradient}
              >
                <Ionicons name="people" size={32} color="#FFD700" />
                                 <Text style={[styles.categoryTitle, {color: '#FFD700'}]}>Asesoría y Acompañamiento</Text>
                 <Text style={[styles.categoryTitleAr, {color: '#FFD700'}]}>استشارة ومرافقة</Text>
                 <Text style={[styles.categorySubtitle, {color: '#FFD700'}]}>Inmigración</Text>
                 <Text style={[styles.categorySubtitleAr, {color: '#FFD700'}]}>هجرة</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Agenda del Inmigrante */}
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleMenuPress(() => router.push("/AgendaScreen"))}
            >
              <LinearGradient
                colors={['#1a1a1a', '#000000']}
                style={styles.categoryGradient}
              >
                <Ionicons name="calendar" size={32} color="#FFD700" />
                <Text style={[styles.categoryTitle, {color: '#FFD700'}]}>Agenda del Inmigrante</Text>
                <Text style={[styles.categoryTitleAr, {color: '#FFD700'}]}>دليل المهاجر</Text>
                <Text style={[styles.categorySubtitle, {color: '#FFD700'}]}>Guía práctica</Text>
                <Text style={[styles.categorySubtitleAr, {color: '#FFD700'}]}>دليل عملي</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Examen Nacionalidad */}
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleMenuPress(() => router.push("/(tabs)/ExamenNacionalidadScreen"))}
            >
              <LinearGradient
                colors={['#1a1a1a', '#000000']}
                style={styles.categoryGradient}
              >
                <Ionicons name="document" size={32} color="#FFD700" />
                <Text style={[styles.categoryTitle, {color: '#FFD700'}]}>Examen Nacionalidad</Text>
                <Text style={[styles.categoryTitleAr, {color: '#FFD700'}]}>امتحان الجنسية</Text>
                <Text style={[styles.categorySubtitle, {color: '#FFD700'}]}>CCSE</Text>
                <Text style={[styles.categorySubtitleAr, {color: '#FFD700'}]}>امتحان الجنسية</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </View>

        {/* Accesos Rápidos */}
        <View style={styles.quickAccessSection}>
          <Text style={styles.sectionTitle}>Accesos Rápidos</Text>

          <View style={styles.quickAccessGrid}>
            <TouchableOpacity
              style={styles.quickAccessItem}
              onPress={() => handleMenuPress(() => router.push("/(tabs)/ForumScreen"))}
            >
              <View style={styles.quickAccessIcon}>
                <Ionicons name="chatbubbles" size={24} color="#FFD700" />
              </View>
              <Text style={styles.quickAccessText}>Foro Comunidad</Text>
              <Text style={styles.quickAccessTextAr}>منتدى المجتمع</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAccessItem}
              onPress={() => handleMenuPress(() => router.push("/(tabs)/AprendeEscribirScreen"))}
            >
              <View style={styles.quickAccessIcon}>
                <Ionicons name="create" size={24} color="#FFD700" />
              </View>
              <Text style={styles.quickAccessText}>Aprende a Escribir</Text>
              <Text style={styles.quickAccessTextAr}>تعلّم الكتابة</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAccessItem}
              onPress={() => handleMenuPress(() => router.push("/CafeLiterarioScreen"))}
            >
              <View style={styles.quickAccessIcon}>
                <FontAwesome5 name="coffee" size={24} color="#FFD700" />
              </View>
                             <Text style={styles.quickAccessText}>Café Literario</Text>
               <Text style={styles.quickAccessTextAr}>مقهى أدبي</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessItem}
              onPress={() => handleMenuPress(() => router.push("/NoticiasInmigracionScreen"))}
            >
              <View style={styles.quickAccessIcon}>
                <Ionicons name="newspaper" size={24} color="#FFD700" />
              </View>
                             <Text style={styles.quickAccessText}>Noticias</Text>
               <Text style={styles.quickAccessTextAr}>أخبار</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessItem}
              onPress={() => handleMenuPress(() => router.push("/CuentosPopularesScreen"))}
            >
              <View style={styles.quickAccessIcon}>
                <FontAwesome5 name="book-open" size={24} color="#FFD700" />
              </View>
              <Text style={styles.quickAccessText}>Cuentos Populares</Text>
              <Text style={styles.quickAccessTextAr}>قصص شعبية</Text>
            </TouchableOpacity>

            <TouchableOpacity
  style={styles.quickAccessItem}
  onPress={() => handleMenuPress(() => router.push("/AgendaScreen"))}
>
  <View style={styles.quickAccessIcon}>
    <Ionicons name="calendar" size={24} color="#FFD700" />
  </View>
  <Text style={styles.quickAccessText}>Agenda del Inmigrante</Text>
  <Text style={styles.quickAccessTextAr}>دليل المهاجر</Text>
</TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessItem}
              onPress={() => handleMenuPress(() => router.push("/(tabs)/JuegosDeTareasScreen"))}
            >
              <View style={styles.quickAccessIcon}>
                <Ionicons name="game-controller" size={24} color="#FFD700" />
              </View>
                             <Text style={styles.quickAccessText}>Juegos</Text>
               <Text style={styles.quickAccessTextAr}>ألعاب</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessItem}
              onPress={() => handleMenuPress(() => router.push("/PreFormacionScreen"))}
            >
              <View style={styles.quickAccessIcon}>
                <Ionicons name="school" size={24} color="#FFD700" />
              </View>
              <Text style={styles.quickAccessText}>Pre-formación SEPE</Text>
              <Text style={styles.quickAccessTextAr}>تدريب مهني</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessItem}
              onPress={() => handleMenuPress(() => router.push("/(tabs)/CreadorCVProScreen"))}
            >
              <View style={styles.quickAccessIcon}>
                <Ionicons name="document-text" size={24} color="#FFD700" />
              </View>
              <Text style={styles.quickAccessText}>Creador CV</Text>
              <Text style={styles.quickAccessTextAr}>منشئ السيرة الذاتية</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contacto */}
        <View style={styles.contactWidget}>
          <View style={styles.widgetHeader}>
            <Ionicons name="call" size={20} color="#4CAF50" />
            <Text style={styles.widgetTitle}>¿Necesitas Ayuda?</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>
              Web: www.afaiacademiadeinmigrantes.com{'\n'}
              Email: somos@afaiacademiadeinmigrantes.com{'\n'}
              Teléfono: 876096004
            </Text>
          </View>
        </View>
      </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  welcomeTextAr: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    textAlign: 'right',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  userNameText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
    marginLeft: 6,
  },
  registerButtonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  registerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFD700',
    marginLeft: 6,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  authButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFD700',
    marginLeft: 6,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 180,
    height: 90,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  mainLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    paddingVertical: 5,
    marginTop: -20,
  },
  mainLogo: {
    width: '100%',
    height: 180,
    marginTop: 10,
    marginBottom: 10,
  },
  arabicText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#2c3e50',
    marginTop: 8,
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? 'AlNile-Bold' : 'notoserif',
    fontWeight: 'bold',
    writingDirection: 'rtl',
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  highlightCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f4f8b',
    marginLeft: 10,
  },
  highlightSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  highlightSubtitleAr: {
    fontSize: 14,
    color: '#666',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  highlightButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  highlightButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  // --- Promo ticker (texto compacto) ---
  tickerSection: {
    height: 28,
    marginTop: 8,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  tickerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  tickerText: {
    color: '#2c3e50',
    fontSize: 12,
    marginRight: 24,
  },
  tickerTextAr: {
    fontSize: 12,
    color: '#1b5e20',
    marginHorizontal: 12,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  prayerTimesSection: {
    marginTop: 6,
    paddingHorizontal: 8,
    marginBottom: 6,
    height: 40,
    justifyContent: 'center',
  },
  prayerTimesLoading: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prayerTimesScrollContent: {
    paddingVertical: 2,
  },
  prayerTimesInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  provinceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#e9ecef',
  },
  provinceName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
    marginRight: 2,
    minWidth: 80,
  },
  provinceArrow: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginRight: 10,
    marginLeft: 0,
  },
  prayerTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#333',
  },
  prayerTimeValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  prayerTimeSeparator: {
    fontSize: 11,
    color: '#FFD700',
    marginHorizontal: 2,
  },
  prayerTimeNameAr: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFD700',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  newsSection: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  newsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  newsScrollContent: {
    paddingVertical: 4,
    alignItems: 'center',
  },
  newsFallback: {
    minHeight: 80,
    minWidth: 180,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginRight: 12,
  },
  newsFallbackText: {
    color: '#607d8b',
    fontSize: 14,
    textAlign: 'center',
  },
  newsTickerTouchable: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  newsTickerText: {
    color: '#1f2933',
    fontSize: 14,
    fontWeight: '500',
    paddingRight: 16,
  },
  newsCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  newsCardSource: {
    marginBottom: 10,
  },
  newsCardAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsCardActionText: {
    color: '#007AFF',
    fontWeight: '600',
    marginRight: 6,
    fontSize: 13,
  },
  widgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    marginLeft: 10,
    flex: 1,
  },
  widgetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  widgetTitleAr: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginLeft: 8,
    writingDirection: 'rtl',
  },
  progressWidget: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  videoWidget: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  videoContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  presentationVideo: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  presentationButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  presentationButtonGradient: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  presentationButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  presentationButtonTextAr: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  categoriesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (screenWidth - 60) / 2,
    height: 120,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoCard: {
    width: (screenWidth - 60) / 2,
    height: 120,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoFullCard: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  categoryGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  categoryTitleAr: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  categorySubtitleAr: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  mainSchoolSection: {
    marginBottom: 20,
  },
  mainSchoolButton: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  mainSchoolButtonGradient: {
    flex: 1,
    padding: 20,
  },
  mainSchoolContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainSchoolIconContainer: {
    justifyContent: 'center',
    marginTop: -55,
  },
  mainSchoolTextContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: 'center',
    marginTop: -55,
  },
  mainSchoolTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 32,
  },
  mainSchoolTitleAr: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  mainSchoolSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  mainSchoolSubtitleAr: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    writingDirection: 'rtl',
  },
  quickAccessSection: {
    marginBottom: 20,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  quickAccessItem: {
    width: (screenWidth - 60) / 2,
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAccessIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFD700',
    textAlign: 'center',
  },
  quickAccessTextAr: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFD700',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: 2,
  },
  contactWidget: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contactButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  profileButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminButton: {
    marginLeft: 8,
    backgroundColor: '#000',
  },
  adminButtonText: {
    color: '#FFD700',
  },
  newBadge: {
    width: 45,
    height: 22,
    backgroundColor: '#ff3333',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreenContent;

