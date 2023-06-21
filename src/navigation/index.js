import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from '../navigation/bottomNavigation';
import DetailsScreen from '../screen/DetailsScreen';
import Splash from '../components/Splash';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {showSplash ? <Stack.Screen name="Splash" component={Splash} /> : null}
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="DetailScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
