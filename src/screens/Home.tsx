import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Description, CardButton, Title, Row, ButtonText } from '../components/Styled'
import LottieView from 'lottie-react-native';

export default function Home(props: any) {
  return (
    <Container>
      <Title>Awesome Sensors 🤖</Title>
      <Description>An Expo sensors experience 👨‍🔬</Description>

      <Row>

        <CardButton style={styles.shadow} onPress={() => props.navigation.navigate('Pedometer')} purple>

          <LottieView
            source={require('../lottiefiles/walking.json')}
            autoPlay
            loop
          />

          <ButtonText white>Pedômetro</ButtonText>
        </CardButton>
      </Row>

      <Row>

        <CardButton style={styles.shadow} onPress={() => props.navigation.navigate('Magnetometer')}>

          <LottieView
            source={require('../lottiefiles/yellow-compass.json')}
            autoPlay
            loop
          />

          <ButtonText white>Magnetômetro</ButtonText>
        </CardButton>

        <CardButton style={styles.shadow} onPress={() => props.navigation.navigate('Accelerometer')} cyan>

          <LottieView
            source={require('../lottiefiles/speed.json')}
            autoPlay
            loop
          />

          <ButtonText>Acelerômetro</ButtonText>
        </CardButton>


      </Row>


      <Row>
        <CardButton style={styles.shadow} onPress={() => props.navigation.navigate('Barometer')} green>

          <LottieView
            source={require('../lottiefiles/cloud.json')}
            autoPlay
            loop
          />

          <ButtonText>Barómetro</ButtonText>
        </CardButton>

        <CardButton style={styles.shadow} onPress={() => props.navigation.navigate('Gyroscope')} yellow>

          <LottieView
            source={require('../lottiefiles/globo.json')}
            autoPlay
            loop
          />

          <ButtonText>Giroscópio</ButtonText>
        </CardButton>

      </Row>

      <StatusBar style="dark" />
    </Container>
  );
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
});
