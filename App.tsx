import * as React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TransitionPresets} from '@react-navigation/stack';

import Home from './src/screens/home';
import Note from './src/screens/note';

import Colors from './src/global/colors';

const TransitionScreenOptions = {
  ...TransitionPresets.ScaleFromCenterAndroid, // This is where the transition happens
};

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...TransitionScreenOptions,
        gestureEnabled: true,
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Note"
        component={Note}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar animated={true} backgroundColor={Colors.secondary} />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
