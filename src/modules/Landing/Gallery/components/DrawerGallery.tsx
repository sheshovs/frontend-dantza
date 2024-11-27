import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Icon from '@/common/components/Icon'
import ImageModal from '@/common/components/ImageModal'
import { useState } from 'react'
import { EventReturn } from '@/common/types'
import dayjs from 'dayjs'

interface DrawerGalleryProps {
  open: boolean
  onClose: () => void
  selectedEvent?: EventReturn
  events: EventReturn[]
  handleOpenEvent: (event: EventReturn) => void
  handleCloseEvent: () => void
}

const DrawerGallery = ({
  open,
  onClose,
  selectedEvent,
  events,
  handleOpenEvent,
  handleCloseEvent,
}: DrawerGalleryProps): JSX.Element => {
  const { breakpoints } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))

  const [openModal, setOpenModal] = useState(false)
  const [selectedPhotoIndex, setSelectedIndexPhoto] = useState(0)
  const handleCloseModal = (): void => {
    setOpenModal(false)
  }
  const handlePrevPhoto = (): void => {
    if (selectedPhotoIndex === 0) {
      return
    }
    setSelectedIndexPhoto(selectedPhotoIndex - 1)
  }
  const handleNextPhoto = (): void => {
    if (!selectedEvent) {
      return
    }
    if (selectedPhotoIndex === selectedEvent?.imagesUploaded.length - 1) {
      return
    }
    setSelectedIndexPhoto(selectedPhotoIndex + 1)
  }

  const handleDrawerContent = (): JSX.Element => {
    if (selectedEvent) {
      return (
        <Grid container padding={6} gap={2}>
          <Grid container>
            <Button onClick={handleCloseEvent} startIcon={<Icon icon="arrowBack" />}>
              Volver
            </Button>
          </Grid>
          <Grid
            container
            flexDirection={widthAboveLg ? `row` : `column`}
            gap={widthAboveLg ? 3 : 2}
          >
            <Typography variant="h4">{selectedEvent?.name}</Typography>

            <Grid container gap={3} justifyContent={widthAboveLg ? `flex-start` : `center`}>
              {selectedEvent?.imagesUploaded?.map((image, index) => (
                <img
                  key={image.uuid}
                  src={image.url}
                  alt={image.name}
                  width={300}
                  loading="lazy"
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
      )
    }

    return (
      <Grid container padding={6} gap={4}>
        <Typography variant="h4">Galeria de eventos</Typography>

        <Grid container gap={3} justifyContent={widthAboveLg ? `flex-start` : `center`}>
          {events.map((event) => {
            const mainImage = event.imagesUploaded.find((image) => image.isMain)

            return (
              <Paper
                key={event.uuid}
                sx={{
                  width: `300px`,
                  minHeight: `330px`,
                  padding: 1,
                  borderRadius: `16px`,
                  position: `relative`,
                }}
                elevation={3}
              >
                <Box
                  sx={{
                    position: `absolute`,
                    top: 16,
                    left: 16,
                    backgroundColor: `common.white`,
                    paddingY: 0.5,
                    paddingX: 1,
                    borderRadius: `4px`,
                  }}
                >
                  <Typography variant="body2" color="common.black">
                    {dayjs(event.date).format(`DD/MM/YYYY`)}
                  </Typography>
                </Box>
                <img
                  src={mainImage?.url}
                  alt={event.name}
                  width="100%"
                  style={{
                    borderRadius: `8px`,
                  }}
                />
                <Grid container padding={1} flex={1} gap={1}>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: `flex`,
                      alignItems: `center`,
                      gap: 0.5,
                    }}
                  >
                    <Icon
                      icon="location"
                      sx={{
                        fontSize: 16,
                      }}
                    />
                    {event.location}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      textTransform: `none`,
                    }}
                    onClick={() => handleOpenEvent(event)}
                  >
                    Ver imágenes
                  </Button>
                </Grid>
              </Paper>
            )
          })}
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <ImageModal
        openModal={openModal}
        imageUrl={selectedEvent?.imagesUploaded?.[selectedPhotoIndex].url || ``}
        imageName={selectedEvent?.imagesUploaded?.[selectedPhotoIndex]?.name || ``}
        handleCloseModal={handleCloseModal}
        handlePrev={handlePrevPhoto}
        handleNext={handleNextPhoto}
      />
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        sx={{
          '& .MuiDrawer-paper': {
            width: widthAboveLg ? `97%` : `100%`,
            height: `100%`,
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

        {handleDrawerContent()}
      </Drawer>
    </>
  )
}

export default DrawerGallery
