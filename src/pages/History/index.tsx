import { HistoryContainer, HistoryList, TaskStatus } from "./styles";

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Descrição da tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <TaskStatus $statusValue="andamento">Em andamento</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Descrição da tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <TaskStatus $statusValue="concluido">Concluído</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Descrição da tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <TaskStatus $statusValue="concluido">Concluído</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Descrição da tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <TaskStatus $statusValue="cancelado">Cancelado</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Descrição da tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <TaskStatus $statusValue="concluido">Concluído</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Descrição da tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <TaskStatus $statusValue="concluido">Concluído</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Descrição da tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <TaskStatus $statusValue="concluido">Concluído</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Descrição da tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <TaskStatus $statusValue="cancelado">Cancelado</TaskStatus>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
