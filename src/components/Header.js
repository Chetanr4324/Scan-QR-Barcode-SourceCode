import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Header = props => {
  const {
    title,
    deleteIconShow,
    backIconShow,
    showCheckBox,
    navigation,
    onPress,
    check,
    checkOnPress,
    deleteIconColor,
  } = props;
  return (
    <View style={styles.container}>
      {backIconShow && (
        <MaterialCommunityIcons
          name="chevron-left"
          size={36}
          color={Colors.darkGray}
          onPress={() => navigation.goBack()}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconBox}>
        {showCheckBox && (
          <Fontisto
            name={check ? 'checkbox-active' : 'checkbox-passive'}
            size={20}
            color={Colors.darkGray}
            style={styles.checkIcon}
            onPress={checkOnPress}
          />
        )}
        {deleteIconShow && (
          <MaterialCommunityIcons
            name="delete-outline"
            size={31}
            color={deleteIconColor ? Colors.red : Colors.darkGray}
            onPress={onPress}
          />
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '3%',
  },
  title: {
    fontSize: 24,
    color: Colors.title,
    fontWeight: 'bold',
    marginLeft: '3%',
  },
  iconBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '7%',
  },
  checkIcon: {
    alignSelf: 'center',
    marginRight: '5%',
    borderWidth: 0.5,
    borderColor: Colors.darkGray,
  },
});
