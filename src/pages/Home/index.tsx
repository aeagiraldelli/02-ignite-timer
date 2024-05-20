import { Play } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';

import {
  CountdownButton, CountdownContainer,
  DurationInput, FormContainer,
  HomeContainer, Separator, TaskInput
} from "./styles";

const newCycleFormSchema = z.object({
  taskDescription: z.string().min(3, 'O nome da tarefa precisa ter no mínimo 3 letras.'),
  durationsMinutes: z.number().min(1).max(60)
});

export function Home() {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormSchema),
  });

  function createNewWork(data: any) {
    console.log(data)
  }

  const task = watch('taskDescription')

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(createNewWork)}>
        <FormContainer>
          <label htmlFor="input-task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="input-task"
            placeholder="tarefa que você vai trabalhar"
            {...register('taskDescription')}
          />
          <label htmlFor="duration-input">durante</label>
          <DurationInput
            type="number"
            min={1} max={60}
            id="duration-input"
            placeholder="00"
            {...register('durationMinutes', { valueAsNumber: true })}
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
        <CountdownButton
          type="submit"
          disabled={!task}>
          <Play />Começar
        </CountdownButton>
      </form>
    </HomeContainer>
  )
}
