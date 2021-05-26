import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Accelerometer } from 'expo-sensors';
import { Coordinates } from './Magnetometer'
import { Subscription } from 'expo-sensors/build/Pedometer';
import { Navigator } from '../../../routes'
import { Container } from '../../components/Styled'
import { LottieContainer, Row } from '../../components/Styled'
import LottieView from 'lottie-react-native'
import BarChart from '../../components/BarChart';

export default function ScreenAccelerometer({ navigation }: { navigation: Navigator }) {
  const subscription = useRef<Subscription>()

  const [data, setData] = useState<Coordinates>({
    x: "0.00",
    y: "0.00",
    z: "0.00",
  });

  const formatStr = (len: number, str: string): string => {
    if (str.length === len) {
      return str;
    } else {
      let add = "";

      for (let i = 0; i < (len - str.length); i++) {
        add += " "
      }

      return add + str
    }
  }

  const AccelerometerSub = () => {
    subscription.current = Accelerometer.addListener(result => {
      const x = result.x.toFixed(2)
      const y = result.y.toFixed(2)
      const z = result.z.toFixed(2)

      const maxLen =
        (x.length > y.length && x.length > z.length) ? x.length :
          (y.length > x.length && y.length > z.length) ? y.length :
            (z.length > x.length && z.length > y.length) ? z.length :
              x.length

      setData({ x: formatStr(maxLen, x), y: formatStr(maxLen, y), z: formatStr(maxLen, z) });
    })
  };

  const AccelerometerUnsub = () => {
    subscription.current?.remove();
  }

  useEffect(() => {
    AccelerometerSub()

    navigation.setOptions(
      {
        title: 'Acelerômetro',
        headerStyle: {
          backgroundColor: '#3FF2E3',
        },
        headerTintColor: '#000',
      })

    return () => {
      AccelerometerUnsub()
    }
  }, [])

  return (
    <Container>
      <BarChart data={data} />

      <Row>
        <LottieContainer style={{ ...styles.shadow, ...styles.secondaryCard }}>
          <LottieView
            source={require('../../lottiefiles/rocket.json')}
            autoPlay
            loop
          />
        </LottieContainer>
      </Row>

    </Container>
  )
}


const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 2,
  },
  secondaryCard: {
    backgroundColor: '#3FF2E3'
  },
})
