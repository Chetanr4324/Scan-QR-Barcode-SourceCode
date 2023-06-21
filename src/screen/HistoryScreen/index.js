import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import {fs, height} from '../../config';
import TextInputBox from '../../components/TextInput';

const HistoryScreen = ({}) => {
  const [inputData, setInputData] = useState('');
  const [scanData, setScanData] = useState('');
  const [filterData, setFilterData] = useState('');
  const [colorValue, setColorValue] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  // const [selected, setSelected] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getScanData();
  }, [isFocused]);

  const getScanData = async () => {
    await AsyncStorage.getItem('@data').then(async vel => {
      const getData = JSON.parse(vel);
      setScanData(getData);
    });
  };

  const handleFilterData = text => {
    if (scanData !== null) {
      const data = scanData.filter(value => {
        return value.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setFilterData(data);
    }
  };

  const onPressMultiSelection = (itemValue, indexValue) => {
    let newArray = [];

    scanData.map((item, index) => {
      if (index === indexValue) {
        if (item.selected === true) {
          return newArray.push({...item, selected: false});
        } else {
          return newArray.push({...item, selected: true});
        }
      } else {
        if (item.selected === true) {
          return newArray.push({...item, selected: true});
        } else {
          return newArray.push({...item, selected: false});
        }
      }
    });
    setScanData(newArray);

    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].selected === true) {
        setColorValue(true);
        break;
      } else {
        setColorValue(false);
      }
    }
  };

  const deleteFunction = async () => {
    setShowDelete(!showDelete);
    if (scanData !== null) {
      if (showCheck === true) {
        const newArray = scanData;
        const selectDelete = newArray.filter((item, ind) => {
          return item.selected === false;
        });
        setScanData(selectDelete);
        await AsyncStorage.setItem('@data', JSON.stringify(selectDelete));
        setShowCheck(false);
      } else {
        const newArray = scanData;
        const selectDelete = newArray.filter((item, ind) => {
          return item.selected === false;
        });
        setScanData(selectDelete);
        await AsyncStorage.setItem('@data', JSON.stringify(selectDelete));
      }
    }
    setColorValue(false);
  };

  const handleClearFunction = async () => {
    if (scanData !== null) {
      if (showCheck === true) {
        let newArray = [];
        scanData.map((item, index) => {
          return newArray.push({...item, selected: false});
        });
        setScanData(newArray);
        setShowCheck(false);
        setColorValue(false);
      } else {
        let newArray = [];
        scanData.map((item, index) => {
          return newArray.push({...item, selected: true});
        });
        setScanData(newArray);
        setShowCheck(true);
        setColorValue(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="History"
        deleteIconShow={true}
        showCheckBox={showDelete}
        check={showCheck}
        deleteIconColor={colorValue}
        onPress={() => deleteFunction()}
        checkOnPress={() => handleClearFunction()}
      />

      <View style={styles.mainContainer}>
        <TextInputBox
          placeholder="Search Hare"
          onChangeText={val => {
            setInputData(val);
            handleFilterData(val);
          }}
        />
        <FlatList
          data={inputData === '' ? scanData : filterData}
          renderItem={({item, index}) => {
            return (
              <View style={styles.listContainer}>
                <Image
                  style={styles.imgBox}
                  source={require('../../assets/png/QR.png')}
                />
                <View style={styles.titleBox}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.txtBox}>
                    <Text style={styles.subTitle}>{item.type}</Text>
                    <Text style={styles.subTitle}>13:02</Text>
                  </View>
                </View>
                {showDelete && (
                  <MaterialCommunityIcons
                    name={
                      item.selected
                        ? 'checkbox-intermediate'
                        : 'checkbox-blank-outline'
                    }
                    size={30}
                    color={Colors.darkGray}
                    style={styles.icon}
                    onPress={() => {
                      onPressMultiSelection(item, index);
                    }}
                  />
                )}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mainContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: '4%',
    marginVertical: '4%',
    height: height / 18,
    fontSize: fs(18),
    color: Colors.white,
    fontWeight: '600',
    elevation: 7,
  },
  listContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginTop: '5%',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: '4%',
    elevation: 4,
  },
  imgBox: {
    height: 35,
    width: 35,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  titleBox: {
    flex: 1,
    paddingRight: 20,
    paddingVertical: 8,
  },
  txtBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  subTitle: {
    fontWeight: '400',
    color: Colors.gray,
  },
  icon: {
    marginHorizontal: '4%',
  },
});
