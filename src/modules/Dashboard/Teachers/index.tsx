import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Layout from '../components/Layout'
import SortableList, { SortableItem } from 'react-easy-sort'
import Icon from '@/common/components/Icon'
import { LoadingButton } from '@mui/lab'
import useTeachers from './hooks/useTeachers'

const Teachers = (): JSX.Element => {
  const {
    open,
    openDelete,
    state,
    editingTeacher,
    isHover,
    isCreatingOrUpdating,
    isDeletingTeacher,
    disableSubmitButton,
    disciplinesQuery,
    allImages,
    rows,
    columns,
    handleOpenDrawer,
    handleCloseDrawer,
    onSortEnd,
    handleDeleteImage,
    handleChange,
    handleInputChange,
    handleSubmit,
    onMouseEnter,
    onMouseLeave,
    setState,
    handleCloseDeleteModal,
    handleDeleteSubmit,
  } = useTeachers()
  const { name, description, disciplines } = state
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
            ¿Estás seguro de que quieres eliminar esta profesora?
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
              loading={isDeletingTeacher}
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
          <Typography variant="h4">
            {editingTeacher ? `Editar profesora` : `Nuevo profesora`}
          </Typography>
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
                      color: allImages.length > 10 ? `red` : ``,
                    }}
                  >
                    Fotos · {allImages.length}/10
                  </span>
                  {` `}- Puedes agregar un máximo de 10 fotos.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
                  {allImages.map((image) => (
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
                            handleDeleteImage(image)
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
                          src={image instanceof File ? URL.createObjectURL(image) : image.url}
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
                    disabled={allImages.length >= 10}
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
                    La primera imagen será la principal de la profesora.
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
                  Selecciona las disciplinas que imparte el profesora.
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
                loading={isCreatingOrUpdating}
                disabled={disableSubmitButton}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {editingTeacher ? `Actualizar profesora` : `Crear profesora`}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
      <Layout>
        <Grid container gap={4} marginBottom={4} alignItems="center">
          <Typography variant="h4">Profesoras</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenDrawer}>
            Agregar profesora
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
              noRowsLabel: `No hay profesoras`,
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
