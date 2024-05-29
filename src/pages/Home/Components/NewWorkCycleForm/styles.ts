import styled from "styled-components"

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
