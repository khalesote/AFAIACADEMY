import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, type Permission } from 'react-native-permissions';

const ensureGranted = async (permission: Permission): Promise<boolean> => {
  const result = await check(permission);
  if (result === RESULTS.GRANTED) return true;
  const req = await request(permission);
  return req === RESULTS.GRANTED;
};

export async function requestMicrophonePermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    return ensureGranted(PERMISSIONS.ANDROID.RECORD_AUDIO);
  }

  if (Platform.OS === 'ios') {
    const micGranted = await ensureGranted(PERMISSIONS.IOS.MICROPHONE);
    const speechGranted = await ensureGranted(PERMISSIONS.IOS.SPEECH_RECOGNITION);
    return micGranted && speechGranted;
  }

  return false;
}
