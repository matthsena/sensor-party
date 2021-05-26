import React, { useState, useRef, useEffect } from 'react'
import { Platform, Text, StyleSheet } from 'react-native'
import { Pedometer } from 'expo-sensors'
import { Navigator } from '../../../routes'
import { ButtonText, LottieContainer, Container, Row } from '../../components/Styled'
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native'

export default function PedometerScreen({ navigation }: { navigation: Navigator }) {
  const subscription = useRef<Pedometer.Subscription>()

  const [state, setState] = useState('checking')
  const [pastSteps, setPastSteps] = useState<number>(0)
  const [steps, setSteps] = useState<number>(0)

  useEffect(() => {
    PedometerSub()

    navigation.setOptions(
      {
        title: 'Pedômetro',
        headerStyle: {
          backgroundColor: '#3C2EDB',
        },
        headerTintColor: '#fff',
      })

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

    if (Platform.OS === 'ios') {
      Pedometer.getStepCountAsync(start, end).then(
        result => {
          setPastSteps(result.steps);
        },
        error => {
          throw new Error(error);
        }
      );
    }

  }

  const PedometerUnsub = () => {
    subscription.current?.remove()
  }



  return (
    <Container>
      <Row>
        <LottieContainer style={styles.shadow}>
          <LottieView
            source={require('../../lottiefiles/shoes.json')}
            autoPlay
            loop
          />
          <ButtonText style={styles.mainText}>
            <Text style={styles.valueText}>
              {steps}
              {' '}
            </Text>
            passos atuais
          </ButtonText>
        </LottieContainer>
      </Row>

      <Row>
        <LottieContainer style={{ ...styles.shadow, ...styles.secondaryCard }}>
          <LottieView
            source={require('../../lottiefiles/day-and-night.json')}
            autoPlay
            loop
          />
          <ButtonText style={styles.secondaryText}>
            <Text style={styles.valueText}>
              {Platform.OS === 'ios' ? ((pastSteps || 0) + steps) : ""}
              {' '}
            </Text>
            {Platform.OS !== 'ios' ? "Últimas 24h: Apenas para iOS" : "passos nas últimas 24h"}
          </ButtonText>
        </LottieContainer>
      </Row>

      <StatusBar style="light" />
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
    backgroundColor: '#3C2EDB'
  },
  mainText: {
    color: '#3C2EDB',
    textTransform: 'none',
    fontWeight: '500'

  },
  secondaryText: {
    color: '#FFF',
    textTransform: 'none',
    fontWeight: '500',
  },
  valueText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
  }

});