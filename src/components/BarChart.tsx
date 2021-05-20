import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Row } from './Styled'
import { BarChart } from 'react-native-svg-charts'

const { width, height } = Dimensions.get('window')

export interface Coordinates {
  x: number[],
  y: number[],
  z: number[]
}


export default function BarChartComponent({ data }: { data: Coordinates }) {
  return (
    <>
      <Row style={{ height: height * 0.4, width: width - 32 }}>
        <BarChart
          style={{ flex: 1 }}

          data={[
            {
              data: data.x,
              svg: { fill: '#DE006F' },
            },
            {
              data: data.y,
              svg: { fill: '#3C2EDB' },
            },
            {
              data: data.z,
              svg: { fill: '#F9C534' },
            }
          ]}
          contentInset={{ top: 10, bottom: 10 }}
        >
        </BarChart>
      </Row>

      <Text style={{ ...styles.text, ...styles.textX }}>X: {data.x}</Text>

      <Text style={{ ...styles.text, ...styles.textY }}>Y: {data.y}</Text>

      <Text style={{ ...styles.text, ...styles.textZ }}>Z: {data.z}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 16
  },
  textX: {
    color: '#DE006F',
  },
  textY: {
    color: '#3C2EDB'
  },
  textZ: {
    color: '#F9C534'
  }
})
