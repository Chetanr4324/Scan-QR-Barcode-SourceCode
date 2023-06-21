import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import Colors from '../utils/Colors';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/png/QR-Logo.png')}
      />
      <Text style={styles.text}>QR & BarCode Scanner</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingTop: '40%',
  },
  logo: {
    height: 200,
    width: 200,
  },
  text: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
    marginTop: '5%',
  },
});
