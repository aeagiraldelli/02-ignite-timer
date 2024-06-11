import { ReactNode, createContext, useReducer } from "react";
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
  const [cycles, dispatch] = useReducer(cyclesReducer, { cycles: [], activeWorkCycle: null })

  function handleInterruptWorkCycle() {
    dispatch(interruptActiveWorkCycleAction())
  }

  function cycleFinished(cycle: Cycle) {
    dispatch(markActiveWorkCycleAsFinished(cycle))
  }

  function newWorkCycle(data: CreateCycleData) {
    const cycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.taskDescription,
      totalMinutes: data.durationMinutes,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(cycle))
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
