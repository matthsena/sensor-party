import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Magnetometer } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';
import { Navigator } from '../../../routes'
import { StatusBar } from 'expo-status-bar';
import BarChart from '../../components/BarChart'
import { Container } from '../../components/Styled';
import { LottieContainer, Row } from '../../components/Styled'
import LottieView from 'lottie-react-native'

export interface Coordinates {
  x: string,
  y: string,
  z: string
}

export default function ScreenMagnetometer({ navigation }: { navigation: Navigator }) {
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

  const MagnetometerSub = () => {
    subscription.current = Magnetometer.addListener(result => {
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
      Magnetometer.setUpdateInterval(150)
    }, 100)


    return () => {
      MagnetometerUnsub()
    }
  }, [])

  return (
    <Container>
      <BarChart data={data} />



      <Row>
        <LottieContainer style={{ ...styles.shadow, ...styles.secondaryCard }}>
          <LottieView
            source={require('../../lottiefiles/chart.json')}
            autoPlay
            loop
          />
        </LottieContainer>
      </Row>

      <StatusBar style="light" />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
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
    backgroundColor: '#DE006F'
  },
})
