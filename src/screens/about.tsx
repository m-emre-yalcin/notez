import React from 'react';
import {View, Text, Button} from 'react-native';

const About = ({route, navigation}) => {
  return (
    <View style={{padding: 20}}>
      <Text color="orangered">About</Text>
      {route.params && <Text fontSize={20}>Hello {route.params.name}</Text>}
      <Button
        title="Go to about again..."
        onPress={() => navigation.push('About')}
      />
      <Button
        title="Go back"
        color="cyan"
        onPress={() => navigation.goBack()}
      />
      <Button
        title="Go home"
        color="blue"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};

export default About;
