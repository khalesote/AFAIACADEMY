import React, { useState } from "react";
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
  Modal,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCvBuilderPro, CvTemplate } from "../../hooks/useCvBuilderPro";
import { generateCvHtmlPro } from "../../utils/cvTemplatesPro";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";

const TEMPLATES: { id: CvTemplate; name: string; icon: string }[] = [
  { id: "europass", name: "Europass", icon: "document-text" },
  { id: "moderno", name: "Moderno", icon: "sparkles" },
  { id: "creativo", name: "Creativo", icon: "color-palette" },
  { id: "ejecutivo", name: "Ejecutivo", icon: "briefcase" },
];

const NIVELES_IDIOMA = ["A1", "A2", "B1", "B2", "C1", "C2", "Nativo"];
const NIVELES_COMPETENCIA = ["basico", "intermedio", "avanzado", "experto"];
const CATEGORIAS_COMPETENCIA = [
  { label: "Técnica", value: "tecnica" },
  { label: "Blanda", value: "blanda" },
  { label: "Digital", value: "digital" },
  { label: "Idioma", value: "idioma" },
  { label: "Otra", value: "otra" },
];

export default function CreadorCVProScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"datos" | "experiencia" | "formacion" | "competencias" | "preview">("datos");
  const [showPreview, setShowPreview] = useState(false);
  const [generating, setGenerating] = useState(false);

  const {
    cvData,
    updatePersonal,
    setFoto,
    addExperiencia,
    updateExperiencia,
    removeExperiencia,
    addFormacion,
    updateFormacion,
    removeFormacion,
    addIdioma,
    updateIdioma,
    removeIdioma,
    addCompetencia,
    updateCompetencia,
    removeCompetencia,
    addCertificacion,
    updateCertificacion,
    removeCertificacion,
    addProyecto,
    updateProyecto,
    removeProyecto,
    setPlantilla,
    guardarBorrador,
  } = useCvBuilderPro();

  const handlePickPhoto = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets?.length) {
        const file = result.assets[0];
        const base64 = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const mimeType = file.mimeType ?? "image/jpeg";
        const dataUrl = `data:${mimeType};base64,${base64}`;
        setFoto(dataUrl);
      }
    } catch (error) {
      console.error("Error seleccionando foto", error);
      Alert.alert("Error", "No se pudo cargar la foto. Inténtalo nuevamente.");
    }
  };

  const handleGeneratePdf = async () => {
    try {
      setGenerating(true);
      const html = generateCvHtmlPro(cvData);
      const { uri } = await Print.printToFileAsync({ html });

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

  const handleSaveDraft = async () => {
    try {
      await guardarBorrador("borrador");
      Alert.alert("Éxito", "Borrador guardado correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el borrador");
    }
  };

  const renderPersonalInfo = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        
        <View style={styles.photoSection}>
          {cvData.personal.foto ? (
            <Image source={{ uri: cvData.personal.foto }} style={styles.photoPreview} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="person" size={40} color="#9DC3AA" />
            </View>
          )}
          <TouchableOpacity style={styles.photoButton} onPress={handlePickPhoto}>
            <Ionicons name="camera" size={18} color="#fff" />
            <Text style={styles.photoButtonText}>Agregar foto</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Nombre completo *</Text>
        <TextInput
          style={styles.input}
          value={cvData.personal.nombreCompleto}
          onChangeText={(text) => updatePersonal("nombreCompleto", text)}
          placeholder="Ej: Ahmed El Mansouri"
        />

        <Text style={styles.label}>Título profesional</Text>
        <TextInput
          style={styles.input}
          value={cvData.personal.tituloProfesional}
          onChangeText={(text) => updatePersonal("tituloProfesional", text)}
          placeholder="Ej: Desarrollador Full Stack"
        />

        <Text style={styles.label}>Resumen profesional</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={cvData.personal.resumenProfesional}
          onChangeText={(text) => updatePersonal("resumenProfesional", text)}
          placeholder="Escribe un resumen breve de tu perfil profesional..."
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          value={cvData.personal.email}
          onChangeText={(text) => updatePersonal("email", text)}
          placeholder="nombre@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Teléfono *</Text>
        <TextInput
          style={styles.input}
          value={cvData.personal.telefono}
          onChangeText={(text) => updatePersonal("telefono", text)}
          placeholder="+34 600 000 000"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={cvData.personal.direccion}
          onChangeText={(text) => updatePersonal("direccion", text)}
          placeholder="Calle y número"
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Ciudad</Text>
            <TextInput
              style={styles.input}
              value={cvData.personal.ciudad}
              onChangeText={(text) => updatePersonal("ciudad", text)}
              placeholder="Madrid"
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Código postal</Text>
            <TextInput
              style={styles.input}
              value={cvData.personal.codigoPostal}
              onChangeText={(text) => updatePersonal("codigoPostal", text)}
              placeholder="28001"
            />
          </View>
        </View>

        <Text style={styles.label}>País</Text>
        <TextInput
          style={styles.input}
          value={cvData.personal.pais}
          onChangeText={(text) => updatePersonal("pais", text)}
          placeholder="España"
        />

        <Text style={styles.label}>Fecha de nacimiento</Text>
        <TextInput
          style={styles.input}
          value={cvData.personal.fechaNacimiento}
          onChangeText={(text) => updatePersonal("fechaNacimiento", text)}
          placeholder="DD/MM/AAAA"
        />

        <Text style={styles.label}>Nacionalidad</Text>
        <TextInput
          style={styles.input}
          value={cvData.personal.nacionalidad}
          onChangeText={(text) => updatePersonal("nacionalidad", text)}
          placeholder="Española"
        />

        <Text style={styles.label}>LinkedIn (opcional)</Text>
        <TextInput
          style={styles.input}
          value={cvData.personal.linkedin}
          onChangeText={(text) => updatePersonal("linkedin", text)}
          placeholder="linkedin.com/in/tu-perfil"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Sitio web (opcional)</Text>
        <TextInput
          style={styles.input}
          value={cvData.personal.website}
          onChangeText={(text) => updatePersonal("website", text)}
          placeholder="www.tusitio.com"
          autoCapitalize="none"
        />
      </View>
    </ScrollView>
  );

  const renderExperiencia = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
          <TouchableOpacity style={styles.addButton} onPress={addExperiencia}>
            <Ionicons name="add-circle" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>

        {cvData.experiencias.map((exp, index) => (
          <View key={exp.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Experiencia #{index + 1}</Text>
              <TouchableOpacity onPress={() => removeExperiencia(exp.id)}>
                <Ionicons name="trash" size={20} color="#e74c3c" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Cargo *</Text>
            <TextInput
              style={styles.input}
              value={exp.cargo}
              onChangeText={(text) => updateExperiencia(exp.id, "cargo", text)}
              placeholder="Ej: Desarrollador Frontend"
            />

            <Text style={styles.label}>Empresa *</Text>
            <TextInput
              style={styles.input}
              value={exp.empresa}
              onChangeText={(text) => updateExperiencia(exp.id, "empresa", text)}
              placeholder="Nombre de la empresa"
            />

            <Text style={styles.label}>Ubicación</Text>
            <TextInput
              style={styles.input}
              value={exp.ubicacion}
              onChangeText={(text) => updateExperiencia(exp.id, "ubicacion", text)}
              placeholder="Ciudad, País"
            />

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Fecha inicio</Text>
                <TextInput
                  style={styles.input}
                  value={exp.fechaInicio}
                  onChangeText={(text) => updateExperiencia(exp.id, "fechaInicio", text)}
                  placeholder="MM/AAAA"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Fecha fin</Text>
                <TextInput
                  style={styles.input}
                  value={exp.fechaFin}
                  onChangeText={(text) => updateExperiencia(exp.id, "fechaFin", text)}
                  placeholder="MM/AAAA"
                  editable={!exp.actualmente}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => updateExperiencia(exp.id, "actualmente", !exp.actualmente)}
            >
              <Ionicons
                name={exp.actualmente ? "checkbox" : "square-outline"}
                size={24}
                color={exp.actualmente ? "#9DC3AA" : "#ccc"}
              />
              <Text style={styles.checkboxLabel}>Actualmente trabajo aquí</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={exp.descripcion}
              onChangeText={(text) => updateExperiencia(exp.id, "descripcion", text)}
              placeholder="Describe tus responsabilidades y logros..."
              multiline
              numberOfLines={4}
            />
          </View>
        ))}

        {cvData.experiencias.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="briefcase-outline" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No hay experiencias agregadas</Text>
            <Text style={styles.emptyStateSubtext}>Presiona "Agregar" para comenzar</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  const renderFormacion = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Formación Académica</Text>
          <TouchableOpacity style={styles.addButton} onPress={addFormacion}>
            <Ionicons name="add-circle" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>

        {cvData.formacion.map((form, index) => (
          <View key={form.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Formación #{index + 1}</Text>
              <TouchableOpacity onPress={() => removeFormacion(form.id)}>
                <Ionicons name="trash" size={20} color="#e74c3c" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Título *</Text>
            <TextInput
              style={styles.input}
              value={form.titulo}
              onChangeText={(text) => updateFormacion(form.id, "titulo", text)}
              placeholder="Ej: Grado en Ingeniería Informática"
            />

            <Text style={styles.label}>Institución *</Text>
            <TextInput
              style={styles.input}
              value={form.institucion}
              onChangeText={(text) => updateFormacion(form.id, "institucion", text)}
              placeholder="Nombre de la universidad/centro"
            />

            <Text style={styles.label}>Ubicación</Text>
            <TextInput
              style={styles.input}
              value={form.ubicacion}
              onChangeText={(text) => updateFormacion(form.id, "ubicacion", text)}
              placeholder="Ciudad, País"
            />

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Fecha inicio</Text>
                <TextInput
                  style={styles.input}
                  value={form.fechaInicio}
                  onChangeText={(text) => updateFormacion(form.id, "fechaInicio", text)}
                  placeholder="MM/AAAA"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Fecha fin</Text>
                <TextInput
                  style={styles.input}
                  value={form.fechaFin}
                  onChangeText={(text) => updateFormacion(form.id, "fechaFin", text)}
                  placeholder="MM/AAAA"
                  editable={!form.actualmente}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => updateFormacion(form.id, "actualmente", !form.actualmente)}
            >
              <Ionicons
                name={form.actualmente ? "checkbox" : "square-outline"}
                size={24}
                color={form.actualmente ? "#9DC3AA" : "#ccc"}
              />
              <Text style={styles.checkboxLabel}>Actualmente estudiando</Text>
            </TouchableOpacity>
          </View>
        ))}

        {cvData.formacion.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="school-outline" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No hay formación agregada</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  const renderCompetencias = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Idiomas</Text>
        <View style={styles.sectionHeader}>
          <Text style={styles.subsectionTitle}>Gestiona tus idiomas</Text>
          <TouchableOpacity style={styles.addButtonSmall} onPress={addIdioma}>
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {cvData.idiomas.map((idioma) => (
          <View key={idioma.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Idioma</Text>
              <TouchableOpacity onPress={() => removeIdioma(idioma.id)}>
                <Ionicons name="trash" size={20} color="#e74c3c" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Idioma *</Text>
            <TextInput
              style={styles.input}
              value={idioma.nombre}
              onChangeText={(text) => updateIdioma(idioma.id, "nombre", text)}
              placeholder="Ej: Inglés"
            />

            <Text style={styles.label}>Nivel *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={idioma.nivel}
                onValueChange={(value) => updateIdioma(idioma.id, "nivel", value)}
                style={styles.picker}
              >
                {NIVELES_IDIOMA.map((nivel) => (
                  <Picker.Item key={nivel} label={nivel} value={nivel} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>Certificado (opcional)</Text>
            <TextInput
              style={styles.input}
              value={idioma.certificado}
              onChangeText={(text) => updateIdioma(idioma.id, "certificado", text)}
              placeholder="Ej: TOEFL, DELE B2"
            />
          </View>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Competencias</Text>
        <View style={styles.sectionHeader}>
          <Text style={styles.subsectionTitle}>Habilidades y competencias</Text>
          <TouchableOpacity style={styles.addButtonSmall} onPress={addCompetencia}>
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {cvData.competencias.map((comp) => (
          <View key={comp.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Competencia</Text>
              <TouchableOpacity onPress={() => removeCompetencia(comp.id)}>
                <Ionicons name="trash" size={20} color="#e74c3c" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Nombre *</Text>
            <TextInput
              style={styles.input}
              value={comp.nombre}
              onChangeText={(text) => updateCompetencia(comp.id, "nombre", text)}
              placeholder="Ej: JavaScript, Trabajo en equipo"
            />

            <Text style={styles.label}>Categoría</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={comp.categoria}
                onValueChange={(value) => updateCompetencia(comp.id, "categoria", value)}
                style={styles.picker}
              >
                {CATEGORIAS_COMPETENCIA.map((cat) => (
                  <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>Nivel (opcional)</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={comp.nivel || "basico"}
                onValueChange={(value) => updateCompetencia(comp.id, "nivel", value)}
                style={styles.picker}
              >
                {NIVELES_COMPETENCIA.map((nivel) => (
                  <Picker.Item key={nivel} label={nivel.charAt(0).toUpperCase() + nivel.slice(1)} value={nivel} />
                ))}
              </Picker>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderPreview = () => {
    const html = generateCvHtmlPro(cvData);
    return (
      <View style={styles.previewContainer}>
        <View style={styles.previewHeader}>
          <Text style={styles.previewTitle}>Vista Previa</Text>
          <View style={styles.templateSelector}>
            {TEMPLATES.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[
                  styles.templateButton,
                  cvData.configuracion.plantilla === template.id && styles.templateButtonActive,
                ]}
                onPress={() => setPlantilla(template.id)}
              >
                <Ionicons
                  name={template.icon as any}
                  size={20}
                  color={cvData.configuracion.plantilla === template.id ? "#fff" : "#9DC3AA"}
                />
                <Text
                  style={[
                    styles.templateButtonText,
                    cvData.configuracion.plantilla === template.id && styles.templateButtonTextActive,
                  ]}
                >
                  {template.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <ScrollView style={styles.previewContent}>
          <Text style={styles.previewNote}>
            La vista previa completa se mostrará al generar el PDF. Aquí puedes cambiar la plantilla.
          </Text>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Creador de CV Profesional</Text>
        <TouchableOpacity onPress={handleSaveDraft} style={styles.saveButton}>
          <Ionicons name="save-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {[
          { id: "datos", label: "Datos", icon: "person" },
          { id: "experiencia", label: "Experiencia", icon: "briefcase" },
          { id: "formacion", label: "Formación", icon: "school" },
          { id: "competencias", label: "Competencias", icon: "star" },
          { id: "preview", label: "Vista Previa", icon: "eye" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <Ionicons
              name={tab.icon as any}
              size={18}
              color={activeTab === tab.id ? "#9DC3AA" : "#666"}
            />
            <Text
              style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "datos" && renderPersonalInfo()}
      {activeTab === "experiencia" && renderExperiencia()}
      {activeTab === "formacion" && renderFormacion()}
      {activeTab === "competencias" && renderCompetencias()}
      {activeTab === "preview" && renderPreview()}

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.generateButton, generating && styles.generateButtonDisabled]}
          onPress={handleGeneratePdf}
          disabled={generating}
        >
          {generating ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="download" size={20} color="#fff" />
          )}
          <Text style={styles.generateButtonText}>
            {generating ? "Generando..." : "Generar PDF"}
          </Text>
        </TouchableOpacity>
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
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    padding: 8,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 6,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#9DC3AA",
  },
  tabLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  tabLabelActive: {
    color: "#9DC3AA",
    fontWeight: "600",
  },
  tabContent: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f4f8b",
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d7dee7",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#2f3e4d",
    backgroundColor: "#fff",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  photoSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  photoPreview: {
    width: 120,
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  photoPlaceholder: {
    width: 120,
    height: 150,
    borderRadius: 8,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9DC3AA",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  photoButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e4e9f2",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f4f8b",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9DC3AA",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  addButtonSmall: {
    backgroundColor: "#9DC3AA",
    padding: 8,
    borderRadius: 8,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#2c3e50",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d7dee7",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  picker: {
    height: 50,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
    fontWeight: "500",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  previewHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f4f8b",
    marginBottom: 16,
  },
  templateSelector: {
    flexDirection: "row",
    gap: 8,
  },
  templateButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#9DC3AA",
    gap: 6,
  },
  templateButtonActive: {
    backgroundColor: "#9DC3AA",
  },
  templateButtonText: {
    fontSize: 12,
    color: "#9DC3AA",
    fontWeight: "500",
  },
  templateButtonTextActive: {
    color: "#fff",
  },
  previewContent: {
    flex: 1,
    padding: 16,
  },
  previewNote: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f4f8b",
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  generateButtonDisabled: {
    opacity: 0.6,
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

