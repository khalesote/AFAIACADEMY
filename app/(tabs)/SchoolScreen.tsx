import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { useUser } from '@/contexts/UserContext';
import { LinearGradient } from 'expo-linear-gradient';

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
  const { progress, isLoading, resetLevel, unlockLevel } = useUserProgress();
  const { user, firebaseUser, isAuthenticated } = useUser();

  // Estados de desbloqueo de niveles - Inicialmente bloqueados
  const [nivelesDesbloqueados, setNivelesDesbloqueados] = React.useState({
    A1: false,  // Desbloqueado solo con pago o código
    A2: false,  // Desbloqueado solo con pago o código
    B1: false,  // Desbloqueado solo con pago o código
    B2: false   // Desbloqueado solo con pago o código
  });
  
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState('');
  
  // Estados de matrícula
  const [matriculadoA1A2, setMatriculadoA1A2] = React.useState(false);
  const [matriculadoB1B2, setMatriculadoB1B2] = React.useState(false);

  // Estados de códigos de acceso
  const [accessA1A2, setAccessA1A2] = React.useState(false);
  const [accessB1B2, setAccessB1B2] = React.useState(false);

  // Estados para modal de código de acceso
  const [accessModalVisible, setAccessModalVisible] = React.useState(false);
  const [accessCode, setAccessCode] = React.useState('');
  const [currentLevel, setCurrentLevel] = React.useState<'A1A2' | 'B1B2' | null>(null);

  // Manejar parámetros de navegación
  const params = useLocalSearchParams<{
    refresh?: string;
    matriculado?: 'A1A2' | 'B1B2';
  }>();

  // Usar una referencia para rastrear si ya mostramos el mensaje
  const hasShownWelcome = React.useRef(false);
  // Referencia para rastrear el último estado de matrícula y evitar resets innecesarios
  const lastMatriculaState = React.useRef({ A1A2: false, B1B2: false });

  React.useEffect(() => {
    const loadMatriculas = async () => {
      try {
        const [a1a2Stored, b1b2Stored, a1a2AccessStored, b1b2AccessStored] = await Promise.all([
          AsyncStorage.getItem('matricula_A1A2_completada'),
          AsyncStorage.getItem('matricula_B1B2_completada'),
          AsyncStorage.getItem('access_code_A1A2_valid'),
          AsyncStorage.getItem('access_code_B1B2_valid')
        ]);
        setMatriculadoA1A2(a1a2Stored === 'true');
        setMatriculadoB1B2(b1b2Stored === 'true');
        setAccessA1A2(a1a2AccessStored === 'true');
        setAccessB1B2(b1b2AccessStored === 'true');
        setNivelesDesbloqueados({
          A1: accessA1A2 || matriculadoA1A2,
          A2: accessA1A2 || matriculadoA1A2,
          B1: accessB1B2 || matriculadoB1B2,
          B2: accessB1B2 || matriculadoB1B2
        });
      } catch (error) {
        console.error('Error cargando matrículas:', error);
      }
    };
    loadMatriculas();
  }, []);

  // Resetear progreso de niveles si no está matriculado (solo cuando cambia el estado de matrícula)
  React.useEffect(() => {
    if (isLoading) return;

    // Solo resetear si el estado de matrícula cambió de true a false
    const a1a2Changed = lastMatriculaState.current.A1A2 !== matriculadoA1A2;
    const b1b2Changed = lastMatriculaState.current.B1B2 !== matriculadoB1B2;

    // Si no está matriculado en A1A2 y el estado cambió, resetear progreso de A2 (A1 ya no requiere matrícula)
    if (!matriculadoA1A2 && (a1a2Changed || !lastMatriculaState.current.A1A2)) {
      const a2HasProgress = progress.A2.unlocked || progress.A2.unitsCompleted.some(u => u) || 
                            progress.A2.oralPassed || progress.A2.writtenPassed || progress.A2.diplomaReady;
      
      if (a2HasProgress) {
        resetLevel('A2');
      }
    }

    // Si no está matriculado en B1B2 y el estado cambió, resetear progreso de B1 y B2
    if (!matriculadoB1B2 && (b1b2Changed || !lastMatriculaState.current.B1B2)) {
      const b1HasProgress = progress.B1.unlocked || progress.B1.unitsCompleted.some(u => u) || 
                            progress.B1.oralPassed || progress.B1.writtenPassed || progress.B1.diplomaReady;
      const b2HasProgress = progress.B2.unlocked || progress.B2.unitsCompleted.some(u => u) || 
                            progress.B2.oralPassed || progress.B2.writtenPassed || progress.B2.diplomaReady;
      
      if (b1HasProgress) {
        resetLevel('B1');
      }
      if (b2HasProgress) {
        resetLevel('B2');
      }
    }

    // Actualizar el estado de referencia
    lastMatriculaState.current = { A1A2: matriculadoA1A2, B1B2: matriculadoB1B2 };
  }, [matriculadoA1A2, matriculadoB1B2, isLoading, progress, resetLevel]);

  // Actualizar niveles desbloqueados cuando cambian matriculado o acceso
  React.useEffect(() => {
    setNivelesDesbloqueados({
      A1: matriculadoA1A2 || accessA1A2,
      A2: matriculadoA1A2 || accessA1A2,
      B1: matriculadoB1B2 || accessB1B2,
      B2: matriculadoB1B2 || accessB1B2
    });
  }, [matriculadoA1A2, matriculadoB1B2, accessA1A2, accessB1B2]);

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

  const handleEnterAccessCode = (level: 'A1A2' | 'B1B2') => {
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
                if (matriculadoA1A2 && matriculadoB1B2) {
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
                    {(matriculadoA1A2 && matriculadoB1B2) ? '¡Matriculado en todos los niveles!' : 'Matricúlate'}
                  </Text>
                  {!(matriculadoA1A2 && matriculadoB1B2) && (
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
            {(matriculadoA1A2 || matriculadoB1B2) && (
              <View style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={{ color: '#79A890', fontWeight: '500' }}>
                  {matriculadoA1A2 && '✓ Niveles A1/A2 desbloqueados'}
                  {matriculadoA1A2 && matriculadoB1B2 && '\n'}
                  {matriculadoB1B2 && '✓ Niveles B1/B2 desbloqueados'}
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
