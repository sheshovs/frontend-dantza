import Icon from '@/common/components/Icon'
import ImageModal from '@/common/components/ImageModal'
import { TeacherReturn } from '@/common/types'
import { Button, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

interface SelectedTeacherProps {
  teacher: TeacherReturn
  handleCloseTeacher: () => void
}

const SelectedTeacher = ({ teacher, handleCloseTeacher }: SelectedTeacherProps): JSX.Element => {
  const [selectedPhotoIndex, setSelectedIndexPhoto] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setSelectedIndexPhoto(0)
  }, [teacher?.images])

  const handleCloseModal = (): void => {
    setOpenModal(false)
  }
  return (
    <>
      <ImageModal
        openModal={openModal}
        imageUrl={teacher?.imagesUploaded[selectedPhotoIndex].url}
        imageName={teacher?.name}
        handleCloseModal={handleCloseModal}
      />
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
          <Grid container gap={0.5}>
            {teacher.imagesUploaded.map((item, index) => (
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
      </Grid>
    </>
  )
}

export default SelectedTeacher
