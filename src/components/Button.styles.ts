import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const variants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border: 0;
  border-radius: 5px;
  margin: 10px;
  background: ${props => props.theme['green-500']};
  color: ${props => props.theme.white};
  cursor: pointer;

  /* ${props => {
    return css`
      background-color: ${variants[props.variant]};
    `
  }} */
`