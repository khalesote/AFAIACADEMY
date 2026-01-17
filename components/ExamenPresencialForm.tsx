import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ExamenPresencialFormProps {
  nivel: 'A1' | 'A2' | 'B1' | 'B2';
}

export default function ExamenPresencialForm({
  nivel,
}: ExamenPresencialFormProps) {
  const { user, firebaseUser, isAuthenticated } = useUser();
  const [loading, setLoading] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [fallbackPhone, setFallbackPhone] = useState('');

  const extractPhone = (data: any) => {
    if (!data) return '';
    const candidates = [
      data.telefono,
      data.phone,
      data.phoneNumber,
      data.movil,
      data.mobile,
    ];
    const found = candidates.find(value => String(value || '').trim());
    return String(found || '').trim();
  };

  useEffect(() => {
    const loadFallbackPhone = async () => {
      try {
        const raw = await AsyncStorage.getItem('matriculaFormData');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        const phone = extractPhone(parsed);
        if (phone) {
          setFallbackPhone(phone);
        }
      } catch (error) {
        console.warn('No se pudo cargar teléfono de matrícula:', error);
      }
    };
    loadFallbackPhone();
  }, []);

  const postSolicitud = async (payload: {
    nombre: string;
    email: string;
    telefono: string;
    nivel: 'A1' | 'A2' | 'B1' | 'B2';
    mensaje: string;
  }) => {
    // Crear un AbortController para timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 segundos timeout (Render puede tardar en "despertar")

    try {
      const response = await fetch(
        'https://academia-backend-s9np.onrender.com/api/solicitar-examen-presencial',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      // Verificar el Content-Type antes de parsear JSON
      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonError) {
          const textResponse = await response.text();
          console.error('Error parseando JSON. Respuesta recibida:', textResponse.substring(0, 500));
          throw new Error('El servidor respondió con un formato inesperado. Por favor, intenta más tarde.');
        }
      } else {
        const textResponse = await response.text();
        console.error('Respuesta no JSON recibida. Content-Type:', contentType);
        console.error('Primeros 500 caracteres:', textResponse.substring(0, 500));
        throw new Error('El servidor respondió con un formato inesperado. Por favor, intenta más tarde.');
      }

      if (!response.ok) {
        console.error('❌ Error HTTP solicitar-examen-presencial:', {
          status: response.status,
          statusText: response.statusText,
          data,
        });
        throw new Error(data.error || data.message || 'Error al enviar la solicitud');
      }

      return data;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) {
      Alert.alert('Error', 'Debes estar registrado para solicitar el examen presencial');
      return;
    }

    // Log completo del usuario del contexto
    console.log('👤 Usuario completo del contexto:', JSON.stringify(user, null, 2));
    console.log('👤 Firebase User:', {
      uid: firebaseUser?.uid,
      email: firebaseUser?.email,
      displayName: firebaseUser?.displayName
    });

    // Obtener datos del usuario registrado
    // Construir nombre completo de manera robusta
    let nombre = 'Usuario';
    
    // Intentar obtener firstName y lastName del perfil
    const firstName = user.firstName?.toString().trim() || '';
    const lastName = user.lastName?.toString().trim() || '';
    
    console.log('📝 firstName del contexto:', firstName, '| lastName del contexto:', lastName);
    
    if (firstName && lastName) {
      // Si tenemos ambos, combinarlos
      nombre = `${firstName} ${lastName}`.trim();
      console.log('✅ Nombre completo construido desde firstName y lastName:', nombre);
    } else if (firstName) {
      // Si solo tenemos firstName
      nombre = firstName;
      console.log('✅ Nombre construido solo desde firstName:', nombre);
    } else if (lastName) {
      // Si solo tenemos lastName
      nombre = lastName;
      console.log('✅ Nombre construido solo desde lastName:', nombre);
    } else if (firebaseUser?.displayName) {
      // Si no tenemos firstName/lastName pero sí displayName
      nombre = firebaseUser.displayName.trim();
      console.log('✅ Nombre construido desde displayName:', nombre);
    }
    
    // Si después de todo esto el nombre sigue siendo 'Usuario', intentar con el email
    if (nombre === 'Usuario' || nombre.trim() === '') {
      const emailUser = user.email || firebaseUser?.email || '';
      if (emailUser) {
        // Extraer nombre del email como último recurso
        const emailName = emailUser.split('@')[0];
        nombre = emailName.charAt(0).toUpperCase() + emailName.slice(1);
        console.log('⚠️ Nombre construido desde email (último recurso):', nombre);
      }
    }
    
    const email = user.email || firebaseUser?.email || '';
    const telefono =
      String(
        user.phone ||
          (user as any).telefono ||
          (user as any).phoneNumber ||
          (user as any).movil ||
          (user as any).mobile ||
          fallbackPhone ||
          ''
      ).trim();

    if (!email) {
      Alert.alert('Error', 'No se encontró un email asociado a tu cuenta. Por favor, completa tu perfil.');
      return;
    }

    // Log para debug
    console.log('📝 Datos del usuario que se enviarán:', {
      nombre,
      email,
      telefono,
      nivel,
      userFirstName: firstName,
      userLastName: lastName,
      firebaseDisplayName: firebaseUser?.displayName
    });

    setLoading(true);

    try {
      let telefonoPayload = telefono;
      if (!telefonoPayload) {
        try {
          const raw = await AsyncStorage.getItem('matriculaFormData');
          if (raw) {
            const parsed = JSON.parse(raw);
            telefonoPayload = extractPhone(parsed);
          }
        } catch (error) {
          console.warn('No se pudo recargar teléfono de matrícula:', error);
        }
      }

      const payload = {
        nombre,
        email,
        telefono: telefonoPayload || '',
        nivel,
        mensaje: 'ME APUNTO EN EXAMEN PRESENCIAL',
      };

      try {
        await postSolicitud(payload);
      } catch (err: any) {
        // Reintentar 1 vez si fue timeout (Render free tier puede tardar en la primera petición)
        if (err?.name === 'AbortError') {
          console.warn('⏳ Timeout al solicitar examen presencial. Reintentando 1 vez...');
          await postSolicitud(payload);
        } else {
          throw err;
        }
      }

      Alert.alert(
        '¡Solicitud Enviada!',
        'Tu solicitud para el examen presencial ha sido enviada correctamente. Recibirás una confirmación por email.',
        [{ text: 'OK' }]
      );
    } catch (error: any) {
      console.error('Error enviando solicitud:', error);
      
      // Mensaje de error más específico
      let errorMessage = 'No se pudo enviar la solicitud. Por favor, intenta de nuevo.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'El servidor tardó demasiado en responder. Si es la primera vez, puede estar arrancando. Intenta de nuevo en 1 minuto.';
      } else if (error.name === 'TypeError' && error.message?.includes('fetch')) {
        errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet e intenta más tarde.';
      } else if (error.name === 'SyntaxError' || error.message?.includes('JSON')) {
        errorMessage = 'Error de comunicación con el servidor. Por favor, intenta más tarde.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonPress = () => {
    setShowInfoModal(true);
  };

  const handleAcceptInfo = () => {
    setShowInfoModal(false);
    handleSubmit();
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleButtonPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="calendar" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Apuntarse al Examen Presencial</Text>
          </>
        )}
      </TouchableOpacity>

      <Modal
        visible={showInfoModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowInfoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Ionicons name="information-circle" size={32} color="#4CAF50" />
                <Text style={styles.modalTitle}>Información del Examen Presencial</Text>
                <Text style={styles.modalTitleAr}>معلومات الامتحان الحضوري</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>📍 Lugar / المكان:</Text>
                <Text style={styles.infoText}>
                  Centro CETA Almunia de Doña Godina, Zaragoza
                </Text>
                <Text style={styles.infoTextAr}>
                  مركز CETA ألمونيا دي دونيا غودينا، سرقسطة
                </Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>📅 Fecha y Hora / التاريخ والوقت:</Text>
                <Text style={styles.infoText}>
                  Se comunicará la fecha y hora del examen por correo electrónico
                </Text>
                <Text style={styles.infoTextAr}>
                  سيتم إبلاغك بتاريخ ووقت الامتحان عبر البريد الإلكتروني
                </Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>⚠️ Importante / مهم:</Text>
                <Text style={styles.infoText}>
                  En el caso de que no puedas presentarte al examen por alguna razón, debes comunicarlo a la administración de la Academia en la sección "Solicitar ayuda".
                </Text>
                <Text style={styles.infoTextAr}>
                  في حالة عدم تمكنك من الحضور للامتحان لأي سبب، يجب إبلاغ إدارة الأكاديمية في قسم "طلب المساعدة".
                </Text>
              </View>

              <TouchableOpacity
                style={styles.acceptButton}
                onPress={handleAcceptInfo}
              >
                <Text style={styles.acceptButtonText}>Aceptar / موافق</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    textAlign: 'center',
  },
  modalTitleAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  infoSection: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  infoTextAr: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

