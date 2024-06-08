import { Grid, IconButton, Modal, useTheme } from '@mui/material'
import Icon from './Icon'

interface ImageModalProps {
  openModal: boolean
  imageUrl: string
  imageName: string
  handleCloseModal: () => void
}

const ImageModal = ({
  openModal,
  imageUrl,
  imageName,
  handleCloseModal,
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
          src={imageUrl}
          alt={`Foto de ${imageName}`}
          style={{
            width: `100%`,
            height: `100%`,
            objectFit: `contain`,
          }}
        />
      </Grid>
    </Modal>
  )
}

export default ImageModal
