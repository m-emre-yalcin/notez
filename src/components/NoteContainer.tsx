import {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
// import {Ionicons} from '@expo/vector-icons';
import Colors from '../global/colors';

const EmptyContent = ({children = 'Empty'}) => {
  return <Text style={style.emptyText}>{children}</Text>;
};

const NoteContainer = ({item, onPress}) => {
  const [longPressed, setLongpressed] = useState(false);
  return (
    <Pressable
      style={[style.container, longPressed && style.containerPressed]}
      onPress={onPress}
      onLongPress={() => setLongpressed(true)}
      onPressOut={() => setLongpressed(false)}>
      {item.title ? (
        <Text style={style.noteTitle}>{item.title}</Text>
      ) : (
        <EmptyContent>Title</EmptyContent>
      )}

      <Text style={style.noteContent}>
        {item.content || <EmptyContent>Content</EmptyContent>}
      </Text>

      {/* <Pressable
        android_ripple={{
          borderless: true,
          color: Colors.primarySoft,
        }}
        style={{
          height: 40,
          width: 40,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 8,
          right: 8,
          opacity: longPressed ? 1 : 0.8,
        }}
        onPress={e => {
          e.stopPropagation();
          e.preventDefault();
        }}>
        <Ionicons name="ios-trash" size={18} color={Colors.primary} />
      </Pressable> */}
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
    minHeight: 60,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.7,
    elevation: 1,
  },
  containerPressed: {
    elevation: 0,
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
