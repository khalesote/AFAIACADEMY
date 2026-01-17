import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { MaterialIcons } from '@expo/vector-icons';
import { CECABANK_CONFIG, validateCecabankConfig } from '../config/cecabank';
import { getCecabankDateTime, formatAmount, generateOrderId } from '../utils/cecabank';

interface CecabankPaymentProps {
  operationType: string;
  amount: number;
  description?: string;
  customerEmail?: string;
  customerName?: string;
  onPaymentSuccess: (paymentInfo: any) => void;
  onPaymentCancel: () => void;
  onPaymentError: (error: string) => void;
}

export default function CecabankPayment({
  operationType,
  amount,
  description,
  customerEmail,
  customerName,
  onPaymentSuccess,
  onPaymentCancel,
  onPaymentError,
}: CecabankPaymentProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [webViewHtml, setWebViewHtml] = useState('');
  const webViewRef = useRef<WebView>(null);

  const handlePayment = async () => {
    if (loading) return;
    const validation = validateCecabankConfig();
    if (!validation.isValid) {
      Alert.alert(
        'Cecabank no configurado',
        `Faltan variables: ${validation.errors.join(', ')}`
      );
      return;
    }
    setShowModal(true);
  };

  const confirmPayment = async () => {
    try {
      setLoading(true);
      setShowModal(false);

      const { fecha, hora } = getCecabankDateTime();
      const numOperacion = generateOrderId(operationType as any);
      const importe = formatAmount(amount);

      const formData = {
        MerchantID: CECABANK_CONFIG.merchantId,
        AcquirerBIN: CECABANK_CONFIG.acquirerBin,
        TerminalID: CECABANK_CONFIG.terminalId,
        Num_operacion: numOperacion,
        Importe: importe,
        TipoMoneda: CECABANK_CONFIG.tipoMoneda,
        Exponente: '2',
        Cifrado: 'SHA2',
        URL_OK: CECABANK_CONFIG.urlOk,
        URL_NOK: CECABANK_CONFIG.urlKo,
        URL_KO: CECABANK_CONFIG.urlKo,
        Idioma: CECABANK_CONFIG.idioma,
        Pago_soportado: 'SSL',
        Descripcion: description || `Matrícula ${operationType}`,
        FechaOperacion: fecha,
        HoraOperacion: hora,
        Firma: 'PLACEHOLDER',
        ...(customerEmail ? { Email: customerEmail } : {}),
        ...(customerName ? { Nombre: customerName } : {}),
      };

      console.log('🔗 Cecabank URLs (frontend):', {
        urlOk: CECABANK_CONFIG.urlOk,
        urlKo: CECABANK_CONFIG.urlKo,
        okLength: CECABANK_CONFIG.urlOk?.length || 0,
        koLength: CECABANK_CONFIG.urlKo?.length || 0,
      });

      const endpointUrl = `${CECABANK_CONFIG.apiUrl}/api/cecabank/redirect-clean`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      let response;
      try {
        response = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData as any).toString(),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        throw new Error(
          fetchError?.name === 'AbortError'
            ? 'La conexión con el servidor tardó demasiado. Intenta nuevamente.'
            : `Error de conexión: ${fetchError.message || 'No se pudo conectar'}`
        );
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText || 'Sin detalles'}`);
      }

      const formHtml = await response.text();
      if (!formHtml) {
        throw new Error('El backend no devolvió HTML válido');
      }

      const scriptRegex = /<script>[\s\S]*?<\/script>/g;
      const manualScript = `<script>
        function submitForm() {
          try {
            const form = document.getElementById('cecabankForm');
            if (form) { form.submit(); return true; }
          } catch (e) {}
          return false;
        }
        console.log('Cecabank form loaded - waiting for manual submit');
      </script>`;

      let modifiedHtml = formHtml.replace(scriptRegex, manualScript);
      modifiedHtml = modifiedHtml.replace(
        '<p>Por favor, espera mientras se procesa tu pago.</p>',
        '<p>Haz clic en "Continuar al Pago" para proceder.</p><button onclick="submitForm()" style="margin-top: 20px; padding: 15px 30px; background: #4CAF50; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold;">Continuar al Pago</button>'
      );

      setWebViewHtml(modifiedHtml);
      setShowWebView(true);
    } catch (error: any) {
      setLoading(false);
      setShowModal(true);
      onPaymentError(error?.message || 'Error desconocido al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  const cancelPayment = () => {
    setShowModal(false);
    setShowWebView(false);
    setLoading(false);
    onPaymentCancel();
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'PAYMENT_SUCCESS') {
        setShowWebView(false);
        onPaymentSuccess(data);
      } else if (data.type === 'PAYMENT_CANCEL') {
        setShowWebView(false);
        onPaymentCancel();
      } else if (data.type === 'PAYMENT_ERROR') {
        setShowWebView(false);
        onPaymentError(data.error || 'Error en el pago');
      }
    } catch {
      // Ignorar mensajes no válidos
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.payButton, loading && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <MaterialIcons name="payment" size={20} color="#fff" />
            <Text style={styles.payButtonText}>Pagar con Cecabank</Text>
          </>
        )}
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar pago</Text>
            <Text style={styles.modalText}>
              Vas a pagar {amount.toFixed(2)}€ con Cecabank.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={cancelPayment}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmButton} onPress={confirmPayment}>
                <Text style={styles.modalConfirmText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showWebView} animationType="slide">
        <View style={styles.webViewContainer}>
          <View style={styles.webViewHeader}>
            <Text style={styles.webViewTitle}>Pago Cecabank</Text>
            <TouchableOpacity onPress={cancelPayment}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <WebView
            ref={webViewRef}
            source={{
              html: webViewHtml,
              baseUrl:
                CECABANK_CONFIG.entorno === 'test'
                  ? 'https://tpv.ceca.es'
                  : 'https://pgw.ceca.es',
            }}
            onMessage={handleWebViewMessage}
            originWhitelist={['*']}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  payButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  payButtonDisabled: {
    opacity: 0.7,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 360,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#333',
    fontWeight: '600',
  },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  modalConfirmText: {
    color: '#fff',
    fontWeight: '600',
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webViewHeader: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  webViewTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
