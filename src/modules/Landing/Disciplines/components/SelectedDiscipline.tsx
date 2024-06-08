import Icon from '@/common/components/Icon'
import ImageModal from '@/common/components/ImageModal'
import { DisciplineOneReturn } from '@/common/types'
import { Button, Grid, Typography, useTheme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

interface SelectedDisciplineProps {
  discipline: DisciplineOneReturn
  widthAboveLg: boolean
  handleCloseDiscipline: () => void
}

const SelectedDiscipline = ({
  discipline,
  widthAboveLg,
  handleCloseDiscipline,
}: SelectedDisciplineProps): JSX.Element => {
  const {
    palette: { primary, common },
  } = useTheme()
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
    <>
      <ImageModal
        openModal={openModal}
        imageUrl={discipline?.images[selectedPhotoIndex].url}
        imageName={discipline?.name}
        handleCloseModal={handleCloseModal}
      />
      <Grid container padding={6} gap={4}>
        <Grid container>
          <Button onClick={handleCloseDiscipline} startIcon={<Icon icon="arrowBack" />}>
            Volver
          </Button>
        </Grid>
        <Grid container flexDirection={widthAboveLg ? `row` : `column`} gap={widthAboveLg ? 10 : 2}>
          <Grid container item xs gap={4}>
            <Grid container gap={2}>
              <Typography variant="h4">{discipline.name}</Typography>
              <Typography variant="body1">{discipline.description}</Typography>
            </Grid>

            <Grid container flexDirection="column" gap={2}>
              <Typography variant="h4">Fotos</Typography>
              <Grid container gap={0.5}>
                {discipline.images.map((item, index) => (
                  <img
                    key={item.uuid}
                    srcSet={`${item.url}`}
                    src={`${item.url}`}
                    alt={item.name}
                    loading="lazy"
                    width={150}
                    height={150}
                    style={{
                      cursor: `pointer`,
                      objectFit: `cover`,
                      objectPosition: `top center`,
                    }}
                    onClick={() => {
                      setSelectedIndexPhoto(index)
                      setOpenModal(true)
                    }}
                  />
                ))}
              </Grid>
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
            <Grid container gap={4}>
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
    </>
  )
}

export default SelectedDiscipline
