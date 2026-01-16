import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { User } from '../../utils/userDatabase';
import { userDB } from '../../utils/userDatabase';
import { useFocusEffect } from '@react-navigation/native';
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
    examenDiploma: {
      es: "¡Estás listo para el examen! ¿Quieres obtener tu diploma?",
      ar: "أنت مستعد للامتحان! هل تريد الحصول على شهادتك؟"
    }
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

  // Estados de desbloqueo de niveles - Inicialmente todos bloqueados
  const [nivelesDesbloqueados, setNivelesDesbloqueados] = React.useState({
    A1: false,
    A2: false,
    B1: false,
    B2: false
  });

  // El estado inicial ya está configurado como bloqueado en el useState

  const [aprobadoA2, setAprobadoA2] = React.useState(false);
  const [aprobadoB2, setAprobadoB2] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  // Estados de matrícula
  const [matriculadoA1A2, setMatriculadoA1A2] = React.useState(false);
  const [matriculadoB1B2, setMatriculadoB1B2] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState('');

  // Manejar parámetros de navegación
  const params = useLocalSearchParams<{
    refresh?: string;
    matriculado?: 'A1A2' | 'B1B2';
  }>();

  // Usar una referencia para rastrear si ya mostramos el mensaje
  const hasShownWelcome = React.useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      cargarProgreso();

      // Si venimos de un proceso de matrícula exitoso y aún no hemos mostrado el mensaje
      if (params?.matriculado && !hasShownWelcome.current) {
        // Marcar que ya mostramos el mensaje
        hasShownWelcome.current = true;

        // Usar un pequeño retraso para asegurar que el componente esté montado
        const timer = setTimeout(() => {
          showModal(`¡Bienvenido! Has sido matriculado correctamente en los niveles ${params.matriculado}.`);

          // Limpiar el parámetro después de mostrar el mensaje
          router.setParams({ matriculado: undefined });
        }, 300);

        return () => clearTimeout(timer);
      }
    }, [params?.matriculado]) // Solo dependemos de params.matriculado
  );

  const cargarProgreso = async () => {
    try {
      // Cargar estado de matrículas
      const [matA1A2, matB1B2, aprobadoA1, aprobadoB1] = await Promise.all([
        AsyncStorage.getItem('matricula_A1A2_completada'),
        AsyncStorage.getItem('matricula_B1B2_completada'),
        AsyncStorage.getItem('aprobadoA1'),
        AsyncStorage.getItem('aprobadoB1')
      ]);

      // Cargar niveles desbloqueados desde el proceso de pago
      const unlockedLevelsJson = await AsyncStorage.getItem('unlockedLevels');
      let unlockedLevels: string[] = [];
      if (unlockedLevelsJson) {
        try {
          unlockedLevels = JSON.parse(unlockedLevelsJson);
        } catch (e) {
          console.warn('Error al parsear unlockedLevels:', e);
          unlockedLevels = [];
        }
      }

      // Establecer estados de matrícula (por defecto false si no existe)
      const isMatriculadoA1A2 = matA1A2 === 'true';
      const isMatriculadoB1B2 = matB1B2 === 'true';
      const isAprobadoA1 = aprobadoA1 === 'true';
      const isAprobadoB1 = aprobadoB1 === 'true';

      setMatriculadoA1A2(isMatriculadoA1A2);
      setMatriculadoB1B2(isMatriculadoB1B2);

      // Usar niveles desbloqueados del pago O fallback a lógica anterior
      const nivelesDesbloqueadosActualizados = {
        A1: unlockedLevels.includes('A1') || isMatriculadoA1A2,
        A2: unlockedLevels.includes('A2') || (isMatriculadoA1A2 && isAprobadoA1),
        B1: unlockedLevels.includes('B1') || isMatriculadoB1B2,
        B2: unlockedLevels.includes('B2') || (isMatriculadoB1B2 && isAprobadoB1)
      };

      console.log('Niveles desbloqueados cargados:', nivelesDesbloqueadosActualizados);
      console.log('Niveles desde pago (unlockedLevels):', unlockedLevels);

      setNivelesDesbloqueados(nivelesDesbloqueadosActualizados);

      // Cargar estados de aprobación de diplomas
      setAprobadoA2((await AsyncStorage.getItem('aprobadoA2')) === 'true');
      setAprobadoB2((await AsyncStorage.getItem('aprobadoB2')) === 'true');
    } catch (e) {
      console.error('Error al cargar el progreso:', e);
      // En caso de error, asegurarse de que todo esté bloqueado
      setNivelesDesbloqueados({
        A1: false,
        A2: false,
        B1: false,
        B2: false
      });
    }
  };

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

  const handleOpenLevel = (nivel: string, path: string) => {
    // Verificar si el nivel está desbloqueado
    if (!nivelesDesbloqueados[nivel as keyof typeof nivelesDesbloqueados]) {
      showModal('Este nivel está bloqueado. Por favor, matricúlate primero.');
      return;
    }
    router.push(path);
  };

  const handleMatricular = async (bloque: 'A1A2' | 'B1B2') => {
    try {
      console.log('=== INICIANDO PROCESO DE MATRÍCULA ===');
      console.log(`Matriculando en bloque: ${bloque}`);

      // 1. Actualizar el estado local
      if (bloque === 'A1A2') setMatriculadoA1A2(true);
      if (bloque === 'B1B2') setMatriculadoB1B2(true);

      // 2. Crear o actualizar el usuario con la información de matrícula
      try {
        // Primero, intentar obtener el usuario actual
        let user = await userDB.getCurrentUser();
        console.log('1. Usuario actual encontrado:', user ? 'Sí' : 'No');

        // Si no hay usuario, crear uno temporal
        if (!user) {
          console.log('2. Creando usuario temporal...');
          const tempUser: User = {
            id: Date.now(),
            firstName: 'Usuario',
            lastName: 'Temporal',
            email: `temp_${Date.now()}@ejemplo.com`,
            password: '',
            role: 'user',
            createdAt: new Date().toISOString(),
            matriculado: false,
            matriculado_escuela_virtual: false,
            progress: {
              nivelActual: 'A1',
              puntuacionTotal: 0,
              unidadesCompletadas: 0,
              tiempoEstudio: 0
            },
            preferences: {
              idioma: 'es',
              notificaciones: true,
              tema: 'light'
            }
          };

          console.log('3. Usuario temporal creado:', {
            id: tempUser.id,
            email: tempUser.email,
            matriculado: tempUser.matriculado,
            matriculado_escuela_virtual: tempUser.matriculado_escuela_virtual
          });

          // Guardar el usuario temporal en la base de datos
          await userDB.setUserData(tempUser);
          console.log('4. Usuario temporal guardado en la base de datos');

          // Establecer como usuario actual
          await userDB.setCurrentUser(tempUser);
          console.log('5. Usuario temporal establecido como usuario actual');

          user = tempUser;
        }

        // Actualizar el estado de matrícula
        const isTempUser = user.email && user.email.startsWith('temp_');
        const userActualizado: User = {
          ...user,
          // Permitir que tanto usuarios temporales como regulares tengan matrícula
          matriculado: true,
          matriculado_escuela_virtual: true
        };

        if (isTempUser) {
          console.log('Usuario temporal detectado, aplicando matrícula con descuento');
        }

        console.log('6. Actualizando estado de matrícula:', {
          id: userActualizado.id,
          email: userActualizado.email,
          matriculado: userActualizado.matriculado,
          matriculado_escuela_virtual: userActualizado.matriculado_escuela_virtual
        });

        // Guardar en AsyncStorage para acceso rápido
        await AsyncStorage.setItem('matriculado_escuela_virtual', 'true');
        console.log('7. Bandera de matrícula guardada en AsyncStorage');

        // Guardar el usuario actualizado
        await userDB.setCurrentUser(userActualizado);
        console.log('8. Usuario actualizado guardado');

        // También actualizar en la lista de usuarios
        const users = JSON.parse(await AsyncStorage.getItem('users_data') || '[]');
        const userIndex = users.findIndex((u: any) => u.id === userActualizado.id);

        if (userIndex !== -1) {
          users[userIndex] = userActualizado;
          console.log('9. Usuario actualizado en la lista de usuarios');
        } else {
          users.push(userActualizado);
          console.log('9. Usuario añadido a la lista de usuarios');
        }

        await AsyncStorage.setItem('users_data', JSON.stringify(users));
        console.log('10. Lista de usuarios guardada en AsyncStorage');

        // Verificar que los datos se hayan guardado correctamente
        const verificarUser = await userDB.getCurrentUser();
        console.log('11. Verificación - Usuario actual después de guardar:', {
          id: verificarUser?.id,
          email: verificarUser?.email,
          matriculado: verificarUser?.matriculado,
          matriculado_escuela_virtual: verificarUser?.matriculado_escuela_virtual
        });

        const verificarMatriculado = await AsyncStorage.getItem('matriculado_escuela_virtual');
        console.log('12. Verificación - Estado de matrícula en AsyncStorage:', verificarMatriculado);

      } catch (error) {
        console.error('Error al actualizar el estado de matrícula:', error);
      }

      // Navegar a la pantalla de pago
      router.push({
        pathname: '/FormularioDatosPersonales',
        params: { bloque }
      });
    } catch (error) {
      console.error('Error en handleMatricular:', error);
      showModal('Ocurrió un error al procesar tu matrícula. Por favor, inténtalo de nuevo.');
    }
  };

  // ---------------------------------------------------------------------------
  // RENDERIZADO PRINCIPAL
  // ---------------------------------------------------------------------------
  // Función para limpiar el almacenamiento (solo para pruebas)
  const limpiarAlmacenamiento = async () => {
    try {
      await AsyncStorage.removeItem('matricula_A1A2_completada');
      await AsyncStorage.removeItem('matricula_B1B2_completada');
      await AsyncStorage.removeItem('aprobadoA1');
      await AsyncStorage.removeItem('aprobadoA2');
      await AsyncStorage.removeItem('aprobadoB1');
      await AsyncStorage.removeItem('aprobadoB2');
      await AsyncStorage.removeItem('matriculado_escuela_virtual');
      await AsyncStorage.removeItem('unlockedLevels');
      await AsyncStorage.removeItem('diplomaData');
      await AsyncStorage.removeItem('nivelMatriculado');
      await AsyncStorage.removeItem('users_data');
      await AsyncStorage.removeItem('@current_user');

      // Restablecer estados
      setMatriculadoA1A2(false);
      setMatriculadoB1B2(false);
      setNivelesDesbloqueados({
        A1: false,
        A2: false,
        B1: false,
        B2: false
      });

      showModal('Almacenamiento completamente limpiado. Todos los niveles están ahora bloqueados y el usuario no tiene matrícula.');
    } catch (e) {
      console.error('Error al limpiar el almacenamiento:', e);
      showModal('Error al limpiar el almacenamiento');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>

        <TouchableOpacity
          style={{ position: 'absolute', left: 16, top: 44, zIndex: 10 }}
          onPress={() => router.replace('/')}
        >
          <Ionicons name="arrow-back" size={28} color="#9DC3AA" />
        </TouchableOpacity>

        <View style={{ width: '100%', alignItems: 'center', marginBottom: 24 }}>
          <Ionicons name="school" size={64} color="#9DC3AA" style={{ marginBottom: 16 }} />
          <Text style={styles.title}>Escuela Virtual</Text>
          <Text style={styles.subtitle}>
            Bienvenido/a a la escuela virtual de la Academia de Inmigrantes.
          </Text>
        </View>

        {/* Botón de Matriculación */}
        <View style={styles.progressWidget}>
          <TouchableOpacity
            style={styles.standardButton}
            onPress={() => router.push('/FormularioDatosPersonales')}
            disabled={false}
          >
            <Ionicons
              name="person-add"
              size={24}
              color="#FFD700"
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
          </TouchableOpacity>

          {/* Indicador de niveles matriculados */}
          {(matriculadoA1A2 || matriculadoB1B2) && (
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ color: '#4CAF50', fontWeight: '500' }}>
                {matriculadoA1A2 && '✓ Nivel A1 desbloqueado (A2 se desbloquea al aprobar A1)'}
                {matriculadoA1A2 && matriculadoB1B2 && '\n'}
                {matriculadoB1B2 && '✓ Nivel B1 desbloqueado (B2 se desbloquea al aprobar B1)'}
              </Text>
            </View>
          )}
        </View>

        {/* Botones de niveles */}
        <View style={styles.progressWidget}>
          {/* Niveles A1/A2 */}
          <TouchableOpacity
            style={[
              styles.nivelButton,
              !nivelesDesbloqueados.A1 && styles.nivelBloqueado,
              !matriculadoA1A2 && styles.nivelNoDisponible
            ]}
            onPress={() => handleOpenLevel('A1', '/A1_Acceso')}
            disabled={!nivelesDesbloqueados.A1}
          >
            <Ionicons
              name={nivelesDesbloqueados.A1 ? 'lock-open' : 'lock-closed'}
              size={20}
              color={nivelesDesbloqueados.A1 ? '#4CAF50' : '#fff'}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.buttonText}>
              {nivelesDesbloqueados.A1 ? 'Nivel A1 Acceso' : 'Nivel A1 Bloqueado'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nivelButton,
              !nivelesDesbloqueados.A2 && styles.nivelBloqueado,
              !matriculadoA1A2 && styles.nivelNoDisponible
            ]}
            onPress={() => handleOpenLevel('A2', '/A2_Plataforma')}
            disabled={!nivelesDesbloqueados.A2}
          >
            <Ionicons
              name={nivelesDesbloqueados.A2 ? 'lock-open' : 'lock-closed'}
              size={20}
              color={nivelesDesbloqueados.A2 ? '#4CAF50' : '#fff'}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.buttonText}>
              {nivelesDesbloqueados.A2 ? 'Nivel A2 Plataforma' : 'Nivel A2 Bloqueado'}
            </Text>
          </TouchableOpacity>

          {/* Niveles B1/B2 */}
          <TouchableOpacity
            style={[
              styles.nivelButton,
              !nivelesDesbloqueados.B1 && styles.nivelBloqueado,
              !matriculadoB1B2 && styles.nivelNoDisponible
            ]}
            onPress={() => handleOpenLevel('B1', '/B1_Umbral')}
            disabled={!nivelesDesbloqueados.B1}
          >
            <Ionicons
              name={nivelesDesbloqueados.B1 ? 'lock-open' : 'lock-closed'}
              size={20}
              color={nivelesDesbloqueados.B1 ? '#4CAF50' : '#fff'}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.buttonText}>
              {nivelesDesbloqueados.B1 ? 'Nivel B1 Umbral' : 'Nivel B1 Bloqueado'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nivelButton,
              !nivelesDesbloqueados.B2 && styles.nivelBloqueado,
              !matriculadoB1B2 && styles.nivelNoDisponible
            ]}
            onPress={() => handleOpenLevel('B2', '/B2_Avanzado')}
            disabled={!nivelesDesbloqueados.B2}
          >
            <Ionicons
              name={nivelesDesbloqueados.B2 ? 'lock-open' : 'lock-closed'}
              size={20}
              color={nivelesDesbloqueados.B2 ? '#4CAF50' : '#fff'}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.buttonText}>
              {nivelesDesbloqueados.B2 ? 'Nivel B2 Avanzado' : 'Nivel B2 Bloqueado'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Diplomas */}
        {nivelesDesbloqueados.A2 && (
          <TouchableOpacity
            style={[styles.standardButton, { backgroundColor: aprobadoA2 ? '#4CAF50' : '#1976d2' }]}
            onPress={() => {
              if (aprobadoA2) {
                router.push({ pathname: '/(tabs)/DiplomaGeneradoScreen', params: { nivel: 'A2' } });
              } else {
                showModal('¡Completa el nivel A2 para obtener tu diploma!');
              }
            }}
          >
            <Ionicons
              name="ribbon"
              size={24}
              color={aprobadoA2 ? '#FFD700' : '#FFFFFF80'}
              style={{ marginRight: 12 }}
            />
            <Text style={[styles.buttonText, !aprobadoA2 && { opacity: 0.7 }]}>
              {aprobadoA2 ? 'Obtener Diploma A2' : 'Completa A2 para el diploma'}
            </Text>
          </TouchableOpacity>
        )}

        {nivelesDesbloqueados.B2 && (
          <TouchableOpacity
            style={[styles.standardButton, { backgroundColor: aprobadoB2 ? '#4CAF50' : '#1976d2' }]}
            onPress={() => {
              if (aprobadoB2) {
                router.push({ pathname: '/(tabs)/DiplomaGeneradoScreen', params: { nivel: 'B2' } });
              } else {
                showModal('¡Completa el nivel B2 para obtener tu diploma!');
              }
            }}
          >
            <Ionicons
              name="ribbon"
              size={24}
              color={aprobadoB2 ? '#FFD700' : '#FFFFFF80'}
              style={{ marginRight: 12 }}
            />
            <Text style={[styles.buttonText, !aprobadoB2 && { opacity: 0.7 }]}>
              {aprobadoB2 ? 'Obtener Diploma B2' : 'Completa B2 para el diploma'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Ionicons
                name="information-circle-outline"
                size={36}
                color="#1976d2"
                style={{ marginBottom: 12 }}
              />
              <Text style={{
                fontSize: 17,
                textAlign: 'center',
                marginBottom: 18,
                lineHeight: 24
              }}>
                {modalMsg}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#1976d2',
                  paddingVertical: 10,
                  paddingHorizontal: 22,
                  borderRadius: 8
                }}
                onPress={closeModal}
                activeOpacity={0.8}
              >
                <Text style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 16
                }}>
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Botón de depuración (solo para pruebas) */}
        <TouchableOpacity
          style={[styles.standardButton, { backgroundColor: '#f44336', marginTop: 20 }]}
          onPress={limpiarAlmacenamiento}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Limpiar Progreso (Solo Pruebas)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
} // ← FIN DEL COMPONENTE SchoolScreen
// FUNCIÓN AUXILIAR (fuera del componente)
// -----------------------------------------------------------------------------
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
async function handleGenerarDiplomaSoloProfesor() {
  const html = `
    <html><body>
      <h1>Diploma Academia de Inmigrantes</h1>
      <p>Profesor: Khaled Mersaoui</p>
    </body></html>`;
  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri);
}

// -----------------------------------------------------------------------------
// ESTILOS
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#388e3c', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 20 },
  progressWidget: {
    width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 16,
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, marginBottom: 24
  },
  // Estilos base para botones
  standardButton: {
    backgroundColor: '#9DC3AA',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Botón de nivel
  nivelButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Estados de los botones
  matriculadoButton: {
    backgroundColor: '#4CAF50',
  },

  nivelBloqueado: {
    backgroundColor: '#9e9e9e',
    opacity: 0.7,
  },

  nivelNoDisponible: {
    backgroundColor: '#f44336',
  },

  buttonText: {
    color: '#fff',
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
