import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

// Configuración básica para Android/iOS
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    // Propiedades extra que algunos tipos pueden requerir
    shouldShowBanner: true as any,
    shouldShowList: true as any,
  }) as any,
});

export async function ensureNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'General',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus === 'granted';
  } catch (e) {
    console.log('Notifications permission error:', e);
    return false;
  }
}

export async function scheduleLocalNotification(opts: {
  title: string;
  body: string;
  secondsFromNow?: number;
  data?: Record<string, any>;
}) {
  await ensureNotificationChannel();
  const trigger = opts.secondsFromNow
    ? { type: SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: Math.max(1, Math.floor(opts.secondsFromNow)), repeats: false } as const
    : null; // immediate
  return Notifications.scheduleNotificationAsync({
    content: {
      title: opts.title,
      body: opts.body,
      data: opts.data || {},
    },
    trigger,
  });
}

export async function scheduleDailyReminder(hourLocal = 20, minuteLocal = 0) {
  await ensureNotificationChannel();
  return Notifications.scheduleNotificationAsync({
    content: {
      title: '⏰ حان وقت المراجعة',
      body: 'مساعدك بانتظارك لمتابعة التعلّم.',
      data: { action: 'start_review' },
    },
    trigger: { type: SchedulableTriggerInputTypes.CALENDAR, hour: hourLocal, minute: minuteLocal, repeats: true } as const,
  });
}
