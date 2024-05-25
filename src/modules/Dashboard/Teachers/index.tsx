import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  Drawer,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Layout from '../components/Layout'
import { useMemo, useState } from 'react'
import { arrayMoveImmutable } from 'array-move'
import { useMutation } from '@tanstack/react-query'
import API from '@/common/api'
import { useSnackbar } from 'notistack'
import { Teacher, TeacherReturn } from '@/common/types'
import SortableList, { SortableItem } from 'react-easy-sort'
import Icon from '@/common/components/Icon'
import { LoadingButton } from '@mui/lab'
import { useTeacherQuery } from '@/common/querys/useTeacherQuery'
import { useDisciplineQuery } from '@/common/querys/useDisciplineQuery'

const columns: GridColDef[] = [
  { field: `name`, headerName: `Nombre`, width: 200, sortable: false },
  { field: `description`, headerName: `Descripción`, flex: 1, sortable: false },
  {
    field: `disciplines`,
    headerName: `Disciplinas`,
    width: 200,
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams<TeacherReturn>) => {
      const { disciplines } = row
      return (
        <>
          {disciplines.map((discipline) => (
            <Chip key={discipline.uuid} label={discipline.name} size="small" />
          ))}
        </>
      )
    },
  },
]

const initialState = {
  name: ``,
  images: [],
  description: ``,
  disciplines: [],
}

const Teachers = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [isHover, setIsHover] = useState(``)
  const [state, setState] = useState<Teacher>(initialState)
  const { name, images, description, disciplines } = state
  const { data: disciplinesQuery } = useDisciplineQuery()
  const { data: teachersQuery } = useTeacherQuery()

  const { rows } = useMemo(() => {
    if (!teachersQuery?.data) {
      return { rows: [] }
    }

    const rows = teachersQuery.data.map((teacher) => {
      return {
        id: teacher.uuid,
        name: teacher.name,
        description: teacher.description,
        disciplines: teacher.disciplines,
      }
    })

    return { rows }
  }, [teachersQuery])

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

  const handleSubmit = (): void => {
    const payload: Teacher = {
      name,
      description,
      images,
      disciplines,
    }

    createTeacher(payload)
  }

  const onMouseEnter = (name: string): void => {
    setIsHover(name)
  }
  const onMouseLeave = (): void => {
    setIsHover(``)
  }

  const { mutate: createTeacher, isPending: isCreatingTeacher } = useMutation({
    mutationFn: (payload: Teacher) => API.teacher.create(payload),
    onSuccess: () => {
      handleCloseDrawer()
      enqueueSnackbar(`Profesor creado correctamente`, { variant: `success` })
      setState(initialState)
    },
    onError: (error) => {
      console.error(error)
      enqueueSnackbar(`Error al crear profesor`, { variant: `error` })
    },
  })

  return (
    <>
      <Drawer open={open} onClose={handleCloseDrawer} anchor="right">
        <Grid container width={700} padding={6} gap={2} flexDirection="column">
          <Typography variant="h4">Nuevo profesor</Typography>
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
                      color: images.length > 10 ? `red` : ``,
                    }}
                  >
                    Fotos · {images.length}/10
                  </span>
                  {` `}- Puedes agregar un máximo de 10 fotos.
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
                    disabled={images.length >= 10}
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
                    La primera imagen será la principal del profesor.
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
            <Grid container item xs gap={1}>
              <Grid item xs={12}>
                <Typography variant="body1">Disciplinas</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: `text.secondary`,
                    fontSize: `13px !important`,
                  }}
                >
                  Selecciona las disciplinas que imparte el profesor.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={disciplinesQuery?.data || []}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        '& .MuiAutocomplete-inputRoot': {
                          paddingY: 0.5,
                          paddingX: 1,
                        },
                      }}
                    />
                  )}
                  limitTags={4}
                  getLimitTagsText={(more) => `y ${more} más`}
                  onChange={(_, value) => {
                    setState({ ...state, disciplines: value })
                  }}
                  value={disciplines}
                />
              </Grid>
            </Grid>
            <Grid container item xs gap={1} justifyContent="flex-end">
              <LoadingButton
                loading={isCreatingTeacher}
                disabled={!name || !description || images.length < 1 || images.length > 10}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Crear profesor
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
      <Layout>
        <Grid container gap={4} marginBottom={4}>
          <Typography variant="h4">Profesores</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenDrawer}>
            Agregar profesor
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

export default Teachers
