import AsyncStorage from '@react-native-async-storage/async-storage';

declare interface AsyncStorageServices {
  setItem: (key: string, value: string | object) => any,
  getItem: (key: string) => any,
  removeItem: (key: string) => any,
  clear: () => any
}

const setItem = async (key: string, value: string | object) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
}
const getItem = async (key: string) => {
  try {
    let value = await AsyncStorage.getItem(key)

    try {
      value = JSON.parse(value)
    } catch (error) { }
    return value
  } catch (error) {
    // Error retrieving data
  }
}
const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    // Error retrieving data
  }
}
const clear = async () => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    // Error retrieving data
  }
  console.log('All storage cleared!')
}

export default {
  setItem, getItem, removeItem, clear
} as AsyncStorageServices