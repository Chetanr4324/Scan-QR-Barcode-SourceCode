import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScanScreen from '../../screen/ScanScreen';
import HistoryScreen from '../../screen/HistoryScreen';
import Colors from '../../utils/Colors';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          if (route.name === 'ScanScreen') {
            return (
              <MaterialCommunityIcons
                name="line-scan"
                size={28}
                color={color}
              />
            );
          } else if (route.name === 'HistoryScreen') {
            return (
              <MaterialCommunityIcons name="history" size={32} color={color} />
            );
          }
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.skyBlue,
        tabBarInactiveTintColor: Colors.title,
        tabBarStyle: {
          backgroundColor: Colors.white,
          elevation: 10,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="ScanScreen" component={ScanScreen} />
      <Tab.Screen name="HistoryScreen" component={HistoryScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
