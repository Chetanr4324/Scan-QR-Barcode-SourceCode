import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import Navigation from './navigation';

const Main = () => {
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Navigation />
    </KeyboardAvoidingView>
  );
};

export default Main;
