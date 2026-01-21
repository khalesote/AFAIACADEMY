import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { useUser } from '@/contexts/UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import AccessCodeInput from '../../components/AccessCodeInput';
import { validateAccessCode, markAccessCodeAsUsed } from '../../utils/accessCodes';

// -----------------------------------------------------------------------------
// SISTEMAS DE APOYO: Tutor Virtual, Evaluación, Datos y Componentes Auxiliares
// -----------------------------------------------------------------------------
const tutorVirtualBot = {
  mensajes: {
    bienvenida: {
      es: "¡Hola! Soy tu tutor virtual bot. Te acompañaré en todo tu aprendizaje del español. ¡Empecemos esta aventura juntos!",
      ar: "مرحباً! أنا روبوت مدرسك الافتراضي. سأرافقك في رحلة تعلم اللغة الإسبانية. دعنا نبدأ هذه المغامرة معاً!"
    },
    progreso: {
      es: "¡Excelente progreso! Has completado una unidad más. ¡Sigue así!",
      ar: "تقدم ممتاز! لقد أكملت وحدة أخرى. استمر هكذا!"
    },
    felicitacion: {
      es: "¡Felicidades! Has completado esta unidad con éxito. ¡Eres increíble!",
      ar: "تهانينا! لقد أكملت هذه الوحدة بنجاح. أنت مذهل!"
    },
    recordatorio: {
      es: "Recuerda practicar todos los días para mejorar. ¡La práctica hace al maestro!",
      ar: "تذكر التدرب كل يوم للتحسن. الممارسة تصنع الماهر!"
    },
    expresionOral: {
      es: "¡Es hora de practicar expresión oral!",
      ar: "حان وقت ممارسة التعبير الشفهي!"
    },
    expresionEscrita: {
      es: "¡Practica expresión escrita!",
      ar: "مارس التعبير الكتابي!"
    },
  }
};

const evaluacionAutomatica = {
  calcularPuntuacion: (correctas: number, total: number) => Math.round((correctas / total) * 100),
  generarFeedback: (p: number) =>
    p >= 90 ? "Excelente trabajo!" :
    p >= 70 ? "Vas bien, sigue practicando!" :
    "Necesitas practicar un poco más."
};

const imagenesAlfabeto: { [key: string]: any } = {
  avion: require("../../assets/images/avion.png"),
  barco: require("../../assets/images/barco.png"),
  casa: require("../../assets/images/casa.png"),
  gato: require("../../assets/images/gato.png"),
  sol: require("../../assets/images/sol.png"),
};

// -----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// -----------------------------------------------------------------------------
export default function SchoolScreen() {
  const router = useRouter();
  const { progress, isLoading, resetLevel, unlockLevel, reloadProgress } = useUserProgress();
  const { user, firebaseUser, isAuthenticated } = useUser();

  // Estados de desbloqueo de niveles - Usar el contexto como fuente principal
  const nivelesDesbloqueados = React.useMemo(() => ({
    A1: progress.A1?.unlocked || false,
    A2: progress.A2?.unlocked || false,
    B1: progress.B1?.unlocked || false,
    B2: progress.B2?.unlocked || false
  }), [progress.A1?.unlocked, progress.A2?.unlocked, progress.B1?.unlocked, progress.B2?.unlocked]);
  
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState('');
  
  // Estados de matrícula
  const [matriculadoA1, setMatriculadoA1] = React.useState(false);
  const [matriculadoA2, setMatriculadoA2] = React.useState(false);
  const [matriculadoB1, setMatriculadoB1] = React.useState(false);
  const [matriculadoB2, setMatriculadoB2] = React.useState(false);

  // Estados de acceso por código
  const [accessA1, setAccessA1] = React.useState(false);
  const [accessA2, setAccessA2] = React.useState(false);
  const [accessB1, setAccessB1] = React.useState(false);
  const [accessB2, setAccessB2] = React.useState(false);

  // Estados para modal de código de acceso
  const [accessModalVisible, setAccessModalVisible] = React.useState(false);
  const [accessCode, setAccessCode] = React.useState('');
  const [currentLevel, setCurrentLevel] = React.useState<'A1' | 'A2' | 'B1' | 'B2' | null>(null);
  const [error, setError] = React.useState('');

  const handleCodeValid = async (code: string) => {
    if (!currentLevel || !user?.documento) {
      console.error('No hay nivel o usuario para validar código');
      return;
    }

    try {
      const result = await validateAccessCode(code, currentLevel, user.documento);
      
      console.log('🔍 Resultado de validateAccessCode:', result);
      console.log('🔍 result.valid:', result.valid);
      console.log('🔍 result.message:', result.message);
      
      if (result.valid) {
        // Marcar el código como usado para el nivel específico
        await markAccessCodeAsUsed(code, currentLevel, user.documento);
        
        // Guardar el acceso en AsyncStorage
        const userId = firebaseUser?.uid || null;
        const accessKey = getAccessCodeKey(currentLevel, userId);
        await AsyncStorage.setItem(accessKey, 'true');
        
        // Desbloquear el nivel usando el contexto
        console.log(`🔓 Desbloqueando nivel ${currentLevel}...`);
        unlockLevel(currentLevel);
        
        // Recargar el progreso para actualizar la UI
        await reloadProgress();
        
        setAccessModalVisible(false);
        showModal(`¡Código válido! Nivel ${currentLevel} desbloqueado.`);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error validando código:', error);
      setError('Error al validar el código. Por favor, inténtalo de nuevo.');
    }
  };

  // Manejar parámetros de navegación
  const params = useLocalSearchParams<{
    refresh?: string;
    matriculado?: 'A1' | 'A2' | 'B1' | 'B2';
  }>();

  // Usar una referencia para rastrear si ya mostramos el mensaje
  const hasShownWelcome = React.useRef(false);
  // Referencia para rastrear el último estado de matrícula y evitar resets innecesarios
  const lastMatriculaState = React.useRef({ 
    A1: false, 
    A2: false, 
    B1: false, 
    B2: false 
  });

  // Funciones helper para obtener claves de AsyncStorage asociadas al usuario
  const getMatriculaKey = (level: string, userId: string | null): string => {
    if (!userId) return `matricula_${level}_completada_guest`;
    return `matricula_${level}_completada_${userId}`;
  };

  const getAccessCodeKey = (level: string, userId: string | null): string => {
    if (!userId) return `access_code_${level}_valid_guest`;
    return `access_code_${level}_valid_${userId}`;
  };

  React.useEffect(() => {
    const loadMatriculas = async () => {
      try {
        console.log('🔄 Recargando matrículas y progreso...');
        // Recargar progreso del contexto
        await reloadProgress();
        
        const userId = firebaseUser?.uid || null;
        console.log('📋 [SchoolScreen] Cargando matrículas para usuario:', userId || 'invitado');
        
        const [a1Stored, a2Stored, b1Stored, b2Stored, a1AccessStored, a2AccessStored, b1AccessStored, b2AccessStored] = await Promise.all([
          AsyncStorage.getItem(getMatriculaKey('A1', userId)),
          AsyncStorage.getItem(getMatriculaKey('A2', userId)),
          AsyncStorage.getItem(getMatriculaKey('B1', userId)),
          AsyncStorage.getItem(getMatriculaKey('B2', userId)),
          AsyncStorage.getItem(getAccessCodeKey('A1', userId)),
          AsyncStorage.getItem(getAccessCodeKey('A2', userId)),
          AsyncStorage.getItem(getAccessCodeKey('B1', userId)),
          AsyncStorage.getItem(getAccessCodeKey('B2', userId))
        ]);
        
        const isMatriculadoA1 = a1Stored === 'true';
        const isMatriculadoA2 = a2Stored === 'true';
        const isMatriculadoB1 = b1Stored === 'true';
        const isMatriculadoB2 = b2Stored === 'true';
        const hasAccessA1 = a1AccessStored === 'true';
        const hasAccessA2 = a2AccessStored === 'true';
        const hasAccessB1 = b1AccessStored === 'true';
        const hasAccessB2 = b2AccessStored === 'true';
        
        console.log('📋 Estados cargados:', {
          matriculadoA1: isMatriculadoA1,
          matriculadoA2: isMatriculadoA2,
          matriculadoB1: isMatriculadoB1,
          matriculadoB2: isMatriculadoB2,
          accessA1: hasAccessA1,
          accessA2: hasAccessA2,
          accessB1: hasAccessB1,
          accessB2: hasAccessB2,
          progressA1: progress.A1?.unlocked,
          progressA2: progress.A2?.unlocked,
          progressB1: progress.B1?.unlocked,
          progressB2: progress.B2?.unlocked
        });
        
        setMatriculadoA1(isMatriculadoA1);
        setMatriculadoA2(isMatriculadoA2);
        setMatriculadoB1(isMatriculadoB1);
        setMatriculadoB2(isMatriculadoB2);
        setAccessA1(hasAccessA1);
        setAccessA2(hasAccessA2);
        setAccessB1(hasAccessB1);
        setAccessB2(hasAccessB2);
      } catch (error) {
        console.error('Error cargando matrículas:', error);
      }
    };
    loadMatriculas();
  }, [params?.refresh, reloadProgress, firebaseUser?.uid]);

  React.useEffect(() => {
    if (!user?.nivelesDesbloqueados) return;
    const { A1, A2, B1, B2 } = user.nivelesDesbloqueados;
    if (A1 && !progress.A1?.unlocked) unlockLevel('A1');
    if (A2 && !progress.A2?.unlocked) unlockLevel('A2');
    if (B1 && !progress.B1?.unlocked) unlockLevel('B1');
    if (B2 && !progress.B2?.unlocked) unlockLevel('B2');
  }, [user?.nivelesDesbloqueados, progress.A1?.unlocked, progress.A2?.unlocked, progress.B1?.unlocked, progress.B2?.unlocked, unlockLevel]);

  // Desbloquear niveles si hay matrícula o acceso (ejecutar primero)
  React.useEffect(() => {
    if (isLoading) return;
    
    console.log('🔍 Verificando desbloqueo de niveles...');
    console.log('🔍 Estados actuales:', {
      matriculadoA1, matriculadoA2, matriculadoB1, matriculadoB2,
      accessA1, accessA2, accessB1, accessB2,
      progressA1: progress.A1?.unlocked,
      progressA2: progress.A2?.unlocked,
      progressB1: progress.B1?.unlocked,
      progressB2: progress.B2?.unlocked
    });
    
    if ((accessA1 || matriculadoA1) && !progress.A1?.unlocked) {
      console.log('[SchoolScreen] Desbloqueando A1 - Matrícula:', matriculadoA1, 'Acceso:', accessA1);
      unlockLevel('A1');
    }
    if ((accessA2 || matriculadoA2) && !progress.A2?.unlocked) {
      console.log('[SchoolScreen] Desbloqueando A2 - Matrícula:', matriculadoA2, 'Acceso:', accessA2);
      unlockLevel('A2');
    }
    if ((accessB1 || matriculadoB1) && !progress.B1?.unlocked) {
      console.log('[SchoolScreen] Desbloqueando B1 - Matrícula:', matriculadoB1, 'Acceso:', accessB1);
      unlockLevel('B1');
    }
    if ((accessB2 || matriculadoB2) && !progress.B2?.unlocked) {
      console.log('[SchoolScreen] Desbloqueando B2 - Matrícula:', matriculadoB2, 'Acceso:', accessB2);
      unlockLevel('B2');
    }
  }, [matriculadoA1, matriculadoA2, matriculadoB1, matriculadoB2, accessA1, accessA2, accessB1, accessB2, progress.A1?.unlocked, progress.A2?.unlocked, progress.B1?.unlocked, progress.B2?.unlocked, unlockLevel, isLoading]);

  // Resetear progreso de niveles si no está matriculado (ejecutar después)
  React.useEffect(() => {
    if (isLoading) return;

    // Solo resetear si el estado de matrícula cambió de true a false
    const a1Changed = lastMatriculaState.current.A1 !== matriculadoA1;
    const a2Changed = lastMatriculaState.current.A2 !== matriculadoA2;
    const b1Changed = lastMatriculaState.current.B1 !== matriculadoB1;
    const b2Changed = lastMatriculaState.current.B2 !== matriculadoB2;

    // Si no está matriculado en A1 y el estado cambió, resetear progreso de A2 (A1 ya no requiere matrícula)
    if (!matriculadoA1 && (a1Changed || !lastMatriculaState.current.A1)) {
      const a2HasProgress = progress.A2.unlocked || progress.A2.unitsCompleted.some(u => u) || 
                            progress.A2.oralPassed || progress.A2.writtenPassed || progress.A2.diplomaReady;
      
      // Solo resetear A2 si NO está matriculado en A2
      if (a2HasProgress && !matriculadoA2) {
        console.log('🔄 Reseteando A2 porque no está matriculado en A1 ni A2');
        resetLevel('A2');
      }
    }

    // Si no está matriculado en B1 y el estado cambió, resetear progreso de B1 y B2
    if (!matriculadoB1 && (b1Changed || !lastMatriculaState.current.B1)) {
      const b1HasProgress = progress.B1.unlocked || progress.B1.unitsCompleted.some(u => u) || 
                            progress.B1.oralPassed || progress.B1.writtenPassed || progress.B1.diplomaReady;
      const b2HasProgress = progress.B2.unlocked || progress.B2.unitsCompleted.some(u => u) || 
                            progress.B2.oralPassed || progress.B2.writtenPassed || progress.B2.diplomaReady;
      
      // Solo resetear si NO está matriculado en los niveles correspondientes
      if (b1HasProgress && !matriculadoB1) {
        console.log('🔄 Reseteando B1 porque no está matriculado');
        resetLevel('B1');
      }
      if (b2HasProgress && !matriculadoB2) {
        console.log('🔄 Reseteando B2 porque no está matriculado');
        resetLevel('B2');
      }
    }

    // Actualizar el estado de referencia
    lastMatriculaState.current = { A1: matriculadoA1, A2: matriculadoA2, B1: matriculadoB1, B2: matriculadoB2 };
  }, [matriculadoA1, matriculadoA2, matriculadoB1, matriculadoB2, isLoading, progress, resetLevel]);

  React.useEffect(() => {
    if (!params?.matriculado || hasShownWelcome.current) {
      return;
    }
    hasShownWelcome.current = true;
    const timer = setTimeout(() => {
      showModal(`¡Bienvenido! Has sido matriculado correctamente en los niveles ${params.matriculado}.`);
      router.setParams({ matriculado: undefined });
    }, 300);
    return () => clearTimeout(timer);
  }, [params?.matriculado, router]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9DC3AA" />
      </View>
    );
  }

  const showModal = (msg: string) => {
    // Cerrar cualquier modal abierto primero
    setModalVisible(false);
    
    // Usar un pequeño retraso para asegurar que el modal se cierre antes de abrirlo de nuevo
    setTimeout(() => {
      setModalMsg(msg);
      setModalVisible(true);
    }, 50);
  };
  
  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleEnterAccessCode = (level: 'A1' | 'A2' | 'B1' | 'B2') => {
    setCurrentLevel(level);
    setAccessModalVisible(true);
  };

  const handleOpenLevel = (nivel: 'A1' | 'A2' | 'B1' | 'B2', path: string) => {
    router.push(path);
  };

  // ---------------------------------------------------------------------------
  // RENDERIZADO PRINCIPAL
  // ---------------------------------------------------------------------------
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={() => router.replace('/')}
            >
              <Ionicons name="arrow-back" size={28} color="#9DC3AA" />
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%', alignItems: 'center', marginBottom: 24 }}>
            <Ionicons name="school" size={64} color="#FFD700" style={{ marginBottom: 16 }} />
            <Text style={styles.title}>Escuela Virtual</Text>
            <Text style={styles.subtitle}>
              Bienvenido/a a la escuela virtual de la Academia de Inmigrantes.
            </Text>
          </View>

          {/* Botón de Matriculación */}
          <View style={styles.progressWidget}>
            <TouchableOpacity
              style={styles.standardButton}
              onPress={async () => {
                // Verificar si ya está matriculado en todos los niveles
                if (matriculadoA1 && matriculadoA2 && matriculadoB1 && matriculadoB2) {
                  showModal('Ya estás matriculado en todos los niveles disponibles.');
                  return;
                }

                // Intentar navegar a MatriculaScreen
                // Si el usuario está autenticado, pasar sus datos
                if (isAuthenticated && firebaseUser && user) {
                  // Pasar los datos del usuario a MatriculaScreen
                  router.push({
                    pathname: '/MatriculaScreen',
                    params: {
                      nombre: user.firstName || '',
                      apellido1: user.lastName || '',
                      fechaNacimiento: user.fechaNacimiento || '',
                      provincia: user.provincia || '',
                      telefono: user.telefono || '',
                      tipoDocumento: user.tipoDocumento || 'NIE',
                      documento: user.documento || '',
                      email: user.email || '',
                    }
                  });
                } else {
                  // Usuario no autenticado: permitir acceso pero sin datos prellenados
                  // El usuario puede registrarse desde MatriculaScreen si lo necesita
                  router.push({
                    pathname: '/MatriculaScreen'
                  });
                }
              }}
              disabled={false}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#000', '#000']}
                style={styles.standardButtonGradient}
              >
                <Ionicons
                  name="person-add"
                  color="#FFD700"
                  size={24}
                  style={{ marginRight: 12 }}
                />
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                    {(matriculadoA1 && matriculadoA2 && matriculadoB1 && matriculadoB2) ? '¡Matriculado en todos los niveles!' : 'Matricúlate'}
                  </Text>
                  {!(matriculadoA1 && matriculadoA2 && matriculadoB1 && matriculadoB2) && (
                    <Text style={{
                      color: '#fff',
                      fontSize: 16,
                      fontWeight: '500',
                      textAlign: 'center',
                      writingDirection: 'rtl',
                      fontFamily: 'Arial'
                    }}>
                      سجل الآن
                    </Text>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            {/* Indicador de niveles matriculados */}
            {(matriculadoA1 || matriculadoA2 || matriculadoB1 || matriculadoB2) && (
              <View style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={{ color: '#79A890', fontWeight: '500' }}>
                  {matriculadoA1 && '✓ Nivel A1 desbloqueado'}
                  {matriculadoA1 && matriculadoA2 && '\n'}
                  {matriculadoA2 && '✓ Nivel A2 desbloqueado'}
                  {matriculadoA2 && matriculadoB1 && '\n'}
                  {matriculadoB1 && '✓ Nivel B1 desbloqueado'}
                  {matriculadoB1 && matriculadoB2 && '\n'}
                  {matriculadoB2 && '✓ Nivel B2 desbloqueado'}
                </Text>
              </View>
            )}
          </View>

          {/* Botones de niveles */}
          <View style={styles.progressWidget}>
            {/* Niveles A1/A2 */}
            <TouchableOpacity
              style={styles.nivelButton}
              onPress={() => handleOpenLevel('A1', '/A1_Acceso')}
              disabled={!nivelesDesbloqueados.A1}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={nivelesDesbloqueados.A1 ? ['#000', '#000'] : ['#333', '#333']}
                style={styles.nivelButtonGradient}
              >
                <Ionicons 
                  name={nivelesDesbloqueados.A1 ? 'lock-open' : 'lock-closed'} 
                  size={20} 
                  color="#FFD700" 
                  style={{ marginRight: 8 }} 
                />
                <Text style={styles.buttonText}>
                  {nivelesDesbloqueados.A1 ? 'Nivel A1 Acceso' : 'Nivel A1 Bloqueado'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nivelButton}
              onPress={() => handleOpenLevel('A2', '/A2_Plataforma')}
              disabled={!nivelesDesbloqueados.A2}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={nivelesDesbloqueados.A2 ? ['#000', '#000'] : ['#333', '#333']}
                style={styles.nivelButtonGradient}
              >
                <Ionicons 
                  name={nivelesDesbloqueados.A2 ? 'lock-open' : 'lock-closed'} 
                  size={20} 
                  color="#FFD700" 
                  style={{ marginRight: 8 }} 
                />
                <Text style={styles.buttonText}>
                  {nivelesDesbloqueados.A2 ? 'Nivel A2 Plataforma' : 'Nivel A2 Bloqueado'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Niveles B1/B2 */}
            <TouchableOpacity
              style={styles.nivelButton}
              onPress={() => handleOpenLevel('B1', '/B1_Umbral')}
              disabled={!nivelesDesbloqueados.B1}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={nivelesDesbloqueados.B1 ? ['#000', '#000'] : ['#333', '#333']}
                style={styles.nivelButtonGradient}
              >
                <Ionicons 
                  name={nivelesDesbloqueados.B1 ? 'lock-open' : 'lock-closed'} 
                  size={20} 
                  color="#FFD700" 
                  style={{ marginRight: 8 }} 
                />
                <Text style={styles.buttonText}>
                  {nivelesDesbloqueados.B1 ? 'Nivel B1 Umbral' : 'Nivel B1 Bloqueado'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nivelButton}
              onPress={() => handleOpenLevel('B2', '/B2_Avanzado')}
              disabled={!nivelesDesbloqueados.B2}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={nivelesDesbloqueados.B2 ? ['#000', '#000'] : ['#333', '#333']}
                style={styles.nivelButtonGradient}
              >
                <Ionicons 
                  name={nivelesDesbloqueados.B2 ? 'lock-open' : 'lock-closed'} 
                  size={20} 
                  color="#FFD700" 
                  style={{ marginRight: 8 }} 
                />
                <Text style={styles.buttonText}>
                  {nivelesDesbloqueados.B2 ? 'Nivel B2 Avanzado' : 'Nivel B2 Bloqueado'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
} // ← FIN DEL COMPONENTE SchoolScreen

// -----------------------------------------------------------------------------
// ESTILOS
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  headerActions: {
    position: 'absolute',
    top: 44,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  container: { flexGrow: 1, backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#000', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 20 },
  progressWidget: {
    width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 16,
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, marginBottom: 24
  },
  // Estilos base para botones
  standardButton: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  
  standardButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Botón de nivel
  nivelButton: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  
  nivelButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: { 
    color: '#FFD700', 
    fontWeight: 'bold', 
    fontSize: 16,
    textAlign: 'center',
  },
  
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.4)' 
  },
  
  modalBox: { 
    backgroundColor: '#fff', 
    padding: 24, 
    borderRadius: 16, 
    alignItems: 'center', 
    maxWidth: '85%' 
  }
});
