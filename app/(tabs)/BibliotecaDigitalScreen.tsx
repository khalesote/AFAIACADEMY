import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const categorias = [
  { id: 'todos', nombre: 'Todos los libros', nombreAr: 'جميع الكتب', icono: 'library' },
  { id: 'historia', nombre: 'Historia de España', nombreAr: 'تاريخ إسبانيا', icono: 'time' },
  { id: 'espanol', nombre: 'Aprender Español', nombreAr: 'تعلم الإسبانية', icono: 'school' },
  { id: 'literatura', nombre: 'Literatura Española', nombreAr: 'الأدب الإسباني', icono: 'book' },
  { id: 'inmigracion', nombre: 'Guías de Inmigración', nombreAr: 'دليل الهجرة', icono: 'people' },
  { id: 'cultura', nombre: 'Cultura Española', nombreAr: 'الثقافة الإسبانية', icono: 'heart' },
];

const libros = [
  // HISTORIA DE ESPAÑA
  {
    id: 1,
    titulo: "Historia de España",
    autor: "Rafael Altamira",
    categoria: 'historia',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/historia-de-espana-tomo-i/html/",
    descripcion: "Historia completa de España desde la antigüedad",
    paginas: 450,
    idioma: "Español",
    nivel: "Intermedio"
  },
  {
    id: 2,
    titulo: "Historia general de España",
    autor: "Modesto Lafuente",
    categoria: 'historia',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/historia-general-de-espana-tomo-i/html/",
    descripcion: "Obra clásica sobre la historia española",
    paginas: 520,
    idioma: "Español"
  },
  {
    id: 3,
    titulo: "La España del Cid",
    autor: "Ramón Menéndez Pidal",
    categoria: 'historia',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/la-espana-del-cid/html/",
    descripcion: "La época medieval española y el héroe nacional",
    paginas: 380,
    idioma: "Español"
  },
  {
    id: 4,
    titulo: "Historia de la dominación de los árabes en España",
    autor: "José Antonio Conde",
    categoria: 'historia',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/historia-de-la-dominacion-de-los-arabes-en-espana/html/",
    descripcion: "La influencia árabe en la península ibérica",
    paginas: 420,
    idioma: "Español"
  },

  // APRENDER ESPAÑOL
  {
    id: 5,
    titulo: "Gramática de la lengua castellana",
    autor: "Real Academia Española",
    categoria: 'espanol',
    gratis: true,
    link: "https://www.rae.es/sites/default/files/Gram%C3%A1tica%20de%20la%20lengua%20castellana%20(1771).pdf",
    descripcion: "Gramática oficial del español",
    paginas: 320,
    idioma: "Español",
    nivel: "Avanzado"
  },
  {
    id: 6,
    titulo: "Manual de español para inmigrantes",
    autor: "Ministerio de Educación de España",
    categoria: 'espanol',
    gratis: true,
    link: "https://www.educacionyfp.gob.es/dam/jcr:6a9e0b7b-7c5a-4e8b-9c4f-7e7e0b1e3e6f/manual-espanol-inmigrantes.pdf",
    descripcion: "Manual específico para aprender español como inmigrante",
    paginas: 180,
    idioma: "Español",
    nivel: "Principiante"
  },
  {
    id: 7,
    titulo: "Curso de español para extranjeros (Nivel A1-A2)",
    autor: "Recursos Educativos Abiertos",
    categoria: 'espanol',
    gratis: true,
    link: "https://www.mecd.gob.es/dam/jcr:0b8d6b4e-2e4c-4c7d-8e2d-7a1e4e1d4e2b/curso-espanol-extranjeros-a1-a2.pdf",
    descripcion: "Curso completo para niveles básicos",
    paginas: 250,
    idioma: "Español",
    nivel: "Principiante-Intermedio"
  },
  {
    id: 8,
    titulo: "Diccionario español-árabe básico",
    autor: "Ministerio de Educación de España",
    categoria: 'espanol',
    gratis: true,
    link: "https://www.educacionyfp.gob.es/dam/jcr:5e3c7b7b-0f3e-4e5d-9a3f-8c7e1e1e1e1e/diccionario-espanol-arabe-basico.pdf",
    descripcion: "Diccionario bilingüe español-árabe",
    paginas: 150,
    idioma: "Español-Árabe"
  },

  // LITERATURA ESPAÑOLA
  {
    id: 9,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    categoria: 'literatura',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/don-quijote-de-la-mancha--0/html/",
    descripcion: "La obra maestra de la literatura española",
    paginas: 1023,
    idioma: "Español",
    nivel: "Intermedio"
  },
  {
    id: 10,
    titulo: "La casa de Bernarda Alba",
    autor: "Federico García Lorca",
    categoria: 'literatura',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/la-casa-de-bernarda-alba/html/",
    descripcion: "Drama rural español del siglo XX",
    paginas: 120,
    idioma: "Español"
  },
  {
    id: 11,
    titulo: "El lazarillo de Tormes",
    autor: "Anónimo",
    categoria: 'literatura',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/la-vida-de-lazarillo-de-tormes-y-de-sus-fortunas-y-adversidades/html/",
    descripcion: "Primera novela picaresca española",
    paginas: 95,
    idioma: "Español",
    nivel: "Intermedio"
  },
  {
    id: 12,
    titulo: "Cantar de mio Cid",
    autor: "Anónimo",
    categoria: 'literatura',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/el-cantar-de-mio-cid/html/",
    descripcion: "Poema épico medieval español",
    paginas: 180,
    idioma: "Español Antiguo",
    nivel: "Avanzado"
  },

  // GUÍAS DE INMIGRACIÓN
  {
    id: 13,
    titulo: "Guía del inmigrante en España",
    autor: "Ministerio de Inclusión",
    categoria: 'inmigracion',
    gratis: true,
    link: "https://www.mites.gob.es/es/inmigracion/guia_inmigrante/index.htm",
    descripcion: "Guía oficial para inmigrantes en España",
    paginas: 200,
    idioma: "Español-Multilingüe"
  },
  {
    id: 14,
    titulo: "Derechos y deberes de los extranjeros en España",
    autor: "Ministerio del Interior",
    categoria: 'inmigracion',
    gratis: true,
    link: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/extranjeria/derechos-deberes/",
    descripcion: "Información legal sobre derechos y obligaciones",
    paginas: 85,
    idioma: "Español"
  },
  {
    id: 15,
    titulo: "Trámites de extranjería",
    autor: "Policía Nacional",
    categoria: 'inmigracion',
    gratis: true,
    link: "https://www.policia.es/-/tramites-de-extranjeria",
    descripcion: "Guía de trámites administrativos",
    paginas: 120,
    idioma: "Español"
  },
  {
    id: 16,
    titulo: "Vida laboral en España",
    autor: "Servicio Público de Empleo",
    categoria: 'inmigracion',
    gratis: true,
    link: "https://www.sepe.es/HomeSepe/que-es-el-sepe/index.html",
    descripcion: "Información sobre empleo para inmigrantes",
    paginas: 95,
    idioma: "Español"
  },

  // CULTURA ESPAÑOLA
  {
    id: 17,
    titulo: "Fiestas y tradiciones españolas",
    autor: "Instituto Cervantes",
    categoria: 'cultura',
    gratis: true,
    link: "https://www.cervantes.es/default.asp",
    descripcion: "Las celebraciones y costumbres españolas",
    paginas: 150,
    idioma: "Español"
  },
  {
    id: 18,
    titulo: "Gastronomía española",
    autor: "Turismo España",
    categoria: 'cultura',
    gratis: true,
    link: "https://www.spain.info/es/gastronomia/",
    descripcion: "La rica culinaria española",
    paginas: 200,
    idioma: "Español"
  },
  {
    id: 19,
    titulo: "Arte español contemporáneo",
    autor: "Museo Reina Sofía",
    categoria: 'cultura',
    gratis: true,
    link: "https://www.museoreinasofia.es/",
    descripcion: "El arte moderno y contemporáneo español",
    paginas: 180,
    idioma: "Español"
  },
  {
    id: 20,
    titulo: "Música española",
    autor: "Instituto Nacional de las Artes Escénicas",
    categoria: 'cultura',
    gratis: true,
    link: "https://www.culturaydeporte.gob.es/cultura/areas/musica.html",
    descripcion: "La diversidad musical española",
    paginas: 130,
    idioma: "Español"
  },

  // Más libros de APRENDER ESPAÑOL
  {
    id: 23,
    titulo: "Español para inmigrantes - Nivel elemental",
    autor: "Instituto Cervantes",
    categoria: 'espanol',
    gratis: true,
    link: "https://www.cervantes.es/imagenes/File/centros/MaterialesDidacticos/espanol_inmigrantes_elemental.pdf",
    descripcion: "Curso básico de español específicamente diseñado para inmigrantes",
    paginas: 95,
    idioma: "Español",
    nivel: "Principiante"
  },
  {
    id: 24,
    titulo: "Vocabulario esencial para inmigrantes",
    autor: "Ministerio de Educación",
    categoria: 'espanol',
    gratis: true,
    link: "https://www.educacionyfp.gob.es/dam/jcr:4f7b8e9c-1d2e-3f4g-5h6i-7j8k9l0m1n2o/vocabulario-esencial-inmigrantes.pdf",
    descripcion: "Diccionario práctico con vocabulario cotidiano",
    paginas: 120,
    idioma: "Español-Árabe",
    nivel: "Todos los niveles"
  },
  {
    id: 25,
    titulo: "Español en el trabajo",
    autor: "Fundación ONCE",
    categoria: 'espanol',
    gratis: true,
    link: "https://www.once.es/new/diseno-accesible/publicaciones/espanol-trabajo",
    descripcion: "Español profesional para el mundo laboral",
    paginas: 85,
    idioma: "Español",
    nivel: "Intermedio"
  },

  // Más LITERATURA ESPAÑOLA
  {
    id: 26,
    titulo: "La casa de Bernarda Alba",
    autor: "Federico García Lorca",
    categoria: 'literatura',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/la-casa-de-bernarda-alba/html/",
    descripcion: "Drama rural español del siglo XX sobre honor y represión",
    paginas: 120,
    idioma: "Español"
  },
  {
    id: 27,
    titulo: "El Quijote - Primera parte",
    autor: "Miguel de Cervantes",
    categoria: 'literatura',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/don-quijote-de-la-mancha--0/html/",
    descripcion: "La primera parte de la obra maestra de Cervantes",
    paginas: 550,
    idioma: "Español",
    nivel: "Intermedio"
  },
  {
    id: 28,
    titulo: "El Lazarillo de Tormes",
    autor: "Anónimo",
    categoria: 'literatura',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/la-vida-de-lazarillo-de-tormes-y-de-sus-fortunas-y-adversidades/html/",
    descripcion: "Primera novela picaresca española del siglo XVI",
    paginas: 95,
    idioma: "Español Antiguo",
    nivel: "Avanzado"
  },
  {
    id: 29,
    titulo: "La Celestina",
    autor: "Fernando de Rojas",
    categoria: 'literatura',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/la-celestina/html/",
    descripcion: "Obra fundamental del teatro español del siglo XV",
    paginas: 180,
    idioma: "Español Antiguo",
    nivel: "Avanzado"
  },
  {
    id: 30,
    titulo: "El perro del hortelano",
    autor: "Lope de Vega",
    categoria: 'literatura',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/el-perro-del-hortelano/html/",
    descripcion: "Comedia del Siglo de Oro español",
    paginas: 110,
    idioma: "Español Antiguo"
  },
  {
    id: 31,
    titulo: "El alcalde de Zalamea",
    autor: "Pedro Calderón de la Barca",
    categoria: 'literatura',
    gratis: true,
    link: "https://www.cervantesvirtual.com/obra-visor/el-alcalde-de-zalamea/html/",
    descripcion: "Drama histórico sobre justicia y honor",
    paginas: 95,
    idioma: "Español Antiguo"
  },

  // Más GUÍAS DE INMIGRACIÓN
  {
    id: 32,
    titulo: "Guía básica para inmigrantes en España",
    autor: "Ministerio de Trabajo",
    categoria: 'inmigracion',
    gratis: true,
    link: "https://www.mitramiss.gob.es/es/servicios-immigracion/guia-basica-inmigrantes/index.htm",
    descripcion: "Guía completa con información esencial para inmigrantes",
    paginas: 150,
    idioma: "Multilingüe"
  },
  {
    id: 33,
    titulo: "Derechos laborales de los trabajadores extranjeros",
    autor: "Confederación Sindical",
    categoria: 'inmigracion',
    gratis: true,
    link: "https://www.ccoo.es/derechos-trabajadores-extranjeros",
    descripcion: "Información sobre derechos laborales en España",
    paginas: 75,
    idioma: "Español"
  },
  {
    id: 34,
    titulo: "Vivienda para inmigrantes",
    autor: "Ministerio de Vivienda",
    categoria: 'inmigracion',
    gratis: true,
    link: "https://www.mivivienda.gob.es/vivienda-inmigrantes",
    descripcion: "Guía sobre opciones de vivienda en España",
    paginas: 60,
    idioma: "Español"
  },
  {
    id: 35,
    titulo: "Educación en España para extranjeros",
    autor: "Ministerio de Educación",
    categoria: 'inmigracion',
    gratis: true,
    link: "https://www.educacionyfp.gob.es/educacion/extranjeros.html",
    descripcion: "Información sobre educación y formación",
    paginas: 90,
    idioma: "Español"
  },

  // Más CULTURA ESPAÑOLA
  {
    id: 36,
    titulo: "Fiestas populares de España",
    autor: "Instituto Nacional de las Artes Escénicas",
    categoria: 'cultura',
    gratis: true,
    link: "https://www.culturaydeporte.gob.es/cultura/areas/musica/fiestas-espanolas.html",
    descripcion: "Las fiestas y tradiciones más importantes de España",
    paginas: 140,
    idioma: "Español"
  },
  {
    id: 37,
    titulo: "La gastronomía española",
    autor: "Turismo España",
    categoria: 'cultura',
    gratis: true,
    link: "https://www.spain.info/es/gastronomia/cocina-espanola/",
    descripcion: "Recetas y tradiciones culinarias españolas",
    paginas: 180,
    idioma: "Español"
  },
  {
    id: 38,
    titulo: "Arte contemporáneo español",
    autor: "Museo Reina Sofía",
    categoria: 'cultura',
    gratis: true,
    link: "https://www.museoreinasofia.es/en/collection",
    descripcion: "El arte moderno y contemporáneo de España",
    paginas: 200,
    idioma: "Español-Inglés"
  },
  {
    id: 39,
    titulo: "Música española tradicional",
    autor: "Instituto Cervantes",
    categoria: 'cultura',
    gratis: true,
    link: "https://www.cervantes.es/default.asp",
    descripcion: "La diversidad musical española desde el flamenco al pop",
    paginas: 120,
    idioma: "Español"
  },

  // Literatura hispanoamericana relevante para inmigrantes
  {
    id: 40,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    categoria: 'literatura',
    gratis: false,
    descripcion: "La obra maestra del realismo mágico latinoamericano",
    paginas: 417,
    idioma: "Español",
    precio: "16.99€"
  },
  {
    id: 41,
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafón",
    categoria: 'literatura',
    gratis: false,
    descripcion: "Misterio gótico ambientado en la Barcelona del siglo XX",
    paginas: 576,
    idioma: "Español",
    precio: "13.50€"
  },
  {
    id: 42,
    titulo: "El nombre de la rosa",
    autor: "Umberto Eco",
    categoria: 'literatura',
    gratis: false,
    descripcion: "Novela histórica ambientada en una abadía medieval",
    paginas: 512,
    idioma: "Español",
    precio: "14.99€"
  },

  // Más recursos educativos
  {
    id: 43,
    titulo: "Historia de América Latina",
    autor: "Instituto Cervantes",
    categoria: 'historia',
    gratis: true,
    link: "https://www.cervantes.es/imagenes/File/biblioteca/historia-america-latina.pdf",
    descripcion: "Historia general de América Latina",
    paginas: 220,
    idioma: "Español"
  },
  {
    id: 44,
    titulo: "Geografía de España",
    autor: "Instituto Geográfico Nacional",
    categoria: 'cultura',
    gratis: true,
    link: "https://www.ign.es/web/ign/portal/geografia-espana",
    descripcion: "Geografía física y humana de España",
    paginas: 160,
    idioma: "Español"
  },
  {
    id: 45,
    titulo: "Derecho administrativo español",
    autor: "Ministerio de Justicia",
    categoria: 'inmigracion',
    gratis: true,
    link: "https://www.mjusticia.gob.es/es/derecho-administrativo",
    descripcion: "Aspectos básicos del derecho administrativo",
    paginas: 130,
    idioma: "Español",
    nivel: "Avanzado"
  },
];

export default function BibliotecaDigitalScreen() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [soloGratis, setSoloGratis] = useState(false);
  const router = useRouter();

  const librosFiltrados = libros.filter((libro) => {
    const coincideCategoria = categoriaSeleccionada === 'todos' || libro.categoria === categoriaSeleccionada;
    const coincideBusqueda = libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                            libro.autor.toLowerCase().includes(busqueda.toLowerCase()) ||
                            (libro.descripcion && libro.descripcion.toLowerCase().includes(busqueda.toLowerCase()));
    const coincideGratis = !soloGratis || libro.gratis;
    return coincideCategoria && coincideBusqueda && coincideGratis;
  });

  const renderLibro = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.libroCard}>
      <View style={styles.libroHeader}>
        <View style={styles.libroInfo}>
          <Text style={styles.libroTitulo}>{item.titulo}</Text>
          <Text style={styles.libroAutor}>por {item.autor}</Text>
        </View>
        <View style={styles.libroBadges}>
          {item.gratis ? (
            <View style={[styles.badge, styles.badgeGratis]}>
              <Ionicons name="download" size={12} color="#fff" />
              <Text style={styles.badgeText}>Gratis</Text>
            </View>
          ) : (
            <View style={[styles.badge, styles.badgePago]}>
              <Text style={styles.badgeText}>{item.precio || 'Pago'}</Text>
            </View>
          )}
          {item.nivel && (
            <View style={[styles.badge, styles.badgeNivel]}>
              <Text style={styles.badgeText}>{item.nivel}</Text>
            </View>
          )}
        </View>
      </View>

      {item.descripcion && (
        <Text style={styles.libroDescripcion}>{item.descripcion}</Text>
      )}

      <View style={styles.libroDetalles}>
        {item.paginas && (
          <View style={styles.detalleItem}>
            <Ionicons name="document-text-outline" size={14} color="#666" />
            <Text style={styles.detalleText}>{item.paginas} páginas</Text>
          </View>
        )}
        {item.idioma && (
          <View style={styles.detalleItem}>
            <Ionicons name="language" size={14} color="#666" />
            <Text style={styles.detalleText}>{item.idioma}</Text>
          </View>
        )}
      </View>

      {item.gratis && item.link && (
        <TouchableOpacity
          style={styles.leerButton}
          onPress={() => {
            // En React Native, usamos Linking para abrir URLs
            // Pero para simplificar, por ahora mostramos un alert
            alert(`Abriendo: ${item.link}`);
          }}
        >
          <Ionicons name="book-outline" size={16} color="#fff" />
          <Text style={styles.leerButtonText}>Leer Online</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#9DC3AA" />
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Ionicons name="library" size={40} color="#9DC3AA" />
        <Text style={styles.title}>Biblioteca Digital</Text>
        <Text style={styles.titleAr}>مكتبة رقمية</Text>
        <Text style={styles.subtitle}>Descubre libros y recursos para aprender español e integrarte en España</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar libros, autores o temas..."
          placeholderTextColor="#999"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        {busqueda !== '' && (
          <TouchableOpacity onPress={() => setBusqueda('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categorías */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriasContainer}>
        {categorias.map((categoria) => (
          <TouchableOpacity
            key={categoria.id}
            style={[
              styles.categoriaButton,
              categoriaSeleccionada === categoria.id && styles.categoriaButtonSeleccionada
            ]}
            onPress={() => setCategoriaSeleccionada(categoria.id)}
          >
            <Ionicons
              name={categoria.icono as any}
              size={20}
              color={categoriaSeleccionada === categoria.id ? "#fff" : "#7e57c2"}
            />
            <Text style={[
              styles.categoriaText,
              categoriaSeleccionada === categoria.id && styles.categoriaTextSeleccionada
            ]}>
              {categoria.nombre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filtros */}
      <View style={styles.filtrosContainer}>
        <TouchableOpacity
          style={[styles.filtroButton, soloGratis && styles.filtroButtonActivo]}
          onPress={() => setSoloGratis(!soloGratis)}
        >
          <Ionicons name="download-outline" size={16} color={soloGratis ? "#fff" : "#7e57c2"} />
          <Text style={[styles.filtroText, soloGratis && styles.filtroTextActivo]}>
            Solo gratis
          </Text>
        </TouchableOpacity>

        <View style={styles.resultadosInfo}>
          <Text style={styles.resultadosText}>
            {librosFiltrados.length} libro{librosFiltrados.length !== 1 ? 's' : ''} encontrado{librosFiltrados.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Lista de libros */}
      {librosFiltrados.length > 0 ? (
        <FlatList
          data={librosFiltrados}
          renderItem={renderLibro}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.librosList}
        />
      ) : (
        <View style={styles.vacioContainer}>
          <Ionicons name="book-outline" size={64} color="#ccc" />
          <Text style={styles.vacioTexto}>No se encontraron libros</Text>
          <Text style={styles.vacioSubtexto}>Prueba cambiando los filtros de búsqueda</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 4,
    marginLeft: 2,
  },
  backButtonText: {
    color: "#9DC3AA",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 4,
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 15,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#9DC3AA",
    marginTop: 10,
    textAlign: "center",
  },
  titleAr: {
    fontSize: 20,
    color: "#9DC3AA",
    fontWeight: "bold",
    textAlign: "center",
    writingDirection: "rtl",
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },

  // Barra de búsqueda
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    marginHorizontal: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  // Categorías
  categoriasContainer: {
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  categoriaButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  categoriaButtonSeleccionada: {
    backgroundColor: "#9DC3AA",
    borderColor: "#9DC3AA",
  },
  categoriaText: {
    fontSize: 14,
    color: "#9DC3AA",
    fontWeight: "600",
    marginLeft: 6,
  },
  categoriaTextSeleccionada: {
    color: "#fff",
  },

  // Filtros
  filtrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 15,
  },
  filtroButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  filtroButtonActivo: {
    backgroundColor: "#9DC3AA",
    borderColor: "#9DC3AA",
  },
  filtroText: {
    fontSize: 14,
    color: "#9DC3AA",
    fontWeight: "600",
    marginLeft: 6,
  },
  filtroTextActivo: {
    color: "#fff",
  },
  resultadosInfo: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  resultadosText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },

  // Lista de libros
  librosList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  libroCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  libroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  libroInfo: {
    flex: 1,
  },
  libroTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  libroAutor: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  libroBadges: {
    flexDirection: "row",
    gap: 6,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeGratis: {
    backgroundColor: "#9DC3AA",
  },
  badgePago: {
    backgroundColor: "#9DC3AA",
  },
  badgeNivel: {
    backgroundColor: "#9DC3AA",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4,
  },
  libroDescripcion: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  libroDetalles: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  detalleItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detalleText: {
    fontSize: 12,
    color: "#888",
    marginLeft: 4,
  },
  leerButton: {
    backgroundColor: "#9DC3AA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  leerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },

  // Estado vacío
  vacioContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  vacioTexto: {
    fontSize: 18,
    color: "#666",
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
  },
  vacioSubtexto: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 5,
  },

  // Estilos antiguos (compatibilidad)
  personajeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ede7f6",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  personajeAr: {
    fontSize: 16,
    color: "#388e3c",
    fontWeight: "bold",
    writingDirection: "rtl",
    marginLeft: 10,
  },
  personajeNombre: {
    fontSize: 16,
    color: "#222",
    fontWeight: "bold",
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ede7f6",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },
  bookAuthor: {
    fontSize: 15,
    color: "#555",
    fontStyle: "italic",
  },
});
