import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type AppointmentType = 'presencial' | 'telefonica' | '';

const formatDate = (text: string) => {
  const cleaned = text.replace(/\D/g, '');
  let formatted = '';
  if (cleaned.length >= 2) {
    formatted += cleaned.slice(0, 2) + '/';
    if (cleaned.length >= 4) {
      formatted += cleaned.slice(2, 4) + '/';
      if (cleaned.length > 4) {
        formatted += cleaned.slice(4, 8);
      }
    } else {
      formatted += cleaned.slice(2);
    }
  } else {
    formatted = cleaned;
  }
  return formatted;
};

export default function AsesoriaScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !email || !phone || !appointmentType || !date || !time) {
      Alert.alert('Error', 'Por favor complete todos los campos obligatorios\n\nالرجاء ملء جميع الحقول الإلزامية');
      return;
    }
    
    try {
      setLoading(true);
      
      const response = await fetch('https://academia-backend-s9np.onrender.com/api/enviar-solicitud-asesoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          appointmentType: appointmentType === 'presencial' ? 'Presencial' : 'Telefónica',
          date,
          time,
          notes: notes || 'Sin notas adicionales'
        })
      });

      const responseText = await response.text();
      let data: any = null;
      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch (parseError) {
        data = null;
      }

      if (!response.ok) {
        const serverMessage = data?.error || responseText || 'Error en la solicitud';
        throw new Error(serverMessage);
      }

      Alert.alert(
        'Email Enviado / تم إرسال البريد الإلكتروني',
        'Tu solicitud de asesoría ha sido enviada correctamente. Recibirás una confirmación por email.\n\nتم إرسال طلب الاستشارة بنجاح. ستتلقى تأكيدًا عبر البريد الإلكتروني.',
        [
          { text: 'OK / موافق', onPress: () => router.back() }
        ]
      );
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'No se pudo enviar la solicitud. Inténtalo de nuevo más tarde.\n\nلم يتم إرسال الطلب. حاول مرة أخرى لاحقاً.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="#FFD700" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Ionicons name="people-circle" size={50} color="#FFD700" />
          <Text style={styles.title}>Asesoría de Inmigración</Text>
          <Text style={styles.titleAr}>استشارات الهجرة</Text>
          <Text style={styles.subtitle}>Sesiones personalizadas de asesoramiento</Text>
          <Text style={styles.subtitleAr}>جلسات استشارية مخصصة</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nuestros Servicios</Text>
        <Text style={styles.sectionTitleAr}>خدماتنا</Text>
        <View style={styles.serviceCard}>
          <Ionicons name="document-text" size={24} color="#FFD700" />
          <View style={styles.serviceText}>
            <Text style={styles.serviceTitle}>Asesoría en Extranjería</Text>
            <Text style={styles.serviceTitleAr}>استشارات الجوازات والإقامة</Text>
            <Text style={styles.bodyText}>Orientación sobre trámites de residencia, nacionalidad, arraigo y más.</Text>
            <Text style={styles.arabicText}>توجيه بخصوص إجراءات الإقامة والجذور والجنسية والمزيد</Text>
          </View>
        </View>
        
        <View style={styles.serviceCard}>
          <Ionicons name="document-attach" size={24} color="#FFD700" />
          <View style={styles.serviceText}>
            <Text style={styles.serviceTitle}>Revisión de Documentación</Text>
            <Text style={styles.serviceTitleAr}>مراجعة الوثائق</Text>
            <Text style={styles.bodyText}>Verificamos que toda tu documentación esté en orden.</Text>
            <Text style={styles.arabicText}>نتأكد من أن جميع وثائقك في حالة جيدة</Text>
          </View>
        </View>
        
        <View style={styles.serviceCard}>
          <Ionicons name="people" size={24} color="#FFD700" />
          <View style={styles.serviceText}>
            <Text style={styles.serviceTitle}>Acompañamiento</Text>
            <Text style={styles.serviceTitleAr}>مرافقة</Text>
            <Text style={styles.bodyText}>Te acompañamos en tus citas y trámites oficiales.</Text>
            <Text style={styles.arabicText}>نرافقك في مواعيدك وإجراءاتك الرسمية</Text>
          </View>
        </View>

        <View style={styles.serviceCard}>
          <Ionicons name="briefcase" size={24} color="#FFD700" />
          <View style={styles.serviceText}>
            <Text style={styles.serviceTitle}>Formación y Empleo</Text>
            <Text style={styles.serviceTitleAr}>التدريب والتوظيف</Text>
            <Text style={styles.bodyText}>Te ayudamos a formarte y a encontrar un empleo.</Text>
            <Text style={styles.arabicText}>نساعدك في التدريب والعثور على عمل</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Solicitar Cita</Text>
        <Text style={styles.sectionTitleAr}>طلب موعد</Text>
        <Text style={styles.requiredField}>* Campos obligatorios</Text>
        <Text style={styles.requiredFieldAr}>* الحقول الإلزامية</Text>
        
        <Text style={styles.label}>Nombre completo *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nombre y apellidos / الاسم الكامل"
          placeholderTextColor="#777"
        />
        
        <Text style={styles.label}>Correo electrónico *</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="tu@email.com / بريدك الإلكتروني"
          placeholderTextColor="#777"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Text style={styles.label}>Teléfono *</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="+34 123 456 789 / رقم الهاتف"
          placeholderTextColor="#777"
          keyboardType="phone-pad"
        />
        
        <Text style={styles.label}>Tipo de cita *</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity 
            style={[styles.radioButton, appointmentType === 'presencial' && styles.radioButtonSelected]}
            onPress={() => setAppointmentType('presencial')}
          >
            <Ionicons 
              name={appointmentType === 'presencial' ? 'radio-button-on' : 'radio-button-off'} 
              size={24} 
              color={appointmentType === 'presencial' ? '#FFD700' : '#999'} 
            />
            <View>
              <Text style={styles.radioText}>Presencial</Text>
              <Text style={styles.radioTextAr}>حضوري</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.radioButton, appointmentType === 'telefonica' && styles.radioButtonSelected]}
            onPress={() => setAppointmentType('telefonica')}
          >
            <Ionicons 
              name={appointmentType === 'telefonica' ? 'radio-button-on' : 'radio-button-off'} 
              size={24} 
              color={appointmentType === 'telefonica' ? '#FFD700' : '#999'} 
            />
            <View>
              <Text style={styles.radioText}>Telefónica</Text>
              <Text style={styles.radioTextAr}>هاتفي</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Fecha *</Text>
            <TextInput
              style={[styles.input, styles.halfInput]}
              value={date}
              onChangeText={(text) => setDate(formatDate(text))}
              placeholder="DD/MM/AAAA / يوم/شهر/سنة"
              placeholderTextColor="#777"
            />
          </View>
          
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Hora *</Text>
            <TextInput
              style={[styles.input, styles.halfInput]}
              value={time}
              onChangeText={setTime}
              placeholder="HH:MM / ساعة:دقيقة"
              placeholderTextColor="#777"
            />
          </View>
        </View>
        
        <Text style={styles.label}>Notas adicionales</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Describe brevemente el motivo de tu consulta\n\nصف بإيجاز سبب استشارتك"
          placeholderTextColor="#777"
          multiline
          numberOfLines={4}
        />
        
        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <View style={styles.buttonTextContainer}>
            {loading ? (
              <ActivityIndicator color="#000" size="small" />
            ) : (
              <>
                <Text style={styles.submitButtonText}>Solicitar Cita</Text>
                <Text style={styles.submitButtonTextAr}>طلب موعد</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Horario de atención: Lunes a Viernes de 9:00 a 18:00</Text>
        <Text style={styles.footerTextAr}>ساعات العمل: من الاثنين إلى الجمعة من 9:00 إلى 18:00</Text>
        <Text style={styles.footerText}>Email: admin@academiadeinmigrantes.es</Text>
        <Text style={styles.footerText}>Teléfono: 665666288</Text>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 10,
    padding: 8,
  },
  headerContent: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
  },
  header: {
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FFD700',
    textAlign: 'center',
  },
  titleAr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginTop: 4,
    writingDirection: 'rtl',
  },
  subtitle: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  subtitleAr: {
    color: '#fff',
    marginTop: 2,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  section: {
    backgroundColor: '#111',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFD700',
  },
  sectionTitleAr: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFD700',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  serviceTitleAr: {
    fontWeight: '600',
    color: '#FFD700',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  bodyText: {
    color: '#fff',
  },
  arabicText: {
    color: '#d0d0d0',
    textAlign: 'right',
    writingDirection: 'rtl',
    fontSize: 13,
    marginTop: 2,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
  },
  serviceText: {
    marginLeft: 15,
    flex: 1,
  },
  serviceTitle: {
    fontWeight: '600',
    marginBottom: 5,
    color: '#FFD700',
  },
  requiredField: {
    color: '#FFD700',
    fontSize: 12,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  requiredFieldAr: {
    color: '#FFD700',
    fontSize: 12,
    marginBottom: 15,
    fontStyle: 'italic',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  label: {
    marginBottom: 5,
    color: '#FFD700',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#111',
    color: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    padding: 8,
    borderRadius: 4,
  },
  radioButtonSelected: {
    backgroundColor: '#222',
  },
  radioText: {
    marginLeft: 8,
    color: '#fff',
  },
  radioTextAr: {
    fontSize: 12,
    textAlign: 'center',
    writingDirection: 'rtl',
    color: '#d0d0d0',
  },
  buttonTextContainer: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    width: '48%',
  },
  halfInput: {
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonTextAr: {
    color: '#000',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#000',
  },
  footerText: {
    color: '#666',
    marginBottom: 3,
    textAlign: 'center',
  },
  footerTextAr: {
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  submitButtonTextAr: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
