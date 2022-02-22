import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../global/colors';

const PlusButton = ({navigation}) => {
  return (
    <View style={style.plusButton}>
      <Pressable
        onPress={() => navigation.navigate('Note', {title: 'Create note'})}
        android_ripple={{
          borderless: true,
          color: Colors.secondary,
        }}>
        <Ionicons name="ios-add" size={36} color={Colors.secondary} />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  plusButton: {
    position: 'absolute',
    zIndex: 10,
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
});

export default PlusButton;
