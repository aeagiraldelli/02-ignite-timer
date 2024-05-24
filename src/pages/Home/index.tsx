import { Play } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';

import {
  CountdownButton, CountdownContainer,
  DurationInput, FormContainer,
  HomeContainer, Separator, TaskInput
} from "./styles";
import { useState } from "react";

const newCycleFormSchema = z.object({
  taskDescription: z.string().min(3, 'O nome da tarefa precisa ter no mínimo 3 letras.'),
  durationMinutes: z.number().min(1).max(60)
});

type NewCycleData = z.infer<typeof newCycleFormSchema>


interface Cycle {
  id: string;
  task: string;
  totalMinutes: number;
}


export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeWorkCycle, setActiveWorkCycle] = useState<Cycle | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      durationMinutes: 0,
      taskDescription: ''
    }
  });

  function createNewWork(data: NewCycleData) {
    const newWorkCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.taskDescription,
      totalMinutes: data.durationMinutes
    }
    setCycles((state) => [...state, newWorkCycle])
    setActiveWorkCycle(newWorkCycle)
    reset()
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
