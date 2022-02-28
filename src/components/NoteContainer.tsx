import {StyleSheet, View, Text, Pressable} from 'react-native';
import Colors from '../global/colors';

const EmptyContent = ({children = 'Empty'}) => {
  return <Text style={style.emptyText}>{children}</Text>;
};

const NoteContainer = ({item, onPress}) => {
  return (
    <Pressable style={style.container} onPress={onPress}>
      {item.title ? (
        <Text style={style.noteTitle}>{item.title}</Text>
      ) : (
        <EmptyContent>Title</EmptyContent>
      )}

      <Text style={style.noteContent}>
        {item.content || <EmptyContent>Content</EmptyContent>}
      </Text>
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
  emptyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.tertiary,
    opacity: 0.5,
  },
});

export default NoteContainer;
