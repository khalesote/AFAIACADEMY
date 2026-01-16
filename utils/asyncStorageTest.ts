import AsyncStorage from '@react-native-async-storage/async-storage';

export const testAsyncStorage = async (): Promise<boolean> => {
  try {
    console.log('🧪 Testing AsyncStorage...');
    
    // Test write
    await AsyncStorage.setItem('@test_key', 'test_value');
    console.log('✅ AsyncStorage write successful');
    
    // Test read
    const value = await AsyncStorage.getItem('@test_key');
    if (value === 'test_value') {
      console.log('✅ AsyncStorage read successful');
    } else {
      console.log('❌ AsyncStorage read failed - unexpected value:', value);
      return false;
    }
    
    // Test remove
    await AsyncStorage.removeItem('@test_key');
    console.log('✅ AsyncStorage remove successful');
    
    // Verify removal
    const removedValue = await AsyncStorage.getItem('@test_key');
    if (removedValue === null) {
      console.log('✅ AsyncStorage verification successful - value properly removed');
      return true;
    } else {
      console.log('❌ AsyncStorage verification failed - value still exists:', removedValue);
      return false;
    }
    
  } catch (error) {
    console.error('❌ AsyncStorage test failed:', error);
    return false;
  }
};
