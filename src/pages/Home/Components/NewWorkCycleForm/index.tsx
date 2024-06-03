import { useContext } from "react";
import { DurationInput, FormContainer, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";


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
