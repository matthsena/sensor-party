import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Pedometer } from 'expo-sensors'

export default function PedometerScreen() {

  const [state, setState] = useState('checking')

  const [steps, setSteps] = useState<number>(0)

  useEffect(() => {
    PedometerSub()
  }, [])


  const PedometerSub = () => {
    Pedometer.watchStepCount(r => {
      console.log('step', r.steps)
      setSteps(r.steps)
    })
  }

  Pedometer.isAvailableAsync().then(
    result => {
      setState(String(result));
    },
    error => {
      setState('Could not get isPedometerAvailable: ' + error);
    }
  );


  return (
    <View style={styles.container}>
      <Text>Passos: {steps}</Text>
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