import {
  Button,
  Drawer,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
  useTheme,
} from '@mui/material'
import CardTeacher from './CardTeacher'
import { TeacherReturn } from '@/common/types'
import Icon from '@/common/components/Icon'
import { useEffect, useState } from 'react'

interface DrawerTeachersProps {
  open: boolean
  teacher: TeacherReturn | undefined
  teachers: TeacherReturn[]
  onClose: () => void
  handleOpenTeacher: (teacherId: string) => void
  handleCloseTeacher: () => void
}

const DrawerTeachers = ({
  open,
  teacher,
  teachers,
  onClose,
  handleOpenTeacher,
  handleCloseTeacher,
}: DrawerTeachersProps): JSX.Element => {
  const {
    palette: { common },
  } = useTheme()
  const [selectedPhotoIndex, setSelectedIndexPhoto] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setSelectedIndexPhoto(0)
  }, [teacher?.images])

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
          width: `97%`,
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
            src={teacher?.images[selectedPhotoIndex].url}
            alt={`Foto de ${teacher?.name}`}
            style={{
              width: `100%`,
              height: `100%`,
              objectFit: `contain`,
            }}
          />
        </Grid>
      </Modal>
      {teacher ? (
        <Grid container padding={6} gap={4}>
          <Grid container>
            <Button onClick={handleCloseTeacher} startIcon={<Icon icon="arrowBack" />}>
              Volver
            </Button>
          </Grid>
          <Grid container gap={2}>
            <Typography variant="h4">{teacher.name}</Typography>
            <Typography variant="body1">{teacher.description}</Typography>
          </Grid>

          <Grid container flexDirection="column" gap={2}>
            <Typography variant="h4">Fotos</Typography>
            <ImageList sx={{ width: `100%`, height: 200 }} cols={6} rowHeight={200}>
              {teacher.images.map((item, index) => (
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
        </Grid>
      ) : (
        <Grid container padding={6} gap={4}>
          <Typography variant="h4">Todos los profesores</Typography>

          <Grid container gap={3}>
            {teachers.map((teacher) => (
              <CardTeacher key={teacher.uuid} teacher={teacher} onClick={handleOpenTeacher} />
            ))}
          </Grid>
        </Grid>
      )}
    </Drawer>
  )
}

export default DrawerTeachers
