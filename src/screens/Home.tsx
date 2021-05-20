import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Container, Description, Image } from '../components/Styled'

const emotionLogo = 'https://cdn.rawgit.com/emotion-js/emotion/main/emotion.png'

export default function Home(props: any) {
  return (
    <Container>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Pedometer')}>
        <Text>Pedômetro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Magnetometer')}>
        <Text>Magnetômetro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Barometer')}>
        <Text>Barómetro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Gyroscope')}>
        <Text>Giroscópio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Accelerometer')}>
        <Text>Acelerômetro</Text>
      </TouchableOpacity>

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
