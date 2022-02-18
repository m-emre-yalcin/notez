import * as React from 'react';
import {StatusBar, StyleSheet, Image, Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TransitionPresets} from '@react-navigation/stack';

import Home from './src/screens/home';
import About from './src/screens/about';

const Stack = createNativeStackNavigator();

// function LogoTitle() {
//   return (
//     <View style={{width: 50, height: 50, justifyContent: 'center'}}>
//       <Image source="https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg" />
//       <Text>About</Text>
//     </View>
//   );
// }

function App() {
  return (
    <>
      <StatusBar animated={true} backgroundColor="orangered" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({route, navigation}) => ({
            // gestureEnabled: true,
            ...TransitionPresets.ModalPresentationIOS,
          })}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Anasayfa',
              ...style.header,
            }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              // headerTitle: () => <LogoTitle />,
              headerRight: () => (
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Info"
                  color="orangered"
                />
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
