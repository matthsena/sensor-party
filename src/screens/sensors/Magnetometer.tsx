import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Magnetometer } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';
import { Navigator } from '../../../routes'
import { Container } from '../../components/Styled'
import { StatusBar } from 'expo-status-bar';

export interface Coordinates {
  x: number,
  y: number,
  z: number
}

export default function ScreenMagnetometer({ navigation }: { navigation: Navigator }) {
  const subscription = useRef<Subscription>()

  const [data, setData] = useState<Coordinates>({
    x: 0,
    y: 0,
    z: 0,
  });

  const MagnetometerSub = () => {
    subscription.current = Magnetometer.addListener(result => {
      setData(result);
    })
  };

  const MagnetometerUnsub = () => {
    subscription.current?.remove();
  }


  useEffect(() => {
    MagnetometerSub()

    navigation.setOptions(
      {
        title: 'Magnetômetro',
        headerStyle: {
          backgroundColor: '#DE006F',
        },
        headerTintColor: '#fff',
      })

    return () => {
      MagnetometerUnsub()
    }
  }, [])

  return (
    <Container>
      <Text>X: {data.x}</Text>
      <Text>Y: {data.y}</Text>
      <Text>Z: {data.z}</Text>

      <StatusBar style="light" />
    </Container>
  )
}
