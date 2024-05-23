import { IconButton } from '@mui/material'
import { SnackbarKey, useSnackbar } from 'notistack'
import Icon from './Icon'

interface SnackbarCloseButtonProps {
  snackbarKey: SnackbarKey
}

const SnackbarCloseButton = ({ snackbarKey }: SnackbarCloseButtonProps): JSX.Element => {
  const { closeSnackbar } = useSnackbar()

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <Icon
        icon="close"
        sx={{
          color: `common.white`,
        }}
      />
    </IconButton>
  )
}

export default SnackbarCloseButton
