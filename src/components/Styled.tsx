import React from 'react'
import styled, { css } from '@emotion/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props: any) => props.theme.backgroundColor};
`

export const Description = styled.Text({
  color: 'hotpink'
})

export const Image = styled.Image`
  padding: 40px;
`