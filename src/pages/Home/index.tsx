import { useContext } from "react";
import { HandPalm, Play } from "@phosphor-icons/react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { NewWorkCycleForm } from "./Components/NewWorkCycleForm";
import { Countdown } from "./Components/Countdown";
import {
  HomeContainer, StartCountdownButton, StopCountdownButton
} from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormSchema = z.object({
  taskDescription: z.string().min(3, 'O nome da tarefa precisa ter no mínimo 3 letras.'),
  durationMinutes: z.number().min(1).max(60)
});

type NewCycleData = z.infer<typeof newCycleFormSchema>


export function Home() {
  const { activeWorkCycle, onCreateNewWorkCycle, interruptCurrentWorkCycle } = useContext(CyclesContext)
  const form = useForm<NewCycleData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      durationMinutes: 0,
      taskDescription: ''
    }
  });

  const { handleSubmit, watch, reset } = form

  const task = watch('taskDescription')

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit((data: NewCycleData) => {
        onCreateNewWorkCycle(data)
        reset()
      })}>
        <FormProvider {...form}>
          <NewWorkCycleForm />
        </FormProvider>
        <Countdown />
        {activeWorkCycle ? (
          <StopCountdownButton
            type="button"
            onClick={interruptCurrentWorkCycle}>
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
