import {
  Button,
  Drawer,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CardDiscipline from './CardDiscipline'
import { DisciplineOneReturn, DisciplineReturn } from '@/common/types'
import Icon from '@/common/components/Icon'
import { useEffect, useMemo, useState } from 'react'

interface DrawerDisciplinesProps {
  open: boolean
  discipline: DisciplineOneReturn | undefined
  disciplines: DisciplineReturn[]
  onClose: () => void
  handleOpenDiscipline: (disciplineId: string) => void
  handleCloseDiscipline: () => void
}

const DrawerDisciplines = ({
  open,
  discipline,
  disciplines,
  onClose,
  handleOpenDiscipline,
  handleCloseDiscipline,
}: DrawerDisciplinesProps): JSX.Element => {
  const {
    palette: { primary, common },
    breakpoints,
  } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))
  const [selectedPhotoIndex, setSelectedIndexPhoto] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  const disciplineCategories = useMemo(() => {
    if (!discipline) {
      return []
    }

    return Object.keys(discipline.schedule)
  }, [discipline])

  useEffect(() => {
    setSelectedIndexPhoto(0)
  }, [discipline?.images])

  const handleCloseModal = (): void => {
    setOpenModal(false)
  }
  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          width: widthAboveLg ? `97%` : `100%`,
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: `absolute`,
          top: 20,
          right: 20,
          borderRadius: 0.5,
        }}
      >
        <Icon icon="close" />
      </IconButton>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          width="80%"
          height="80%"
          sx={{
            outline: 0,
          }}
        >
          <IconButton
            sx={{
              position: `absolute`,
              top: 20,
              right: 20,
              zIndex: 1,
              borderRadius: 0.5,
            }}
            onClick={handleCloseModal}
          >
            <Icon
              icon="close"
              sx={{
                color: common.white,
                fontSize: 30,
              }}
            />
          </IconButton>
          <img
            src={discipline?.images[selectedPhotoIndex].url}
            alt={`Foto de ${discipline?.name}`}
            style={{
              width: `100%`,
              height: `100%`,
              objectFit: `contain`,
            }}
          />
        </Grid>
      </Modal>
      {discipline ? (
        <Grid container padding={6} gap={4}>
          <Grid container>
            <Button onClick={handleCloseDiscipline} startIcon={<Icon icon="arrowBack" />}>
              Volver
            </Button>
          </Grid>
          <Grid
            container
            flexDirection={widthAboveLg ? `row` : `column`}
            gap={widthAboveLg ? 10 : 2}
          >
            <Grid container item xs gap={4}>
              <Grid container gap={2}>
                <Typography variant="h4">{discipline.name}</Typography>
                <Typography variant="body1">{discipline.description}</Typography>
              </Grid>

              <Grid container flexDirection="column" gap={2}>
                <Typography variant="h4">Fotos</Typography>
                <ImageList
                  sx={{ width: `100%`, height: 200 }}
                  cols={widthAboveLg ? 6 : 2}
                  rowHeight={200}
                >
                  {discipline.images.map((item, index) => (
                    <ImageListItem key={item.uuid}>
                      <img
                        srcSet={`${item.url}`}
                        src={`${item.url}`}
                        alt={item.name}
                        loading="lazy"
                        style={{
                          cursor: `pointer`,
                        }}
                        onClick={() => {
                          setSelectedIndexPhoto(index)
                          setOpenModal(true)
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>

              {discipline.teachers.length > 0 ? (
                <Grid container gap={1}>
                  <Typography variant="h5">Profesores</Typography>
                  <Grid container gap={2}>
                    {discipline.teachers.map((teacher) => (
                      <Typography key={teacher.uuid} variant="body1" color="primary">
                        {teacher.name}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
            <Grid container item xs md={4} flexDirection="column">
              <Grid container gap={2}>
                <Typography variant="h5">Horario por categorias</Typography>
                <Grid container gap={3} flexDirection="column">
                  {disciplineCategories.map((category) => (
                    <Grid
                      container
                      key={category}
                      width="fit-content"
                      sx={{
                        border: `1px solid ${primary.light}66`,
                        borderRadius: `4px`,
                        position: `relative`,
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        sx={{
                          position: `absolute`,
                          top: -13,
                          left: 5,
                          backgroundColor: `${common.white}`,
                          paddingX: 0.5,
                        }}
                      >
                        {category}
                      </Typography>
                      <Grid container gap={2} padding={1} paddingTop={1.5}>
                        {discipline.schedule[category].map((schedule) => (
                          <Grid
                            key={schedule.label}
                            container
                            gap={1}
                            flexDirection="column"
                            width="fit-content"
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: `14px !important`,
                              }}
                            >
                              {schedule.label}
                            </Typography>
                            {schedule.daySchedule.map((hours) => (
                              <Grid
                                key={hours.id}
                                container
                                width="fit-content"
                                paddingX={2}
                                paddingY={1}
                                sx={{
                                  backgroundColor: `${primary.light}33`,
                                  borderRadius: `4px`,
                                  gap: 1,
                                }}
                              >
                                <Typography key={hours.id} variant="body2">
                                  {hours.start} - {hours.end}
                                </Typography>
                              </Grid>
                            ))}
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container padding={6} gap={4}>
          <Typography variant="h4">Todas las disciplinas</Typography>

          <Grid container gap={3} justifyContent={widthAboveLg ? `flex-start` : `center`}>
            {disciplines.map((discipline) => (
              <CardDiscipline
                key={discipline.uuid}
                discipline={discipline}
                onClick={handleOpenDiscipline}
              />
            ))}
          </Grid>
        </Grid>
      )}
    </Drawer>
  )
}

export default DrawerDisciplines
