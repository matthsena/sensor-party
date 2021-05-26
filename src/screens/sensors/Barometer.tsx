import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, Dimensions } from 'react-native'
import { Barometer } from 'expo-sensors'
import { Subscription } from 'expo-sensors/build/Pedometer';
import { Navigator } from '../../../routes'
import { Container, DefaultCard, LottieContainer, Row } from '../../components/Styled';
import LottieView from 'lottie-react-native'

const { width, height } = Dimensions.get('window')

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
      <DefaultCard style={styles.shadow}>
        <TouchableOpacity style={styles.textWrapper} onPress={() => onReset()}>
          <Text style={styles.text}>
            <Text style={styles.textAxis}>
              Pressão:
            </Text>
            {' '}{((pressure * 100) / 101325).toFixed(2)} Atmosfera
          </Text>

          <Text style={styles.text}>
            <Text style={styles.textAxis}>
              H relativo:
            </Text>
            {' '}  {Platform.OS === 'ios' ? `${relativeAltitude?.toFixed(2)} m` : `Apenas iOS`}
          </Text>
        </TouchableOpacity>
      </DefaultCard>

      <Row>
        <LottieContainer style={{ ...styles.shadow, ...styles.secondaryCard }}>
          <LottieView
            source={require('../../lottiefiles/space.json')}
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
  container: {
    padding: 16,
    height: height * 0.4,
    width: width - 32,
    backgroundColor: '#eee',
    borderRadius: 32
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    marginTop: 16,
    color: '#73DB2E'
  },
  textAxis: {
    fontWeight: 'bold',
    fontSize: 32,
    fontStyle: 'italic',
  },
  secondaryCard: {
    backgroundColor: '#73DB2E'
  },
})