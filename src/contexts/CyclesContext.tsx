import { ReactNode, createContext, useEffect, useReducer } from "react";
import { cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interruptActiveWorkCycleAction,
  markActiveWorkCycleAsFinished
} from "../reducers/cycles/actions";

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
  activeWorkCycle: Cycle | null;
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

const STORAGE_KEY = "@ignite-timer:cycles-state-1.0.0"

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, { cycles: [], activeWorkCycle: null }, () => {
    const storedData = localStorage.getItem(STORAGE_KEY)
    if (storedData) {
      return JSON.parse(storedData)
    }

    return {
      cycles: [],
      activeWorkCycle: null
    }
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem(STORAGE_KEY, stateJSON)
  }, [cyclesState])

  function handleInterruptWorkCycle() {
    dispatch(interruptActiveWorkCycleAction())
  }

  function cycleFinished(cycle: Cycle) {
    dispatch(markActiveWorkCycleAsFinished(cycle))
  }

  function newWorkCycle(data: CreateCycleData) {
    const c: Cycle = {
      id: new Date().getTime().toString(),
      task: data.taskDescription,
      totalMinutes: data.durationMinutes,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(c))
  }

  return (
    <CyclesContext.Provider
      value={{
        activeWorkCycle: cyclesState.activeWorkCycle,
        onCycleFinished: cycleFinished,
        totalCountdownMinutes: cyclesState.activeWorkCycle ? cyclesState.activeWorkCycle.totalMinutes : 0,
        onCreateNewWorkCycle: newWorkCycle,
        interruptCurrentWorkCycle: handleInterruptWorkCycle,
        cycles: cyclesState.cycles
      }}>
      {children}
    </CyclesContext.Provider>
  )
}
