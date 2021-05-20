import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { Barometer } from 'expo-sensors'
import { Subscription } from 'expo-sensors/build/Pedometer';
import { Navigator } from '../../../routes'
import { Container } from '../../components/Styled';

export default function BarometerScreen({ navigation }: { navigation: Navigator }) {
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

    navigation.setOptions(
      {
        title: 'Barômetro',
        headerStyle: {
          backgroundColor: '#73DB2E',
        },
        headerTintColor: '#000',
      })

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
    <Container>
      <Text>Pressure: {pressure * 100} Pa</Text>
      <Text>
        Relative Altitude:{' '}
        {Platform.OS === 'ios' ? `${relativeAltitude} m` : `Only available on iOS`}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => onReset()}>
        <Text>Resetar</Text>
      </TouchableOpacity>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    backgroundColor: '#ffbb00',
    marginVertical: 16,
  }
})