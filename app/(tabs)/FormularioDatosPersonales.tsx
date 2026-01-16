import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Lista de provincias españolas
const PROVINCIAS = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
  'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
  'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva',
  'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga',
  'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja',
  'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Santa Cruz de Tenerife',
  'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
].sort();

export type TipoDocumento = 'NIE' | 'NIF' | 'PASAPORTE';

export type FormDataType = {
  nombre: string;
  apellido1: string;
  apellido2?: string;
  fechaNacimiento: string;
  provincia: string;
  localidad?: string;
  telefono: string;
  email: string;
  documento: string;
  tipoDocumento: TipoDocumento;
};

type FormularioDatosPersonalesProps = {
  modo?: 'matriculas' | 'formacion';
  onComplete?: (data: FormDataType) => void;
  onCancel?: () => void;
  initialData?: Partial<FormDataType>;
  showPasswordFields?: boolean;
  password?: string;
  confirmPassword?: string;
  onPasswordChange?: (password: string) => void;
  onConfirmPasswordChange?: (confirmPassword: string) => void;
};

export default function FormularioDatosPersonales({ 
  modo = 'matriculas', 
  onComplete, 
  onCancel, 
  initialData,
  showPasswordFields = false,
  password = '',
  confirmPassword = '',
  onPasswordChange,
  onConfirmPasswordChange
}: FormularioDatosPersonalesProps) {
  const router = useRouter();
  const { bloque } = useLocalSearchParams<{ bloque: string }>();

  const [formData, setFormData] = useState<FormDataType>({
    nombre: initialData?.nombre ?? '',
    apellido1: initialData?.apellido1 ?? '',
    apellido2: initialData?.apellido2 ?? '',
    fechaNacimiento: initialData?.fechaNacimiento ?? '',
    provincia: initialData?.provincia ?? '',
    localidad: initialData?.localidad ?? '',
    telefono: initialData?.telefono ?? '',
    email: initialData?.email ?? '',
    documento: initialData?.documento ?? '',
    tipoDocumento: initialData?.tipoDocumento ?? 'NIE'
  });
  
  const [showDateModal, setShowDateModal] = useState(false);
  const [showProvinceModal, setShowProvinceModal] = useState(false);
  const [showDocTypeModal, setShowDocTypeModal] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [tempProvince, setTempProvince] = useState('');
  const [tempDocType, setTempDocType] = useState<TipoDocumento>('NIE');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleInputChange = <K extends keyof FormDataType>(
    field: K,
    value: FormDataType[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateConfirm = () => {
    // Convertir la fecha a string en formato dd/mm/aaaa
    const day = String(tempDate.getDate()).padStart(2, '0');
    const month = String(tempDate.getMonth() + 1).padStart(2, '0');
    const year = tempDate.getFullYear();
    const fechaStr = `${day}/${month}/${year}`;
    
    handleInputChange('fechaNacimiento', fechaStr);
    setShowDateModal(false);
  };

  const handleProvinceSelect = (provincia: string) => {
    handleInputChange('provincia', provincia);
    setShowProvinceModal(false);
  };

  const handleDocTypeSelect = (tipo: TipoDocumento) => {
    handleInputChange('tipoDocumento', tipo);
    setShowDocTypeModal(false);
  };

  const validarFormulario = () => {
    const { nombre, apellido1, fechaNacimiento, provincia, localidad, telefono, documento, email } = formData;
    
    if (fechaNacimiento === null) {
      Alert.alert('Error', 'Por favor, introduce tu fecha de nacimiento');
      return false;
    }
    
    // Validar nombre
    if (!nombre.trim()) {
      Alert.alert('Error', 'Por favor, introduce tu nombre');
      return false;
    }
    
    // Validar primer apellido
    if (!apellido1.trim()) {
      Alert.alert('Error', 'Por favor, introduce tu primer apellido');
      return false;
    }
    
    // Validar fecha de nacimiento (formato dd/mm/aaaa)
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (!fechaNacimiento || !dateRegex.test(fechaNacimiento)) {
      Alert.alert('Error', 'Por favor, introduce una fecha de nacimiento válida (dd/mm/aaaa)');
      return false;
    }
    
    // Validar que la fecha sea válida
    const [day, month, year] = fechaNacimiento.split('/').map(Number);
    const fechaNac = new Date(year, month - 1, day);
    if (isNaN(fechaNac.getTime()) || 
        fechaNac.getDate() !== day || 
        fechaNac.getMonth() !== month - 1 || 
        fechaNac.getFullYear() !== year) {
      Alert.alert('Error', 'Por favor, introduce una fecha de nacimiento válida');
      return false;
    }
    
    // Validar provincia
    if (!provincia) {
      Alert.alert('Error', 'Por favor, selecciona tu provincia');
      return false;
    }

    // Validar localidad
    if (!localidad || !localidad.trim()) {
      Alert.alert('Error', 'Por favor, introduce tu localidad');
      return false;
    }
    
    // Validar email
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Por favor, introduce un correo electrónico válido');
      return false;
    }
    
    // Validar teléfono
    if (!telefono.trim() || telefono.length < 9) {
      Alert.alert('Error', 'Por favor, introduce un número de teléfono válido');
      return false;
    }
    
    // Validar documento
    if (!documento.trim()) {
      Alert.alert('Error', 'Por favor, introduce tu número de documento');
      return false;
    }
    return true;
  };

  const esFormacion = modo === 'formacion';

  const handleSiguiente = useCallback(() => {
    if (validarFormulario()) {
      // Navegar a la pantalla de pago con los datos del formulario
      const { nombre, apellido1, apellido2, fechaNacimiento, provincia, localidad, telefono, tipoDocumento, documento, email } = formData;
      
      if (!fechaNacimiento) {
        Alert.alert('Error', 'La fecha de nacimiento es requerida');
        return;
      }
      
      // Usar la fecha como string directamente
      const fechaFormateada = fechaNacimiento;
      const payload = {
        nombre,
        apellido1,
        apellido2,
        fechaNacimiento: fechaFormateada,
        provincia,
        localidad: localidad?.trim() || '',
        telefono,
        tipoDocumento,
        documento,
        email: email.trim()
      };
      
      if (onComplete) {
        onComplete(payload);
        return;
      }

      if (!esFormacion) {
        router.push({
          pathname: '/MatriculaScreen',
          params: {
            bloque,
            ...payload
          }
        });
      }
    }
  }, [formData, bloque, validarFormulario, router, onComplete, esFormacion]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {esFormacion && onCancel && (
        <TouchableOpacity 
          style={styles.cancelButtonTop}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonTextTop}>Cancelar</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.titulo}>Datos Personales</Text>
      <Text style={styles.subtitulo}>
        {esFormacion
          ? 'Completa tus datos para acceder con código de formación profesional'
          : 'Completa tus datos para continuar con la matrícula'}
      </Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          value={formData.nombre}
          onChangeText={(text: string) => handleInputChange('nombre', text)}
          placeholder="Tu nombre"
          placeholderTextColor="#999"
          editable={true}
          autoCapitalize="words"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Primer apellido *</Text>
        <TextInput
          style={styles.input}
          value={formData.apellido1}
          onChangeText={(text: string) => handleInputChange('apellido1', text)}
          placeholder="Primer apellido"
          placeholderTextColor="#999"
          editable={true}
          autoCapitalize="words"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Segundo apellido</Text>
        <TextInput
          style={styles.input}
          value={formData.apellido2}
          onChangeText={(text: string) => handleInputChange('apellido2', text)}
          placeholder="Segundo apellido (opcional)"
          placeholderTextColor="#999"
          editable={true}
          autoCapitalize="words"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha de nacimiento (dd/mm/aaaa) *</Text>
        <TextInput
          style={styles.input}
          value={formData.fechaNacimiento || ''}
          onChangeText={(text) => {
            // Eliminar todo lo que no sea número
            let cleaned = text.replace(/[^0-9]/g, '');
            
            // Limitar a 8 dígitos (ddmmyyyy)
            if (cleaned.length > 8) {
              cleaned = cleaned.substring(0, 8);
            }
            
            // Formatear con slash
            let formatted = '';
            if (cleaned.length > 4) {
              formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}/${cleaned.substring(4)}`;
            } else if (cleaned.length > 2) {
              formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
            } else {
              formatted = cleaned;
            }
            
            // Actualizar el estado
            setFormData(prev => ({
              ...prev,
              fechaNacimiento: formatted
            }));
          }}
          placeholder="dd/mm/aaaa"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          maxLength={10}
        />
        
        <Modal
          visible={showDateModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDateModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.datePickerContainer}>
                <Text style={styles.modalTitle}>Selecciona tu fecha de nacimiento</Text>
                <View style={styles.dateInputContainer}>
                  <TextInput
                    style={styles.dateInput}
                    value={tempDate.getDate().toString().padStart(2, '0')}
                    onChangeText={(day) => {
                      const newDate = new Date(tempDate);
                      newDate.setDate(parseInt(day, 10) || 1);
                      setTempDate(newDate);
                    }}
                    keyboardType="number-pad"
                    maxLength={2}
                    placeholder="DD"
                  />
                  <Text style={styles.dateSeparator}>/</Text>
                  <TextInput
                    style={styles.dateInput}
                    value={(tempDate.getMonth() + 1).toString().padStart(2, '0')}
                    onChangeText={(month) => {
                      const newDate = new Date(tempDate);
                      newDate.setMonth(parseInt(month, 10) || 1);
                      setTempDate(newDate);
                    }}
                    keyboardType="number-pad"
                    maxLength={2}
                    placeholder="MM"
                  />
                  <Text style={styles.dateSeparator}>/</Text>
                  <TextInput
                    style={styles.dateInput}
                    value={tempDate.getFullYear().toString()}
                    onChangeText={(year) => {
                      const newDate = new Date(tempDate);
                      newDate.setFullYear(parseInt(year, 10) || 2000);
                      setTempDate(newDate);
                    }}
                    keyboardType="number-pad"
                    maxLength={4}
                    placeholder="AAAA"
                  />
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setShowDateModal(false)}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={handleDateConfirm}
                  >
                    <Text style={[styles.buttonText, {color: '#fff'}]}>Aceptar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Correo electrónico *</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text: string) => handleInputChange('email', text)}
          placeholder="tu-correo@ejemplo.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Provincia *</Text>
        <TouchableOpacity 
          style={styles.input}
          onPress={() => {
            setTempProvince(formData.provincia);
            setShowProvinceModal(true);
          }}
        >
          <Text style={styles.inputText}>
            {formData.provincia || 'Selecciona una provincia'}
          </Text>
        </TouchableOpacity>
        
        <Modal
          visible={showProvinceModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowProvinceModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecciona tu provincia</Text>
              <ScrollView style={styles.modalScroll}>
                {PROVINCIAS.map((provincia, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.modalItem,
                      formData.provincia === provincia && styles.selectedItem
                    ]}
                    onPress={() => handleProvinceSelect(provincia)}
                  >
                    <Text style={styles.modalItemText}>{provincia}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowProvinceModal(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Localidad *</Text>
        <TextInput
          style={styles.input}
          value={formData.localidad || ''}
          onChangeText={(text: string) => handleInputChange('localidad', text)}
          placeholder="Tu localidad"
          placeholderTextColor="#999"
          editable={true}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Teléfono *</Text>
        <TextInput
          style={styles.input}
          value={formData.telefono}
          onChangeText={(text: string) => handleInputChange('telefono', text.replace(/[^0-9]/g, ''))}
          placeholder="Número de teléfono"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          editable={true}
          maxLength={9}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo de documento *</Text>
        <View style={styles.documentoContainer}>
          <TouchableOpacity 
            style={[styles.input, {flex: 1, marginRight: 10, justifyContent: 'center'}]}
            onPress={() => setShowDocTypeModal(true)}
          >
            <Text style={formData.tipoDocumento ? styles.inputText : styles.placeholderText}>
              {formData.tipoDocumento ? formData.tipoDocumento : 'Selecciona tipo de documento'}
            </Text>
          </TouchableOpacity>
          
          <Modal
            visible={showDocTypeModal}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowDocTypeModal(false)}
          >
            <TouchableWithoutFeedback onPress={() => setShowDocTypeModal(false)}>
              <View style={styles.modalOverlay}>
                <View style={styles.docTypeModalContent}>
                  <TouchableOpacity
                    style={[
                      styles.modalItem,
                      formData.tipoDocumento === 'PASAPORTE' && styles.selectedItem
                    ]}
                    onPress={() => handleDocTypeSelect('PASAPORTE' as TipoDocumento)}
                  >
                    <Text style={styles.modalItemText}>PASAPORTE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.modalItem,
                      formData.tipoDocumento === 'NIE' && styles.selectedItem
                    ]}
                    onPress={() => handleDocTypeSelect('NIE' as TipoDocumento)}
                  >
                    <Text style={styles.modalItemText}>NIE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.modalItem,
                      formData.tipoDocumento === 'NIF' && styles.selectedItem
                    ]}
                    onPress={() => handleDocTypeSelect('NIF' as TipoDocumento)}
                  >
                    <Text style={styles.modalItemText}>NIF</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            value={formData.documento}
            onChangeText={(text: string) => handleInputChange('documento', text.toUpperCase())}
            placeholder="Número de documento"
            placeholderTextColor="#999"
            editable={true}
            autoCapitalize="characters"
          />
        </View>
      </View>

      {/* Campos de contraseña (solo si showPasswordFields es true) */}
      {showPasswordFields && (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Contraseña *</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña (mínimo 6 caracteres)"
                placeholderTextColor="#999"
                value={password}
                onChangeText={onPasswordChange}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirmar Contraseña *</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirma tu contraseña"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={onConfirmPasswordChange}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      <TouchableOpacity
        style={styles.botonSiguiente}
        onPress={handleSiguiente}
      >
        <Text style={styles.textoBoton}>
          {showPasswordFields ? 'Registrarme' : 'Siguiente'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    flex: 1,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingRight: 10,
  },
  eyeIcon: {
    padding: 8,
  },
  inputText: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  documentoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Estilos para los modales
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
  },
  docTypeModalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: 250,
    maxWidth: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  modalScroll: {
    maxHeight: 300,
  },
  modalItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  datePickerContainer: {
    marginBottom: 15,
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  dateInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  dateSeparator: {
    fontSize: 20,
    color: '#333',
    marginHorizontal: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  botonSiguiente: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  // Estilos para el input de fecha
  datePickerButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    color: '#999',
  },
  cancelButtonTop: {
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 10,
  },
  cancelButtonTextTop: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});


