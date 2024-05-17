import styled from 'styled-components';

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2rem;
    color: ${props => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 4rem;
  border-radius: 5px;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${props => props.theme['gray-600']};
      padding: 1.6rem;
      text-align: left;
      color: ${props => props.theme['gray-100']};
      font-size: 1.4rem;
      line-height: 1.618;
    }

    td {
      background-color: ${props => props.theme['gray-700']};
      border-top: 4px solid ${props => props.theme['gray-800']};
      padding: 1.6rem;
      font-size: 1.4rem;
      line-height: 1.618;

      &:first-child {
        width: 50%;
      }
    }
  }
`

const STATUS_COLORS = {
  concluido: 'green-500',
  andamento: 'yellow-500',
  cancelado: 'red-500'
} as const

interface TaskStatusProps {
  statusValue: keyof typeof STATUS_COLORS
}

export const TaskStatus = styled.span<TaskStatusProps>`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &::before {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: ${props => props.theme[STATUS_COLORS[props.statusValue]]};
  }
`