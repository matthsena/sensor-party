import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { Coordinates } from './Magnetometer'
import { Subscription } from 'expo-sensors/build/Pedometer';
import { Navigator } from '../../../routes'
import { Container } from '../../components/Styled';

export default function GyroscopeScreen({ navigation }: { navigation: Navigator }) {
  const subscription = useRef<Subscription>()

  const [data, setData] = useState<Coordinates>({
    x: 0,
    y: 0,
    z: 0,
  });

  const GyroscopeSub = () => {
    subscription.current = Gyroscope.addListener(result => {
      setData(result);
    })
  };

  const GyroscopeUnsub = () => {
    subscription.current?.remove();
  }


  useEffect(() => {
    GyroscopeSub()

    navigation.setOptions(
      {
        title: 'Giroscópio',
        headerStyle: {
          backgroundColor: '#F9C534',
        },
        headerTintColor: '#000',
      })

    return () => {
      GyroscopeUnsub()
    }
  }, [])


  return (
    <Container>
      <Text>X: {data.x}</Text>
      <Text>Y: {data.y}</Text>
      <Text>Z: {data.z}</Text>
    </Container>
  )
}