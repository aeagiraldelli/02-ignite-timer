import styled from 'styled-components';

export const HomeContainer = styled.main`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${props => props.theme['gray-100']};
  font-size: 1.6rem;
  font-weight: bold;
  flex-wrap: wrap;
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 18rem;
  line-height: 0.8;
  color: ${props => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background: ${props => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 5px;
  }
`

export const Separator = styled.div`
  padding: 2rem 1rem 4rem 0;
  color: ${props => props.theme['green-500']};
  width: 6rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 2rem;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-weight: bold;

  background: ${props => props.theme['green-500']};
  color: ${props => props.theme['gray-100']};
  transition: background 150ms;

  &:not(:disabled):hover {
    background: ${props => props.theme['green-700']};
  }

  &:disabled {
    opacity: 70%;
    cursor: not-allowed;
  }
`
const BaseInput = styled.input`
  background: transparent;
  border: 0;
  height: 3rem;
  border-bottom: 2px solid ${props => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.4rem;
  padding: 0 0.5rem;
  color: ${props => props.theme['gray-100']};

  &::placeholder{
    color: ${props => props.theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${props => props.theme['green-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
`

export const DurationInput = styled(BaseInput)`
  width: 5rem;
`