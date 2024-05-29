import { useContext, useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns/differenceInSeconds";
import { CountdownContainer, Separator } from "./styles";
import { CyclesContext } from "../..";

export function Countdown() {
  const { activeWorkCycle, onCycleFinished } = useContext(CyclesContext)
  const [totalSeconds, setTotalSeconds] = useState<number>(0)

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const countdownMinutes = String(minutes).padStart(2, '0')
  const countdownSeconds = String(seconds).padStart(2, '0')

  useEffect(() => {
    if (activeWorkCycle) {
      document.title = `${countdownMinutes}:${countdownSeconds} - Task Timer`
    } else {
      document.title = `Task Timer`
    }
  }, [countdownMinutes, countdownSeconds, activeWorkCycle])


  useEffect(() => {
    if (totalSeconds === 0 && activeWorkCycle) {
      setTotalSeconds(activeWorkCycle.totalMinutes * 60)
    }
    let interval: number | null
    if (activeWorkCycle) {
      interval = setInterval(() => {
        const secondsPassed = differenceInSeconds(new Date(), activeWorkCycle.startDate)
        const diffSeconds = totalSeconds - secondsPassed
        if (diffSeconds <= 0) {
          onCycleFinished(activeWorkCycle)
          setTotalSeconds(0)
        } else {
          setTotalSeconds(diffSeconds)
        }
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [activeWorkCycle, onCycleFinished])

  return (
    <CountdownContainer>
      <span>{countdownMinutes[0]}</span>
      <span>{countdownMinutes[1]}</span>
      <Separator>:</Separator>
      <span>{countdownSeconds[0]}</span>
      <span>{countdownSeconds[1]}</span>
    </CountdownContainer>
  )
}
