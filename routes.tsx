import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'
import Accelerometer from './screens/sensors/Accelerometer'
import Barometer from './screens/sensors/Barometer'
import Gyroscope from './screens/sensors/Gyroscope'
import Magnetometer from './screens/sensors/Magnetometer'
import Pedometer from './screens/sensors/Pedometer'


const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Accelerometer" component={Accelerometer} />
        <Stack.Screen name="Barometer" component={Barometer} />
        <Stack.Screen name="Gyroscope" component={Gyroscope} />
        <Stack.Screen name="Magnetometer" component={Magnetometer} />
        <Stack.Screen name="Pedometer" component={Pedometer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;