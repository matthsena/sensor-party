import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Magnetometer } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';

interface Coordinates {
  x: number,
  y: number,
  z: number
}

export default function ScreenMagnetometer() {
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

    return () => {
      MagnetometerUnsub()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text>X: {data.x}</Text>
      <Text>Y: {data.y}</Text>
      <Text>Z: {data.z}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

