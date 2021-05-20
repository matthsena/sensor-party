import React from 'react'
import styled from '@emotion/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  background-color: #fff;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px
`

export const Title = styled.Text({
  color: '#000',
  fontSize: 18,
  fontWeight: 'bold',
  marginVertical: 4
})

export const Description = styled.Text({
  color: '#000',
  fontSize: 16,
  marginVertical: 4
})

export const Row = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
`

export const CardButton = styled.TouchableOpacity`
  flex: 1;
  padding: 14px;
  background-color: #ffbb00;
  margin: 4px;
  border-radius: 32px;
  min-height: 25%;
  flex-direction: row;
`

export const ButtonText = styled.Text`
  color: #000;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
  align-self: flex-end;
  text-align: left;

`