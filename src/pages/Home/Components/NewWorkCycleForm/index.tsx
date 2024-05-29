import { useContext } from "react";
import { DurationInput, FormContainer, TaskInput } from "./styles";
import { CyclesContext } from "../..";
import { useFormContext } from "react-hook-form";

export type Cycle = {
  id: string;
  task: string;
  totalMinutes: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function NewWorkCycleForm() {
  const { activeWorkCycle } = useContext(CyclesContext)
  const { register } = useFormContext()
  return (
    <FormContainer>
      <label htmlFor="input-task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="input-task"
        placeholder="tarefa que você vai trabalhar"
        disabled={!!activeWorkCycle}
        {...register('taskDescription')}
      />
      <label htmlFor="duration-input">durante</label>
      <DurationInput
        type="number"
        min={1} max={60}
        id="duration-input"
        placeholder="00"
        disabled={!!activeWorkCycle}
        {...register('durationMinutes', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
