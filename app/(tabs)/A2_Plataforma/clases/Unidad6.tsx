import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AudioButton from '../../../components/AudioButton';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useRouter } from 'expo-router';
import UnidadCard from './UnidadCard';
import { useUserProgress } from '@/contexts/UserProgressContext';
const data = require('../../../assets/unidades_y_examenes.json');

export default function Unidad6() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const unitIndex = 5;
  const levelProgress = progress.A2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[unitIndex] ?? false;
  const ejercicios = [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué dispositivo usas para hacer videollamadas?',
      opciones: ["El móvil o la tableta", "La nevera", "El microondas", "La plancha"],
      respuesta_correcta: "El móvil o la tableta",
      explicacion: "Los dispositivos móviles y tabletas tienen cámara y micrófono para hacer videollamadas."
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué necesitas para conectarte a Internet?',
      opciones: ["Conexión WiFi o datos", "Agua corriente", "Gas natural", "Electricidad"],
      respuesta_correcta: "Conexión WiFi o datos",
      explicacion: "Para navegar por Internet necesitas conexión WiFi o datos móviles."
    },
    // Conversión de rellenar huecos a opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: 'Para enviar un correo electrónico necesitas una ___',
      opciones: ["dirección de email", "contraseña temporal", "memoria USB", "foto de perfil"],
      respuesta_correcta: "dirección de email",
      explicacion: 'La dirección (correo) es imprescindible para enviar emails.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'Para publicar en redes ___ debes tener una cuenta',
      opciones: ["sociales", "privadas", "antiguas", "locales"],
      respuesta_correcta: "sociales",
      explicacion: 'Se refiere a redes sociales (social media).'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'Para publicar en redes sociales debes tener una ___',
      opciones: ["cuenta", "impresora", "garantía", "funda"],
      respuesta_correcta: "cuenta",
      explicacion: 'Es necesario registrarse/crear una cuenta.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "descargar" un archivo?',
      opciones: ["Guardarlo en tu dispositivo", "Eliminarlo", "Compartirlo", "Imprimirlo"],
      respuesta_correcta: "Guardarlo en tu dispositivo",
      explicacion: "Descargar significa transferir un archivo de Internet a tu dispositivo."
    },
    // Conversión del diálogo tecnológico a opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '— ¿Cómo te ___ con tu familia?',
      opciones: ["comunicas", "cocinas", "caminas", "juegas"],
      respuesta_correcta: "comunicas",
      explicacion: 'Se pregunta por la forma de comunicación.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '— Usamos ___ para videollamadas.',
      opciones: ["Zoom", "Meet", "Radio", "Televisión"],
      respuesta_correcta: "Zoom",
      explicacion: 'Ejemplo de app de videollamadas.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '— ¿Y para mensajes ___?',
      opciones: ["rápidos", "altos", "caros", "antiguos"],
      respuesta_correcta: "rápidos",
      explicacion: 'Se refiere a mensajes rápidos (chat).'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona término tecnológico con su función (ES → AR como apoyo)',
      pares: [
        { izquierda: 'contraseña', derecha: 'protege acceso / كلمة مرور' },
        { izquierda: 'nube', derecha: 'almacenamiento online / سحابة' },
        { izquierda: 'datos móviles', derecha: 'Internet sin WiFi / بيانات' },
        { izquierda: 'actualizar', derecha: 'instalar versión nueva / تحديث' }
      ]
    }
  ];
  const [respuestas, setRespuestas] = useState<any>({});
  const [feedback, setFeedback] = useState<any>({});
  const opcionesMezcladasRef = useRef<{ [k: number]: string[] }>({});

  const handleInput = (idx: number, value: string | string[]) => {
    setRespuestas((prev: any) => ({ ...prev, [idx]: value }));
  };

  // eliminado: checkRellenarHuecos (no se usa)

  const checkOpcionMultiple = (idx: number, correcta: string, seleccion: string) => {
    setRespuestas((prev: any) => ({ ...prev, [idx]: seleccion }));
    setFeedback((prev: any) => ({ ...prev, [idx]: seleccion === correcta ? '¡Correcto!' : 'Incorrecto' }));
  };

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('A2', unitIndex);
    }
    // Navegar directamente a la siguiente unidad (Unidad7)
    router.push('/A2_Plataforma/clases/Unidad7');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/(tabs)/A2_Plataforma')}
        accessibilityLabel="Volver al menú de unidades"
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* CONTENIDO DIDÁCTICO - TECNOLOGÍA Y COMUNICACIÓN */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1170&q=80' }}
          style={styles.image}
          accessibilityLabel="Imagen de tecnología y comunicación"
        />
        <Text style={styles.title}>Unidad 6: Tecnología y comunicación</Text>
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <AudioButton text="Unidad 6: Tecnología y comunicación" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.titleAr}>الوحدة 6: التكنولوجيا والاتصالات</Text>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Contexto</Text>
            <AudioButton text="Contexto" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>Aprende vocabulario sobre dispositivos electrónicos, aplicaciones y comunicación digital en la vida cotidiana.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Aprende vocabulario sobre dispositivos electrónicos, aplicaciones y comunicación digital en la vida cotidiana." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>تعلم مفردات الأجهزة الإلكترونية، التطبيقات والاتصال الرقمي في الحياة اليومية.</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Gramática</Text>
            <AudioButton text="Gramática" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Verbos tecnológicos (enviar, recibir, descargar, subir, compartir){"\n"}• Expresar necesidad (necesitar + infinitivo, tener que + infinitivo){"\n"}• Preguntas técnicas (¿Cómo se usa...? ¿Para qué sirve...?)</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Verbos tecnológicos: enviar, recibir, descargar, subir, compartir. Expresar necesidad: necesitar, tener que. Preguntas técnicas: ¿Cómo se usa? ¿Para qué sirve?" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• أفعال تكنولوجية (يرسل، يستقبل، يحمّل، يرفع، يشارك){"\n"}• التعبير عن الحاجة (يحتاج إلى + المصدر، يجب + المصدر){"\n"}• أسئلة تقنية (كيف تستخدم...؟ لماذا نستخدم...؟)</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Vocabulario</Text>
            <AudioButton text="Vocabulario" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Dispositivos: móvil, tableta, ordenador, portátil, auriculares{"\n"}• Acciones: enviar, recibir, descargar, instalar, actualizar{"\n"}• Términos: contraseña, usuario, red, wifi, datos, nube{"\n"}• Aplicaciones: mensajería, redes sociales, correo, videollamadas</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Dispositivos: móvil, tableta, ordenador, portátil, auriculares. Acciones: enviar, recibir, descargar, instalar, actualizar. Términos: contraseña, usuario, red, wifi, datos, nube. Aplicaciones: mensajería, redes sociales, correo, videollamadas." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• أجهزة: هاتف محمول، لوحي، حاسوب، حاسوب محمول، سماعات{"\n"}• أفعال: يرسل، يستقبل، يحمل، يثبت، يحدث{"\n"}• مصطلحات: كلمة المرور، مستخدم، شبكة، واي فاي، بيانات، سحابة{"\n"}• تطبيقات: مراسلة، شبكات اجتماعية، بريد إلكتروني، مكالمات فيديو</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Ejemplo de diálogo</Text>
            <AudioButton text="Ejemplo de diálogo" size="small" showText={false} color="#79A890" />
          </View>
          {/* Diálogo por líneas con audio y traducción por línea */}
          <View style={{ backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8 }}>
            {/* Línea 1 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Usuario:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Hola, ¿me ayudas con el móvil?</Text>
                <AudioButton text="Hola, ¿me ayudas con el móvil?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>مرحباً، هل يمكنك مساعدتي مع هاتفي؟</Text>
            </View>

            {/* Línea 2 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Soporte:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Claro, ¿qué necesitas?</Text>
                <AudioButton text="Claro, ¿qué necesitas?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>بالطبع، ماذا تحتاج؟</Text>
            </View>

            {/* Línea 3 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Usuario:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>No me funciona el WiFi.</Text>
                <AudioButton text="No me funciona el WiFi." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>الواي فاي لا يعمل.</Text>
            </View>

            {/* Línea 4 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Soporte:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Primero, activa el modo avión y luego desactívalo.</Text>
                <AudioButton text="Primero, activa el modo avión y luego desactívalo." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>أولاً، فعّل وضع الطيران ثم عطّله.</Text>
            </View>

            {/* Línea 5 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Usuario:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Ya lo hice y sigue igual.</Text>
                <AudioButton text="Ya lo hice y sigue igual." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>لقد فعلت ذلك وما زال لا يعمل.</Text>
            </View>

            {/* Línea 6 */}
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Soporte:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Entonces ve a Ajustes, luego a Redes y olvida esta red. Vuelve a conectarte.</Text>
                <AudioButton text="Entonces ve a Ajustes, luego a Redes y olvida esta red. Vuelve a conectarte." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>إذن اذهب إلى الإعدادات، ثم الشبكات وانسَ هذه الشبكة. اتصل بها مجدداً.</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Actividad práctica</Text>
            <AudioButton text="Actividad práctica" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>1. Haz una lista de aplicaciones que uses diariamente{"\n"}2. Aprende a describir problemas técnicos{"\n"}3. Practica cómo pedir ayuda con dispositivos</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Haz una lista de aplicaciones que uses diariamente. Aprende a describir problemas técnicos. Practica cómo pedir ayuda con dispositivos." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>1. أعد قائمة بالتطبيقات التي تستخدمها يومياً{"\n"}2. تعلم كيفية وصف المشاكل التقنية{"\n"}3. تدرب على طلب المساعدة بخصوص الأجهزة</Text>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Vocabulario clave</Text>
            <AudioButton text="Vocabulario clave" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>tienda = متجر{"\n"}precio = سعر{"\n"}dinero = مال{"\n"}tarjeta = بطاقة{"\n"}efectivo = نقد{"\n"}rebaja = خصم{"\n"}factura = فاتورة{"\n"}cambio = فكة</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="tienda, precio, dinero, tarjeta, efectivo, rebaja, factura, cambio" size="small" showText={false} color="#79A890" />
          </View>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Ejemplo de interacción</Text>
            <AudioButton text="Ejemplo de interacción" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>— ¿Cuánto cuesta esta camisa? — Cuesta 25 euros. — ¿Tiene rebaja? — Sí, está con un 20% de descuento. — ¿Aceptan tarjeta? — Sí, aceptamos tarjeta y efectivo.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="¿Cuánto cuesta esta camisa? Cuesta 25 euros. ¿Tiene rebaja? Sí, está con un 20% de descuento. ¿Aceptan tarjeta? Sí, aceptamos tarjeta y efectivo." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>— كم ثمن هذا القميص؟ — ثمنه 25 يورو. — هل فيه خصم؟ — نعم، فيه خصم 20%. — هل تقبلون البطاقة؟ — نعم، نقبل البطاقة والنقد.</Text>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Actividad</Text>
            <AudioButton text="Actividad" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>Haz una lista de compras y simula una conversación en una tienda: preguntar precios, pedir descuentos, pagar.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Haz una lista de compras y simula una conversación en una tienda: preguntar precios, pedir descuentos, pagar." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>اصنع قائمة تسوق وحاك محادثة في متجر: اسأل عن الأسعار، اطلب خصومات، ادفع.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seguridad digital</Text>
          <Text style={styles.sectionText}>
            • Contraseña segura (mayúsculas, minúsculas, números, símbolos){"\n"}
            • Verificación en dos pasos (2FA){"\n"}
            • No compartir códigos ni contraseñas por chat{"\n"}
            • Actualizar apps y sistema periódicamente
          </Text>
          <Text style={styles.sectionTextAr}>
            • كلمة مرور قوية (حروف كبيرة وصغيرة، أرقام، رموز){"\n"}
            • التحقق بخطوتين (2FA){"\n"}
            • عدم مشاركة الأكواد أو كلمات المرور عبر الدردشة{"\n"}
            • تحديث التطبيقات والنظام بشكل دوري
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expresiones de soporte técnico</Text>
          <Text style={styles.sectionText}>
            • ¿Puede reiniciar el dispositivo? = هل يمكنك إعادة تشغيل الجهاز؟{"\n"}
            • Vaya a Ajustes {'>'} WiFi y olvide la red. = اذهب إلى الإعدادات {'>'} واي فاي وانسَ الشبكة.{"\n"}
            • Actualice la app a la última versión. = حدّث التطبيق إلى آخر إصدار.{"\n"}
            • ¿Puede enviar una captura de pantalla? = هل يمكنك إرسال لقطة شاشة؟
          </Text>
        </View>
        {/* Ejemplos escritos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ Ejemplos escritos</Text>
          <View style={{ gap: 10 }}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>No me funciona el WiFi.</Text>
                <AudioButton text="No me funciona el WiFi." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>الواي فاي لا يعمل.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>¿Puedes ayudarme con el móvil?</Text>
                <AudioButton text="¿Puedes ayudarme con el móvil?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>هل يمكنك مساعدتي مع الهاتف؟</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>¿Cómo se instala esta aplicación?</Text>
                <AudioButton text="¿Cómo se instala esta aplicación?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>كيف يتم تثبيت هذا التطبيق؟</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Tengo que actualizar el sistema.</Text>
                <AudioButton text="Tengo que actualizar el sistema." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>يجب أن أحدّث النظام.</Text>
            </View>
          </View>
        </View>
        {/* EJERCICIOS INTERACTIVOS */}
        <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#79A890', marginTop: 24}}>Ejercicios / تمارين</Text>
        {ejercicios.length === 0 && <Text style={{color:'#333'}}>No hay ejercicios para esta unidad.</Text>}
        {ejercicios.map((ej: any, idx: number) => (
          <View key={idx} style={{marginBottom: 18, backgroundColor: '#f5f5f5', borderRadius: 8, padding: 12}}>
            <Text style={{fontWeight: 'bold', marginBottom: 6}}>
              {ej.enunciado?.split('(')[0]?.trim()}
            </Text>
            {ej.enunciado?.includes('(') && (
              <Text style={{fontWeight: 'bold', color: '#79A890', marginBottom: 6, textAlign: 'right'}}>
                {ej.enunciado.substring(ej.enunciado.indexOf('(')+1, ej.enunciado.lastIndexOf(')'))}
              </Text>
            )}
            {/* eliminado bloque de rellenar_huecos */}
            {ej.tipo === 'opcion_multiple' && (
              <View>
                {(() => {
                  const opciones = opcionesMezcladasRef.current[idx] ?? (opcionesMezcladasRef.current[idx] = [...(ej.opciones || [])].sort(() => Math.random() - 0.5));
                  return opciones.map((op: string, i: number) => (
                    <TouchableOpacity key={i} style={{padding:8,marginVertical:2,backgroundColor: respuestas[idx]===op?'#79A890':'#eee',borderRadius:5}}
                      onPress={() => checkOpcionMultiple(idx, ej.respuesta_correcta, op)}>
                      <Text style={{color: respuestas[idx]===op?'#fff':'#222'}}>{op}</Text>
                    </TouchableOpacity>
                  ));
                })()}
                {feedback[idx] && <Text style={{marginTop:6, color: feedback[idx]==='¡Correcto!'?'#79A890':'#333'}}>{feedback[idx]==='¡Correcto!'?'¡Correcto! / صحيح':'Incorrecto / خطأ'}</Text>}
              </View>
            )}
            {ej.tipo === 'escribir' && (
              <TextInput
                style={{borderWidth: 1, borderColor: '#bbb', borderRadius: 6, marginBottom: 6, padding: 6, backgroundColor: '#fff', minHeight: 48, textAlignVertical: 'top'}}
                placeholder="Escribe tu respuesta aquí..."
                multiline
                value={respuestas[idx] || ''}
                onChangeText={t => handleInput(idx, t)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
            {ej.tipo === 'relacionar' && (
              <EjerciciosInteractivos ejercicios={[ej]} />
            )}
          </View>
        ))}
        <View style={styles.finishContainer}>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinish} activeOpacity={0.8}>
            <LinearGradient
              colors={['#9DC3AA', '#79A890']}
              style={styles.finishButtonGradient}
            >
              <Text style={styles.finishButtonText}>Unidad finalizada</Text>
              <Text style={styles.finishButtonTextAr}>انتهت الوحدة</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backButton: {
    position: 'absolute',
    top: 38,
    left: 18,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContent: {
    paddingTop: 70,
    paddingBottom: 32,
    alignItems: 'center',
    minHeight: '100%',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 18,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 4,
    textAlign: 'center',
  },
  titleAr: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 16,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  sectionTextAr: {
    fontSize: 16,
    color: '#333',
    writingDirection: 'rtl',
    marginBottom: 2,
    fontFamily: 'System',
  },
  finishContainer: {
    marginTop: 32,
    marginBottom: 48,
    width: '100%',
    alignItems: 'center',
  },
  finishButton: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  finishButtonGradient: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  finishButtonTextAr: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    writingDirection: 'rtl',
  },
});
