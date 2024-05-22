import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import { DisciplineSchedule, InitialState } from '..'
import Accordion from '@/common/components/Accordion'

interface ScheduleProps {
  disciplineSchedule: DisciplineSchedule[]
  setState: React.Dispatch<React.SetStateAction<InitialState>>
}

const Schedule = ({ disciplineSchedule, setState }: ScheduleProps): JSX.Element => {
  const [expanded, setExpanded] = useState<string>(``)

  const handleChange = (panel: string): void => {
    setExpanded(panel === expanded ? `` : panel)
  }
  return (
    <Grid container item xs gap={2} flexDirection="column">
      {disciplineSchedule.map((schedule) => (
        <Accordion
          key={schedule.label}
          schedule={schedule}
          isExpanded={expanded === schedule.label}
          handleChange={handleChange}
          setExpanded={setExpanded}
          setState={setState}
        />
      ))}

      <Grid container item xs justifyContent="flex-end">
        <Button variant="contained" color="primary">
          Crear disciplina
        </Button>
      </Grid>
    </Grid>
  )
}

export default Schedule
