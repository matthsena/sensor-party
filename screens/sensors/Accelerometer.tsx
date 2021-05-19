import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Accelerometer } from 'expo-sensors';
import { Coordinates } from './Magnetometer'
import { Subscription } from 'expo-sensors/build/Pedometer';

export default function ScreenAccelerometer() {
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

    return () => {
      AccelerometerUnsub()
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

