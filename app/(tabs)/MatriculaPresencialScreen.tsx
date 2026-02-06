import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';

const LEVEL_OPTIONS = ['A1', 'A2', 'B1', 'B2'];
const LOCATION_ADDRESS = 'Calle del Dr Val-Carreres Ortiz, 7 Zaragoza 50004';

const buildBackendUrl = () => {
  return (process.env.EXPO_PUBLIC_BACKEND_URL
    || process.env.EXPO_PUBLIC_CECABANK_API_URL
    || 'https://academia-backend-s9np.onrender.com')
    .replace(/\/$/, '')
    .replace(/\/api$/, '');
};

export default function MatriculaPresencialScreen() {
  const router = useRouter();
  const { user, firebaseUser } = useUser();

  const initialName = useMemo(() => {
    const firstName = (user?.firstName || '').trim();
    const lastName = (user?.lastName || '').trim();
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    return fullName || user?.name || firebaseUser?.displayName || '';
  }, [user?.firstName, user?.lastName, user?.name, firebaseUser?.displayName]);

  const initialEmail = user?.email || firebaseUser?.email || '';
  const initialPhone = String(user?.telefono || (user as any)?.phone || (user as any)?.phoneNumber || '').trim();

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [level, setLevel] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !phone || !level) {
      Alert.alert(
        'Campos obligatorios',
        'Completa nombre, email, teléfono y nivel.\n\nيرجى إكمال الاسم والبريد والهاتف والمستوى.'
      );
      return;
    }

    const backendUrl = buildBackendUrl();

    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/solicitar-matricula-presencial`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: name.trim(),
          email: email.trim(),
          telefono: phone.trim(),
          nivel: level,
          mensaje: notes.trim() || 'Solicitud de matrícula presencial',
          direccion: LOCATION_ADDRESS,
        }),
      });

      const text = await response.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (error) {
        data = null;
      }

      if (!response.ok) {
        const serverMessage = data?.error || text || 'No se pudo enviar la solicitud.';
        throw new Error(serverMessage);
      }

      Alert.alert(
        'Solicitud enviada',
        'Recibimos tu solicitud de matrícula presencial. Te contactaremos por email.\n\nتم استلام طلب التسجيل الحضوري. سنتواصل معك عبر البريد الإلكتروني.',
        [{ text: 'OK / موافق', onPress: () => router.back() }]
      );
    } catch (error: any) {
      console.error('Error enviando solicitud de matrícula presencial:', error);
      Alert.alert(
        'Error',
        error.message || 'No se pudo enviar la solicitud. Inténtalo de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000', '#111']} style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="#FFD700" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>Matrícula Presencial</Text>
            <Text style={styles.titleAr}>التسجيل الحضوري</Text>
            <Text style={styles.subtitle}>Solicita tu plaza en nuestra sede</Text>
            <Text style={styles.subtitleAr}>اطلب مكانك في مقرنا</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.addressCard}>
            <Ionicons name="location" size={20} color="#FFD700" />
            <View style={styles.addressText}>
              <Text style={styles.addressTitle}>Dirección</Text>
              <Text style={styles.addressBody}>{LOCATION_ADDRESS}</Text>
              <Text style={styles.addressTitleAr}>العنوان</Text>
              <Text style={styles.addressBodyAr}>Calle del Dr Val-Carreres Ortiz, 7، سرقسطة 50004</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Datos de contacto</Text>
            <Text style={styles.sectionTitleAr}>بيانات التواصل</Text>

            <Text style={styles.label}>Nombre completo *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nombre y apellidos"
              placeholderTextColor="#777"
            />

            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="correo@ejemplo.com"
              placeholderTextColor="#777"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Teléfono *</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+34 600 000 000"
              placeholderTextColor="#777"
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Nivel *</Text>
            <View style={styles.levelRow}>
              {LEVEL_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.levelButton, level === option && styles.levelButtonActive]}
                  onPress={() => setLevel(option)}
                >
                  <Text style={[styles.levelButtonText, level === option && styles.levelButtonTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Notas adicionales</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Cuéntanos tu horario o dudas"
              placeholderTextColor="#777"
              multiline
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#111" />
            ) : (
              <>
                <Ionicons name="send" size={18} color="#111" />
                <Text style={styles.submitText}>Enviar solicitud</Text>
                <Text style={styles.submitTextAr}>إرسال الطلب</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: '700',
  },
  titleAr: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  subtitle: {
    color: '#d9d9d9',
    marginTop: 4,
  },
  subtitleAr: {
    color: '#d9d9d9',
    marginTop: 2,
    writingDirection: 'rtl',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  addressCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  addressText: {
    flex: 1,
  },
  addressTitle: {
    color: '#FFD700',
    fontWeight: '700',
    marginBottom: 4,
  },
  addressBody: {
    color: '#f1f1f1',
    marginBottom: 8,
  },
  addressTitleAr: {
    color: '#FFD700',
    fontWeight: '700',
    marginTop: 6,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  addressBodyAr: {
    color: '#f1f1f1',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  sectionTitleAr: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 10,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  label: {
    color: '#111',
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e3e6ef',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#111',
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  levelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  levelButton: {
    borderWidth: 1,
    borderColor: '#d4d9e5',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  levelButtonActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },
  levelButtonText: {
    color: '#111',
    fontWeight: '600',
  },
  levelButtonTextActive: {
    color: '#FFD700',
  },
  submitButton: {
    backgroundColor: '#FFD700',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
  },
  submitText: {
    color: '#111',
    fontWeight: '700',
  },
  submitTextAr: {
    color: '#111',
    fontWeight: '700',
    writingDirection: 'rtl',
  },
});
