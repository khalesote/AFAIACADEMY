import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export async function requestMicrophonePermission(): Promise<boolean> {

  let permission;
  if (Platform.OS === 'android') {
    permission = PERMISSIONS.ANDROID.RECORD_AUDIO;
  } else if (Platform.OS === 'ios') {
    permission = PERMISSIONS.IOS.MICROPHONE;
  } else {
    return false;
  }
  const result = await check(permission);
  if (result === RESULTS.GRANTED) return true;
  const req = await request(permission);
  return req === RESULTS.GRANTED;
}
