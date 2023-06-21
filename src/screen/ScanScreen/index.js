import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import ImageIcon from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors/index';
import {height, width} from '../../config';
import FlashlightIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Slider from '@react-native-community/slider';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {launchImageLibrary} from 'react-native-image-picker';
import {RNCamera} from 'react-native-camera';
import {QRreader} from 'react-native-qr-decode-image';

const PNG = require('pngjs/browser').PNG;

const ScanScreen = ({navigation}) => {
  const [scanData, setScanData] = useState('');
  const [image, setImage] = useState('');
  const [flashMode, setFashMode] = useState(false);

  useEffect(() => {
    if (scanData) {
      navigation.navigate('DetailScreen', {scanInfo: scanData});
    }
  }, [navigation, scanData]);

  const handleOpenGallery = async () => {
    let option = {
      // includeBase64: true,

      mediaType: 'photo',
    };

    const scanResult = await launchImageLibrary(option);
    let imgPath = scanResult.assets[0].base64;
    let imgUri = scanResult.assets[0].uri;
    let hight = scanResult.assets[0].height;
    let width = scanResult.assets[0].width;
    // console.log('scanResult', scanResult);

    QRreader(imgUri)
      .then(val => {
        console.log(val);
        setScanData(val);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        cameraStyle={styles.camera}
        flashMode={
          flashMode
            ? RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        onRead={data => setScanData(data)}
        reactivate={true}
        reactivateTimeout={3000}
      />
      <ImageBackground
        style={styles.maskPng}
        source={require('../../assets/png/cameraMask.png')}>
        <View style={styles.slider}>
          <Entypo name="minus" size={30} color={Colors.white} />
          <Slider
            style={{width: 220, height: 40}}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor={Colors.skyBlue}
            maximumTrackTintColor={Colors.gray}
            thumbTintColor={Colors.skyBlue}
          />
          <Entypo name="plus" size={30} color={Colors.white} />
        </View>
        <View style={styles.iconBox}>
          <TouchableOpacity style={styles.icon} onPress={handleOpenGallery}>
            <ImageIcon name="image" size={22} color="white" />
            <Text style={styles.iconText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setFashMode(!flashMode);
              
            }}>
            <FlashlightIcon
              name="flashlight"
              size={22}
              color={flashMode ? Colors.skyBlue : Colors.white}
            />
            <Text
              style={[
                styles.iconText,
                {color: flashMode ? Colors.skyBlue : Colors.white},
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
