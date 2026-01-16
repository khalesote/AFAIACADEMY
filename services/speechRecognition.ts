import * as Speech from 'expo-speech';

type SpeechResult = {
  text: string;
  source: 'native' | 'web' | 'placeholder';
};

type SpeechOptions = {
  locale?: string;
  onWebRequest?: () => Promise<string>;
};

export async function startSpeechToText(options: SpeechOptions = {}): Promise<SpeechResult> {
  const { onWebRequest } = options;

  if (onWebRequest) {
    try {
      const transcript = await onWebRequest();
      return { text: transcript ?? '', source: 'web' };
    } catch (error) {
      // fall through to placeholder
    }
  }

  return { text: '', source: 'placeholder' };
}
