import { Button, Drawer, Grid, Tab, Tabs, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Layout from '../components/Layout'
import { useMemo, useState } from 'react'
import { arrayMoveImmutable } from 'array-move'
import General from './Tabs/General'
import Schedule from './Tabs/Schedule'
import { useMutation } from '@tanstack/react-query'
import API from '@/common/api'
import { Discipline, weekDays } from '@/common/types/discipline'
import { useSnackbar } from 'notistack'
import { useDisciplineQuery } from '@/common/querys/useDisciplineQuery'

const initialState = {
  name: ``,
  images: [],
  description: ``,
  schedule: weekDays,
}

const Disciplines = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()
  const [tabValue, setTabValue] = useState(`general`)
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<Discipline>(initialState)
  const { name, images, description, schedule } = state
  const { data: disciplinesQuery } = useDisciplineQuery()

  const { columns, rows } = useMemo(() => {
    if (!disciplinesQuery?.data) {
      return { columns: [], rows: [] }
    }

    const columns = [
      { field: `name`, headerName: `Nombre`, width: 200 },
      { field: `description`, headerName: `Descripción`, width: 400 },
      { field: `schedule`, headerName: `Horario`, width: 200 },
    ]

    const rows = disciplinesQuery.data.map((discipline) => {
      return {
        id: discipline.uuid,
        name: discipline.name,
        description: discipline.description,
        schedule: discipline.schedule
          .map((day) => {
            return day.label
          })
          .join(`, `),
      }
    })

    return { columns, rows }
  }, [disciplinesQuery])

  const handleOpenDrawer = (): void => {
    setOpen(true)
  }

  const handleCloseDrawer = (): void => {
    setOpen(false)
  }

  const onSortEnd = (oldIndex: number, newIndex: number): void => {
    const newArray = arrayMoveImmutable(images, oldIndex, newIndex)
    setState({ ...state, images: newArray })
  }

  const handleDeleteImage = (name: string): void => {
    const newArray = images.filter((image) => image.name !== name)
    setState({ ...state, images: newArray })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target

    if (images !== null) {
      const filesToUploadNames = images.map((file) => file.name)
      let newFiles = Array.from(files || [])
      newFiles = newFiles.filter((newFile) => !filesToUploadNames.includes(newFile.name))
      const newArray = images.concat(newFiles)
      setState({ ...state, images: newArray })
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

  const handleSubmit = (): void => {
    const payload: Discipline = {
      name,
      description,
      images,
      schedule: schedule.filter((day) => day.isActive),
    }

    createDiscipline(payload)
  }

  const { mutate: createDiscipline, isPending: isCreatingDiscipline } = useMutation({
    mutationFn: (payload: Discipline) => API.discipline.create(payload),
    onSuccess: () => {
      handleCloseDrawer()
      enqueueSnackbar(`Disciplina creada correctamente`, { variant: `success` })
      setState(initialState)
    },
    onError: (error) => {
      console.error(error)
      enqueueSnackbar(`Error al crear la disciplina`, { variant: `error` })
    },
  })

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
              name={name}
              description={description}
              images={images}
              onSortEnd={onSortEnd}
              handleDeleteImage={handleDeleteImage}
              handleChange={handleChange}
              handleInputChange={handleInputChange}
              setTabValue={setTabValue}
            />
          ) : null}
          {tabValue === `schedule` ? (
            <Schedule
              schedule={schedule}
              isCreatingDiscipline={isCreatingDiscipline}
              setState={setState}
              handleSubmit={handleSubmit}
            />
          ) : null}
        </Grid>
      </Drawer>
      <Layout>
        <Grid container gap={4} marginBottom={4}>
          <Typography variant="h4">Disciplinas</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenDrawer}>
            Agregar disciplina
          </Button>
        </Grid>
        <Grid container>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[8]}
            disableRowSelectionOnClick
            localeText={{
              noRowsLabel: `No hay disciplinas`,
            }}
            sx={{
              minHeight: `500px`,
            }}
          />
        </Grid>
      </Layout>
    </>
  )
}

export default Disciplines
