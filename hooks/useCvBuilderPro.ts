import { useState, useCallback } from 'react';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CvTemplate = 'europass' | 'moderno' | 'creativo' | 'ejecutivo';

export interface PersonalInfo {
  foto?: string;
  nombreCompleto: string;
  tituloProfesional: string;
  resumenProfesional: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  fechaNacimiento: string;
  nacionalidad: string;
  linkedin: string;
  website: string;
}

export interface Experiencia {
  id: string;
  cargo: string;
  empresa: string;
  ubicacion: string;
  fechaInicio: string;
  fechaFin: string;
  actualmente: boolean;
  descripcion: string;
}

export interface Formacion {
  id: string;
  titulo: string;
  institucion: string;
  ubicacion: string;
  fechaInicio: string;
  fechaFin: string;
  actualmente: boolean;
}

export interface Idioma {
  id: string;
  nombre: string;
  nivel: string;
  certificado: string;
}

export interface Competencia {
  id: string;
  nombre: string;
  categoria: string;
  nivel: string;
}

export interface Certificacion {
  id: string;
  nombre: string;
  institucion: string;
  fecha: string;
  url?: string;
}

export interface Proyecto {
  id: string;
  nombre: string;
  descripcion: string;
  tecnologias: string;
  url?: string;
  fecha: string;
}

export interface Configuracion {
  plantilla: CvTemplate;
}

export interface CvData {
  personal: PersonalInfo;
  experiencias: Experiencia[];
  formacion: Formacion[];
  idiomas: Idioma[];
  competencias: Competencia[];
  certificaciones: Certificacion[];
  proyectos: Proyecto[];
  configuracion: Configuracion;
}

const initialCvData: CvData = {
  personal: {
    nombreCompleto: '',
    tituloProfesional: '',
    resumenProfesional: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    pais: '',
    fechaNacimiento: '',
    nacionalidad: '',
    linkedin: '',
    website: '',
  },
  experiencias: [],
  formacion: [],
  idiomas: [],
  competencias: [],
  certificaciones: [],
  proyectos: [],
  configuracion: {
    plantilla: 'moderno',
  },
};

export const useCvBuilderPro = () => {
  const [cvData, setCvData] = useState<CvData>(initialCvData);

  // Cargar datos guardados al iniciar
  const loadSavedData = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem('cv_pro_borrador');
      if (saved) {
        setCvData(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error cargando borrador:', error);
    }
  }, []);

  // Actualizar información personal
  const updatePersonal = useCallback((field: keyof PersonalInfo, value: string) => {
    setCvData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  }, []);

  // Establecer foto
  const setFoto = useCallback((foto: string) => {
    setCvData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        foto,
      },
    }));
  }, []);

  // Experiencias
  const addExperiencia = useCallback(() => {
    const newExp: Experiencia = {
      id: Date.now().toString(),
      cargo: '',
      empresa: '',
      ubicacion: '',
      fechaInicio: '',
      fechaFin: '',
      actualmente: false,
      descripcion: '',
    };
    setCvData((prev) => ({
      ...prev,
      experiencias: [...prev.experiencias, newExp],
    }));
  }, []);

  const updateExperiencia = useCallback((id: string, field: keyof Experiencia, value: any) => {
    setCvData((prev) => ({
      ...prev,
      experiencias: prev.experiencias.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  }, []);

  const removeExperiencia = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      experiencias: prev.experiencias.filter((exp) => exp.id !== id),
    }));
  }, []);

  // Formación
  const addFormacion = useCallback(() => {
    const newForm: Formacion = {
      id: Date.now().toString(),
      titulo: '',
      institucion: '',
      ubicacion: '',
      fechaInicio: '',
      fechaFin: '',
      actualmente: false,
    };
    setCvData((prev) => ({
      ...prev,
      formacion: [...prev.formacion, newForm],
    }));
  }, []);

  const updateFormacion = useCallback((id: string, field: keyof Formacion, value: any) => {
    setCvData((prev) => ({
      ...prev,
      formacion: prev.formacion.map((form) =>
        form.id === id ? { ...form, [field]: value } : form
      ),
    }));
  }, []);

  const removeFormacion = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      formacion: prev.formacion.filter((form) => form.id !== id),
    }));
  }, []);

  // Idiomas
  const addIdioma = useCallback(() => {
    const newIdioma: Idioma = {
      id: Date.now().toString(),
      nombre: '',
      nivel: 'A1',
      certificado: '',
    };
    setCvData((prev) => ({
      ...prev,
      idiomas: [...prev.idiomas, newIdioma],
    }));
  }, []);

  const updateIdioma = useCallback((id: string, field: keyof Idioma, value: any) => {
    setCvData((prev) => ({
      ...prev,
      idiomas: prev.idiomas.map((idioma) =>
        idioma.id === id ? { ...idioma, [field]: value } : idioma
      ),
    }));
  }, []);

  const removeIdioma = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      idiomas: prev.idiomas.filter((idioma) => idioma.id !== id),
    }));
  }, []);

  // Competencias
  const addCompetencia = useCallback(() => {
    const newComp: Competencia = {
      id: Date.now().toString(),
      nombre: '',
      categoria: 'tecnica',
      nivel: 'basico',
    };
    setCvData((prev) => ({
      ...prev,
      competencias: [...prev.competencias, newComp],
    }));
  }, []);

  const updateCompetencia = useCallback((id: string, field: keyof Competencia, value: any) => {
    setCvData((prev) => ({
      ...prev,
      competencias: prev.competencias.map((comp) =>
        comp.id === id ? { ...comp, [field]: value } : comp
      ),
    }));
  }, []);

  const removeCompetencia = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      competencias: prev.competencias.filter((comp) => comp.id !== id),
    }));
  }, []);

  // Certificaciones
  const addCertificacion = useCallback(() => {
    const newCert: Certificacion = {
      id: Date.now().toString(),
      nombre: '',
      institucion: '',
      fecha: '',
      url: '',
    };
    setCvData((prev) => ({
      ...prev,
      certificaciones: [...prev.certificaciones, newCert],
    }));
  }, []);

  const updateCertificacion = useCallback((id: string, field: keyof Certificacion, value: any) => {
    setCvData((prev) => ({
      ...prev,
      certificaciones: prev.certificaciones.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  }, []);

  const removeCertificacion = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      certificaciones: prev.certificaciones.filter((cert) => cert.id !== id),
    }));
  }, []);

  // Proyectos
  const addProyecto = useCallback(() => {
    const newProj: Proyecto = {
      id: Date.now().toString(),
      nombre: '',
      descripcion: '',
      tecnologias: '',
      url: '',
      fecha: '',
    };
    setCvData((prev) => ({
      ...prev,
      proyectos: [...prev.proyectos, newProj],
    }));
  }, []);

  const updateProyecto = useCallback((id: string, field: keyof Proyecto, value: any) => {
    setCvData((prev) => ({
      ...prev,
      proyectos: prev.proyectos.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  }, []);

  const removeProyecto = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      proyectos: prev.proyectos.filter((proj) => proj.id !== id),
    }));
  }, []);

  // Configuración
  const setPlantilla = useCallback((plantilla: CvTemplate) => {
    setCvData((prev) => ({
      ...prev,
      configuracion: {
        ...prev.configuracion,
        plantilla,
      },
    }));
  }, []);

  // Guardar borrador
  const guardarBorrador = useCallback(async (key: string = 'borrador') => {
    try {
      await AsyncStorage.setItem(`cv_pro_${key}`, JSON.stringify(cvData));
    } catch (error) {
      console.error('Error guardando borrador:', error);
      throw error;
    }
  }, [cvData]);

  return {
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
    loadSavedData,
  };
};





