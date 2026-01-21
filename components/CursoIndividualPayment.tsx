import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, Modal, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import FormacionAccessCodeInput from './FormacionAccessCodeInput';
import { markFormacionCodeAsUsed } from '../utils/accessCodes';
import { useUser } from '@/contexts/UserContext';
import { CECABANK_CONFIG, validateCecabankConfig } from '../config/cecabank';
import { getCecabankDateTime, formatAmount, generateOrderId } from '../utils/cecabank';

const PRECIO_BASE = 4; // Precio base de preformación (sin IVA)
const IVA_RATE = 0.21; // 21% IVA

interface CursoIndividualPaymentProps {
  curso: {
    key: string;
    label: string;
    labelAr: string;
    descripcion?: string;
    descripcionAr?: string;
    icon: string;
    color: string;
    screen: string;
  };
  onPaymentSuccess: (cursoKey: string) => void;
  onCancel: () => void;
  visible: boolean;
}

export default function CursoIndividualPayment({ 
  curso, 
  onPaymentSuccess, 
  onCancel, 
  visible 
}: CursoIndividualPaymentProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metodoAcceso, setMetodoAcceso] = useState<'pago' | 'codigo'>('pago');
  const [showWebView, setShowWebView] = useState(false);
  const [webViewHtml, setWebViewHtml] = useState('');
  const webViewRef = useRef<WebView>(null);
  const paymentHandledRef = useRef(false);

  const basePrice = PRECIO_BASE;
  const iva = basePrice * IVA_RATE;
  const totalPrice = Math.round((basePrice + iva) * 100) / 100;

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

    try {
      setLoading(true);
      setError(null);

      console.log('💳 Iniciando pago con Cecabank para curso:', curso.key);
      console.log('💰 Precio:', { basePrice, iva, totalPrice });

      const { fecha, hora } = getCecabankDateTime();
      const numOperacion = generateOrderId('formacion-profesional');
      const importe = formatAmount(totalPrice);

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
        Descripcion: `Curso: ${curso.label}`,
        FechaOperacion: fecha,
        HoraOperacion: hora,
        Firma: 'PLACEHOLDER',
        ...(user?.email ? { Email: user.email } : {}),
        ...(user?.name ? { Nombre: user.name } : {}),
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
      paymentHandledRef.current = false;
      setShowWebView(true);
    } catch (err: any) {
      console.error('❌ Error en el proceso de pago:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      Alert.alert('Error en el pago', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeValid = async (code: string) => {
    try {
      if (!user || !user.documento) {
        Alert.alert(
          'Documento Requerido',
          'Necesitas tener tu documento registrado para usar códigos de acceso.',
          [{ text: 'OK' }]
        );
        return;
      }

      await markFormacionCodeAsUsed(code, user.documento);

      // Guardar acceso al curso individual
      const cursoAccessKey = `@curso_${curso.key}_access`;
      await AsyncStorage.setItem(cursoAccessKey, JSON.stringify({
        tieneAcceso: true,
        fechaCompra: new Date().toISOString(),
        cursoKey: curso.key,
        cursoLabel: curso.label,
        metodo: 'codigo',
        codigo: code
      }));

      // También guardar acceso general a formación profesional si no existe
      const accesoGeneral = await AsyncStorage.getItem('@acceso_formacion_profesional');
      if (!accesoGeneral) {
        await AsyncStorage.setItem('@acceso_formacion_profesional', JSON.stringify({
          tieneAcceso: true,
          fechaCompra: new Date().toISOString(),
          expira: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          metodo: 'codigo',
          codigo: code,
        }));
      }

      Alert.alert(
        '¡Acceso Activado!',
        `Has obtenido acceso al curso "${curso.label}" usando el código de acceso.`,
        [
          {
            text: 'Ver Curso',
            onPress: () => {
              onPaymentSuccess(curso.key);
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error procesando código:', error);
      Alert.alert(
        'Error',
        'No se pudo procesar el código de acceso. Por favor, inténtalo de nuevo.'
      );
    }
  };

  const cancelPayment = () => {
    paymentHandledRef.current = false;
    setShowWebView(false);
    setLoading(false);
    // onCancel(); // Maybe not call onCancel here, just close WebView
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'PAYMENT_SUCCESS') {
        if (paymentHandledRef.current) return;
        paymentHandledRef.current = true;
        handlePaymentSuccess(data);
      } else if (data.type === 'PAYMENT_CANCEL') {
        if (paymentHandledRef.current) return;
        paymentHandledRef.current = true;
        setShowWebView(false);
      } else if (data.type === 'PAYMENT_ERROR') {
        if (paymentHandledRef.current) return;
        paymentHandledRef.current = true;
        setShowWebView(false);
        setError(data.error || 'Error en el pago');
        Alert.alert('Error en el pago', data.error || 'Error desconocido');
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
      handlePaymentSuccess({ type: 'PAYMENT_SUCCESS', url: navState.url });
      return;
    }
    if (isKo) {
      if (paymentHandledRef.current) return;
      paymentHandledRef.current = true;
      setShowWebView(false);
      setError('Pago cancelado o rechazado');
      Alert.alert('Pago cancelado', 'El pago fue cancelado o rechazado.');
    }
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

  const handlePaymentSuccess = async (paymentInfo: any) => {
    setShowWebView(false);
    
    console.log('✅ Pago exitoso para curso:', curso.key);
    
    // Guardar acceso al curso en AsyncStorage
    const cursoAccessKey = `@curso_${curso.key}_access`;
    await AsyncStorage.setItem(cursoAccessKey, JSON.stringify({
      tieneAcceso: true,
      fechaCompra: new Date().toISOString(),
      paymentIntentId: paymentInfo.orderId || paymentInfo.numOperacion,
      cursoKey: curso.key,
      cursoLabel: curso.label
    }));

    Alert.alert(
      '¡Pago Exitoso!',
      `Has adquirido el curso "${curso.label}". Ya puedes acceder al contenido completo.`,
      [
        {
          text: 'Ver Curso',
          onPress: () => {
            onPaymentSuccess(curso.key);
          }
        }
      ]
    );
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: curso.color }]}>
              <Ionicons name={curso.icon as any} size={40} color="#fff" />
              <Text style={styles.cursoTitle}>{curso.label}</Text>
            </View>

            {/* Información del curso */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Sobre este curso</Text>
              {curso.descripcion ? (
                <Text style={styles.description}>{curso.descripcion}</Text>
              ) : (
                <Text style={styles.description}>
                  Este curso te proporcionará las habilidades y conocimientos necesarios 
                  para trabajar en este sector. Incluye vocabulario específico, 
                  técnicas prácticas y preparación para el mercado laboral español.
                </Text>
              )}

              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.benefitText}>Vocabulario específico del sector</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.benefitText}>Técnicas y conocimientos prácticos</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.benefitText}>Preparación para el mercado laboral</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.benefitText}>Acceso completo al contenido</Text>
                </View>
              </View>
            </View>

            {/* Price breakdown */}
            <View style={styles.priceBreakdown}>
              <Text style={styles.priceTitle}>Precio del curso</Text>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Precio base</Text>
                <Text style={styles.priceValue}>{basePrice.toFixed(2)}€</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>IVA (21%)</Text>
                <Text style={styles.priceValue}>{iva.toFixed(2)}€</Text>
              </View>
              <View style={[styles.priceRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{totalPrice.toFixed(2)}€</Text>
              </View>
            </View>

            {/* Selector de método de acceso */}
            <View style={styles.metodoSelector}>
              <TouchableOpacity
                style={[
                  styles.metodoButton,
                  metodoAcceso === 'pago' && styles.metodoButtonActive
                ]}
                onPress={() => setMetodoAcceso('pago')}
              >
                <Ionicons 
                  name="card" 
                  size={20} 
                  color={metodoAcceso === 'pago' ? '#fff' : '#666'} 
                  style={{ marginRight: 8 }}
                />
                <Text style={[
                  styles.metodoText,
                  metodoAcceso === 'pago' && styles.metodoTextActive
                ]}>
                  Pagar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.metodoButton,
                  metodoAcceso === 'codigo' && styles.metodoButtonActive
                ]}
                onPress={() => setMetodoAcceso('codigo')}
              >
                <Ionicons 
                  name="key" 
                  size={20} 
                  color={metodoAcceso === 'codigo' ? '#fff' : '#666'} 
                  style={{ marginRight: 8 }}
                />
                <Text style={[
                  styles.metodoText,
                  metodoAcceso === 'codigo' && styles.metodoTextActive
                ]}>
                  Código
                </Text>
              </TouchableOpacity>
            </View>

            {metodoAcceso === 'pago' ? (
              <>
                {error && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.payButton, { flex: 1 }]}
                    onPress={handlePayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.payButtonText}>Pagar con Cecabank</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton, { flex: 1 }]}
                    onPress={onCancel}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.codigoContainer}>
                <FormacionAccessCodeInput
                  documento={user?.documento || ''}
                  onCodeValid={handleCodeValid}
                  onCancel={() => setMetodoAcceso('pago')}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>

    <Modal visible={showWebView} animationType="slide">
      <View style={styles.webViewContainer}>
        <View style={styles.webViewHeader}>
          <Text style={styles.webViewTitle}>Pago</Text>
          <TouchableOpacity onPress={cancelPayment}>
            <Ionicons name="close" size={24} color="#333" />
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
          injectedJavaScript={`
            (function() {
              var handled = false;
              var checkPage = function() {
                if (handled) return;
                var url = window.location.href.toLowerCase();
                var pageText = document.body ? document.body.innerText.toLowerCase() : '';

                var isSuccessText = pageText.includes('pago exitoso') ||
                  pageText.includes('operación realizada') ||
                  pageText.includes('operacion realizada') ||
                  pageText.includes('pago realizado') ||
                  pageText.includes('pago correcto') ||
                  pageText.includes('transacción aprobada') ||
                  pageText.includes('transaccion aprobada') ||
                  pageText.includes('operación autorizada') ||
                  pageText.includes('operacion autorizada') ||
                  pageText.includes('compra realizada') ||
                  pageText.includes('payment successful') ||
                  pageText.includes('return to merchant') ||
                  pageText.includes('volver al comercio') ||
                  pageText.includes('regresar al comercio') ||
                  pageText.includes('autorizada');

                if (isSuccessText) {
                  var buttons = document.querySelectorAll('a, button, input[type="submit"], input[type="button"]');
                  for (var i = 0; i < buttons.length; i++) {
                    var btn = buttons[i];
                    var text = (btn.innerText || btn.value || '').toLowerCase();
                    if (text.includes('volver') || text.includes('comercio') || text.includes('continuar') || text.includes('aceptar')) {
                      btn.click();
                      break;
                    }
                  }
                  handled = true;
                  window.ReactNativeWebView.postMessage(JSON.stringify({type: 'PAYMENT_SUCCESS', url: url, source: 'page_detection'}));
                  return;
                }

                if (url.includes('/api/cecabank/ok') || url.includes('pago_exitoso') || url.includes('payment_success')) {
                  handled = true;
                  window.ReactNativeWebView.postMessage(JSON.stringify({type: 'PAYMENT_SUCCESS', url: url, source: 'url_detection'}));
                  return;
                }

                if (url.includes('/api/cecabank/ko') || pageText.includes('pago rechazado') || pageText.includes('pago cancelado') || pageText.includes('error en el pago')) {
                  handled = true;
                  window.ReactNativeWebView.postMessage(JSON.stringify({type: 'PAYMENT_ERROR', url: url}));
                  return;
                }
              };

              setTimeout(checkPage, 500);
              setInterval(checkPage, 1000);
            })();
            true;
          `}
          originWhitelist={['*']}
        />
      </View>
    </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cursoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  infoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  benefitsList: {
    marginTop: 15,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    flex: 1,
  },
  priceBreakdown: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 12,
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#4CAF50',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  securityText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  metodoSelector: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  metodoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  metodoButtonActive: {
    backgroundColor: '#9DC3AA',
    borderColor: '#79A890',
  },
  metodoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  metodoTextActive: {
    color: '#fff',
  },
  codigoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
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

