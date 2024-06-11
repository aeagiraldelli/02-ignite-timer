import { Cycle } from "../../contexts/CyclesContext";

export enum CycleActionType {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
  CYCLE_FINISHED = 'CYCLE_FINISHED'
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: CycleActionType.ADD_NEW_CYCLE,
    payload: {
      cycle: newCycle
    }
  }
}

export function interruptActiveWorkCycleAction() {
  return {
    type: CycleActionType.INTERRUPT_ACTIVE_CYCLE,
    payload: {
      cycle: null
    }
  }
}

export function markActiveWorkCycleAsFinished(cycle: Cycle) {
  return {
    type: CycleActionType.CYCLE_FINISHED,
    payload: {
      cycle
    }
  }
}
