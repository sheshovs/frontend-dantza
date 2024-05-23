import { Grid } from '@mui/material'
import React, { useState } from 'react'
import Accordion from '@/common/components/Accordion'
import { Discipline, DisciplineSchedule } from '@/common/types/discipline'
import { LoadingButton } from '@mui/lab'

interface ScheduleProps {
  schedule: DisciplineSchedule[]
  isCreatingDiscipline: boolean
  setState: React.Dispatch<React.SetStateAction<Discipline>>
  handleSubmit: () => void
}

const Schedule = ({
  schedule,
  isCreatingDiscipline,
  setState,
  handleSubmit,
}: ScheduleProps): JSX.Element => {
  const [expanded, setExpanded] = useState<string>(``)

  const handleChange = (panel: string): void => {
    setExpanded(panel === expanded ? `` : panel)
  }
  return (
    <Grid container item xs gap={2} flexDirection="column">
      {schedule.map((scheduleItem) => (
        <Accordion
          key={scheduleItem.label}
          schedule={scheduleItem}
          isExpanded={expanded === scheduleItem.label}
          handleChange={handleChange}
          setExpanded={setExpanded}
          setState={setState}
        />
      ))}

      <Grid container item xs justifyContent="flex-end">
        <LoadingButton
          loading={isCreatingDiscipline}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Crear disciplina
        </LoadingButton>
      </Grid>
    </Grid>
  )
}

export default Schedule
