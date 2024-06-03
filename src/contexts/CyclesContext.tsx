import { ReactNode, createContext, useState } from "react";

type CreateCycleData = {
  taskDescription: string;
  durationMinutes: number;
}

export type Cycle = {
  id: string;
  task: string;
  totalMinutes: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

type CyclesContextData = {
  activeWorkCycle: Cycle | undefined;
  onCycleFinished: (cycle: Cycle) => void;
  totalCountdownMinutes: number;
  onCreateNewWorkCycle: (data: CreateCycleData) => void,
  interruptCurrentWorkCycle: () => void,
  cycles: Cycle[]
}

export const CyclesContext = createContext({} as CyclesContextData)

type CyclesContextProviderProps = {
  children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeWorkCycle, setActiveWorkCycle] = useState<Cycle | undefined>(undefined)

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

  function newWorkCycle(data: CreateCycleData) {
    const cycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.taskDescription,
      totalMinutes: data.durationMinutes,
      startDate: new Date(),
    }

    setCycles((state) => [...state, cycle])
    setActiveWorkCycle(cycle)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeWorkCycle,
        onCycleFinished: cycleFinished,
        totalCountdownMinutes: activeWorkCycle ? activeWorkCycle?.totalMinutes : 0,
        onCreateNewWorkCycle: newWorkCycle,
        interruptCurrentWorkCycle: handleInterruptWorkCycle,
        cycles: cycles
      }}>
      {children}
    </CyclesContext.Provider>
  )
}
