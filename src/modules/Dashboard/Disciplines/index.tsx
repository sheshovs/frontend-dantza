import {
  Button,
  CircularProgress,
  Drawer,
  Grid,
  Modal,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Layout from '../components/Layout'
import General from './Tabs/General'
import Schedule from './Tabs/Schedule'
import useDiscipline from './hooks/useDisciplines'
import { LoadingButton } from '@mui/lab'
import Icon from '@/common/components/Icon'

const Disciplines = (): JSX.Element => {
  const {
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
    isLoadingDisciplines,
    disableScheduleTab,
    disableUpdateButton,
    handleOpenDrawer,
    handleCloseDrawer,
    handleDeleteImage,
    handleChange,
    handleInputChange,
    handleCategoryChange,
    handleTabChange,
    handleSubmit,
    setTabValue,
    setState,
    handleCloseDeleteModal,
    handleDeleteSubmit,
    handleClickMainImage,
  } = useDiscipline()

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
            ¿Estás seguro de que quieres eliminar esta disciplina?
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
              loading={isDeletingDiscipline}
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
            {editingDiscipline !== null ? `Editar disciplina` : `Nueva disciplina`}
          </Typography>

          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="General" value="general" />
            <Tab label="Horario" value="schedule" disabled={disableScheduleTab} />
          </Tabs>

          {tabValue === `general` ? (
            <General
              {...state}
              allImages={allImages}
              disableScheduleTab={disableScheduleTab}
              handleDeleteImage={handleDeleteImage}
              handleChange={handleChange}
              handleInputChange={handleInputChange}
              setTabValue={setTabValue}
              handleCategoryChange={handleCategoryChange}
              handleClickMainImage={handleClickMainImage}
            />
          ) : null}
          {tabValue === `schedule` ? (
            <Schedule
              {...state}
              disableUpdateButton={disableUpdateButton}
              isCreatingDiscipline={isCreatingOrUpdating}
              isEditing={editingDiscipline !== null}
              setState={setState}
              handleSubmit={handleSubmit}
            />
          ) : null}
        </Grid>
      </Drawer>
      <Layout>
        <Grid container gap={4} marginBottom={4} alignItems="center">
          <Typography variant="h4">Disciplinas</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenDrawer}>
            Agregar disciplina
          </Button>
        </Grid>
        {isLoadingDisciplines ? (
          <>
            <CircularProgress />
          </>
        ) : (
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
                noRowsLabel: `No hay disciplinas`,
              }}
              sx={{
                minHeight: `500px`,
              }}
            />
          </Grid>
        )}
      </Layout>
    </>
  )
}

export default Disciplines
