import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import RightIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fs} from '../../config';
import TextInputBox from '../../components/TextInput';

const DetailsScreen = ({route, navigation}) => {
  const [inputData, setInputData] = useState('');
  const [showRightIcon, setShowRightIcon] = useState(false);
  const scanData = route.params.scanInfo;

  // useEffect(() => {
  //   AsyncStorage.clear();
  //   //   AsyncStorage.getItem('@data').then(val => {
  //   //     let data = JSON.parse(val);
  //   //     console.log();
  //   // });
  // }, []);

  const handleScanData = async () => {
    await AsyncStorage.getItem('@data')
      .then(async vel => {
        let data = JSON.parse(vel);
        const newData = {
          title: inputData ? inputData : 'Qr code',
          data: scanData.data ? scanData.data : scanData,
          type: scanData.type ? scanData.type : 'Qr Code',
          selected: false,
        };

        if (vel == null) {
          await AsyncStorage.setItem('@data', JSON.stringify([newData]));
        } else {
          // setAddScanData([...addScanData, data, newData]);

          await AsyncStorage.setItem(
            '@data',
            JSON.stringify([...data, newData]),
          );
        }
      })
      .catch(error => {
        console.log(error);
      });

    setShowRightIcon(true);

    setTimeout(() => {
      navigation.navigate('HistoryScreen');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Header title="QR Details" backIconShow={true} navigation={navigation} />
      <TextInputBox
        value={inputData}
        onChangeText={val => setInputData(val)}
        placeholder="Enter Title"
      />
      <View style={styles.box1}>
        <Text style={styles.txt}>
          {scanData.data ? scanData.data : scanData}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btnBox}
        activeOpacity={0.7}
        onPress={() => handleScanData()}>
        <Text style={styles.btn}>Save</Text>
        {showRightIcon && (
          <RightIcon
            name="check-bold"
            color={Colors.white}
            size={28}
            style={{marginLeft: '2%'}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  box1: {
    backgroundColor: Colors.white,
    marginHorizontal: '4%',
    marginVertical: '5%',
    borderRadius: fs(15),
    alignItems: 'center',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    elevation: 6,
  },
  btnBox: {
    flexDirection: 'row',
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2.5%',
    marginHorizontal: '4%',
    marginVertical: '5%',
    borderRadius: fs(15),
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  btn: {
    fontSize: fs(18),
    fontWeight: '800',
    color: Colors.white,
  },
  txt: {
    fontSize: fs(18),
    fontWeight: '800',
    color: Colors.title,
  },
});
