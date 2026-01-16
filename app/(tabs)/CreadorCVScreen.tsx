import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useResumeBuilder } from "../../hooks/useResumeBuilder";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { generateCvHtml } from "../../utils/cvTemplates";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";

const steps = [
  "Datos personales",
  "Experiencia",
  "Formación",
  "Habilidades e idiomas",
];

const countries = [
  "Afganistán",
  "Albania",
  "Alemania",
  "Andorra",
  "Angola",
  "Antigua y Barbuda",
  "Arabia Saudita",
  "Argelia",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaiyán",
  "Bahamas",
  "Bangladés",
  "Barbados",
  "Baréin",
  "Bélgica",
  "Belice",
  "Benín",
  "Bielorrusia",
  "Birmania",
  "Bolivia",
  "Bosnia y Herzegovina",
  "Botsuana",
  "Brasil",
  "Brunéi",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Bután",
  "Cabo Verde",
  "Camboya",
  "Camerún",
  "Canadá",
  "Catar",
  "Chad",
  "Chile",
  "China",
  "Chipre",
  "Colombia",
  "Comoras",
  "Corea del Norte",
  "Corea del Sur",
  "Costa de Marfil",
  "Costa Rica",
  "Croacia",
  "Cuba",
  "Dinamarca",
  "Dominica",
  "Ecuador",
  "Egipto",
  "El Salvador",
  "Emiratos Árabes Unidos",
  "Eritrea",
  "Eslovaquia",
  "Eslovenia",
  "España",
  "Estados Unidos",
  "Estonia",
  "Esuatini",
  "Etiopía",
  "Filipinas",
  "Finlandia",
  "Fiyi",
  "Francia",
  "Gabón",
  "Gambia",
  "Georgia",
  "Ghana",
  "Granada",
  "Grecia",
  "Guatemala",
  "Guinea",
  "Guinea Ecuatorial",
  "Guinea-Bisáu",
  "Guyana",
  "Haití",
  "Honduras",
  "Hungría",
  "India",
  "Indonesia",
  "Irak",
  "Irán",
  "Irlanda",
  "Islandia",
  "Islas Marshall",
  "Islas Salomón",
  "Israel",
  "Italia",
  "Jamaica",
  "Japón",
  "Jordania",
  "Kazajistán",
  "Kenia",
  "Kirguistán",
  "Kiribati",
  "Kuwait",
  "Laos",
  "Lesoto",
  "Letonia",
  "Líbano",
  "Liberia",
  "Libia",
  "Liechtenstein",
  "Lituania",
  "Luxemburgo",
  "Madagascar",
  "Malasia",
  "Malaui",
  "Maldivas",
  "Malí",
  "Malta",
  "Marruecos",
  "Mauricio",
  "Mauritania",
  "México",
  "Micronesia",
  "Moldavia",
  "Mónaco",
  "Mongolia",
  "Montenegro",
  "Mozambique",
  "Namibia",
  "Nauru",
  "Nepal",
  "Nicaragua",
  "Níger",
  "Nigeria",
  "Noruega",
  "Nueva Zelanda",
  "Omán",
  "Países Bajos",
  "Pakistán",
  "Palaos",
  "Panamá",
  "Papúa Nueva Guinea",
  "Paraguay",
  "Perú",
  "Polonia",
  "Portugal",
  "Reino Unido",
  "República Centroafricana",
  "República Checa",
  "República del Congo",
  "República Democrática del Congo",
  "República Dominicana",
  "Ruanda",
  "Rumania",
  "Rusia",
  "Samoa",
  "San Cristóbal y Nieves",
  "San Marino",
  "San Vicente y las Granadinas",
  "Santa Lucía",
  "Santo Tomé y Príncipe",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leona",
  "Singapur",
  "Siria",
  "Somalia",
  "Sri Lanka",
  "Sudáfrica",
  "Sudán",
  "Sudán del Sur",
  "Suecia",
  "Suiza",
  "Surinam",
  "Tailandia",
  "Tanzania",
  "Tayikistán",
  "Timor Oriental",
  "Togo",
  "Tonga",
  "Trinidad y Tobago",
  "Túnez",
  "Turquía",
  "Turkmenistán",
  "Tuvalu",
  "Ucrania",
  "Uganda",
  "Uruguay",
  "Uzbekistán",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Yibuti",
  "Zambia",
  "Zimbabue",
];

const colorOptions = [
  { name: "Blanco", value: "#ffffff" },
  { name: "Azul claro", value: "#e3f2fd" },
  { name: "Gris claro", value: "#f5f5f5" },
  { name: "Verde pastel", value: "#e8f5e8" },
  { name: "Amarillo pastel", value: "#fffde7" },
];

export default function CreadorCVScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const {
    data,
    updatePersonal,
    updateExperience,
    addExperience,
    removeExperience,
    updateEducation,
    addEducation,
    removeEducation,
    updateLanguage,
    addLanguage,
    removeLanguage,
    updateSkill,
    addSkill,
    removeSkill,
    setPhoto,
  } = useResumeBuilder();

  const goNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleGeneratePdf = async () => {
    try {
      setGenerating(true);
      // Usar template Europass por defecto
      const html = generateCvHtml({ ...data, template: "europass" });
      const { uri } = await Print.printToFileAsync({ html });

      if (Platform.OS === "ios") {
        await Print.printAsync({ html });
      }

      const targetPath = `${FileSystem.documentDirectory}cv-${Date.now()}.pdf`;
      await FileSystem.copyAsync({ from: uri, to: targetPath });

      if (Platform.OS === "android" || Platform.OS === "ios") {
        await shareAsync(targetPath, { mimeType: "application/pdf" });
      } else {
        Alert.alert("PDF generado", `Archivo guardado en: ${targetPath}`);
      }
    } catch (error) {
      console.error("Error generando PDF", error);
      Alert.alert("Error", "No se pudo generar el PDF. Inténtalo nuevamente.");
    } finally {
      setGenerating(false);
    }
  };

  const handlePickPhoto = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled || !result.assets?.length) {
        return;
      }

      const file = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const mimeType = file.mimeType ?? "image/jpeg";
      const dataUrl = `data:${mimeType};base64,${base64}`;
      setPhoto(file.uri, dataUrl);
    } catch (error) {
      console.error("Error seleccionando foto", error);
      Alert.alert("Error", "No se pudo cargar la foto. Inténtalo nuevamente.");
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(undefined, undefined);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View style={[styles.section, { backgroundColor: data.personal.backgroundColor }]}>
            <Text style={styles.sectionTitle}>Datos personales</Text>
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>
                Completa todos los campos en español. El texto en árabe te orienta sobre qué escribir.
              </Text>
              <Text style={styles.helperTextAr}>
                اكتب كل المعلومات باللغة الإسبانية. النص العربي يشرح لك ماذا تكتب في كل خانة.
              </Text>
            </View>
            <View style={styles.photoRow}>
              <View style={styles.photoPreview}>
                {data.personal.photoDataUrl ? (
                  <Image source={{ uri: data.personal.photoDataUrl }} style={styles.photoImage} />
                ) : (
                  <Text style={styles.photoPlaceholderText}>
                    Foto tipo carnet (opcional)
                    {"\n"}
                    صورة شخصية اختيارية
                  </Text>
                )}
              </View>
              <View style={styles.photoActions}>
                <TouchableOpacity style={styles.photoButton} onPress={handlePickPhoto}>
                  <Ionicons name="image" size={18} color="#fff" />
                  <Text style={styles.photoButtonText}>Subir foto</Text>
                </TouchableOpacity>
                {data.personal.photoDataUrl ? (
                  <TouchableOpacity style={styles.photoButtonSecondary} onPress={handleRemovePhoto}>
                    <Ionicons name="trash" size={18} color="#1f4f8b" />
                    <Text style={styles.photoButtonSecondaryText}>Quitar foto</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>

            <Text style={styles.fieldLabel}>Nombre y apellidos</Text>
            <Text style={styles.helperTextAr}>اكتب اسمك الكامل بالإسبانية (مثال: Ahmed El Mansouri)</Text>
            <TextInput
              value={data.personal.fullName}
              onChangeText={(text) => updatePersonal("fullName", text)}
              placeholder="Ej: Ahmed El Mansouri"
              style={styles.input}
            />

            <View style={styles.inputRow}>
              <View style={styles.halfInput}>
                <Text style={styles.fieldLabel}>Fecha de nacimiento</Text>
                <Text style={styles.helperTextAr}>اكتب التاريخ بصيغة يوم/شهر/سنة</Text>
                <TextInput
                  value={data.personal.dateOfBirth}
                  onChangeText={(text) => updatePersonal("dateOfBirth", text)}
                  placeholder="Ej: 01/01/1990"
                  style={styles.input}
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.fieldLabel}>Nacionalidad</Text>
                <Text style={styles.helperTextAr}>الجنسية (مثال: Marroquí)</Text>
                <TextInput
                  value={data.personal.nationality}
                  onChangeText={(text) => updatePersonal("nationality", text)}
                  placeholder="Ej: Marroquí"
                  style={styles.input}
                />
              </View>
            </View>

            <Text style={styles.fieldLabel}>Dirección en España</Text>
            <Text style={styles.helperTextAr}>اكتب عنوانك الحالي باللغة الإسبانية</Text>
            <TextInput
              value={data.personal.address}
              onChangeText={(text) => updatePersonal("address", text)}
              placeholder="Ej: Calle de la Integración 10, Madrid"
              style={styles.input}
            />

            <View style={styles.inputRow}>
              <View style={styles.halfInput}>
                <Text style={styles.fieldLabel}>Teléfono</Text>
                <Text style={styles.helperTextAr}>رقم الهاتف الإسباني (مثال: +34 ...)</Text>
                <TextInput
                  value={data.personal.phone}
                  onChangeText={(text) => updatePersonal("phone", text)}
                  placeholder="Ej: +34 600 000 000"
                  style={styles.input}
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.fieldLabel}>Correo electrónico</Text>
                <Text style={styles.helperTextAr}>اكتب بريدك الإلكتروني للت contacto</Text>
                <TextInput
                  value={data.personal.email}
                  onChangeText={(text) => updatePersonal("email", text)}
                  placeholder="Ej: nombre@example.com"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <Text style={styles.fieldLabel}>Puesto deseado en España</Text>
            <Text style={styles.helperTextAr}>اكتب المنصب المهني الذي تبحث عنه باللغة الإسبانية</Text>
            <TextInput
              value={data.personal.desiredPosition}
              onChangeText={(text) => updatePersonal("desiredPosition", text)}
              placeholder="Ej: Auxiliar administrativo"
              style={styles.input}
            />

            <Text style={styles.fieldLabel}>Resumen profesional (1-2 frases)</Text>
            <Text style={styles.helperTextAr}>اكتب جملة قصيرة بالإسبانية عن خبرتك ومهاراتك</Text>
            <TextInput
              value={data.personal.headline}
              onChangeText={(text) => updatePersonal("headline", text)}
              placeholder="Escribe tu resumen profesional"
              style={[styles.input, styles.textArea]}
              multiline
            />

            <Text style={styles.fieldLabel}>Color de fondo del CV</Text>
            <Text style={styles.helperTextAr}>اختر لون خلفية السيرة الذاتية</Text>
            <View style={styles.colorSelector}>
              {colorOptions.map((color) => (
                <TouchableOpacity
                  key={color.value}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color.value },
                    data.personal.backgroundColor === color.value && styles.colorOptionSelected,
                  ]}
                  onPress={() => updatePersonal("backgroundColor", color.value)}
                >
                  <Text style={styles.colorOptionText}>{color.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 1:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiencia laboral</Text>
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>Escribe cada experiencia en español: fechas, ocupación y empresa.</Text>
              <Text style={styles.helperTextAr}>
                اكتب الخبرة باللغة الإسبانية: التاريخ، المسمى الوظيفي، الشركة والمهام الرئيسية.
              </Text>
            </View>
            {data.experiences.map((exp, index) => {
              const disableRemove = data.experiences.length === 1;
              return (
                <View key={`experience-${index}`} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Puesto #{index + 1}</Text>
                    <TouchableOpacity
                      onPress={() => removeExperience(index)}
                      disabled={disableRemove}
                      style={disableRemove ? styles.iconButtonDisabled : undefined}
                    >
                      <Ionicons
                        name="trash"
                        size={18}
                        color={disableRemove ? "#cbd4e2" : "#e74c3c"}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputRow}>
                    <View style={styles.halfInput}>
                      <Text style={styles.fieldLabel}>Desde</Text>
                      <TextInput
                        value={exp.startDate}
                        onChangeText={(text) => updateExperience(index, "startDate", text)}
                        placeholder="Ej: 03/2022"
                        style={styles.input}
                      />
                    </View>
                    <View style={styles.halfInput}>
                      <Text style={styles.fieldLabel}>Hasta</Text>
                      <TextInput
                        value={exp.endDate}
                        onChangeText={(text) => updateExperience(index, "endDate", text)}
                        placeholder="Ej: 05/2024 o Actualidad"
                        style={styles.input}
                      />
                    </View>
                  </View>
                  <Text style={styles.helperText}>Escribe las fechas con formato mes/año.</Text>
                  <Text style={styles.helperTextAr}>استخدم صيغة شهر/سنة بالأسبانية.</Text>

                  <Text style={styles.fieldLabel}>Ocupación (solo en español)</Text>
                  <Text style={styles.helperTextAr}>اكتب المسمى الوظيفي باللغة الإسبانية</Text>
                  <TextInput
                    value={exp.occupation}
                    onChangeText={(text) => updateExperience(index, "occupation", text)}
                    placeholder="Ej: Dependiente de tienda"
                    style={styles.input}
                  />

                  <Text style={styles.fieldLabel}>Empresa y ciudad</Text>
                  <Text style={styles.helperTextAr}>اكتب اسم الشركة والمدينة بالأسبانية</Text>
                  <TextInput
                    value={exp.company}
                    onChangeText={(text) => updateExperience(index, "company", text)}
                    placeholder="Ej: Mercado El Amigo, Madrid"
                    style={styles.input}
                  />

                  <Text style={styles.fieldLabel}>País</Text>
                  <Text style={styles.helperTextAr}>اختر البلد الذي عملت فيه</Text>
                  <View style={styles.input}>
                    <Picker
                      selectedValue={exp.country}
                      onValueChange={(itemValue) => updateExperience(index, "country", itemValue)}
                      style={{ height: 50, width: "100%" }}
                    >
                      <Picker.Item label="Selecciona un país" value="" />
                      {countries.map((country) => (
                        <Picker.Item key={country} label={country} value={country} />
                      ))}
                    </Picker>
                  </View>

                  <Text style={styles.fieldLabel}>Responsabilidades principales</Text>
                  <Text style={styles.helperTextAr}>
                    اكتب 2 أو 3 جمل قصيرة بالإسبانية حول المهام التي قمت بها
                  </Text>
                  <TextInput
                    value={exp.responsibilities}
                    onChangeText={(text) => updateExperience(index, "responsibilities", text)}
                    placeholder="Ej: Atención al cliente, cobro y reposición de productos"
                    style={[styles.input, styles.textArea]}
                    multiline
                  />
                </View>
              );
            })}
            <TouchableOpacity style={styles.addButton} onPress={addExperience}>
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Añadir otro puesto</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formación y cursos</Text>
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>
                Incluye estudios, cursos o certificados seguidos en España u otros países.
              </Text>
              <Text style={styles.helperTextAr}>
                أضف دراسات أو دورات أو شهادات، واكتبها كلها بالإسبانية.
              </Text>
            </View>
            {data.education.map((edu, index) => {
              const disableRemove = data.education.length === 1;
              return (
                <View key={`education-${index}`} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Estudio #{index + 1}</Text>
                    <TouchableOpacity
                      onPress={() => removeEducation(index)}
                      disabled={disableRemove}
                      style={disableRemove ? styles.iconButtonDisabled : undefined}
                    >
                      <Ionicons
                        name="trash"
                        size={18}
                        color={disableRemove ? "#cbd4e2" : "#e74c3c"}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputRow}>
                    <View style={styles.halfInput}>
                      <Text style={styles.fieldLabel}>Desde</Text>
                      <TextInput
                        value={edu.startDate}
                        onChangeText={(text) => updateEducation(index, "startDate", text)}
                        placeholder="Ej: 09/2023"
                        style={styles.input}
                      />
                    </View>
                    <View style={styles.halfInput}>
                      <Text style={styles.fieldLabel}>Hasta</Text>
                      <TextInput
                        value={edu.endDate}
                        onChangeText={(text) => updateEducation(index, "endDate", text)}
                        placeholder="Ej: 06/2024"
                        style={styles.input}
                      />
                    </View>
                  </View>
                  <Text style={styles.helperTextAr}>اكتب التواريخ بصيغة شهر/سنة</Text>

                  <Text style={styles.fieldLabel}>Diploma o certificado</Text>
                  <Text style={styles.helperTextAr}>اكتب اسم الشهادة أو الدورة بالإسبانية</Text>
                  <TextInput
                    value={edu.diploma}
                    onChangeText={(text) => updateEducation(index, "diploma", text)}
                    placeholder="Ej: Curso intensivo de español B1"
                    style={styles.input}
                  />

                  <Text style={styles.fieldLabel}>Centro / Institución</Text>
                  <Text style={styles.helperTextAr}>اسم المركز و المدينة بالأسبانية</Text>
                  <TextInput
                    value={edu.institution}
                    onChangeText={(text) => updateEducation(index, "institution", text)}
                    placeholder="Ej: Academia de Inmigrantes, Madrid"
                    style={styles.input}
                  />

                  <Text style={styles.fieldLabel}>País</Text>
                  <Text style={styles.helperTextAr}>اختر البلد الذي درست فيه</Text>
                  <View style={styles.input}>
                    <Picker
                      selectedValue={edu.country}
                      onValueChange={(itemValue) => updateEducation(index, "country", itemValue)}
                      style={{ height: 50, width: "100%" }}
                    >
                      <Picker.Item label="Selecciona un país" value="" />
                      {countries.map((country) => (
                        <Picker.Item key={country} label={country} value={country} />
                      ))}
                    </Picker>
                  </View>
                </View>
              );
            })}
            <TouchableOpacity style={styles.addButton} onPress={addEducation}>
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Añadir otro estudio</Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades e idiomas</Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Habilidades principales</Text>
              <View style={styles.helperBoxSecondary}>
                <Text style={styles.helperText}>Ejemplos: Atención al cliente, Trabajo en equipo.</Text>
                <Text style={styles.helperTextAr}>أمثلة: Atención al cliente، Trabajo en equipo.</Text>
              </View>
              {data.skills.map((skill, index) => {
                const disableRemove = data.skills.length === 1;
                return (
                  <View key={`skill-${index}`} style={styles.skillRow}>
                    <TextInput
                      value={skill}
                      onChangeText={(text) => updateSkill(index, text)}
                      placeholder="Escribe la habilidad en español"
                      style={[styles.input, styles.flex1]}
                    />
                    <TouchableOpacity
                      onPress={() => removeSkill(index)}
                      disabled={disableRemove}
                      style={disableRemove ? styles.iconButtonDisabled : styles.removeChip}
                    >
                      <Ionicons
                        name="remove-circle"
                        size={20}
                        color={disableRemove ? "#cbd4e2" : "#e74c3c"}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
              <TouchableOpacity style={styles.smallButton} onPress={addSkill}>
                <Ionicons name="add" size={18} color="#1f4f8b" />
                <Text style={styles.smallButtonText}>Añadir habilidad</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Idiomas</Text>
              <View style={styles.helperBoxSecondary}>
                <Text style={styles.helperText}>Escribe el idioma y el nivel MCER (A1 - C2).</Text>
                <Text style={styles.helperTextAr}>اكتب اسم اللغة ومستواك باستخدام A1 - C2.</Text>
              </View>
              {data.languages.map((lang, index) => {
                const disableRemove = data.languages.length === 1;
                return (
                  <View key={`language-${index}`} style={styles.languageCard}>
                    <View style={styles.languageHeader}>
                      <Text style={styles.fieldLabel}>Idioma #{index + 1}</Text>
                      <TouchableOpacity
                        onPress={() => removeLanguage(index)}
                        disabled={disableRemove}
                        style={disableRemove ? styles.iconButtonDisabled : undefined}
                      >
                        <Ionicons
                          name="remove-circle"
                          size={18}
                          color={disableRemove ? "#cbd4e2" : "#e74c3c"}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.inputRow}>
                      <View style={styles.halfInput}>
                        <TextInput
                          value={lang.language}
                          onChangeText={(text) => updateLanguage(index, "language", text)}
                          placeholder="Ej: Español"
                          style={styles.input}
                        />
                      </View>
                      <View style={styles.halfInput}>
                        <TextInput
                          value={lang.level}
                          onChangeText={(text) => updateLanguage(index, "level", text.toUpperCase())}
                          placeholder="Nivel (A1-C2)"
                          style={styles.input}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
              <TouchableOpacity style={styles.smallButton} onPress={addLanguage}>
                <Ionicons name="add" size={18} color="#1f4f8b" />
                <Text style={styles.smallButtonText}>Añadir idioma</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Resumen previo</Text>
              <Text style={styles.summaryLabel}>Nombre:</Text>
              <Text style={styles.summaryValue}>{data.personal.fullName}</Text>
              <Text style={styles.summaryLabel}>Puesto deseado:</Text>
              <Text style={styles.summaryValue}>{data.personal.desiredPosition}</Text>
              <Text style={styles.summaryLabel}>Experiencias registradas:</Text>
              <Text style={styles.summaryValue}>{data.experiences.length}</Text>
              <Text style={styles.summaryLabel}>Formaciones registradas:</Text>
              <Text style={styles.summaryValue}>{data.education.length}</Text>
              <Text style={styles.summaryHint}>
                Revisa todo antes de generar el PDF. El documento final estará en español.
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Creador de CV</Text>
      </View>
      <View style={styles.stepIndicator}>
        {steps.map((label, index) => (
          <View key={label} style={styles.stepItem}>
            <View
              style={[
                styles.stepCircle,
                index === step && styles.stepCircleActive,
                index < step && styles.stepCircleDone,
              ]}
            >
              <Text
                style={[
                  styles.stepCircleText,
                  (index === step || index < step) && styles.stepCircleTextActive,
                ]}
              >
                {index + 1}
              </Text>
            </View>
            <Text
              style={[
                styles.stepLabel,
                index === step && styles.stepLabelActive,
              ]}
            >
              {label}
            </Text>
          </View>
        ))}
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {renderStep()}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, step === 0 && styles.navButtonDisabled]}
          onPress={goBack}
          disabled={step === 0}
        >
          <Ionicons name="arrow-back" size={18} color={step === 0 ? "#aaa" : "#fff"} />
          <Text style={styles.navButtonText}>Atrás</Text>
        </TouchableOpacity>
        {step === steps.length - 1 ? (
          <TouchableOpacity
            style={[styles.primaryButton, generating && styles.primaryButtonDisabled]}
            onPress={handleGeneratePdf}
            disabled={generating}
          >
            {generating ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="download" size={18} color="#fff" />
            )}
            <Text style={styles.primaryButtonText}>
              {generating ? "Generando..." : "Generar PDF"}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.primaryButton} onPress={goNext}>
            <Text style={styles.primaryButtonText}>Continuar</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f4f8b",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    marginRight: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  stepItem: {
    alignItems: "center",
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#adb5bd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  stepCircleActive: {
    borderColor: "#1f4f8b",
    backgroundColor: "rgba(31, 79, 139, 0.15)",
  },
  stepCircleDone: {
    borderColor: "#1f4f8b",
    backgroundColor: "#1f4f8b",
  },
  stepCircleText: {
    color: "#6c757d",
    fontWeight: "600",
  },
  stepCircleTextActive: {
    color: "#fff",
  },
  stepLabel: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "center",
    width: 80,
  },
  stepLabelActive: {
    color: "#1f4f8b",
    fontWeight: "600",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f4f8b",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d7dee7",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    color: "#2f3e4d",
    backgroundColor: "#fdfdff",
  },
  inputArabic: {
    textAlign: "right",
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  card: {
    borderWidth: 1,
    borderColor: "#e4e9f2",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    backgroundColor: "#fdfdff",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1f4f8b",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4b5d73",
    marginBottom: 6,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f4f8b",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#0056b3",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  photoButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  photoButtonSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6c757d",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  photoButtonSecondaryText: {
    color: "#1f4f8b",
    fontWeight: "600",
    marginLeft: 8,
  },
  photoActions: {
    flex: 1,
    alignItems: "center",
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#dee2e6",
  },
  photoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholderText: {
    textAlign: "center",
    color: "#6c757d",
    fontSize: 12,
  },
  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  helperBox: {
    backgroundColor: "#e3f2fd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  helperText: {
    fontSize: 14,
    color: "#1f4f8b",
    marginBottom: 4,
  },
  helperTextAr: {
    fontSize: 14,
    color: "#1f4f8b",
    textAlign: "right",
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f4f8b",
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  helperBoxSecondary: {
    backgroundColor: "#f8f9fa",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  skillRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  removeChip: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  smallButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f4f8b",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  smallButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  languageCard: {
    marginBottom: 12,
  },
  languageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  iconButtonDisabled: {
    backgroundColor: "#cbd4e2",
    opacity: 0.6,
  },
  digitalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  flex1: {
    flex: 1,
  },
  levelInput: {
    width: 90,
  },
  motherTongueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  languageLevels: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  levelColumn: {
    width: "48%",
  },
  levelLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1f4f8b",
    marginBottom: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e6ebf3",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#6c757d",
  },
  navButtonDisabled: {
    backgroundColor: "#d0d4da",
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#1f4f8b",
  },
  primaryButtonDisabled: {
    backgroundColor: "#93a5c9",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  summaryCard: {
    marginTop: 18,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d7deea",
    backgroundColor: "#f8faff",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f4f8b",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4b5d73",
  },
  summaryValue: {
    fontSize: 13,
    color: "#263445",
    marginBottom: 6,
  },
  summaryHint: {
    fontSize: 12,
    color: "#6c7a8c",
    marginTop: 6,
  },
  colorSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  colorOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  colorOptionSelected: {
    borderColor: "#1f4f8b",
    borderWidth: 3,
  },
  colorOptionText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
