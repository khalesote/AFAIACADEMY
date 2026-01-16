import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { Stack } from 'expo-router';

const OfferWebViewScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Oferta Especial',
          headerBackTitle: 'Atrás',
        }} 
      />
      <WebView
        source={{ uri: 'https://singingfiles.com/show.php?l=0&u=2395383&id=69367' }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default OfferWebViewScreen;
