import API from '@/common/api'
import Icon from '@/common/components/Icon'
import { API_QUERY_KEYS } from '@/common/querys/keys'
import { useEventQuery } from '@/common/querys/useEventQuery'
import { Event, EventReturn, Image } from '@/common/types'
import { Chip, Grid, IconButton } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs, { Dayjs } from 'dayjs'
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'

const isActiveEvent = (date: Dayjs): boolean => {
  const now = dayjs()
  return now.isBefore(date)
}

const columns: GridColDef[] = [
  { field: `name`, headerName: `Nombre`, width: 300 },
  { field: `description`, headerName: `Descripción`, flex: 1 },
  { field: `location`, headerName: `Ubicación`, width: 200 },
  {
    field: `date`,
    headerName: `Fecha`,
    width: 200,
    renderCell: ({ row }: GridRenderCellParams<EventReturn>) => {
      const { date } = row
      return dayjs(date).format(`DD/MM/YYYY HH:mm`)
    },
  },
  {
    field: `status`,
    headerName: `Estado`,
    width: 150,
    renderCell: ({ row }: GridRenderCellParams<EventReturn>) => {
      const { date } = row
      const isActive = isActiveEvent(dayjs(date))
      return (
        <Chip
          label={isActive ? `Pendiente` : `Finalizado`}
          sx={{
            backgroundColor: isActive ? green[400] : red[400],
            color: `common.white`,
          }}
        />
      )
    },
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
  mainImageName: ``,
  images: [],
  imagesUploaded: [],
  description: ``,
  location: ``,
  date: undefined,
}

const useEvents = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState<string | null>(null)
  const [state, setState] = useState<Event>(initialState)
  const { name, images, imagesUploaded, description, location, date, mainImageName } = state
  const [editingEvent, setEditingEvent] = useState<string | null>(null)
  const { data: eventsQuery, isPending: isLoadingEvents } = useEventQuery()

  const { rows } = useMemo(() => {
    if (!eventsQuery?.data) {
      return { rows: [] }
    }
    const rows = eventsQuery.data.map((event) => {
      return {
        id: event.uuid,
        name: event.name,
        description: event.description,
        location: event.location,
        date: event.date,
        actions: {
          edit: () => handleOnEditClick(event),
          delete: () => handleOnDeleteClick(event.uuid),
        },
      }
    })

    return { rows }
  }, [eventsQuery])

  const handleOnEditClick = (event: EventReturn): void => {
    setState({
      name: event.name,
      mainImageName: event.imagesUploaded.find((image) => image.isMain)?.name || ``,
      images: [],
      imagesUploaded: event.imagesUploaded,
      description: event.description,
      location: event.location,
      date: dayjs(event.date),
    })
    setEditingEvent(event.uuid)
    setOpen(true)
  }

  const handleOnDeleteClick = (eventId: string): void => {
    setOpenDelete(eventId)
  }
  const handleCloseDeleteModal = (): void => {
    setOpenDelete(null)
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }
  const handleOpenDrawer = (): void => {
    setOpen(true)
  }
  const handleCloseDrawer = (): void => {
    setOpen(false)
    setState(initialState)
    setEditingEvent(null)
  }
  const handleClickMainImage = (name: string): void => {
    setState({ ...state, mainImageName: name })
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
      setState({ ...state, images: newArray, mainImageName: newArray[0].name })
    }
    event.target.value = ``
  }
  const handleDateTimeChange = (date: Dayjs | null): void => {
    if (date) {
      setState({ ...state, date: dayjs(date) })
    }
  }
  const handleSubmit = (): void => {
    const payload: Event = {
      name,
      description,
      location,
      date,
      images,
      imagesUploaded,
      mainImageName,
    }

    if (editingEvent) {
      updateEvent({ payload, editingEvent })
      return
    }
    createEvent(payload)
  }

  const handleDeleteSubmit = (): void => {
    if (openDelete) {
      deleteEvent(openDelete)
    }
  }

  const queryClient = useQueryClient()

  const { mutate: createEvent, isPending: isCreatingEvent } = useMutation({
    mutationFn: (payload: Event) => API.event.create(payload),
    onSuccess: (data) => {
      console.log(data)
      queryClient.setQueryData<{ data: EventReturn[] } | undefined>(
        API_QUERY_KEYS.allEvents,
        (oldData: { data: EventReturn[] } | undefined) => {
          if (!oldData?.data) {
            return { data: [] }
          }
          return {
            data: [...oldData.data, data.data],
          }
        },
      )
      handleCloseDrawer()
      enqueueSnackbar(`Evento creado correctamente`, { variant: `success` })
    },
    onError: (error) => {
      console.error(error)
      enqueueSnackbar(`Error al crear evento`, { variant: `error` })
    },
  })

  const { mutate: updateEvent, isPending: isUpdatingEvent } = useMutation({
    mutationFn: ({ payload, editingEvent }: { payload: Event; editingEvent: string }) =>
      API.event.update(payload, editingEvent),
    onSuccess: (data) => {
      queryClient.setQueryData<{ data: EventReturn[] } | undefined>(
        API_QUERY_KEYS.allEvents,
        (oldData: { data: EventReturn[] } | undefined) => {
          if (!oldData?.data) {
            return { data: [] }
          }
          const newData = oldData.data.map((event) => {
            if (event.uuid === data.data.uuid) {
              return data.data
            }
            return event
          })
          return {
            data: newData,
          }
        },
      )
      handleCloseDrawer()
      enqueueSnackbar(`Evento actualizado correctamente`, { variant: `success` })
    },
    onError: (error) => {
      console.error(error)
      enqueueSnackbar(`Error al actualizar evento`, { variant: `error` })
    },
  })

  const { mutate: deleteEvent, isPending: isDeletingEvent } = useMutation({
    mutationFn: (uuid: string) => API.event.delete(uuid),
    onSuccess: (_, uuid) => {
      queryClient.setQueryData<{ data: EventReturn[] } | undefined>(
        API_QUERY_KEYS.allEvents,
        (oldData: { data: EventReturn[] } | undefined) => {
          if (!oldData?.data) {
            return { data: [] }
          }
          return {
            data: oldData.data.filter((event) => event.uuid !== uuid),
          }
        },
      )
      handleCloseDeleteModal()
      enqueueSnackbar(`Evento eliminado correctamente`, { variant: `success` })
    },
    onError: (error) => {
      console.error(error)
      enqueueSnackbar(`Error al eliminar evento`, { variant: `error` })
    },
  })

  const disableSubmit = !name || !description || !location || !date
  const allImages = [...imagesUploaded, ...images]
  const isCreatingOrUpdating = isCreatingEvent || isUpdatingEvent

  return {
    open,
    openDelete,
    state,
    allImages,
    editingEvent,
    rows,
    columns,
    isCreatingOrUpdating,
    isDeletingEvent,
    isLoadingEvents,
    disableSubmit,
    handleInputChange,
    handleOpenDrawer,
    handleCloseDrawer,
    handleDeleteImage,
    handleChange,
    handleDateTimeChange,
    handleSubmit,
    handleCloseDeleteModal,
    handleDeleteSubmit,
    handleClickMainImage,
  }
}

export default useEvents
