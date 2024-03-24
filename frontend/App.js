import React from 'react';
import StartScreen from './screens/StartScreen';
import { useFonts } from 'expo-font';

const App = () => {
  // Không cần sử dụng useFonts nữa
  const [loaded] = useFonts({
    'antoutline': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf'),
  });
  
  if (!loaded) {
    return null;
  }
  return <StartScreen />;
};

export default App;