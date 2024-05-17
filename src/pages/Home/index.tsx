import { Play } from "@phosphor-icons/react";
import {
  CountdownButton, CountdownContainer,
  DurationInput, FormContainer,
  HomeContainer, Separator, TaskInput
} from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="input-task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            name="input-task"
            id="input-task"
            placeholder="tarefa que você vai trabalhar"
          />
          <label htmlFor="input-minutes-duration">durante</label>
          <DurationInput
            type="number"
            step={5}
            min={1} max={60}
            name="input-minutes-duration"
            id="input-minutes-duration"
            placeholder="00"
          />

          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <CountdownButton type="submit"><Play />Começar</CountdownButton>
      </form>
    </HomeContainer>
  )
}
