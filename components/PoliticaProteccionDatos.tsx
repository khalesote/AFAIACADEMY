import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';

const PoliticaProteccionDatos = () => {
  const openLink = async (url: string) => {
    await Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>POLÍTICA DE PROTECCIÓN DE DATOS</Text>
      
      <Text style={styles.sectionTitle}>1. Responsable del Tratamiento</Text>
      <Text style={styles.text}>
        Afai academia de inmigrantes, con domicilio en Valcarreres, 7, 50004 Zaragoza, es el Responsable del Tratamiento de los datos personales del Usuario y le informa que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679, de 27 de abril (GDPR), y la Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD). Puede contactarnos en el correo <Text style={styles.link}>somos@afaiacademiadeinmigrantes.com</Text> o en el teléfono 662-744-837.
      </Text>

      <Text style={styles.sectionTitle}>2. Datos que Recopilamos</Text>
      <Text style={styles.text}>
        Recopilamos únicamente la información necesaria para operar la comunidad:
        {'\n\n'}- Correo electrónico y nombre o nickname.
        {'\n'}- Foto de perfil que el usuario sube voluntariamente.
        {'\n'}- Mensajes públicos o privados enviados en el chat y foro.
        {'\n'}- Información básica de autenticación (UID de Firebase, proveedor de acceso).
      </Text>

      <Text style={styles.sectionTitle}>3. Dónde se Almacenan los Datos</Text>
      <Text style={styles.text}>
        Toda la información se guarda dentro del ecosistema de Google Firebase:
        {'\n\n'}- Firebase Authentication: credenciales básicas y UID.
        {'\n'}- Cloud Firestore / Realtime Database: perfiles, mensajes y acciones dentro de la app.
        {'\n'}- Firebase Storage: fotos de perfil y archivos adjuntos.
      </Text>

      <Text style={styles.sectionTitle}>4. Finalidad del Tratamiento</Text>
      <Text style={styles.text}>
        Utilizamos los datos con las siguientes finalidades legitimadas:
        {'\n\n'}- Permitir la comunicación entre usuarios mediante chat y foro.
        {'\n'}- Mostrar la identidad pública (nombre y foto) cuando otro usuario visita un perfil.
        {'\n'}- Gestionar el funcionamiento técnico de la app, seguridad y prevención de abusos.
        {'\n'}- Enviar alertas operativas o recordatorios estrictamente relacionados con el servicio.
      </Text>

      <Text style={styles.sectionTitle}>3. Base Legítima del Tratamiento</Text>
      <Text style={styles.text}>
        La base legal para el tratamiento de sus datos es el consentimiento que se le solicita mediante la aceptación de la presente política de privacidad. El ofrecimiento de los datos personales es obligatorio para prestar los servicios ofrecidos a través de la aplicación, por lo que su no facilitación impedirá su uso.
      </Text>

      <Text style={styles.sectionTitle}>5. Destinatarios de los Datos</Text>
      <Text style={styles.text}>
        No se cederán datos a terceros, salvo obligación legal. Como encargados de tratamiento, podrán tener acceso a sus datos los siguientes prestadores de servicios:
        {'\n\n'}- Proveedores de servicios tecnológicos
        {'\n'}- Proveedores de servicios de alojamiento de datos
        {'\n'}- Asesorías y despachos profesionales cuando sea necesario
      </Text>

      <Text style={styles.sectionTitle}>6. Derechos de los Usuarios y Eliminación de Datos</Text>
      <Text style={styles.text}>
        Cualquier persona tiene derecho a obtener confirmación sobre si en Afai academia de inmigrantes estamos tratando datos personales que les conciernan. Las personas interesadas tienen derecho a:
        {'\n\n'}- Acceder a sus datos personales.
        {'\n'}- Solicitar la rectificación de los datos inexactos.
        {'\n'}- Solicitar su supresión cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos.
        {'\n'}- Solicitar la limitación de su tratamiento.
        {'\n'}- Oponerse al tratamiento de sus datos.
        {'\n'}- Solicitar la portabilidad de los datos.
        {'\n\n'}Puede solicitar la eliminación completa de su cuenta y datos escribiendo a <Text style={styles.link}>somos@afaiacademiadeinmigrantes.com</Text> o desde el formulario disponible en la app (sección "Mi Perfil" &gt; "Solicitar eliminación"). Todas las solicitudes se atienden en un máximo de 30 días.
      </Text>

      <Text style={styles.sectionTitle}>7. Uso de Servicios de Terceros</Text>
      <Text style={styles.text}>
        Esta aplicación se apoya en Google Firebase (Authentication, Cloud Firestore, Storage y Cloud Messaging). Google actúa como encargado de tratamiento conforme a sus propios términos y cumple con las certificaciones de seguridad aplicables. No compartimos datos con terceros adicionales salvo obligación legal.
      </Text>

      <Text style={styles.sectionTitle}>8. Plazo de Conservación de los Datos</Text>
      <Text style={styles.text}>
        Los datos personales proporcionados se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recaban y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad y del tratamiento de los datos.
      </Text>

      <Text style={styles.sectionTitle}>9. Medidas de Seguridad</Text>
      <Text style={styles.text}>
        Afai academia de inmigrantes implementa las medidas técnicas y organizativas necesarias para garantizar la seguridad de sus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos.
      </Text>

      <Text style={styles.sectionTitle}>10. Contacto y Reportes</Text>
      <Text style={styles.text}>
        Para cualquier cuestión relacionada con la presente política, ejercer derechos o reportar contenido indebido, puede contactar con nosotros a través de:
        {'\n\n'}Email privacidad: <Text style={styles.link}>somos@afaiacademiadeinmigrantes.com</Text>
        {'\n'}Email para reportes/abusos: <Text style={styles.link}>admin@academiadeinmigrantes.es</Text>
        {'\n'}Dirección: Valcarreres, 7, 50004 Zaragoza
        {'\n'}Teléfono: 662-744-837
      </Text>

      <Text style={styles.lastUpdated}>
        Última actualización: [FECHA]
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#2c3e50',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#34495e',
    marginBottom: 10,
  },
  lastUpdated: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: 20,
    color: '#7f8c8d',
  },
  link: {
    color: '#3498db',
    textDecorationLine: 'underline',
  },
});

export default PoliticaProteccionDatos;
