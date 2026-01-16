import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ContactFormScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

    setLoading(true);

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        '¡Mensaje Enviado!', 
        'Gracias por contactarnos. Te responderemos pronto.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Limpiar formulario
              setName('');
              setEmail('');
              setPhone('');
              setSubject('');
              setMessage('');
              router.back();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#4CAF50', '#388E3C']}
        style={styles.background}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Formulario de Contacto</Text>
              <Text style={styles.headerTitleAr}>نموذج الاتصال</Text>
            </View>
          </View>

          {/* Información de Contacto */}
          <View style={styles.contactInfo}>
            <Text style={styles.contactInfoTitle}>Información de Contacto</Text>
            <Text style={styles.contactInfoTitleAr}>معلومات الاتصال</Text>
            
            <View style={styles.contactItem}>
              <Ionicons name="globe" size={20} color="#fff" />
              <Text style={styles.contactText}>www.afaiacademiadeinmigrantes.com</Text>
            </View>
            
            <View style={styles.contactItem}>
              <Ionicons name="mail" size={20} color="#fff" />
              <Text style={styles.contactText}>somos@afaiacademiadeinmigrantes.com</Text>
            </View>
            
            <View style={styles.contactItem}>
              <Ionicons name="call" size={20} color="#fff" />
              <Text style={styles.contactText}>665 666 288</Text>
            </View>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Envíanos tu mensaje</Text>
            <Text style={styles.formTitleAr}>أرسل لنا رسالتك</Text>
            
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre completo *"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico *"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="call" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Teléfono (opcional)"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="document-text" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Asunto *"
                value={subject}
                onChangeText={setSubject}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.textAreaContainer}>
              <Ionicons name="chatbubble" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.textArea}
                placeholder="Tu mensaje *"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              <LinearGradient
                colors={['#4CAF50', '#388E3C']}
                style={styles.submitButtonGradient}
              >
                {loading ? (
                  <Text style={styles.submitButtonText}>Enviando...</Text>
                ) : (
                  <Text style={styles.submitButtonText}>Enviar Mensaje</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  headerTitleContainer: {
    flexDirection: 'column',
    marginLeft: 16,
  },
  headerTitleAr: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    opacity: 0.9,
    writingDirection: 'rtl',
  },
  contactInfo: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  contactInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  contactInfoTitleAr: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    opacity: 0.9,
    marginBottom: 16,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  formTitleAr: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  textAreaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  textArea: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
    minHeight: 120,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 