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
  background-color: ${(props: any) =>
    props.purple ? props.theme.purple :
      props.pink ? props.theme.pink :
        props.cyan ? props.theme.cyan :
          props.green ? props.theme.green :
            props.yellow ? props.theme.yellow :
              props.theme.pink
  };
  margin: 4px;
  border-radius: 32px;
  min-height: 25%;
  flex-direction: row;
`

export const LottieContainer = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #eee;
  margin: 8px 0;
  border-radius: 32px;
  min-height: 40%;
  flex-direction: row;
`
export const DefaultCard = styled.View`
  padding: 16px;
  background-color: #000;
  margin: 8px 0;
  border-radius: 32px;
  min-height: 40%;
  width: 100%;
`

export const ButtonText = styled.Text`
  color: ${(props: any) => props.white ? '#FFF' : '#000'};
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
  align-self: flex-end;
  text-align: left;

`