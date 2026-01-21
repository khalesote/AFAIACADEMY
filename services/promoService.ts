import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { firestore } from '../config/firebase';

export interface PromoMessage {
  id: string;
  textEs: string;
  textAr: string;
  isActive: boolean;
  priority: number;
  createdAt: Date;
  expiresAt?: Date;
  link?: string;
}

export async function fetchActivePromoMessages(limitCount = 20): Promise<PromoMessage[]> {
  try {
    console.log('🔍 Iniciando consulta a Firestore...');
    const promoRef = collection(firestore, 'promoMessages');
    
    // Primero, intentemos sin filtros para ver si encuentra algo
    const simpleQuery = query(promoRef, limit(limitCount));
    const querySnapshot = await getDocs(simpleQuery);
    
    console.log('📊 Documentos encontrados:', querySnapshot.size);
    console.log('📋 IDs de documentos:', querySnapshot.docs.map(doc => doc.id));
    
    const messages: PromoMessage[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('📄 Documento:', doc.id, 'Datos:', data);
      
      // Filter out expired messages if expiresAt exists
      const expiresAt = data.expiresAt?.toDate();
      const isExpired = expiresAt && expiresAt < new Date();
      const isActive = data.isActive;
      
      console.log(`🔍 Documento ${doc.id}: isActive=${isActive}, isExpired=${isExpired}`);
      
      if (isActive && !isExpired) {
        messages.push({
          id: doc.id,
          textEs: data.textEs || '',
          textAr: data.textAr || '',
          isActive: data.isActive || false,
          priority: data.priority || 0,
          createdAt: data.createdAt?.toDate() || new Date(),
          expiresAt: expiresAt,
          link: data.link
        });
      }
    });
    
    console.log('✅ Mensajes filtrados y listos:', messages);
    return messages;
  } catch (error) {
    console.error('❌ Error fetching promo messages:', error);
    return [];
  }
}

export async function fetchAllPromoMessages(): Promise<PromoMessage[]> {
  try {
    const promoRef = collection(firestore, 'promoMessages');
    const q = query(
      promoRef,
      orderBy('priority', 'desc'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const messages: PromoMessage[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        textEs: data.textEs || '',
        textAr: data.textAr || '',
        isActive: data.isActive || false,
        priority: data.priority || 0,
        createdAt: data.createdAt?.toDate() || new Date(),
        expiresAt: data.expiresAt?.toDate(),
        link: data.link
      });
    });
    
    return messages;
  } catch (error) {
    console.error('Error fetching all promo messages:', error);
    return [];
  }
}
