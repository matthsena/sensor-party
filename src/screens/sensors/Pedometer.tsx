import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Pedometer } from 'expo-sensors'

export default function PedometerScreen() {
  const subscription = useRef<Pedometer.Subscription>()

  const [state, setState] = useState('checking')
  const [pastSteps, setPastSteps] = useState<number>()
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

    Pedometer.isAvailableAsync().then(
      result => {
        setState(String(result));
      },
      error => {
        setState('Could not get isPedometerAvailable: ' + error);
      }
    );

    const end = new Date();
    const start = new Date();

    start.setDate(end.getDate() - 1);

    Pedometer.getStepCountAsync(start, end).then(
      result => {
        setPastSteps(result.steps);
      },
      error => {
        throw new Error(error);
      }
    );
  }

  const PedometerUnsub = () => {
    subscription.current?.remove()
  }



  return (
    <View style={styles.container}>
      <Text>Pedômetro está disponível: {state}</Text>

      <Text>Passos dados no dia: {pastSteps}</Text>

      <Text>Passos atual: {steps}</Text>
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