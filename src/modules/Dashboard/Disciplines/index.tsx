import { Button, Drawer, Grid, Tab, Tabs, Typography } from '@mui/material'
import Layout from '../components/Layout'
import { useState } from 'react'
import { arrayMoveImmutable } from 'array-move'
import General from './Tabs/General'
import Schedule from './Tabs/Schedule'

const weekDays: DisciplineSchedule[] = [
  {
    label: `Lunes`,
    isActive: false,
    schedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
  {
    label: `Martes`,
    isActive: false,
    schedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
  {
    label: `Miércoles`,
    isActive: false,
    schedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
  {
    label: `Jueves`,
    isActive: false,
    schedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
  {
    label: `Viernes`,
    isActive: false,
    schedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
  {
    label: `Sábado`,
    isActive: false,
    schedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
  {
    label: `Domingo`,
    isActive: false,
    schedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
]

export interface DisciplineSchedule {
  label: string
  isActive: boolean
  schedule: {
    id: number
    start: string
    end: string
  }[]
}

export interface InitialState {
  disciplineName: string
  mainImage: File | null
  secondaryImages: File[]
  disciplineDescription: string
  disciplineSchedule: DisciplineSchedule[]
}

const Disciplines = (): JSX.Element => {
  const [tabValue, setTabValue] = useState(`general`)
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<InitialState>({
    disciplineName: ``,
    mainImage: null,
    secondaryImages: [],
    disciplineDescription: ``,
    disciplineSchedule: weekDays,
  })

  const { disciplineName, secondaryImages, disciplineDescription, disciplineSchedule } = state

  const handleOpenDrawer = (): void => {
    setOpen(true)
  }

  const handleCloseDrawer = (): void => {
    setOpen(false)
  }

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    const newArray = arrayMoveImmutable(secondaryImages, oldIndex, newIndex)
    const newMainImage = newArray[0] || null
    setState({ ...state, secondaryImages: newArray, mainImage: newMainImage })
  }

  const handleDeleteImage = (name: string): void => {
    const newArray = secondaryImages.filter((image) => image.name !== name)
    setState({ ...state, secondaryImages: newArray })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target

    if (secondaryImages !== null) {
      const filesToUploadNames = secondaryImages.map((file) => file.name)
      let newFiles = Array.from(files || [])
      newFiles = newFiles.filter((newFile) => !filesToUploadNames.includes(newFile.name))
      const newArray = secondaryImages.concat(newFiles)
      setState({ ...state, secondaryImages: newArray })
    }
    event.target.value = ``
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: string): void => {
    setTabValue(newValue)
  }

  return (
    <>
      <Drawer open={open} onClose={handleCloseDrawer} anchor="right">
        <Grid container width={700} padding={6} gap={2} flexDirection="column">
          <Typography variant="h4">Nueva disciplina</Typography>

          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="General" value="general" />
            <Tab label="Horario" value="schedule" />
          </Tabs>

          {tabValue === `general` ? (
            <General
              disciplineName={disciplineName}
              disciplineDescription={disciplineDescription}
              secondaryImages={secondaryImages}
              onSortEnd={onSortEnd}
              handleDeleteImage={handleDeleteImage}
              handleChange={handleChange}
              handleInputChange={handleInputChange}
              setTabValue={setTabValue}
            />
          ) : null}
          {tabValue === `schedule` ? (
            <Schedule disciplineSchedule={disciplineSchedule} setState={setState} />
          ) : null}
        </Grid>
      </Drawer>
      <Layout>
        <Grid container gap={4}>
          <Typography variant="h4">Disciplinas</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenDrawer}>
            Agregar disciplina
          </Button>
        </Grid>
      </Layout>
    </>
  )
}

export default Disciplines
