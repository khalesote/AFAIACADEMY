import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { ActivityIndicator, View, Text, useColorScheme } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Slot, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_CONFIG } from '@/config/stripe';
import { UserProgressProvider, useUserProgress } from '@/contexts/UserProgressContext';
import { UserProvider } from '@/contexts/UserContext';
import * as Font from 'expo-font';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = useColorScheme();

  // Cargar fuentes y recursos
  useEffect(() => {
    async function prepare() {
      try {
        // Cargar fuentes u otros recursos aquí si es necesario
        await Font.loadAsync({
          // Tus fuentes personalizadas aquí
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Decirle a la aplicación que renderice
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#fff' : '#000'} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider
        publishableKey={STRIPE_CONFIG.PUBLISHABLE_KEY}
        merchantIdentifier={STRIPE_CONFIG.MERCHANT_ID}
      >
        <UserProvider>
          <UserProgressProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
              <Slot />
            </ThemeProvider>
          </UserProgressProvider>
        </UserProvider>
      </StripeProvider>
    </GestureHandlerRootView>
  );
}
