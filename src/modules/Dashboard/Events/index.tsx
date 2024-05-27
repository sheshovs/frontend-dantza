import { Alert, Box, Button, Drawer, Grid, IconButton, TextField, Typography } from '@mui/material'
import Layout from '../components/Layout'
import { useMemo, useState } from 'react'
import SortableList, { SortableItem } from 'react-easy-sort'
import Icon from '@/common/components/Icon'
import { LoadingButton } from '@mui/lab'
import { arrayMoveImmutable } from 'array-move'
import { Event, EventReturn } from '@/common/types'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import 'dayjs/locale/es'
import { useMutation } from '@tanstack/react-query'
import API from '@/common/api'
import { useSnackbar } from 'notistack'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useEventQuery } from '@/common/querys/useEventQuery'

const columns: GridColDef[] = [
  { field: `name`, headerName: `Nombre`, width: 300, sortable: false },
  { field: `description`, headerName: `Descripción`, flex: 1, sortable: false },
  { field: `location`, headerName: `Ubicación`, width: 200, sortable: false },
  {
    field: `date`,
    headerName: `Fecha`,
    width: 200,
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams<EventReturn>) => {
      const { date } = row
      return dayjs(date).format(`DD/MM/YYYY HH:mm`)
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

const Events = (): JSX.Element => {
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

  return (
    <>
      <Drawer open={open} onClose={handleCloseDrawer} anchor="right">
        <Grid container width={700} padding={6} gap={2} flexDirection="column">
          <Typography variant="h4">Nuevo evento</Typography>
          <Grid container item xs gap={2} flexDirection="column">
            <Grid container item xs gap={1}>
              <Grid item xs={12}>
                <Typography variant="body1">Nombre</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  fullWidth
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <Grid container item xs gap={1}>
              <Grid item xs={12}>
                <Typography variant="body1">Descripción</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <Grid container gap={2}>
              <Grid container item xs gap={1}>
                <Grid item xs={12}>
                  <Typography variant="body1">Ubicación</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    name="location"
                    value={location}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid container item xs gap={1}>
                <Grid item xs={12}>
                  <Typography variant="body1">Fecha y hora</Typography>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-cl">
                    <DateTimePicker
                      value={dayjs(date)}
                      onChange={handleDateTimeChange}
                      ampm={false}
                      sx={{
                        width: `100%`,
                        input: {
                          paddingY: 0,
                          height: `40px`,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>

            <Grid container item xs gap={1}>
              <Grid item xs={12}>
                <Typography variant="body1">Imágenes</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: `text.secondary`,
                    fontSize: `13px !important`,
                  }}
                >
                  <span
                    style={{
                      color: images.length > 20 ? `red` : ``,
                    }}
                  >
                    Fotos · {images.length}/20
                  </span>
                  {` `}- Puedes agregar un máximo de 20 fotos.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
                  {images.map((image) => (
                    <SortableItem key={image.name}>
                      <Box
                        className="item"
                        onMouseEnter={() => {
                          onMouseEnter(image.name)
                        }}
                        onMouseLeave={onMouseLeave}
                      >
                        <IconButton
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleDeleteImage(image.name)
                          }}
                          sx={{
                            display: isHover === image.name ? `flex` : `none`,
                            position: `absolute`,
                            top: 0,
                            right: 0,
                            zIndex: 1,
                            padding: 0,
                            borderRadius: `0 0 0 5px`,
                            width: `20px`,
                            height: `20px`,
                            backgroundColor: `common.white`,
                            '&:hover': {
                              backgroundColor: `#ffffffe6`,
                            },
                          }}
                        >
                          <Icon
                            icon="close"
                            sx={{
                              fontSize: `16px`,
                            }}
                          />
                        </IconButton>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={image.name}
                          width={100}
                          height={100}
                          style={{
                            objectFit: `cover`,
                            borderRadius: `5px`,
                            pointerEvents: `none`,
                          }}
                        />
                      </Box>
                    </SortableItem>
                  ))}
                  <Button
                    sx={{
                      width: `100px`,
                      height: `100px`,
                      textTransform: `none`,
                      flexDirection: `column`,
                      fontSize: `12px`,
                      alignItems: `center`,
                      padding: `0`,
                    }}
                    variant="outlined"
                    color="primary"
                    component="label"
                    disabled={images.length >= 20}
                  >
                    <input
                      hidden
                      multiple
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleChange}
                    />
                    <Icon
                      icon="addPhotos"
                      sx={{
                        fontSize: `20px`,
                      }}
                    />
                    Agregar foto
                  </Button>
                </SortableList>
              </Grid>
              <Grid item xs={12} marginTop={2}>
                <Alert severity="info">
                  <Typography variant="body2">
                    La primera imagen será la principal del evento. <br />
                    Puedes agregar imágenes en cualquier momento, incluso cuando haya pasado el
                    evento.
                  </Typography>
                </Alert>
              </Grid>
            </Grid>

            <Grid container item xs gap={1} justifyContent="flex-end">
              <LoadingButton
                loading={isCreatingEvent}
                disabled={!name || !description || !location || !date}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Crear evento
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>

      <Layout>
        <Grid container gap={4} marginBottom={4}>
          <Typography variant="h4">Eventos</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenDrawer}>
            Agregar evento
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
              noRowsLabel: `No hay profesores`,
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

export default Events
