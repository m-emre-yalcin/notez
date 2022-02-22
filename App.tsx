import * as React from 'react';
import {
  StatusBar,
  StyleSheet,
  Image,
  View,
  Text,
  Pressable,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TransitionPresets} from '@react-navigation/stack';

import Home from './src/screens/home';
import Note from './src/screens/note';

import {Ionicons} from '@expo/vector-icons';

import Colors from './src/global/colors';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <StatusBar animated={true} backgroundColor={Colors.primary} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({route, navigation}) => ({
            gestureEnabled: true,
            ...TransitionPresets.ModalPresentationIOS,
          })}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home',
              ...style.header,
              header: () => null,
            }}
          />
          <Stack.Screen
            name="Note"
            component={Note}
            options={{
              headerTitle: 'Note',
              headerRight: () => (
                <Pressable onPress={() => alert('This is a button!')}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={30}
                    color={Colors.primary}
                  />
                </Pressable>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const style = StyleSheet.create({
  header: {
    headerStyle: {
      backgroundColor: 'orangered',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

export default App;
