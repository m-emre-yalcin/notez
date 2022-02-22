import {StyleSheet, View, Text, Pressable} from 'react-native';
import Colors from '../global/colors';

const NoteContainer = ({item, onPress}) => {
  return (
    <Pressable style={style.container} onPress={onPress}>
      <Text style={style.noteTitle}>{item.title}</Text>
      <Text style={style.noteContent}>{item.content}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primarySoft,
    borderRadius: 4,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  noteTitle: {
    fontSize: 18,
    marginBottom: 5,
    color: Colors.primary,
  },
  noteContent: {
    fontSize: 16,
    color: Colors.primary,
  },
});

export default NoteContainer;
