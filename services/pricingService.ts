import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase';

export interface PricingConfig {
  id: string;
  courseType: string; // 'A1', 'A2', 'B1', 'B2', 'PRE-FORMACION'
  basePrice: number;
  discountedPrice?: number;
  currency: string; // 'EUR'
  isActive: boolean;
  description: {
    es: string;
    ar: string;
  };
  features: {
    es: string[];
    ar: string[];
  };
  duration: string; // '3 meses', '6 meses', '1 año'
  level: string;
  updatedAt: Date;
}

export async function getAllPricing(): Promise<PricingConfig[]> {
  try {
    const pricingRef = collection(firestore, 'pricing');
    const querySnapshot = await getDocs(pricingRef);
    
    const pricing: PricingConfig[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      pricing.push({
        id: doc.id,
        courseType: data.courseType || '',
        basePrice: data.basePrice || 0,
        discountedPrice: data.discountedPrice,
        currency: data.currency || 'EUR',
        isActive: data.isActive || false,
        description: data.description || { es: '', ar: '' },
        features: data.features || { es: [], ar: [] },
        duration: data.duration || '',
        level: data.level || '',
        updatedAt: data.updatedAt?.toDate() || new Date()
      });
    });
    
    return pricing;
  } catch (error) {
    console.error('Error fetching pricing:', error);
    return [];
  }
}

export async function getPricingByCourseType(courseType: string): Promise<PricingConfig | null> {
  try {
    const pricingDoc = doc(firestore, 'pricing', courseType);
    const docSnapshot = await getDoc(pricingDoc);
    
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      return {
        id: docSnapshot.id,
        courseType: data.courseType || '',
        basePrice: data.basePrice || 0,
        discountedPrice: data.discountedPrice,
        currency: data.currency || 'EUR',
        isActive: data.isActive || false,
        description: data.description || { es: '', ar: '' },
        features: data.features || { es: [], ar: [] },
        duration: data.duration || '',
        level: data.level || '',
        updatedAt: data.updatedAt?.toDate() || new Date()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching pricing by course type:', error);
    return null;
  }
}
