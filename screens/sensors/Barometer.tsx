import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { Barometer } from 'expo-sensors'
import { Subscription } from 'expo-sensors/build/Pedometer';


export default function BarometerScreen() {
  const subscription = useRef<Subscription>()


  const [pressure, setPressure] = useState<number>(0);
  const [relativeAltitude, setRelativeAltitude] = useState<number | undefined>(0)

  const BarometerSub = () => {
    subscription.current = Barometer.addListener(barometerData => {
      setPressure(barometerData.pressure)
      setRelativeAltitude(barometerData.relativeAltitude)
    })
  }

  const BarometerUnsub = () => {
    subscription.current?.remove()
  }

  useEffect(() => {
    BarometerSub()
    return () => {
      BarometerUnsub()
    }
  }, [])

  const onReset = () => {
    if (subscription.current) {
      BarometerUnsub()
    }
    BarometerSub()
  }

  return (
    <View style={styles.container}>
      <Text>Pressure: {pressure * 100} Pa</Text>
      <Text>
        Relative Altitude:{' '}
        {Platform.OS === 'ios' ? `${relativeAltitude} m` : `Only available on iOS`}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => onReset()}>
        <Text>Resetar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: '#ffbb00',
    marginVertical: 16,
  }
})