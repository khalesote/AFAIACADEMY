import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Crucigrama from './components/Crucigrama';

const CrucigramaScreen = () => {
  return (
    <View style={styles.container}>
      <Crucigrama />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
});

export default CrucigramaScreen;
