import { Play } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';

import {
  CountdownButton, CountdownContainer,
  DurationInput, FormContainer,
  HomeContainer, Separator, TaskInput
} from "./styles";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const newCycleFormSchema = z.object({
  taskDescription: z.string().min(3, 'O nome da tarefa precisa ter no mínimo 3 letras.'),
  durationMinutes: z.number().min(1).max(60)
});

type NewCycleData = z.infer<typeof newCycleFormSchema>

interface Cycle {
  id: string;
  task: string;
  totalMinutes: number;
  startDate: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeWorkCycle, setActiveWorkCycle] = useState<Cycle | null>(null)
  const [totalSeconds, setTotalSeconds] = useState<number>(0)

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
      totalMinutes: data.durationMinutes,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newWorkCycle])
    setActiveWorkCycle(newWorkCycle)
    setTotalSeconds(newWorkCycle.totalMinutes * 60)
    reset()
  }

  const task = watch('taskDescription')

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const countdownMinutes = String(minutes).padStart(2, '0')
  const countdownSeconds = String(seconds).padStart(2, '0')

  useEffect(() => {
    let interval: number | null
    if (activeWorkCycle) {
      interval = setInterval(() => {
        const secondsPassed = differenceInSeconds(new Date(), activeWorkCycle.startDate)
        const diffSeconds = totalSeconds - secondsPassed
        setTotalSeconds(diffSeconds)
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [activeWorkCycle])


  useEffect(() => {
    if (activeWorkCycle) {
      document.title = `${countdownMinutes}:${countdownSeconds}`
    }
  }, [countdownMinutes, countdownSeconds, activeWorkCycle])

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
          <span>{countdownMinutes[0]}</span>
          <span>{countdownMinutes[1]}</span>
          <Separator>:</Separator>
          <span>{countdownSeconds[0]}</span>
          <span>{countdownSeconds[1]}</span>
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
