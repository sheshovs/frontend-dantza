import { Grid } from '@mui/material'

interface ContainerProps {
  children: JSX.Element | JSX.Element[]
}

const Container = ({ children }: ContainerProps): JSX.Element => {
  return (
    <Grid container maxWidth={1700}>
      {children}
    </Grid>
  )
}

export default Container
