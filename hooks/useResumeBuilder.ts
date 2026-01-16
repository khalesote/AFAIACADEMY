import { useState, useCallback } from 'react';

export interface PersonalInfo {
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  phone: string;
  email: string;
  desiredPosition: string;
  headline: string;
  backgroundColor: string;
  photoDataUrl?: string;
  photoUri?: string;
}

export interface Experience {
  startDate: string;
  endDate: string;
  position: string;
  company: string;
  country: string;
  responsibilities: string;
}

export interface Education {
  startDate: string;
  endDate: string;
  diploma: string;
  institution: string;
  country: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  languages: Language[];
  skills: string[];
}

const initialPersonal: PersonalInfo = {
  fullName: '',
  dateOfBirth: '',
  nationality: '',
  address: '',
  phone: '',
  email: '',
  desiredPosition: '',
  headline: '',
  backgroundColor: '#ffffff',
};

const initialData: ResumeData = {
  personal: initialPersonal,
  experiences: [
    {
      startDate: '',
      endDate: '',
      position: '',
      company: '',
      country: '',
      responsibilities: '',
    },
  ],
  education: [
    {
      startDate: '',
      endDate: '',
      diploma: '',
      institution: '',
      country: '',
    },
  ],
  languages: [
    {
      language: '',
      level: '',
    },
  ],
  skills: [''],
};

export const useResumeBuilder = () => {
  const [data, setData] = useState<ResumeData>(initialData);

  // Personal info
  const updatePersonal = useCallback((field: keyof PersonalInfo, value: string) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  }, []);

  const setPhoto = useCallback((uri: string | undefined, dataUrl: string | undefined) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        photoUri: uri,
        photoDataUrl: dataUrl,
      },
    }));
  }, []);

  // Experiences
  const addExperience = useCallback(() => {
    setData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          startDate: '',
          endDate: '',
          position: '',
          company: '',
          country: '',
          responsibilities: '',
        },
      ],
    }));
  }, []);

  const updateExperience = useCallback(
    (index: number, field: keyof Experience, value: string) => {
      setData((prev) => ({
        ...prev,
        experiences: prev.experiences.map((exp, i) =>
          i === index ? { ...exp, [field]: value } : exp
        ),
      }));
    },
    []
  );

  const removeExperience = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  }, []);

  // Education
  const addEducation = useCallback(() => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          startDate: '',
          endDate: '',
          diploma: '',
          institution: '',
          country: '',
        },
      ],
    }));
  }, []);

  const updateEducation = useCallback(
    (index: number, field: keyof Education, value: string) => {
      setData((prev) => ({
        ...prev,
        education: prev.education.map((edu, i) =>
          i === index ? { ...edu, [field]: value } : edu
        ),
      }));
    },
    []
  );

  const removeEducation = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }, []);

  // Languages
  const addLanguage = useCallback(() => {
    setData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          language: '',
          level: '',
        },
      ],
    }));
  }, []);

  const updateLanguage = useCallback(
    (index: number, field: keyof Language, value: string) => {
      setData((prev) => ({
        ...prev,
        languages: prev.languages.map((lang, i) =>
          i === index ? { ...lang, [field]: value } : lang
        ),
      }));
    },
    []
  );

  const removeLanguage = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  }, []);

  // Skills
  const addSkill = useCallback(() => {
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, ''],
    }));
  }, []);

  const updateSkill = useCallback((index: number, value: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }));
  }, []);

  const removeSkill = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }, []);

  return {
    data,
    updatePersonal,
    setPhoto,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addSkill,
    updateSkill,
    removeSkill,
  };
};





