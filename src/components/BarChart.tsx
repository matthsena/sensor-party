import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { DefaultCard } from './Styled'
const { width, height } = Dimensions.get('window')

export interface Coordinates {
  x: string,
  y: string,
  z: string,
}

export default function BarChartComponent({ data }: { data: Coordinates }) {

  return (
    <>
      <DefaultCard style={styles.shadow}>
        <View style={styles.textWrapper}>
          <Text style={{ ...styles.text, ...styles.textX }}>
            <Text style={styles.textAxis}>
              X =
            </Text>
            {' '}{data.x}
          </Text>

          <Text style={{ ...styles.text, ...styles.textY }}>
            <Text style={styles.textAxis}>
              Y =
            </Text>
            {' '}{data.y}
          </Text>
          <Text style={{ ...styles.text, ...styles.textZ }}>
            <Text style={styles.textAxis}>
              Z =
            </Text>
            {' '}{data.z}
          </Text>
        </View>
      </DefaultCard>
    </>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 24,
    marginTop: 16,
  },
  textAxis: {
    fontWeight: 'bold',
    fontSize: 32,
    fontStyle: 'italic',
  },
  textX: {
    color: '#DE006F',
  },
  textY: {
    color: '#F9C534'
  },
  textZ: {
    color: '#73DB2E'
  }
})
