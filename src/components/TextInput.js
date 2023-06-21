import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Colors from '../utils/Colors';
import {fs, height} from '../config';

const TextInputBox = ({onChangeText, value, placeholder}) => {
  return (
    <View style={styles.textInputBox}>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

export default TextInputBox;

const styles = StyleSheet.create({
  textInputBox: {
    backgroundColor: Colors.white,
    marginHorizontal: '4%',
    marginVertical: '5%',
    borderRadius: fs(15),
    paddingHorizontal: '3%',
    elevation: 6,
  },
  textInput: {
    height: height / 18,
    fontSize: fs(16),
    color: Colors.title,
    fontWeight: '600',
  },
});
