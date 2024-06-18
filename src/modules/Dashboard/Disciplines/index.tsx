import { Button, Drawer, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Layout from '../components/Layout'
import { useMemo, useState } from 'react'
import { arrayMoveImmutable } from 'array-move'
import General from './Tabs/General'
import Schedule from './Tabs/Schedule'
import { useMutation } from '@tanstack/react-query'
import API from '@/common/api'
import {
  Discipline,
  DisciplineReturn,
  DisciplineSchedule,
  DisciplineState,
  weekDays,
} from '@/common/types/discipline'
import { useSnackbar } from 'notistack'
import { useDisciplineQuery } from '@/common/querys/useDisciplineQuery'
import Icon from '@/common/components/Icon'
import { formatDisciplineSchedule } from '@/common/utils/format'
import { Image } from '@/common/types'

const columns: GridColDef[] = [
  { field: `name`, headerName: `Nombre`, width: 200 },
  { field: `description`, headerName: `Descripción`, flex: 1 },
  { field: `schedule`, headerName: `Horario`, width: 200 },
  {
    field: `actions`,
    headerName: `Acciones`,
    width: 150,
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => {
      const actions = row.actions
      return (
        <Grid container width="fit-content" height="100%" gap={1} alignItems="center">
          <IconButton
            sx={{
              padding: 0.5,
              borderRadius: 0.5,
            }}
            onClick={actions.edit}
          >
            <Icon icon="edit" />
          </IconButton>
          <IconButton
            sx={{
              padding: 0.5,
              borderRadius: 0.5,
            }}
            onClick={actions.delete}
          >
            <Icon icon="delete" />
          </IconButton>
        </Grid>
      )
    },
  },
]

const initialState = {
  name: ``,
  images: [],
  imagesUploaded: [],
  allImages: [],
  description: ``,
  categories: [],
  categorySchedule: {
    General: weekDays,
  },
}

const Disciplines = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()
  const [tabValue, setTabValue] = useState(`general`)
  const [open, setOpen] = useState(false)
  const [editingDiscipline, setEditingDiscipline] = useState<string | null>(null)
  const [state, setState] = useState<DisciplineState>(initialState)
  const { name, images, imagesUploaded, description, categorySchedule } = state
  const { data: disciplinesQuery } = useDisciplineQuery()

  const { rows } = useMemo(() => {
    if (!disciplinesQuery?.data) {
      return { rows: [] }
    }

    const rows = disciplinesQuery.data.map((discipline) => {
      return {
        id: discipline.uuid,
        name: discipline.name,
        description: discipline.description,
        schedule: Object.keys(discipline.schedule)
          .map((category) => discipline.schedule[category].map((day) => day.label).join(`, `))
          .join(`, `),
        actions: {
          edit: () => handleOnEditClick(discipline),
          delete: () => console.log(`delete`, discipline.uuid),
        },
      }
    })

    return { rows }
  }, [disciplinesQuery])

  const handleOnEditClick = (discipline: DisciplineReturn): void => {
    setState({
      name: discipline.name,
      images: [],
      imagesUploaded: discipline.imagesUploaded,
      description: discipline.description,
      categories: Object.keys(discipline.schedule),
      categorySchedule: formatDisciplineSchedule(discipline.schedule),
    })
    setEditingDiscipline(discipline.uuid)
    setOpen(true)
  }

  const handleOpenDrawer = (): void => {
    setOpen(true)
  }

  const handleCloseDrawer = (): void => {
    setOpen(false)
    setState(initialState)
    setTabValue(`general`)
  }

  const onSortEnd = (oldIndex: number, newIndex: number): void => {
    const newArray = arrayMoveImmutable(images, oldIndex, newIndex)
    setState({ ...state, images: newArray })
  }

  const handleDeleteImage = (image: File | Image): void => {
    if (image instanceof File) {
      const newArray = images.filter((file) => file.name !== image.name)
      setState({ ...state, images: newArray })
      return
    }
    const newImagesUploaded = imagesUploaded.filter((file) => file.name !== image.name)
    setState({ ...state, imagesUploaded: newImagesUploaded })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target

    if (images !== null) {
      const filesToUploadNames = [...images, ...imagesUploaded].map((file) => file.name)
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

  const handleCategoryChange = (values: string[]): void => {
    if (values.length === 0) {
      return setState({ ...state, categories: values, categorySchedule: { General: weekDays } })
    }
    const categorySchedule: Record<string, DisciplineSchedule[]> = {}

    values.forEach((value) => {
      categorySchedule[value] = weekDays
    })
    setState({ ...state, categories: values, categorySchedule })
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: string): void => {
    setTabValue(newValue)
  }

  const handleSubmit = (): void => {
    const scheduleFiltered: Record<string, DisciplineSchedule[]> = {}

    Object.keys(categorySchedule).forEach((category) => {
      scheduleFiltered[category] = categorySchedule[category].filter((day) => day.isActive)
    })

    if (editingDiscipline) {
      // Update discipline
      const payload: Discipline = {
        name,
        description,
        images,
        imagesUploaded,
        categorySchedule: scheduleFiltered,
      }
      updateDiscipline({ payload, editingDiscipline })
      return
    }

    const payload: Discipline = {
      name,
      description,
      images,
      imagesUploaded,
      categorySchedule: scheduleFiltered,
    }
    createDiscipline(payload)
  }

  const { mutate: createDiscipline, isPending: isCreatingDiscipline } = useMutation({
    mutationFn: (payload: Discipline) => API.discipline.create(payload),
    onSuccess: () => {
      handleCloseDrawer()
      enqueueSnackbar(`Disciplina creada correctamente`, { variant: `success` })
    },
    onError: () => {
      enqueueSnackbar(`Error al crear la disciplina`, { variant: `error` })
    },
  })

  const { mutate: updateDiscipline, isPending: isUpdatingDiscipline } = useMutation({
    mutationFn: ({
      payload,
      editingDiscipline,
    }: {
      payload: Discipline
      editingDiscipline: string
    }) => API.discipline.update(payload, editingDiscipline),
    onSuccess: () => {
      handleCloseDrawer()
      enqueueSnackbar(`Disciplina actualizada correctamente`, { variant: `success` })
    },
    onError: () => {
      enqueueSnackbar(`Error al actualizar la disciplina`, { variant: `error` })
    },
  })

  return (
    <>
      <Drawer open={open} onClose={handleCloseDrawer} anchor="right">
        <Grid container width={700} padding={6} gap={2} flexDirection="column">
          <Typography variant="h4">
            {editingDiscipline !== null ? `Editar disciplina` : `Nueva disciplina`}
          </Typography>

          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="General" value="general" />
            <Tab label="Horario" value="schedule" />
          </Tabs>

          {tabValue === `general` ? (
            <General
              {...state}
              onSortEnd={onSortEnd}
              handleDeleteImage={handleDeleteImage}
              handleChange={handleChange}
              handleInputChange={handleInputChange}
              setTabValue={setTabValue}
              handleCategoryChange={handleCategoryChange}
            />
          ) : null}
          {tabValue === `schedule` ? (
            <Schedule
              {...state}
              isCreatingDiscipline={isCreatingDiscipline || isUpdatingDiscipline}
              isEditing={editingDiscipline !== null}
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
