import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Pedometer } from 'expo-sensors'

export default function PedometerScreen() {
  const subscription = useRef<Pedometer.Subscription>()

  const [state, setState] = useState('checking')
  const [steps, setSteps] = useState<number>(0)

  useEffect(() => {
    PedometerSub()

    return () => {
      PedometerUnsub()
    }
  }, [])


  const PedometerSub = () => {
    subscription.current = Pedometer.watchStepCount(r => {
      console.log('step', r.steps)
      setSteps(r.steps)
    })
  }

  const PedometerUnsub = () => {
    subscription.current?.remove()
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
      <Text>Pedômetro está disponível: {state}</Text>

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