export type ResumePersonalInfo = {
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  sex: "Femenino" | "Masculino" | "Otro";
  address: string;
  phone: string;
  email: string;
  desiredPosition: string;
  headline: string;
  photoUri?: string;
  photoDataUrl?: string;
  backgroundColor: string;
};

export type ResumeExperience = {
  startDate: string;
  endDate: string;
  occupation: string;
  company: string;
  responsibilities: string;
  country: string;
};

export type ResumeEducation = {
  startDate: string;
  endDate: string;
  diploma: string;
  institution: string;
  country: string;
};

export type ResumeLanguage = {
  language: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
};

export type DefaultResumeData = {
  personal: ResumePersonalInfo;
  experiences: ResumeExperience[];
  education: ResumeEducation[];
  skills: string[];
  languages: ResumeLanguage[];
};

export const defaultResumeData: DefaultResumeData = {
  personal: {
    fullName: "Nombre Apellido",
    dateOfBirth: "01/01/1990",
    nationality: "Marruecos",
    sex: "Masculino",
    address: "Calle de la Integración 10, Madrid",
    phone: "+34 600 000 000",
    email: "nombre@example.com",
    desiredPosition: "Auxiliar administrativo",
    headline: "Profesional responsable con experiencia en atención al cliente y apoyo administrativo",
    backgroundColor: "#ffffff",
  },
  experiences: [
    {
      startDate: "03/2022",
      endDate: "Actualidad",
      occupation: "Asistente de ventas",
      company: "Mercado El Amigo, Madrid",
      responsibilities: "Atención al público, cobranza y reposición de productos.",
      country: "España",
    },
  ],
  education: [
    {
      startDate: "09/2023",
      endDate: "06/2024",
      diploma: "Curso intensivo de español B1",
      institution: "Academia de Inmigrantes, Madrid",
      country: "España",
    },
  ],
  skills: [
    "Atención al cliente",
    "Trabajo en equipo",
    "Microsoft Word y Excel",
  ],
  languages: [
    { language: "Árabe", level: "C2" },
    { language: "Español", level: "B1" },
    { language: "Inglés", level: "A2" },
  ],
};
