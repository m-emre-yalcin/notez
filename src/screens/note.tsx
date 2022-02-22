import React, {useState} from 'react';
import {ScrollView, TextInput, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../global/colors';
import NoteHeader from '../components/NoteHeader';

const Note = ({route, navigation}) => {
  const [editable, setEditable] = useState(true);
  return (
    <SafeAreaView>
      <NoteHeader route={route} navigation={navigation} />
      <ScrollView style={style.noteView}>
        <TextInput
          style={style.noteContent}
          value={route.params.content}
          multiline={true}
          editable={editable}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  noteView: {
    backgroundColor: Colors.secondary,
    height: '100%',
  },
  noteContent: {
    fontSize: 18,
    lineHeight: 30,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    color: Colors.primary,
    height: '100%',
    flex: 1,
  },
});

export default Note;
