import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Accelerometer } from 'expo-sensors';
import { Coordinates } from './Magnetometer'
import { Subscription } from 'expo-sensors/build/Pedometer';
import { Navigator } from '../../../routes'
import { Container } from '../../components/Styled'

export default function ScreenAccelerometer({ navigation }: { navigation: Navigator }) {
  const subscription = useRef<Subscription>()

  const [data, setData] = useState<Coordinates>({
    x: 0,
    y: 0,
    z: 0,
  });

  const AccelerometerSub = () => {
    subscription.current = Accelerometer.addListener(result => {
      setData(result);
    })
  };

  const AccelerometerUnsub = () => {
    subscription.current?.remove();
  }

  useEffect(() => {
    AccelerometerSub()

    navigation.setOptions(
      {
        title: 'Acelerômetro',
        headerStyle: {
          backgroundColor: '#3FF2E3',
        },
        headerTintColor: '#000',
      })

    return () => {
      AccelerometerUnsub()
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


