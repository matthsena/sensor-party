import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { Coordinates } from './Magnetometer'
import { Subscription } from 'expo-sensors/build/Pedometer';

export default function GyroscopeScreen() {
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

    return () => {
      GyroscopeUnsub()
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
    justifyContent: 'center',
  }
})