import API from '@/common/api'
import { useEventQuery } from '@/common/querys/useEventQuery'
import { Event, EventReturn } from '@/common/types'
import { Chip } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useMutation } from '@tanstack/react-query'
import { arrayMoveImmutable } from 'array-move'
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
          color={isActive ? `success` : `error`}
        />
      )
    },
  },
]

const initialState = {
  name: ``,
  images: [],
  description: ``,
  location: ``,
  date: undefined,
}

const useEvents = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<Event>(initialState)
  const { name, images, description, location, date } = state
  const [isHover, setIsHover] = useState(``)
  const { data: eventsQuery } = useEventQuery()

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
      }
    })

    return { rows }
  }, [eventsQuery])

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
  }
  const onMouseEnter = (name: string): void => {
    setIsHover(name)
  }
  const onMouseLeave = (): void => {
    setIsHover(``)
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
    }

    createEvent(payload)
  }

  const { mutate: createEvent, isPending: isCreatingEvent } = useMutation({
    mutationFn: (payload: Event) => API.event.create(payload),
    onSuccess: () => {
      handleCloseDrawer()
      enqueueSnackbar(`Evento creado correctamente`, { variant: `success` })
    },
    onError: (error) => {
      console.error(error)
      enqueueSnackbar(`Error al crear evento`, { variant: `error` })
    },
  })

  return {
    open,
    state,
    rows,
    columns,
    isHover,
    isCreatingEvent,
    handleInputChange,
    handleOpenDrawer,
    handleCloseDrawer,
    onMouseEnter,
    onMouseLeave,
    onSortEnd,
    handleDeleteImage,
    handleChange,
    handleDateTimeChange,
    handleSubmit,
  }
}

export default useEvents
