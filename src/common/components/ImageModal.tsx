import { Grid, IconButton, Modal, useTheme } from '@mui/material'
import Icon from './Icon'

interface ImageModalProps {
  openModal: boolean
  imageUrl: string
  imageName: string
  handleCloseModal: () => void
  handlePrev?: () => void
  handleNext?: () => void
}

const ImageModal = ({
  openModal,
  imageUrl,
  imageName,
  handleCloseModal,
  handlePrev,
  handleNext,
}: ImageModalProps): JSX.Element => {
  const {
    palette: { common },
  } = useTheme()
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      sx={{
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        backgroundColor: `rgba(0,0,0,0.5)`,
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
        <Grid container justifyContent="center" alignItems="center" gap={4}>
          <Grid item>
            <IconButton>
              <Icon
                icon="arrowBackIos"
                sx={{
                  color: common.white,
                  fontSize: 40,
                  cursor: `pointer`,
                }}
                onClick={handlePrev}
              />
            </IconButton>
          </Grid>

          <Grid item>
            <img
              src={imageUrl}
              alt={`Foto de ${imageName}`}
              style={{
                height: `80vh`,
                objectFit: `contain`,
              }}
            />
          </Grid>

          <Grid item>
            <IconButton>
              <Icon
                icon="arrowForward"
                sx={{
                  color: common.white,
                  fontSize: 40,
                  cursor: `pointer`,
                }}
                onClick={handleNext}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ImageModal
