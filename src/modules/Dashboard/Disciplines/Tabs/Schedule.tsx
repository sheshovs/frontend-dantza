import {
  AccordionDetails,
  AccordionSummary,
  Grid,
  Accordion as MuiAccordion,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import Accordion from '@/common/components/Accordion'
import { DisciplineSchedule, DisciplineState } from '@/common/types/discipline'
import { LoadingButton } from '@mui/lab'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface ScheduleProps {
  categorySchedule: Record<string, DisciplineSchedule[]>
  categories: string[]
  isCreatingDiscipline: boolean
  isEditing: boolean
  isScheduleCorrect: boolean
  setState: React.Dispatch<React.SetStateAction<DisciplineState>>
  handleSubmit: () => void
}

const Schedule = ({
  categorySchedule,
  categories,
  isCreatingDiscipline,
  isEditing,
  isScheduleCorrect,
  setState,
  handleSubmit,
}: ScheduleProps): JSX.Element => {
  const [expanded, setExpanded] = useState<string>(``)
  const [expandedCategory, setExpandedCategory] = useState<string | false>(``)

  const handleChange = (panel: string): void => {
    setExpanded(panel === expanded ? `` : panel)
  }

  const handleChangeCategory =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedCategory(isExpanded ? panel : false)
    }

  return (
    <Grid container item xs gap={2} flexDirection="column">
      {categories.length === 0
        ? categorySchedule[`General`].map((scheduleItem) => (
          <Accordion
            key={scheduleItem.label}
            dayItem={scheduleItem}
            isExpanded={expanded === scheduleItem.label}
            handleChange={handleChange}
            setExpanded={setExpanded}
            setState={setState}
          />
        ))
        : categories.map((category) => (
          <MuiAccordion
            key={category}
            expanded={expandedCategory === category}
            onChange={handleChangeCategory(category)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {categorySchedule[category].map((scheduleItem) => (
                <Accordion
                  key={scheduleItem.label}
                  category={category}
                  dayItem={scheduleItem}
                  isExpanded={expanded === scheduleItem.label}
                  handleChange={handleChange}
                  setExpanded={setExpanded}
                  setState={setState}
                />
              ))}
            </AccordionDetails>
          </MuiAccordion>
        ))}

      <Grid container item xs justifyContent="flex-end">
        <LoadingButton
          disabled={!isScheduleCorrect}
          loading={isCreatingDiscipline}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {isEditing ? `Editar disciplina` : `Crear disciplina`}
        </LoadingButton>
      </Grid>
    </Grid>
  )
}

export default Schedule
