// Pantalla que muestra noticias del BOE, Ministerio de Extranjería y ONGs
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ScrollView, Linking, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { xml2js } from 'xml-js';

const FEEDS = [
  {
    nombre: 'BOE Extranjería',
    url: 'https://www.boe.es/rss/BOE-L-extranjeria.xml',
  },
  {
    nombre: 'Ministerio de Extranjería',
    url: 'https://extranjeros.inclusion.gob.es/es/informacionInteres/actualidad/rss/actualidad.xml',
  },
  {
    nombre: 'Infomigrante.es',
    url: 'https://infomigrante.es/feed/',
  },
];

// Función segura para extraer texto de los campos RSS
function getText(obj: any): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  if (typeof obj === 'object') {
    if ('_text' in obj) return obj._text;
    if ('_cdata' in obj) return obj._cdata;
    if (Array.isArray(obj)) return getText(obj[0]);
    const keys = Object.keys(obj);
    if (keys.length === 1) return getText(obj[keys[0]]);
  }
  return '';
}

export default function NoticiasInmigracionScreen() {
  const [noticias, setNoticias] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Requiere: import { useFocusEffect } from '@react-navigation/native';
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      setLoading(true);
      setError(null);
      Promise.all(
        FEEDS.map(feed =>
          fetch(feed.url)
            .then(res => res.text())
            .then(xml => {
              try {
                const result = xml2js(xml, { compact: true }) as any;
                if (
                  result &&
                  result.rss &&
                  result.rss.channel &&
                  result.rss.channel.item
                ) {
                  const items = Array.isArray(result.rss.channel.item)
                    ? result.rss.channel.item
                    : [result.rss.channel.item];
                  return { nombre: feed.nombre, items };
                } else {
                  return { nombre: feed.nombre, items: [] };
                }
              } catch (e) {
                return { nombre: feed.nombre, items: [] };
              }
            })
            .catch(() => ({ nombre: feed.nombre, items: [] }))
        )
      )
        .then(results => {
          if (!isActive) return;
          const agrupadas: { [key: string]: any[] } = {};
          results.forEach(r => {
            agrupadas[r.nombre] = r.items;
          });
          setNoticias(agrupadas);
          setLoading(false);
        })
        .catch(e => {
          if (!isActive) return;
          setError('No se pudieron cargar las noticias. Intenta más tarde.');
          setLoading(false);
        });
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (loading) return <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 50 }} />;
  if (error) return (
    <View style={{ padding: 24 }}>
      <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text>
    </View>
  );

  const hayNoticias = Object.values(noticias).some(arr => Array.isArray(arr) && arr.length > 0);

  const router = useRouter();
  return (
    <ScrollView style={{ padding: 20 }}>
      {/* Botón de regreso */}
      <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Ionicons name="arrow-back" size={24} color="#FFD700" />
        <Text style={{ color: '#FFD700', fontSize: 16, marginLeft: 6 }}>Regresar</Text>
      </TouchableOpacity>
      {/* Temas de Papeles y Extranjería */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 8 }}>
          Temas de Papeles y Extranjería
        </Text>

        {/* Renovación de NIE */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>• Renovación de NIE / تجديد بطاقة الإقامة</Text>
          <Text style={{ color: '#555', marginBottom: 2 }}>
            Para renovar tu tarjeta de residencia (NIE), necesitas pedir cita previa, aportar documentos como pasaporte, empadronamiento, y acreditar medios económicos.
          </Text>
          <Text style={{ color: '#000', fontFamily: 'System', textAlign: 'right' }}>
            لتجديد بطاقة الإقامة (NIE)، يجب حجز موعد مسبق، وتقديم مستندات مثل جواز السفر، وشهادة السكن، وإثبات الموارد المالية.
          </Text>
        </View>

        {/* Arraigo social */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>• Arraigo social / الجذور الاجتماعية</Text>
          <Text style={{ color: '#555', marginBottom: 2 }}>
            Permite regularizar la situación de extranjeros que lleven al menos 3 años en España y tengan un contrato de trabajo y vínculos sociales.
          </Text>
          <Text style={{ color: '#000', fontFamily: 'System', textAlign: 'right' }}>
            يسمح بتسوية أوضاع الأجانب الذين أقاموا في إسبانيا لمدة 3 سنوات على الأقل ولديهم عقد عمل وروابط اجتماعية.
          </Text>
        </View>

        {/* Arraigo laboral */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>• Arraigo laboral / الجذور العمالية</Text>
          <Text style={{ color: '#555', marginBottom: 2 }}>
            Para quienes hayan trabajado al menos 6 meses en España de forma demostrable y hayan residido 2 años.
          </Text>
          <Text style={{ color: '#000', fontFamily: 'System', textAlign: 'right' }}>
            لمن عمل في إسبانيا لمدة 6 أشهر على الأقل بشكل قانوني وأقام لمدة سنتين.
          </Text>
        </View>

        {/* Arraigo familiar */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>• Arraigo familiar / الجذور العائلية</Text>
          <Text style={{ color: '#555', marginBottom: 2 }}>
            Para padres/madres de menores españoles o hijos de padres originariamente españoles.
          </Text>
          <Text style={{ color: '#000', fontFamily: 'System', textAlign: 'right' }}>
            للآباء أو الأمهات لأطفال إسبان أو أبناء لآباء إسبان الأصل.
          </Text>
        </View>

        {/* Arraigo para la formación */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>• Arraigo para la formación / الجذور من أجل الدراسة</Text>
          <Text style={{ color: '#555', marginBottom: 2 }}>
            Permite obtener residencia para realizar formación reglada en España.
          </Text>
          <Text style={{ color: '#000', fontFamily: 'System', textAlign: 'right' }}>
            يسمح بالحصول على الإقامة من أجل الدراسة أو التدريب المهني في إسبانيا.
          </Text>
        </View>

        {/* Nuevos reglamentos y cambios */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>• Nuevos reglamentos y cambios recientes / القوانين الجديدة والتحديثات</Text>
          <Text style={{ color: '#555', marginBottom: 2 }}>
            Consulta siempre el BOE y fuentes oficiales para estar al día de los cambios en la normativa de extranjería.
          </Text>
          <Text style={{ color: '#000', fontFamily: 'System', textAlign: 'right' }}>
            تابع الجريدة الرسمية والمصادر الرسمية لمعرفة آخر التحديثات في قوانين الأجانب.
          </Text>
        </View>
      </View>

      {/* Fuentes Oficiales para Trámites */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 8 }}>
          Fuentes Oficiales para Trámites / مصادر رسمية للإجراءات
        </Text>

        {/* Ministerio del Interior - Modelos de Extranjería */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>• Ministerio del Interior - Modelos de Extranjería</Text>
          <Text style={{ color: '#555', marginBottom: 2 }}>
            Todos los impresos oficiales para solicitudes de residencia, trabajo y reagrupación familiar.
          </Text>
          <Text style={{ color: '#000', fontFamily: 'System', textAlign: 'right' }}>
            جميع الطلبات الرسمية للإقامة والعمل ولم شمل الأسرة.
          </Text>
          <TouchableOpacity
            onPress={async () => {
              try {
                await Linking.openURL('https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/modelos-de-solicitud/extranjeria/');
              } catch {
                alert('No se pudo abrir el enlace.');
              }
            }}
            style={{ backgroundColor: '#000', borderWidth: 1, borderColor: '#FFD700', padding: 8, borderRadius: 6, alignSelf: 'flex-start', marginTop: 4 }}
          >
            <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Ver Modelos</Text>
          </TouchableOpacity>
        </View>

        {/* Entre Trámites - Modelos de Extranjería */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>• Entre Trámites - Impresos Descargables</Text>
          <Text style={{ color: '#555', marginBottom: 2 }}>
            Modelos rellenables y descargables para todos los trámites de inmigración.
          </Text>
          <Text style={{ color: '#000', fontFamily: 'System', textAlign: 'right' }}>
            نماذج قابلة للتحميل والتعبئة لجميع إجراءات الهجرة.
          </Text>
          <TouchableOpacity
            onPress={async () => {
              try {
                await Linking.openURL('https://entretramites.com/descargables/modelos-extranjeria');
              } catch {
                alert('No se pudo abrir el enlace.');
              }
            }}
            style={{ backgroundColor: '#000', borderWidth: 1, borderColor: '#FFD700', padding: 8, borderRadius: 6, alignSelf: 'flex-start', marginTop: 4 }}
          >
            <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Descargar Modelos</Text>
          </TouchableOpacity>
        </View>

        {/* Oficinas para Trámites de Extranjería */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>• Oficinas para Trámites de Extranjería</Text>
          <Text style={{ color: '#555', marginBottom: 2 }}>
            Localización de oficinas, horarios y servicios disponibles en toda España.
          </Text>
          <Text style={{ color: '#000', fontFamily: 'System', textAlign: 'right' }}>
            مواقع المكاتب وساعات العمل والخدمات المتاحة في جميع أنحاء إسبانيا.
          </Text>
          <TouchableOpacity
            onPress={async () => {
              try {
                await Linking.openURL('https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/extranjeria/oficinas-para-tramites-de-extranjeria/');
              } catch {
                alert('No se pudo abrir el enlace.');
              }
            }}
            style={{ backgroundColor: '#000', borderWidth: 1, borderColor: '#FFD700', padding: 8, borderRadius: 6, alignSelf: 'flex-start', marginTop: 4 }}
          >
            <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Buscar Oficina</Text>
          </TouchableOpacity>
        </View>

        {/* Oficina Municipal de Inmigración */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>• Oficina Municipal de Inmigración</Text>
          <Text style={{ color: '#555', marginBottom: 2 }}>
            Guías completas sobre presentación de solicitudes y seguimiento de trámites.
          </Text>
          <Text style={{ color: '#000', fontFamily: 'System', textAlign: 'right' }}>
            دليل شامل لتقديم الطلبات ومتابعة الإجراءات.
          </Text>
          <TouchableOpacity
            onPress={async () => {
              try {
                await Linking.openURL('https://oficinamunicipalinmigracion.es/presentar-y-hacer-seguimiento-de-tu-solicitud-de-extranjeria-en-espana/');
              } catch {
                alert('No se pudo abrir el enlace.');
              }
            }}
            style={{ backgroundColor: '#000', borderWidth: 1, borderColor: '#FFD700', padding: 8, borderRadius: 6, alignSelf: 'flex-start', marginTop: 4 }}
          >
            <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Ver Guías</Text>
          </TouchableOpacity>
        </View>

        {/* Seguridad Social - Legalización de Documentos */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>• Seguridad Social - Legalización de Documentos</Text>
          <Text style={{ color: '#555', marginBottom: 2 }}>
            Requisitos para legalización y traducción de documentos extranjeros.
          </Text>
          <Text style={{ color: '#000', fontFamily: 'System', textAlign: 'right' }}>
            متطلبات التصديق وترجمة الوثائق الأجنبية.
          </Text>
          <TouchableOpacity
            onPress={async () => {
              try {
                await Linking.openURL('https://inclusion.seg-social.es/en/web/migraciones/w/legalizacion-y-traduccion-de-documentos-para-la-tramitacion-de-procedimientos-en-materia-de-extranjeria-e-inmigracion');
              } catch {
                alert('No se pudo abrir el enlace.');
              }
            }}
            style={{ backgroundColor: '#000', borderWidth: 1, borderColor: '#FFD700', padding: 8, borderRadius: 6, alignSelf: 'flex-start', marginTop: 4 }}
          >
            <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Más Info</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Novedades destacadas: Reglamento de Extranjería BOE */}
      <View style={{ backgroundColor: '#e3f2fd', padding: 14, borderRadius: 8, marginBottom: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
            📰 Última novedad: BOE Reglamento de Extranjería
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginLeft: 8, fontFamily: 'System' }}>
            آخر مستجد: الجريدة الرسمية - قانون الأجانب
          </Text>
        </View>
        <Text style={{ color: '#333', marginBottom: 8 }}>
          Consulta la última publicación oficial sobre el Reglamento de Extranjería en el BOE.
        </Text>
        <TouchableOpacity
          onPress={async () => {
            try {
              await Linking.openURL('https://www.boe.es/buscar/act.php?id=BOE-A-2011-7703');
            } catch {
              alert('No se pudo abrir el enlace del BOE.');
            }
          }}
          style={{ backgroundColor: '#000', borderWidth: 1, borderColor: '#FFD700', padding: 8, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 8 }}
        >
          <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Ver Reglamento en BOE</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
  Documentos para Solicitudes de Residencia
</Text>
{/* Documentos para solicitudes de residencia */}
<View style={{ marginBottom: 28 }}>
  {/* 1. Renovación de NIE */}
  <View style={{ backgroundColor: '#e3f2fd', borderRadius: 8, padding: 12, marginBottom: 14 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Ionicons name="refresh-outline" size={26} color="#000" style={{ marginRight: 8 }} />
      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Renovación de NIE</Text>
    </View>
    <Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System', fontSize: 15 }}>تجديد بطاقة الإقامة (NIE)</Text>
    <Text style={{ fontWeight: 'bold', marginTop: 2 }}>Documentos:</Text>
    <View style={{ marginLeft: 8 }}>
      <Text>• Formulario de solicitud EX-17</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>استمارة الطلب EX-17</Text>
      <Text>• Pasaporte completo y en vigor</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>جواز سفر ساري وكامل</Text>
      <Text>• Tarjeta de residencia anterior</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>بطاقة الإقامة السابقة</Text>
      <Text>• Certificado de empadronamiento actualizado</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>شهادة السكن (الإمبادرونامينتو) حديثة</Text>
      <Text>• Justificante de medios económicos (nóminas, contrato de trabajo, etc.)</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>إثبات الموارد المالية (رواتب، عقد عمل، إلخ)</Text>
      <Text>• Fotografía tamaño carnet</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>صورة شخصية بحجم بطاقة الهوية</Text>
      <Text>• Justificante de pago de la tasa correspondiente</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>إثبات دفع الرسوم المطلوبة</Text>
    </View>
  </View>
  {/* 2. Arraigo Social */}
  <View style={{ backgroundColor: '#e8f5e9', borderRadius: 8, padding: 12, marginBottom: 14 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Ionicons name="people-outline" size={26} color="#000" style={{ marginRight: 8 }} />
      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Arraigo Social</Text>
    </View>
    <Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System', fontSize: 15 }}>الجذور الاجتماعية</Text>
    <Text style={{ fontWeight: 'bold', marginTop: 2 }}>Documentos:</Text>
    <View style={{ marginLeft: 8 }}>
      <Text>• Formulario de solicitud EX-10</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>استمارة الطلب EX-10</Text>
      <Text>• Pasaporte completo y en vigor</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>جواز سفر ساري وكامل</Text>
      <Text>• Certificado de empadronamiento de al menos 3 años</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>شهادة السكن لثلاث سنوات على الأقل</Text>
      <Text>• Contrato de trabajo firmado o medios económicos propios</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>عقد عمل موقع أو إثبات الموارد المالية الشخصية</Text>
      <Text>• Informe de integración social (emitido por el ayuntamiento)</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>تقرير الاندماج الاجتماعي (يصدر من البلدية)</Text>
      <Text>• Certificados penales de España y del país de origen</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>شهادة السجل العدلي من إسبانيا وبلد الأصل</Text>
      <Text>• Fotografía tamaño carnet</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>صورة شخصية بحجم بطاقة الهوية</Text>
      <Text>• Justificante de pago de la tasa</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>إثبات دفع الرسوم</Text>
    </View>
  </View>
  {/* 3. Arraigo Laboral */}
  <View style={{ backgroundColor: '#fff3e0', borderRadius: 8, padding: 12, marginBottom: 14 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Ionicons name="construct-outline" size={26} color="#000" style={{ marginRight: 8 }} />
      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Arraigo Laboral</Text>
    </View>
    <Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System', fontSize: 15 }}>الجذور العمالية</Text>
    <Text style={{ fontWeight: 'bold', marginTop: 2 }}>Documentos:</Text>
    <View style={{ marginLeft: 8 }}>
      <Text>• Formulario EX-10</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>استمارة الطلب EX-10</Text>
      <Text>• Pasaporte completo y en vigor</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>جواز سفر ساري وكامل</Text>
      <Text>• Certificado de empadronamiento</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>شهادة السكن</Text>
      <Text>• Resolución judicial o acta de la Inspección de Trabajo que acredite la relación laboral</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>قرار قضائي أو محضر تفتيش العمل يثبت العلاقة العملية</Text>
      <Text>• Certificados penales de España y del país de origen</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>شهادة السجل العدلي من إسبانيا وبلد الأصل</Text>
      <Text>• Fotografía tamaño carnet</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>صورة شخصية بحجم بطاقة الهوية</Text>
      <Text>• Justificante de pago de la tasa</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>إثبات دفع الرسوم</Text>
    </View>
  </View>
  {/* 4. Arraigo Familiar */}
  <View style={{ backgroundColor: '#e1f5fe', borderRadius: 8, padding: 12, marginBottom: 14 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Ionicons name="film-outline" size={26} color="#000" style={{ marginRight: 8 }} />
      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Arraigo Familiar</Text>
    </View>
    <Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System', fontSize: 15 }}>الجذور العائلية</Text>
    <Text style={{ fontWeight: 'bold', marginTop: 2 }}>Documentos:</Text>
    <View style={{ marginLeft: 8 }}>
      <Text>• Formulario EX-10</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>استمارة الطلب EX-10</Text>
      <Text>• Pasaporte completo y en vigor</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>جواز سفر ساري وكامل</Text>
      <Text>• Certificado de empadronamiento</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>شهادة السكن</Text>
      <Text>• Documentos que acrediten el vínculo familiar (certificado de nacimiento, libro de familia, etc.)</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>مستندات تثبت العلاقة العائلية (شهادة الميلاد، دفتر العائلة، إلخ)</Text>
      <Text>• Certificados penales de España y del país de origen</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>شهادة السجل العدلي من إسبانيا وبلد الأصل</Text>
      <Text>• Fotografía tamaño carnet</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>صورة شخصية بحجم بطاقة الهوية</Text>
      <Text>• Justificante de pago de la tasa</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>إثبات دفع الرسوم</Text>
    </View>
  </View>
  {/* 5. Tarjeta Comunitaria */}
  <View style={{ backgroundColor: '#fce4ec', borderRadius: 8, padding: 12, marginBottom: 14 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Ionicons name="people-circle-outline" size={26} color="#000" style={{ marginRight: 8 }} />
      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Tarjeta Comunitaria</Text>
    </View>
    <Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System', fontSize: 15 }}>بطاقة comunitaria (أفراد عائلة مواطن الاتحاد الأوروبي)</Text>
    <Text style={{ fontWeight: 'bold', marginTop: 2 }}>Documentos:</Text>
    <View style={{ marginLeft: 8 }}>
      <Text>• Formulario EX-19</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>استمارة الطلب EX-19</Text>
      <Text>• Pasaporte completo y en vigor</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>جواز سفر ساري وكامل</Text>
      <Text>• DNI o NIE del ciudadano comunitario</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>بطاقة هوية أو NIE للمواطن الأوروبي</Text>
      <Text>• Certificado de empadronamiento conjunto</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>شهادة السكن المشتركة</Text>
      <Text>• Documentos que acrediten el vínculo familiar</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>مستندات تثبت العلاقة العائلية</Text>
      <Text>• Seguro médico</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>تأمين صحي</Text>
      <Text>• Justificante de medios económicos</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>إثبات الموارد المالية</Text>
      <Text>• Fotografía tamaño carnet</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>صورة شخصية بحجم بطاقة الهوية</Text>
      <Text>• Justificante de pago de la tasa</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>إثبات دفع الرسوم</Text>
    </View>
  </View>
  {/* 6. Reagrupación Familiar */}
  <View style={{ backgroundColor: '#fffde7', borderRadius: 8, padding: 12, marginBottom: 14 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Ionicons name="git-merge-outline" size={26} color="#000" style={{ marginRight: 8 }} />
      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Reagrupación Familiar</Text>
    </View>
    <Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System', fontSize: 15 }}>لم شمل الأسرة</Text>
    <Text style={{ fontWeight: 'bold', marginTop: 2 }}>Documentos:</Text>
    <View style={{ marginLeft: 8 }}>
      <Text>• Formulario EX-02</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>استمارة الطلب EX-02</Text>
      <Text>• Pasaporte completo y en vigor (solicitante y familiares)</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>جواز سفر ساري وكامل (للطالب وأفراد الأسرة)</Text>
      <Text>• Certificado de empadronamiento</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>شهادة السكن</Text>
      <Text>• Documentos que acrediten el vínculo familiar</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>مستندات تثبت العلاقة العائلية</Text>
      <Text>• Contrato de alquiler o escritura de propiedad de la vivienda</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>عقد إيجار أو سند ملكية المنزل</Text>
      <Text>• Justificante de ingresos suficientes</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>إثبات الدخل الكافي</Text>
      <Text>• Seguro médico</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>تأمين صحي</Text>
      <Text>• Fotografía tamaño carnet</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>صورة شخصية بحجم بطاقة الهوية</Text>
      <Text>• Justificante de pago de la tasa</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>إثبات دفع الرسوم</Text>
    </View>
  </View>
  {/* 7. Residencia por estudios */}
  <View style={{ backgroundColor: '#ede7f6', borderRadius: 8, padding: 12, marginBottom: 14 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Ionicons name="book-outline" size={26} color="#000" style={{ marginRight: 8 }} />
      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Residencia por estudios</Text>
    </View>
    <Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System', fontSize: 15 }}>الإقامة للدراسة</Text>
    <Text style={{ fontWeight: 'bold', marginTop: 2 }}>Documentos:</Text>
    <View style={{ marginLeft: 8 }}>
      <Text>• Formulario EX-00</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>استمارة الطلب EX-00</Text>
      <Text>• Pasaporte completo y en vigor</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>جواز سفر ساري وكامل</Text>
      <Text>• Matrícula o carta de admisión en centro de estudios</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>تسجيل أو خطاب قبول في مركز دراسي</Text>
      <Text>• Justificante de medios económicos</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>إثبات الموارد المالية</Text>
      <Text>• Seguro médico</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>تأمين صحي</Text>
      <Text>• Certificado de antecedentes penales</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>شهادة السجل العدلي</Text>
      <Text>• Certificado médico</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>شهادة طبية</Text>
      <Text>• Fotografía tamaño carnet</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>صورة شخصية بحجم بطاقة الهوية</Text>
      <Text>• Justificante de pago de la tasa</Text>
      <Text style={{ color: '#388e3c', textAlign: 'right' }}>إثبات دفع الرسوم</Text>
    </View>
  </View>
</View>

<Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
  Listado de Papeles y Trámites de Extranjería
</Text>
{/* Listado visual de papeles */}
<View style={{ marginBottom: 28 }}>
  {/* 1. Cita Previa */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#e3f2fd', borderRadius: 8, padding: 10 }}>
    <Ionicons name="calendar-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Cita Previa</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>موعد مسبق</Text>
<Text style={{ color: '#555' }}>Obligatoria para la mayoría de trámites de extranjería. Se solicita online en la web oficial.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>إجباري لمعظم إجراءات الأجانب. يتم طلبه عبر الإنترنت في الموقع الرسمي.</Text>
    </View>
  </View>
  {/* 2. Empadronamiento */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#e8f5e9', borderRadius: 8, padding: 10 }}>
    <Ionicons name="home-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Empadronamiento</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>التسجيل في البلدية</Text>
<Text style={{ color: '#555' }}>Documento imprescindible para acreditar tu residencia en un municipio. Se tramita en el ayuntamiento.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>وثيقة ضرورية لإثبات إقامتك في بلدية. يتم إجراؤها في البلدية.</Text>
    </View>
  </View>
  {/* 3. Solicitud de Asilo y Refugio */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#fff3e0', borderRadius: 8, padding: 10 }}>
    <Ionicons name="shield-checkmark-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Solicitud de Asilo y Refugio</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>طلب اللجوء والحماية</Text>
<Text style={{ color: '#555' }}>Para personas que huyen de persecución o conflicto. Incluye solicitud, entrevista y recursos de acogida.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>للأشخاص الفارين من الاضطهاد أو النزاع. يشمل الطلب والمقابلة وموارد الاستقبال.</Text>
    </View>
  </View>
  {/* 4. NIE */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#e1f5fe', borderRadius: 8, padding: 10 }}>
    <Ionicons name="card-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>NIE (Número de Identidad de Extranjero)</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>رقم هوية الأجنبي (NIE)</Text>
<Text style={{ color: '#555' }}>Identificación básica para extranjeros en España. Necesario para trabajar, estudiar, abrir cuenta bancaria, etc.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>هوية أساسية للأجانب في إسبانيا. ضروري للعمل أو الدراسة أو فتح حساب بنكي، إلخ.</Text>
    </View>
  </View>
  {/* 5. Renovación de NIE */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#fce4ec', borderRadius: 8, padding: 10 }}>
    <Ionicons name="refresh-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Renovación de NIE</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>تجديد بطاقة الإقامة (NIE)</Text>
<Text style={{ color: '#555' }}>Renovación de la tarjeta de residencia. Requiere cita previa, pasaporte, empadronamiento y acreditar medios económicos.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>تجديد بطاقة الإقامة. يتطلب موعدًا مسبقًا وجواز سفر وتسجيل في البلدية وإثبات الموارد المالية.</Text>
    </View>
  </View>
  {/* 6. Arraigo Social, Laboral, Familiar o para la Formación */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#e8eaf6', borderRadius: 8, padding: 10 }}>
    <Ionicons name="people-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Arraigo Social, Laboral, Familiar o para la Formación</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>الجذور الاجتماعية أو العائلية أو العمالية أو من أجل الدراسة</Text>
<Text style={{ color: '#555' }}>Permite regularizar la situación de extranjeros en función de su tiempo de residencia, vínculos o estudios.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>يسمح بتسوية أوضاع الأجانب حسب مدة الإقامة أو الروابط الاجتماعية أو العمل أو الدراسة.</Text>
    </View>
  </View>
  {/* 7. Tarjeta Comunitaria */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#f3e5f5', borderRadius: 8, padding: 10 }}>
    <Ionicons name="people-circle-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tarjeta Comunitaria</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>بطاقة comunitaria</Text>
<Text style={{ color: '#555' }}>Para familiares de ciudadanos de la Unión Europea. Permite residir y trabajar en España.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>لأقارب مواطني الاتحاد الأوروبي. تسمح بالإقامة والعمل في إسبانيا.</Text>
    </View>
  </View>
  {/* 8. Reagrupación Familiar */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#fffde7', borderRadius: 8, padding: 10 }}>
    <Ionicons name="git-merge-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Reagrupación Familiar</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>لم شمل الأسرة</Text>
<Text style={{ color: '#555' }}>Solicitud para traer a familiares directos a España. Requiere acreditar vivienda y medios económicos.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>طلب لجلب أفراد الأسرة المباشرين إلى إسبانيا. يتطلب إثبات السكن والموارد المالية.</Text>
    </View>
  </View>
  {/* 9. Nacionalidad Española */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#e0f7fa', borderRadius: 8, padding: 10 }}>
    <Ionicons name="flag-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Nacionalidad Española</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>الجنسية الإسبانية</Text>
<Text style={{ color: '#555' }}>Por residencia, origen o matrimonio. Requiere exámenes y cumplir ciertos plazos.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>عن طريق الإقامة أو الأصل أو الزواج. يتطلب اجتياز اختبارات واستيفاء شروط معينة.</Text>
    </View>
  </View>
  {/* 10. Homologación de Títulos */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#f1f8e9', borderRadius: 8, padding: 10 }}>
    <Ionicons name="school-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Homologación de Títulos</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>معادلة الشهادات</Text>
<Text style={{ color: '#555' }}>Reconocimiento de estudios extranjeros (universidad, secundaria, formación profesional).</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>الاعتراف بالدراسات الأجنبية (الجامعة، الثانوية، التكوين المهني).</Text>
    </View>
  </View>
  {/* 11. Recursos para víctimas de violencia */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#ffebee', borderRadius: 8, padding: 10 }}>
    <Ionicons name="alert-circle-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Recursos para víctimas de violencia</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>موارد لضحايا العنف</Text>
<Text style={{ color: '#555' }}>Protección y ayudas legales/sociales para víctimas de violencia de género o trata.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>حماية ومساعدات قانونية واجتماعية لضحايا العنف أو الاتجار بالبشر.</Text>
    </View>
  </View>
  {/* 12. Acceso a Sanidad */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#e0f2f1', borderRadius: 8, padding: 10 }}>
    <Ionicons name="medkit-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Acceso a Sanidad</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>الوصول إلى الرعاية الصحية</Text>
<Text style={{ color: '#555' }}>Cómo solicitar la tarjeta sanitaria y derechos básicos de salud.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>كيفية طلب بطاقة الصحة والحقوق الصحية الأساسية.</Text>
    </View>
  </View>
  {/* 13. Permiso de Trabajo */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#fff8e1', borderRadius: 8, padding: 10 }}>
    <Ionicons name="briefcase-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Permiso de Trabajo</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>تصريح العمل</Text>
<Text style={{ color: '#555' }}>Autorización para trabajar por cuenta ajena o propia.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>تصريح للعمل لدى الغير أو لحسابك الخاص.</Text>
    </View>
  </View>
  {/* 14. Permiso de Estancia por Estudios */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#ede7f6', borderRadius: 8, padding: 10 }}>
    <Ionicons name="book-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Permiso de Estancia por Estudios</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>تصريح الإقامة للدراسة</Text>
<Text style={{ color: '#555' }}>Para cursar estudios, prácticas o voluntariado.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>للدراسة أو التدريب أو التطوع.</Text>
    </View>
  </View>
  {/* 15. Certificado de Registro de Ciudadano de la UE */}
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#f9fbe7', borderRadius: 8, padding: 10 }}>
    <Ionicons name="document-text-outline" size={28} color="#000" style={{ marginRight: 10, marginTop: 2 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Certificado de Registro de Ciudadano de la UE</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>شهادة تسجيل مواطن الاتحاد الأوروبي</Text>
<Text style={{ color: '#555' }}>Para ciudadanos comunitarios residentes en España.</Text>
<Text style={{ color: '#388e3c', textAlign: 'right', fontFamily: 'System' }}>للمواطنين الأوروبيين المقيمين في إسبانيا.</Text>
    </View>
  </View>
</View>

<Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Noticias y Novedades de Extranjería</Text>
      {error && (
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>
          {error}
        </Text>
      )}
      {loading && (
        <ActivityIndicator size="large" color="#1976d2" style={{ marginBottom: 16 }} />
      )}
      {!hayNoticias && !loading && !error && (
        <Text style={{ color: '#888', fontSize: 16, marginBottom: 20, textAlign: 'center' }}>
          No hay noticias disponibles en este momento.
        </Text>
      )}
      {Object.keys(noticias).map(fuente => (
        <View key={fuente} style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#1976d2' }}>{fuente}</Text>
          {noticias[fuente].length === 0 && (
            <Text style={{ color: '#888', marginBottom: 8 }}>No hay noticias recientes.</Text>
          )}
          {noticias[fuente].slice(0, 5).map((noticia: any, idx: number) => {
            const title = getText(noticia.title);
            const pubDate = getText(noticia.pubDate);
            const description = getText(noticia.description);
            const link = getText(noticia.link);
            return (
              <View key={idx} style={{ marginBottom: 18 }}>
                <TouchableOpacity onPress={async () => {
                  if (!link || typeof link !== 'string' || !/^https?:\/\//.test(link)) {
                    alert('El enlace de la noticia no es válido.');
                    return;
                  }
                  try {
                    await Linking.openURL(link);
                  } catch (e) {
                    alert('No se pudo abrir el enlace. Intenta más tarde.');
                  }
                }}>
                  <Text style={{ fontSize: 16, color: '#1976d2', marginBottom: 4 }}>{title}</Text>
                  {pubDate ? (
                    <Text style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{pubDate}</Text>
                  ) : null}
                  {description ? (
                    <Text style={{ fontSize: 15, marginBottom: 6 }}>{description}</Text>
                  ) : null}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}
