import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { useRouter } from 'expo-router';

import { Colors } from '../../constants/Colors';
import { useUser } from '../../contexts/UserContext';
import {
  ARRAIGO_TYPES,
  ArraigoRequirement,
  ArraigoType,
  ArraigoTypeId,
} from '../../constants/arraigosRequirements';

type RequirementAttachment = {
  requirementId: string;
  requirementTitle: string;
  originalName: string;
  pdfUri: string;
  pdfBase64: string;
  createdAt: number;
};

type AttachmentState = Partial<
  Record<ArraigoTypeId, Record<string, RequirementAttachment>>
>;

const AD_COPY = {
  title: 'Asesoría Legal de Confianza',
  body:
    'Colaboramos con la abogada Kassandra Ekay, especialista en extranjería en Zaragoza. Te acompañamos en todo el proceso para conseguir tu autorización de residencia por arraigo.',
  cta: 'Solicita tu revisión legal',
};

export default function ArraigosScreen() {
  const router = useRouter();
  const { user } = useUser();

  const [selectedTypeId, setSelectedTypeId] = useState<ArraigoTypeId>('social');
  const [attachments, setAttachments] = useState<AttachmentState>({});
  const [processingRequirement, setProcessingRequirement] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.telefono || '',
    message: '',
  });

  useEffect(() => {
    setForm((prev) => ({
      name: prev.name || user?.name || '',
      email: prev.email || user?.email || '',
      phone: prev.phone || user?.telefono || '',
      message: prev.message,
    }));
  }, [user?.name, user?.email, user?.telefono]);

  const selectedType: ArraigoType = useMemo(() => {
    return (
      ARRAIGO_TYPES.find((type) => type.id === selectedTypeId) || ARRAIGO_TYPES[0]
    );
  }, [selectedTypeId]);

  const attachmentCount = useMemo(() => {
    const current = attachments[selectedTypeId] || {};
    return Object.keys(current).length;
  }, [attachments, selectedTypeId]);

  const updateAttachment = (
    typeId: ArraigoTypeId,
    requirementId: string,
    data: RequirementAttachment | null
  ) => {
    setAttachments((prev) => {
      const typeAttachments = { ...(prev[typeId] || {}) };
      if (data) {
        typeAttachments[requirementId] = data;
      } else {
        delete typeAttachments[requirementId];
      }
      return {
        ...prev,
        [typeId]: typeAttachments,
      };
    });
  };

  const handlePickDocument = async (
    typeId: ArraigoTypeId,
    requirement: ArraigoRequirement
  ) => {
    try {
      setProcessingRequirement(requirement.id);
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.length) {
        setProcessingRequirement(null);
        return;
      }

      const file = result.assets[0];
      const originalName = file.name || `documento-${Date.now()}`;

      let pdfUri = file.uri;
      let pdfBase64 = '';

      const isPdf = (file.mimeType || '').includes('pdf');
      if (isPdf) {
        pdfBase64 = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      } else {
        const base64Image = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const imageMime = file.mimeType || 'image/jpeg';
        const html = `
          <html>
            <body style="margin:0;padding:0;background:#fff;display:flex;align-items:center;justify-content:center;">
              <img src="data:${imageMime};base64,${base64Image}" style="width:100%;height:auto;object-fit:contain;" />
            </body>
          </html>
        `;
        const pdfResult = await Print.printToFileAsync({ html, base64: true });
        pdfUri = pdfResult.uri;
        pdfBase64 = pdfResult.base64 ||
          (await FileSystem.readAsStringAsync(pdfUri, {
            encoding: FileSystem.EncodingType.Base64,
          }));
      }

      updateAttachment(typeId, requirement.id, {
        requirementId: requirement.id,
        requirementTitle: requirement.title,
        originalName,
        pdfUri,
        pdfBase64,
        createdAt: Date.now(),
      });
      Alert.alert(
        'Documento listo',
        `Convertimos "${originalName}" a PDF para ${requirement.title}.`
      );
    } catch (error) {
      console.error('Error adjuntando documento', error);
      Alert.alert('Error', 'No se pudo procesar el documento. Inténtalo de nuevo.');
    } finally {
      setProcessingRequirement(null);
    }
  };

  const submitRequest = async (missingMandatory: string[]) => {
    const normalizedBackendUrl = (process.env.EXPO_PUBLIC_BACKEND_URL
      || process.env.EXPO_PUBLIC_CECABANK_API_URL
      || '')
      .replace(/\/$/, '')
      .replace(/\/api$/, '');
    const rawCandidates = [
      normalizedBackendUrl,
      'https://academia-backend-s9np.onrender.com',
    ].filter(Boolean);
    const backendCandidates = rawCandidates.filter((url) => {
      const isFrontendDomain = url.includes('academiadeinmigrantes.es') && !url.includes('backend');
      return !isFrontendDomain;
    });
    if (!backendCandidates.length) {
      backendCandidates.push(...rawCandidates);
    }
    if (!backendCandidates.length) {
      Alert.alert('Configuración faltante', 'No se ha definido EXPO_PUBLIC_BACKEND_URL.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      arraigoTypeId: selectedTypeId,
      arraigoTypeTitle: selectedType.title,
      attachments: Object.values(attachments[selectedTypeId] || {}),
      missingMandatory,
    };

    try {
      setSending(true);
      let response: Response | null = null;
      let text = '';
      const attempts: Array<{ url: string; status?: number }> = [];

      for (const baseUrl of backendCandidates) {
        try {
          response = await fetch(`${baseUrl}/api/arraigos/enviar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          text = await response.text();
          attempts.push({ url: baseUrl, status: response.status });
          const looksLikeRouteMissing =
            response.status === 404
            || response.status === 405
            || text.includes('Cannot POST /api/arraigos/enviar');
          if (!looksLikeRouteMissing) {
            break;
          }
        } catch (networkError) {
          attempts.push({ url: baseUrl });
          continue;
        }
      }
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (parseError) {
        data = null;
      }

      if (!response || !response.ok) {
        const serverMessage = data?.error || text || 'No se pudo enviar la solicitud.';
        const attemptInfo = attempts.length
          ? ` (Intentos: ${attempts.map((item) => `${item.url}${item.status ? ` -> ${item.status}` : ''}`).join(', ')})`
          : '';
        throw new Error(serverMessage + attemptInfo);
      }

      Alert.alert(
        'Solicitud enviada',
        missingMandatory.length
          ? 'Enviamos tu solicitud. Te guiaremos sobre los documentos pendientes por email.'
          : 'Tu solicitud de arraigo fue enviada para verificación. Te contactaremos por email.'
      );
      setAttachments((prev) => ({ ...prev, [selectedTypeId]: {} }));
      setForm((prev) => ({ ...prev, message: '' }));
      router.back();
    } catch (error: any) {
      console.error('Error enviando arraigo', error);
      Alert.alert('Error', error.message || 'Hubo un problema enviando los documentos.');
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone) {
      Alert.alert('Campos incompletos', 'Completa nombre, email y teléfono para continuar.');
      return;
    }

    const mandatoryMissing = selectedType.requirements
      .filter((req) => req.mandatory && !attachments[selectedTypeId]?.[req.id])
      .map((req) => req.title);

    if (mandatoryMissing.length > 0) {
      Alert.alert(
        'Documentos pendientes',
        `Faltan: ${mandatoryMissing.join(', ')}. ¿Quieres enviar la solicitud y completarlos más tarde?`,
        [
          { text: 'Seguir preparando', style: 'cancel' },
          { text: 'Enviar de todos modos', onPress: () => submitRequest(mandatoryMissing) },
        ]
      );
      return;
    }

    submitRequest([]);
  };

  const renderRequirement = (requirement: ArraigoRequirement) => {
    const currentAttachment = attachments[selectedTypeId]?.[requirement.id];
    const isProcessing = processingRequirement === requirement.id;

    return (
      <View key={requirement.id} style={styles.requirementCard}>
        <View style={styles.requirementHeader}>
          <Text style={styles.requirementTitle}>{requirement.title}</Text>
          {requirement.mandatory && <Text style={styles.badge}>Obligatorio</Text>}
        </View>
        <Text style={styles.requirementDescription}>{requirement.description}</Text>

        {currentAttachment ? (
          <View style={styles.attachmentInfo}>
            <Ionicons name="document-text" size={20} color={Colors.light.tint} />
            <View style={{ flex: 1 }}>
              <Text style={styles.attachmentName}>{currentAttachment.originalName}</Text>
              <Text style={styles.attachmentMeta}>
                PDF generado el {new Date(currentAttachment.createdAt).toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => updateAttachment(selectedTypeId, requirement.id, null)}
              style={styles.removeButton}
            >
              <Ionicons name="trash" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handlePickDocument(selectedTypeId, requirement)}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="cloud-upload" size={18} color="#fff" />
                <Text style={styles.uploadButtonText}>Adjuntar foto / PDF</Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.heroCard}>
        <Text style={styles.heroOverline}>Arraigos 2025</Text>
        <Text style={styles.heroTitle}>Regulariza tu situación con acompañamiento experto</Text>
        <Text style={styles.heroSubtitle}>
          Selecciona tu tipo de arraigo, adjunta los requisitos y envíanos tus documentos en PDF para verificación profesional.
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typePills}
      >
        {ARRAIGO_TYPES.map((type) => {
          const isSelected = type.id === selectedTypeId;
          return (
            <TouchableOpacity
              key={type.id}
              style={[styles.typePill, isSelected && styles.typePillSelected]}
              onPress={() => setSelectedTypeId(type.id)}
            >
              <Text style={[styles.typePillText, isSelected && styles.typePillTextSelected]}>
                {type.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.typeCard}>
        <Text style={styles.typeSubtitle}>{selectedType.subtitle}</Text>
        <Text style={styles.typeSummary}>{selectedType.summary}</Text>
        <Text style={styles.requirementCount}>
          {attachmentCount}/{selectedType.requirements.length} documentos preparados
        </Text>
      </View>

      <View style={styles.adCard}>
        <LinearGradient
          colors={['#1c2e4a', '#0b1829']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.adGradient}
        >
          <Text style={styles.adTitle}>{AD_COPY.title}</Text>
          <Text style={styles.adBody}>{AD_COPY.body}</Text>
          <View style={styles.adFooter}>
            <View>
              <Text style={styles.lawyerName}>Kassandra Ekay</Text>
              <Text style={styles.lawyerRole}>Abogada de extranjería · Zaragoza</Text>
            </View>
            <Ionicons name="shield-checkmark" size={26} color="#7ddfff" />
          </View>
          <TouchableOpacity style={styles.adButton}>
            <Text style={styles.adButtonText}>{AD_COPY.cta}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Requisitos</Text>
        <Text style={styles.sectionSubtitle}>Adjunta fotos o PDFs para cada documento</Text>
      </View>

      {selectedType.requirements.map(renderRequirement)}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Tus datos de contacto</Text>
        <Text style={styles.sectionSubtitle}>Necesarios para enviarte confirmación</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre completo *</Text>
        <TextInput
          value={form.name}
          onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))}
          placeholder="Ej: Amina Ben Ali"
          style={styles.input}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          value={form.email}
          onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))}
          placeholder="correo@ejemplo.com"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Teléfono *</Text>
        <TextInput
          value={form.phone}
          onChangeText={(value) => setForm((prev) => ({ ...prev, phone: value }))}
          placeholder="+34 600 000 000"
          style={styles.input}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Notas adicionales</Text>
        <TextInput
          value={form.message}
          onChangeText={(value) => setForm((prev) => ({ ...prev, message: value }))}
          placeholder="Cuéntanos tu situación o dudas principales"
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, sending && { opacity: 0.6 }]}
        disabled={sending}
        onPress={handleSubmit}
      >
        {sending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="send" size={18} color="#fff" />
            <Text style={styles.submitButtonText}>Enviar para verificación</Text>
          </>
        )}
      </TouchableOpacity>
      <Text style={styles.disclaimer}>
        Al enviar aceptas que revisemos tus documentos y te contactemos por email para continuar con el proceso.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  heroOverline: {
    color: '#4c6ef5',
    fontWeight: '600',
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#555',
    lineHeight: 20,
  },
  typePills: {
    paddingVertical: 10,
  },
  typePill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d9def0',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  typePillSelected: {
    backgroundColor: '#111936',
    borderColor: '#111936',
  },
  typePillText: {
    color: '#1b2a49',
    fontWeight: '600',
  },
  typePillTextSelected: {
    color: '#fff',
  },
  typeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e6eaf6',
  },
  typeSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
  },
  typeSummary: {
    color: '#444',
    lineHeight: 20,
    marginBottom: 10,
  },
  requirementCount: {
    color: '#1f8a70',
    fontWeight: '600',
  },
  adCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  adGradient: {
    padding: 20,
  },
  adTitle: {
    color: '#9fd3ff',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  adBody: {
    color: '#f4fbff',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 14,
  },
  adFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  lawyerName: {
    color: '#fff',
    fontWeight: '700',
  },
  lawyerRole: {
    color: '#7ddfff',
    fontSize: 12,
  },
  adButton: {
    backgroundColor: '#7ddfff',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  adButtonText: {
    color: '#082037',
    fontWeight: '700',
  },
  sectionHeader: {
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  sectionSubtitle: {
    color: '#666',
    marginTop: 4,
  },
  requirementCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e4e9f7',
  },
  requirementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  requirementTitle: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
    color: '#11233a',
  },
  requirementDescription: {
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },
  badge: {
    backgroundColor: '#ffe8cc',
    color: '#ad4e00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c7ed6',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  attachmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f1f5ff',
    borderRadius: 12,
  },
  attachmentName: {
    fontWeight: '600',
    color: '#1b2a49',
  },
  attachmentMeta: {
    color: '#5c6c8f',
    fontSize: 12,
  },
  removeButton: {
    backgroundColor: '#e03131',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  formGroup: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e6eaf6',
    marginBottom: 24,
  },
  label: {
    fontWeight: '600',
    color: '#111',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d9def0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    color: '#111',
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111936',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    color: '#5c6c8f',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
