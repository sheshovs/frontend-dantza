import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Grid, IconButton } from '@mui/material'
import Icon from '@/common/components/Icon'
import {
  Discipline,
  DisciplineReturn,
  DisciplineSchedule,
  DisciplineState,
  Image,
  weekDays,
} from '@/common/types'
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { useDisciplineQuery } from '@/common/querys/useDisciplineQuery'
import { formatDisciplineSchedule } from '@/common/utils/format'
import { arrayMoveImmutable } from 'array-move'
import API from '@/common/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_QUERY_KEYS } from '@/common/querys/keys'
import dayjs from 'dayjs'

function isValidTime(time: string): boolean {
  return dayjs(time, `HH:mm`, true).isValid()
}

const columns: GridColDef[] = [
  {
    field: `name`,
    headerName: `Nombre`,
    width: 200,
  },
  {
    field: `description`,
    headerName: `Descripción`,
    flex: 1,
  },
  {
    field: `schedule`,
    headerName: `Horario`,
    width: 200,
  },
  {
    field: `actions`,
    headerName: `Acciones`,
    width: 150,
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
            <Icon icon="edit" color="primary" />
          </IconButton>
          <IconButton
            sx={{
              padding: 0.5,
              borderRadius: 0.5,
            }}
            onClick={actions.delete}
          >
            <Icon icon="delete" color="error" />
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
  description: ``,
  categories: [],
  categorySchedule: {
    General: weekDays,
  },
}

const useDiscipline = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [tabValue, setTabValue] = useState(`general`)
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState<string | null>(null)
  const [editingDiscipline, setEditingDiscipline] = useState<string | null>(null)
  const [state, setState] = useState<DisciplineState>(initialState)
  const { name, images, imagesUploaded, description, categorySchedule } = state
  const { data: disciplinesQuery } = useDisciplineQuery()

  const { rows } = useMemo(() => {
    if (!disciplinesQuery) {
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
          delete: () => handleOnDeleteClick(discipline.uuid),
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

  const handleOnDeleteClick = (disciplineId: string): void => {
    setOpenDelete(disciplineId)
  }

  const handleCloseDeleteModal = (): void => {
    setOpenDelete(null)
  }

  const handleOpenDrawer = (): void => {
    setOpen(true)
  }

  const handleCloseDrawer = (): void => {
    setOpen(false)
    setState(initialState)
    setTabValue(`general`)
    setEditingDiscipline(null)
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

  const handleDeleteSubmit = (): void => {
    if (openDelete) {
      deleteDiscipline(openDelete)
    }
  }

  const queryClient = useQueryClient()

  const { mutate: createDiscipline, isPending: isCreatingDiscipline } = useMutation({
    mutationFn: (payload: Discipline) => API.discipline.create(payload),
    onSuccess: (data) => {
      queryClient.setQueryData<{ data: DisciplineReturn[] } | undefined>(
        API_QUERY_KEYS.allDisciplines,
        (oldData: { data: DisciplineReturn[] } | undefined) => {
          if (!oldData?.data) {
            return { data: [] }
          }
          return {
            data: [...oldData.data, data.data],
          }
        },
      )
      handleCloseDrawer()
      enqueueSnackbar(`Disciplina creada correctamente`, { variant: `success` })
    },
    onError: (error) => {
      console.log(error)
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
    onSuccess: (data) => {
      queryClient.setQueryData<{ data: DisciplineReturn[] } | undefined>(
        API_QUERY_KEYS.allDisciplines,
        (oldData: { data: DisciplineReturn[] } | undefined) => {
          if (!oldData?.data) {
            return { data: [] }
          }
          const newData = oldData.data.map((discipline) => {
            if (discipline.uuid === data.data.uuid) {
              return data.data
            }
            return discipline
          })
          return {
            data: newData,
          }
        },
      )
      handleCloseDrawer()
      enqueueSnackbar(`Disciplina actualizada correctamente`, { variant: `success` })
    },
    onError: () => {
      enqueueSnackbar(`Error al actualizar la disciplina`, { variant: `error` })
    },
  })

  const { mutate: deleteDiscipline, isPending: isDeletingDiscipline } = useMutation({
    mutationFn: (uuid: string) => API.discipline.delete(uuid),
    onSuccess: (_, uuid) => {
      queryClient.setQueryData<{ data: DisciplineReturn[] } | undefined>(
        API_QUERY_KEYS.allDisciplines,
        (oldData: { data: DisciplineReturn[] } | undefined) => {
          if (!oldData?.data) {
            return { data: [] }
          }
          return {
            data: oldData.data.filter((discipline) => discipline.uuid !== uuid),
          }
        },
      )
      setOpenDelete(null)
      enqueueSnackbar(`Disciplina eliminada correctamente`, { variant: `success` })
    },
    onError: () => {
      enqueueSnackbar(`Error al eliminar la disciplina`, { variant: `error` })
    },
  })

  const isCreatingOrUpdating = isCreatingDiscipline || isUpdatingDiscipline
  const allImages = [...imagesUploaded, ...images]
  const disableScheduleTab = !name || !description || allImages.length < 1 || allImages.length > 10

  const isScheduleCorrect = useMemo(() => {
    const scheduleCategories = Object.keys(categorySchedule)
    for (const schedule of scheduleCategories) {
      // Verifica si hay al menos un día activo en cada schedule
      const activeDays = categorySchedule[schedule].filter((day) => day.isActive)

      // Si no hay días activos, desactiva el botón
      if (activeDays.length === 0) {
        return false
      }

      // Verifica si todos los elementos de daySchedule en días activos
      // tienen valores de start y end
      for (const day of activeDays) {
        for (const scheduleItem of day.daySchedule) {
          if (!isValidTime(scheduleItem.start) || !isValidTime(scheduleItem.end)) {
            return false
          }
        }
      }
    }

    // Si todas las validaciones pasan, activa el botón
    return true
  }, [categorySchedule])

  return {
    columns,
    rows,
    tabValue,
    open,
    openDelete,
    editingDiscipline,
    state,
    allImages,
    isCreatingOrUpdating,
    isDeletingDiscipline,
    disableScheduleTab,
    isScheduleCorrect,
    setState,
    setTabValue,
    handleOpenDrawer,
    handleCloseDrawer,
    onSortEnd,
    handleDeleteImage,
    handleChange,
    handleInputChange,
    handleCategoryChange,
    handleTabChange,
    handleSubmit,
    handleCloseDeleteModal,
    handleDeleteSubmit,
  }
}

export default useDiscipline
