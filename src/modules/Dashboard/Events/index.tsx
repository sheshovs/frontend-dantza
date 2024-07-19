import {
  Alert,
  Button,
  Chip,
  Drawer,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import Layout from '../components/Layout'
import Icon from '@/common/components/Icon'
import { LoadingButton } from '@mui/lab'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import 'dayjs/locale/es'
import { DataGrid } from '@mui/x-data-grid'
import useEvents from './hooks/useEvents'
import { formatFileName } from '@/common/utils/format'

const Events = (): JSX.Element => {
  const {
    open,
    openDelete,
    state,
    allImages,
    editingEvent,
    rows,
    columns,
    isCreatingOrUpdating,
    isDeletingEvent,
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
  } = useEvents()
  const { name, description, location, date, mainImageName } = state

  return (
    <>
      <Modal
        open={openDelete !== null}
        onClose={handleCloseDeleteModal}
        sx={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            paddingY: 6,
            paddingX: 4,
            width: 500,
            display: `flex`,
            alignItems: `center`,
            flexDirection: `column`,
            gap: 3,
          }}
        >
          <Icon
            icon="delete"
            color="error"
            sx={{
              fontSize: 64,
            }}
          />
          <Typography variant="h5" textAlign="center">
            ¿Estás seguro de que quieres eliminar este evento?
          </Typography>
          <Grid container gap={2} justifyContent="center">
            <Button
              size="large"
              variant="outlined"
              color="primary"
              onClick={handleCloseDeleteModal}
              sx={{
                width: 150,
              }}
            >
              Cancelar
            </Button>
            <LoadingButton
              size="large"
              loading={isDeletingEvent}
              variant="contained"
              color="error"
              onClick={handleDeleteSubmit}
              sx={{
                width: 150,
              }}
            >
              Eliminar
            </LoadingButton>
          </Grid>
        </Paper>
      </Modal>
      <Drawer open={open} onClose={handleCloseDrawer} anchor="right">
        <Grid container width={700} padding={6} gap={2} flexDirection="column">
          <Typography variant="h4">{editingEvent ? `Editar evento` : `Nuevo evento`}</Typography>
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
                  Puedes agregar un máximo de 20 imágenes ·{` `}
                  <span
                    style={{
                      color: allImages.length > 20 ? `red` : ``,
                    }}
                  >
                    {allImages.length}/20
                  </span>
                </Typography>
              </Grid>
              <Grid container item xs={12} gap={2}>
                <Button
                  fullWidth
                  sx={{
                    height: `75px`,
                    textTransform: `none`,
                    flexDirection: `column`,
                    fontSize: `12px`,
                    alignItems: `center`,
                    padding: `0`,
                  }}
                  variant="outlined"
                  color="primary"
                  component="label"
                  disabled={allImages.length >= 20}
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
                  Agregar imágenes
                </Button>
                {allImages.length > 0 ? (
                  <Grid
                    item
                    xs
                    maxHeight={180}
                    sx={{
                      borderRadius: `5px`,
                      border: `1px solid rgba(0, 0, 0, 0.2)`,
                      overflowY: `auto`,
                      '&::-webkit-scrollbar': {
                        width: `0.4em`,
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: `rgba(0, 0, 0, 0.2)`,
                        borderRadius: `5px`,
                      },
                    }}
                  >
                    {allImages.map((image, index) => {
                      const isMainImage = image.name === mainImageName
                      const isLastImage = index === allImages.length - 1
                      return (
                        <Grid
                          container
                          key={image.name}
                          padding={1}
                          gap={2}
                          alignItems="center"
                          sx={{
                            borderBottom: isLastImage ? `` : `1px solid rgba(0, 0, 0, 0.12)`,
                            backgroundColor: isMainImage ? `#c8e6c9` : ``,
                            '&:hover': {
                              backgroundColor: isMainImage ? `` : `rgba(0, 0, 0, 0.03)`,
                              cursor: `pointer`,
                            },
                          }}
                          onClick={() => {
                            handleClickMainImage(image.name)
                          }}
                        >
                          <Grid container item xs alignItems="center" gap={1}>
                            <img
                              src={image instanceof File ? URL.createObjectURL(image) : image.url}
                              alt={image.name}
                              width={50}
                              height={50}
                              style={{
                                objectFit: `cover`,
                                borderRadius: `3px`,
                                pointerEvents: `none`,
                              }}
                            />
                            <Typography variant="body2" sx={{ marginLeft: 1 }}>
                              {formatFileName(image.name, 30)}
                            </Typography>
                          </Grid>
                          {isMainImage ? (
                            <Chip
                              label="Principal"
                              size="small"
                              sx={{ marginLeft: 1 }}
                              color="primary"
                            />
                          ) : null}
                          <IconButton
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleDeleteImage(image)
                            }}
                            sx={{
                              width: `20px`,
                              height: `20px`,
                              borderRadius: `5px`,
                              padding: 2,
                            }}
                          >
                            <Icon
                              icon="close"
                              sx={{
                                fontSize: `24px`,
                              }}
                            />
                          </IconButton>
                        </Grid>
                      )
                    })}
                  </Grid>
                ) : null}
              </Grid>
              <Grid item xs={12} marginTop={2}>
                <Alert severity="info">
                  <Typography variant="body2">
                    Haz clic en una imagen para seleccionarla como principal
                  </Typography>
                </Alert>
              </Grid>
            </Grid>

            <Grid container item xs gap={1} justifyContent="flex-end">
              <LoadingButton
                loading={isCreatingOrUpdating}
                disabled={disableSubmit}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {editingEvent ? `Editar evento` : `Crear evento`}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>

      <Layout>
        <Grid container gap={4} marginBottom={4} alignItems="center">
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
            disableColumnSorting
            disableColumnMenu
            disableColumnResize
            disableColumnSelector
            localeText={{
              noRowsLabel: `No hay eventos`,
            }}
            sx={{
              minHeight: `500px`,
            }}
            getRowId={(row) => row.id}
          />
        </Grid>
      </Layout>
    </>
  )
}

export default Events
