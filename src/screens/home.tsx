import React, {useState} from 'react';
import type {Node} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Switch,
  Alert,
  Modal,
  Pressable,
  View,
  useColorScheme,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = true;
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Home = ({navigation}): Node => {
  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, onChangeText] = React.useState('Useless Text');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Header />

      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 10,
          flex: 1,
        }}>
        <Button title="Show Modal" onPress={() => setModalVisible(true)} />
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 10,
          flex: 1,
        }}>
        <Button
          accessibilityLabel="Unaccessary blue button"
          title={`You clicked ${count} times`}
          onPress={() => setCount(count + 1)}
          color="crimson"
        />
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 10,
          flex: 1,
        }}>
        <Button
          title="Go to About"
          onPress={() => navigation.navigate('About', {name: 'Kamil'})}
          color="lightslategrey"
        />
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 10,
          flex: 1,
        }}>
        <TextInput
          style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
          onChangeText={onChangeText}
          value={text}
          disableFullscreenUI={true}
          keyboardType="email-address"
        />
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View
        style={{
          backgroundColor: Colors.black,
        }}>
        <Section title="Step One">
          Edit <Text style={styles.highlight}>App.js</Text> to change this
          screen and then come back to see your edits.
        </Section>
        <Section title="See Your Changes">
          <ReloadInstructions />
        </Section>
        <Section title="Debug">
          <DebugInstructions />
        </Section>
        <Section title="Learn More">
          Read the docs to discover what to do next:
        </Section>
        <LearnMoreLinks />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  // modal styles
  centeredView: {
    flex: 1,
    marginTop: 50,
    width: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Home;
