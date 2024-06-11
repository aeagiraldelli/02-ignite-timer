import { Cycle } from "../../contexts/CyclesContext";
import { CycleActionType } from "./actions";

type CyclesState = {
  cycles: Cycle[];
  activeWorkCycle: Cycle | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case CycleActionType.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.cycle],
        activeWorkCycle: action.payload.cycle,
      }
    case CycleActionType.INTERRUPT_ACTIVE_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((c) => {
          if (state.activeWorkCycle && c.id === state.activeWorkCycle.id) {
            return { ...c, interruptedDate: new Date() }
          } else {
            return c
          }
        }),
        activeWorkCycle: null,
      }
    case CycleActionType.CYCLE_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((c) => {
          if (state.activeWorkCycle && c.id === state.activeWorkCycle.id) {
            return { ...c, finishedDate: new Date() }
          } else {
            return c
          }
        }),
        activeWorkCycle: null,
      }
    default:
      return state
  }
}
