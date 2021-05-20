import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Description, CardButton, Title, Row, ButtonText } from '../components/Styled'

const emotionLogo = 'https://cdn.rawgit.com/emotion-js/emotion/main/emotion.png'

export default function Home(props: any) {
  return (
    <Container>
      <Title>Awesome Sensors 🤖</Title>
      <Description>An Expo sensors experience 👨‍🔬</Description>

      <Row>
        <CardButton style={styles.button} onPress={() => props.navigation.navigate('Accelerometer')}>
          <ButtonText>Acelerômetro</ButtonText>
        </CardButton>
      </Row>

      <Row>
        <CardButton onPress={() => props.navigation.navigate('Pedometer')}>
          <ButtonText>Pedômetro</ButtonText>
        </CardButton>

        <CardButton onPress={() => props.navigation.navigate('Magnetometer')}>
          <ButtonText>Magnetômetro</ButtonText>
        </CardButton>
      </Row>


      <Row>
        <CardButton style={styles.button} onPress={() => props.navigation.navigate('Barometer')}>
          <ButtonText>Barómetro</ButtonText>
        </CardButton>

        <CardButton style={styles.button} onPress={() => props.navigation.navigate('Gyroscope')}>
          <ButtonText>Giroscópio</ButtonText>
        </CardButton>

      </Row>

      <StatusBar style="auto" />
    </Container>
  );
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
});
