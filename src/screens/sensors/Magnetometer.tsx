import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Magnetometer } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';
import { Navigator } from '../../../routes'
import { StatusBar } from 'expo-status-bar';
import BarChart from '../../components/BarChart'

export interface Coordinates {
  x: number[],
  y: number[],
  z: number[]
}

export default function ScreenMagnetometer({ navigation }: { navigation: Navigator }) {
  const subscription = useRef<Subscription>()

  const [data, setData] = useState<Coordinates>({
    x: [0],
    y: [0],
    z: [0],
  });

  const MagnetometerSub = () => {

    subscription.current = Magnetometer.addListener(result => {
      const x = [parseFloat(result.x.toFixed(2))]
      const y = [parseFloat(result.y.toFixed(2))]
      const z = [parseFloat(result.z.toFixed(2))]

      setData({ x, y, z });
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

    setTimeout(() => {
      Magnetometer.setUpdateInterval(100)

    }, 100)


    return () => {
      MagnetometerUnsub()
    }
  }, [])

  return (
    <View style={styles.container}>
      <BarChart data={data} />
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
})
