import { createContext, useState } from "react";
import { HandPalm, Play } from "@phosphor-icons/react";
import * as z from 'zod';
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cycle, NewWorkCycleForm } from "./Components/NewWorkCycleForm";
import { Countdown } from "./Components/Countdown";
import {
  HomeContainer, StartCountdownButton, StopCountdownButton
} from "./styles";

const newCycleFormSchema = z.object({
  taskDescription: z.string().min(3, 'O nome da tarefa precisa ter no mínimo 3 letras.'),
  durationMinutes: z.number().min(1).max(60)
});

type NewCycleData = z.infer<typeof newCycleFormSchema>

type CyclesContextData = {
  activeWorkCycle: Cycle | undefined;
  onCycleFinished: (cycle: Cycle) => void;
  totalCountdownMinutes: number;
}

export const CyclesContext = createContext({} as CyclesContextData)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeWorkCycle, setActiveWorkCycle] = useState<Cycle | undefined>(undefined)
  const form = useForm<NewCycleData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      durationMinutes: 0,
      taskDescription: ''
    }
  });

  const { handleSubmit, watch, reset } = form

  function handleInterruptWorkCycle() {
    const filteredCycles = cycles.map((c) => {
      if (activeWorkCycle && c.id === activeWorkCycle.id) {
        return { ...c, interruptedDate: new Date() }
      } else {
        return c
      }
    })

    setCycles(filteredCycles)
    setActiveWorkCycle(undefined)
  }

  function cycleFinished(cycle: Cycle) {
    const mappedCycles = cycles.map((c) => {
      if (activeWorkCycle && c.id === cycle.id) {
        return { ...c, finishedDate: new Date() }
      } else {
        return c
      }
    })
    setCycles(mappedCycles)
    setActiveWorkCycle(undefined)
  }

  function newWorkCycle(data: NewCycleData) {
    const cycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.taskDescription,
      totalMinutes: data.durationMinutes,
      startDate: new Date(),
    }

    setCycles((state) => [...state, cycle])
    setActiveWorkCycle(cycle)
    reset()
  }

  const task = watch('taskDescription')

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(newWorkCycle)}>
        <CyclesContext.Provider
          value={{
            activeWorkCycle,
            onCycleFinished: cycleFinished,
            totalCountdownMinutes: activeWorkCycle ? activeWorkCycle?.totalMinutes : 0
          }}>
          <FormProvider {...form}>
            <NewWorkCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeWorkCycle ? (
          <StopCountdownButton
            type="button"
            onClick={handleInterruptWorkCycle}>
            <HandPalm size={24} />Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            type="submit"
            disabled={!task}>
            <Play size={24} />Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer >
  )
}
