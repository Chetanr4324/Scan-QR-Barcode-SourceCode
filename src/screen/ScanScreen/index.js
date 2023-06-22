import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  NativeModules,
} from 'react-native';
import ImageIcon from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors/index';
import {height, width} from '../../config';
import FlashlightIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const ScanScreen = ({navigation}) => {
  const [scanData, setScanData] = useState('');
  const [image, setImage] = useState('');
  const [cameraZoom, setCameraZoom] = useState(0);
  const [flash, setFashMode] = useState(false);

  useEffect(() => {
    if (scanData) {
      navigation.navigate('DetailScreen', {scanInfo: scanData});
    }
  }, [navigation, scanData]);

  const handleOpenGallery = async () => {
    const imagePicker = await launchImageLibrary({});
    // console.log('imagePicker', imagePicker);
    const imgUri = imagePicker.assets[0].uri;
    const QRScanReader = NativeModules.QRScanReader;
    const data = await QRScanReader.readerQR(imgUri);
    setScanData(data);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        cameraStyle={styles.camera}
        flashMode={
          flash == true
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        onRead={data => setScanData(data)}
        reactivate={true}
        reactivateTimeout={3000}
      />
      <ImageBackground
        style={styles.maskPng}
        source={require('../../assets/png/cameraMask.png')}>
        <View style={styles.iconBox}>
          <TouchableOpacity style={styles.icon} onPress={handleOpenGallery}>
            <ImageIcon name="image" size={22} color="white" />
            <Text style={styles.iconText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setFashMode(!flash);
            }}>
            <FlashlightIcon
              name="flashlight"
              size={22}
              color={flash ? Colors.skyBlue : Colors.white}
            />
            <Text
              style={[
                styles.iconText,
                {color: flash ? Colors.skyBlue : Colors.white},
              ]}>
              Flashlight
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  iconText: {
    fontSize: 16,
    color: Colors.white,
    lineHeight: 18,
    marginTop: '5%',
  },
  iconBox: {
    flexDirection: 'row',
    backgroundColor: Colors.navyBlue,
    height: '9%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: '15%',
    marginBottom: '15%',
  },
  slider: {
    flexDirection: 'row',
    marginTop: '15%',
    alignItems: 'center',
  },
  camera: {
    width: width,
    height: height,
  },
  maskPng: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
