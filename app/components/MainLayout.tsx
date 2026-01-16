import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MainLayoutProps {
  children: React.ReactNode;
  style?: any;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1a237e', '#0d47a1', '#01579b']}
        style={styles.background}
      />
      <BlurView intensity={20} style={styles.blurContainer}>
        {children}
      </BlurView>
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  blurContainer: {
    flex: 1,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
  },
}); 