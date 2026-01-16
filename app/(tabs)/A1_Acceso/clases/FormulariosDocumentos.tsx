import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormulariosDocumentos() {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState(0);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    nacionalidad: '',
    direccion: '',
    telefono: '',
    email: '',
    profesion: ''
  });

  const forms = [
    {
      title: 'Formulario de Registro',
      titleAr: 'نموذج التسجيل',
      description: 'Completa este formulario con tus datos personales',
      descriptionAr: 'أكمل هذا النموذج ببياناتك الشخصية',
      fields: [
        { key: 'nombre', label: 'Nombre / الاسم', placeholder: 'Ej: Ahmed' },
        { key: 'apellidos', label: 'Apellidos / اللقب', placeholder: 'Ej: Hassan' },
        { key: 'fechaNacimiento', label: 'Fecha de nacimiento / تاريخ الميلاد', placeholder: 'Ej: 15/03/1990' },
        { key: 'nacionalidad', label: 'Nacionalidad / الجنسية', placeholder: 'Ej: Marruecos' },
      ]
    },
    {
      title: 'Formulario de Contacto',
      titleAr: 'نموذج الاتصال',
      description: 'Rellena tus datos de contacto',
      descriptionAr: 'املأ بيانات الاتصال الخاصة بك',
      fields: [
        { key: 'direccion', label: 'Dirección / العنوان', placeholder: 'Ej: Calle Mayor, 15' },
        { key: 'telefono', label: 'Teléfono / الهاتف', placeholder: 'Ej: 612345678' },
        { key: 'email', label: 'Correo electrónico / البريد الإلكتروني', placeholder: 'Ej: ahmed@ejemplo.com' },
      ]
    },
    {
      title: 'Formulario de Trabajo',
      titleAr: 'نموذج العمل',
      description: 'Completa tus datos profesionales',
      descriptionAr: 'أكمل بياناتك المهنية',
      fields: [
        { key: 'profesion', label: 'Profesión / المهنة', placeholder: 'Ej: Estudiante' },
        { key: 'nombre', label: 'Nombre completo / الاسم الكامل', placeholder: 'Ej: Ahmed Hassan' },
        { key: 'telefono', label: 'Teléfono de contacto / هاتف الاتصال', placeholder: 'Ej: 612345678' },
      ]
    }
  ];

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const currentFormFields = forms[currentForm].fields;
    const allFilled = currentFormFields.every(field => formData[field.key as keyof typeof formData]?.trim() !== '');
    
    if (!allFilled) {
      Alert.alert(
        'Formulario incompleto',
        'Por favor, completa todos los campos.',
        [{ text: 'Entendido / فهمت' }]
      );
      return;
    }

    Alert.alert(
      '¡Formulario completado!',
      'Has rellenado correctamente el formulario.',
      [
        {
          text: 'Siguiente formulario',
          onPress: () => {
            if (currentForm < forms.length - 1) {
              setCurrentForm(currentForm + 1);
              setFormData({
                nombre: '',
                apellidos: '',
                fechaNacimiento: '',
                nacionalidad: '',
                direccion: '',
                telefono: '',
                email: '',
                profesion: ''
              });
            } else {
              handleComplete();
            }
          }
        }
      ]
    );
  };

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('A1_Formularios_Completed', 'true');
      Alert.alert(
        '¡Felicidades!',
        'Has completado todos los ejercicios de formularios.',
        [
          {
            text: 'Volver al menú',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      console.error('Error guardando progreso:', error);
    }
  };

  const currentFormData = forms[currentForm];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#79A890" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.title}>Formularios y Documentos</Text>
          <Text style={styles.titleAr}>النماذج والوثائق</Text>
          <Text style={styles.progress}>{currentForm + 1} / {forms.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <Ionicons name="document-text" size={30} color="#79A890" />
            <View style={styles.formTitleContainer}>
              <Text style={styles.formTitle}>{currentFormData.title}</Text>
              <Text style={styles.formTitleAr}>{currentFormData.titleAr}</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{currentFormData.description}</Text>
            <Text style={styles.descriptionAr}>{currentFormData.descriptionAr}</Text>
          </View>

          <View style={styles.fieldsContainer}>
            {currentFormData.fields.map((field, index) => (
              <View key={index} style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData[field.key as keyof typeof formData] || ''}
                  onChangeText={(value) => handleInputChange(field.key, value)}
                  placeholder={field.placeholder}
                  placeholderTextColor="#999"
                />
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <LinearGradient
              colors={['#9DC3AA', '#79A890']}
              style={styles.submitButtonGradient}
            >
              <Text style={styles.submitButtonText}>Enviar Formulario</Text>
              <Text style={styles.submitButtonTextAr}>إرسال النموذج</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={24} color="#79A890" />
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Según el MCER nivel A1, debes poder rellenar formularios con datos personales básicos.
            </Text>
            <Text style={styles.infoTextAr}>
              وفقاً للإطار الأوروبي المرجعي المشترك للمستوى A1، يجب أن تكون قادراً على ملء النماذج بالبيانات الشخصية الأساسية.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  titleAr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: 4,
  },
  progress: {
    fontSize: 16,
    color: '#79A890',
    fontWeight: 'bold',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  formTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#79A890',
  },
  formTitleAr: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    writingDirection: 'rtl',
    marginTop: 4,
  },
  descriptionContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  descriptionAr: {
    fontSize: 14,
    color: '#666',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  fieldsContainer: {
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  submitButton: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
  },
  submitButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButtonTextAr: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: 4,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#79A890',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#1b5e20',
    marginBottom: 8,
    lineHeight: 20,
  },
  infoTextAr: {
    fontSize: 12,
    color: '#1b5e20',
    writingDirection: 'rtl',
    textAlign: 'right',
    lineHeight: 18,
  },
});





























