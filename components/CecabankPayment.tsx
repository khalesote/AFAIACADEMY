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
  const paymentHandledRef = useRef(false);

  const handlePayment = async () => {
    if (loading) return;
    const validation = validateCecabankConfig();
    if (!validation.isValid) {
      Alert.alert(
        'Pago no configurado',
        `Faltan variables: ${validation.errors.join(', ')}`
      );
      return;
    }
    // Directly proceed to payment without confirmation modal
    await confirmPayment();
  };

  const confirmPayment = async () => {
    try {
      setLoading(true);
      setShowModal(false);
      paymentHandledRef.current = false;

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
      const statusUrl = `${CECABANK_CONFIG.apiUrl}/api/cecabank/payment-status?orderId=${encodeURIComponent(String(numOperacion))}`;
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
        // Change button text
        document.addEventListener('DOMContentLoaded', function() {
          const buttons = document.querySelectorAll('input[type="submit"], button[type="submit"], button');
          buttons.forEach(button => {
            if (button.textContent && (button.textContent.includes('Continuar') || button.textContent.includes('continuar'))) {
              button.textContent = 'Pagar';
            }
            // Also check value for inputs
            if ('value' in button && button.value && (button.value.includes('Continuar') || button.value.includes('continuar'))) {
              button.value = 'Pagar';
            }
          });
          // Auto-submit after a short delay to load the form directly
          setTimeout(() => {
            submitForm();
          }, 1000);
        });
      </script>`;

      let modifiedHtml = formHtml.replace(scriptRegex, manualScript);
      // No longer adding extra button, just modifying existing one

      setWebViewHtml(modifiedHtml);
      setShowWebView(true);
      startPaymentStatusPolling(statusUrl);
    } catch (error: any) {
      setLoading(false);
      setShowModal(true);
      onPaymentError(error?.message || 'Error desconocido al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  const cancelPayment = () => {
    paymentHandledRef.current = false;
    setShowModal(false);
    setShowWebView(false);
    setLoading(false);
    onPaymentCancel();
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'PAYMENT_SUCCESS') {
        if (paymentHandledRef.current) return;
        paymentHandledRef.current = true;
        setShowWebView(false);
        onPaymentSuccess(data);
      } else if (data.type === 'PAYMENT_CANCEL') {
        if (paymentHandledRef.current) return;
        paymentHandledRef.current = true;
        setShowWebView(false);
        onPaymentCancel();
      } else if (data.type === 'PAYMENT_ERROR') {
        if (paymentHandledRef.current) return;
        paymentHandledRef.current = true;
        setShowWebView(false);
        onPaymentError(data.error || 'Error en el pago');
      }
    } catch {
      // Ignorar mensajes no válidos
    }
  };

  const handleNavigationChange = (navState: any) => {
    const currentUrl = (navState?.url || '').toLowerCase();
    const okUrl = (CECABANK_CONFIG.urlOk || '').toLowerCase();
    const koUrl = (CECABANK_CONFIG.urlKo || '').toLowerCase();
    if (!currentUrl) return;
    const isOk = (okUrl && currentUrl.startsWith(okUrl)) || currentUrl.includes('/api/cecabank/ok');
    const isKo = (koUrl && currentUrl.startsWith(koUrl)) || currentUrl.includes('/api/cecabank/ko');
    if (isOk) {
      if (paymentHandledRef.current) return;
      paymentHandledRef.current = true;
      setShowWebView(false);
      onPaymentSuccess({ type: 'PAYMENT_SUCCESS', url: navState.url });
      return;
    }
    if (isKo) {
      if (paymentHandledRef.current) return;
      paymentHandledRef.current = true;
      setShowWebView(false);
      onPaymentError('Pago cancelado o rechazado');
    }
  };

  const startPaymentStatusPolling = (statusUrl: string) => {
    let attempts = 0;
    const maxAttempts = 30;
    const intervalMs = 3000;

    const poll = async () => {
      if (paymentHandledRef.current) return;
      attempts += 1;
      try {
        const response = await fetch(statusUrl);
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'ok') {
            if (!paymentHandledRef.current) {
              paymentHandledRef.current = true;
              setShowWebView(false);
              onPaymentSuccess({ type: 'PAYMENT_SUCCESS', ...data });
            }
            return;
          }
          if (data.status === 'ko') {
            if (!paymentHandledRef.current) {
              paymentHandledRef.current = true;
              setShowWebView(false);
              onPaymentError('Pago cancelado o rechazado');
            }
            return;
          }
        }
      } catch {
        // ignore polling errors
      }
      if (attempts < maxAttempts && !paymentHandledRef.current) {
        setTimeout(poll, intervalMs);
      }
    };

    poll();
  };

  const handleShouldStartLoad = (request: any) => {
    try {
      if (request?.url) {
        handleNavigationChange({ url: request.url });
      }
    } catch {
      // ignore
    }
    return true;
  };

  const handleLoadEnd = (event: any) => {
    try {
      const url = event?.nativeEvent?.url;
      if (url) {
        handleNavigationChange({ url });
      }
    } catch {
      // ignore
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
            <Text style={styles.payButtonText}>Pagar</Text>
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
            <Text style={styles.webViewTitle}>Pago</Text>
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
            onNavigationStateChange={handleNavigationChange}
            onShouldStartLoadWithRequest={handleShouldStartLoad}
            onLoadEnd={handleLoadEnd}
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
