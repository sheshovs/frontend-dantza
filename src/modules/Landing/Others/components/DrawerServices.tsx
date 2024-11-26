import { Drawer, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import Icon from '@/common/components/Icon'
import { Services, ServicesOptions } from '..'
import ImageModal from '@/common/components/ImageModal'
import { useState } from 'react'

interface DrawerServicesProps {
  open: boolean
  onClose: () => void
  selectedService?: Services
}

const DrawerServices = ({ open, onClose, selectedService }: DrawerServicesProps): JSX.Element => {
  const { breakpoints } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))
  const serviceData = ServicesOptions[selectedService as Services] || {}

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
    if (selectedPhotoIndex === serviceData?.images.length - 1) {
      return
    }
    setSelectedIndexPhoto(selectedPhotoIndex + 1)
  }

  return (
    <>
      <ImageModal
        openModal={openModal}
        imageUrl={serviceData?.images?.[selectedPhotoIndex] || ``}
        imageName={serviceData?.title}
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

        <Grid container padding={6} gap={4}>
          <Typography variant="h4">{serviceData?.title}</Typography>

          <Grid container gap={3} justifyContent={widthAboveLg ? `flex-start` : `center`}>
            {serviceData?.images?.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Imagen de servicio ${serviceData?.title}`}
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
      </Drawer>
    </>
  )
}

export default DrawerServices
