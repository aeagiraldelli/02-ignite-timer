import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { HistoryContainer, HistoryList, TaskStatus } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History() {
  const { cycles } = useContext(CyclesContext)
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
            {cycles ? cycles.map(cycle => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.totalMinutes} minutos</td>
                  <td>{formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR
                  })}</td>
                  <td>
                    {cycle.finishedDate && (<TaskStatus $statusValue="concluido">Concluído</TaskStatus>)}
                    {cycle.interruptedDate && (<TaskStatus $statusValue="cancelado">Cancelado</TaskStatus>)}
                    {!cycle.finishedDate && !cycle.interruptedDate && (<TaskStatus $statusValue="andamento">Em andamento</TaskStatus>)}
                  </td>
                </tr>
              )
            }) : <div></div>}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
