import { produce } from "immer";
import { Cycle } from "../../contexts/CyclesContext";
import { CycleActionType } from "./actions";

type CyclesState = {
  cycles: Cycle[];
  activeWorkCycle: Cycle | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case CycleActionType.ADD_NEW_CYCLE: {
      return produce(state, draft => {
        draft.cycles.push(action.payload.cycle)
        draft.activeWorkCycle = action.payload.cycle
      })
    }

    case CycleActionType.INTERRUPT_ACTIVE_CYCLE: {
      const cycleIndex = state.cycles.findIndex((c) => {
        return state.activeWorkCycle && state.activeWorkCycle.id === c.id
      })

      if (cycleIndex < 0) {
        return state;
      }

      return produce(state, draft => {
        draft.activeWorkCycle = null
        draft.cycles[cycleIndex].interruptedDate = new Date()
      })
    }

    case CycleActionType.CYCLE_FINISHED: {
      const cycleIndex = state.cycles.findIndex((c) => {
        return state.activeWorkCycle && state.activeWorkCycle.id === c.id
      })

      if (cycleIndex < 0) {
        return state;
      }

      return produce(state, draft => {
        draft.activeWorkCycle = null
        draft.cycles[cycleIndex].finishedDate = new Date()
      })
    }

    default:
      return state
  }
}
