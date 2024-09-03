import { Grid, Typography } from '@mui/material'
import { HEADER_BG } from '@/assets'

interface CardServicesProps {
  title: string
  description: string
}

const CardServices = ({ title, description }: CardServicesProps): JSX.Element => {
  return (
    <Grid
      container
      item
      xs={12}
      xl
      height={{
        xl: 700,
        sm: 400,
        xs: 500,
      }}
      position="relative"
      sx={{
        backgroundColor: `common.white`,
        borderRadius: `15px`,
        backgroundImage: `url(${HEADER_BG})`,
        backgroundPosition: `center`,
        backgroundRepeat: `no-repeat`,
        backgroundSize: `cover`,
        overflow: `hidden`,
        div: {
          top: 550,
          'p:nth-child(2)': {
            opacity: 0,
          },
        },
        '&:hover': {
          div: {
            top: 0,
            background: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,1) 100%)`,
            transition: `all 0.5s ease-in-out`,
            'p:nth-child(2)': {
              color: `white`,
              opacity: 1,
              transition: `opactiy 1s ease-in-out`,
            },
          },
        },
        '&:not(:hover)': {
          div: {
            top: 550,
            background: `none`,
            transition: `all 0.5s ease-in-out`,
            'p:nth-child(2)': {
              opacity: 0,
              transition: `opactiy 1s ease-in-out`,
            },
          },
        },
      }}
    >
      <Grid
        container
        flexDirection="column"
        position="absolute"
        sx={{
          height: `100%`,
          padding: {
            xl: `32px`,
            sm: `24px`,
            xs: `16px`,
          },
          borderRadius: `15px 15px 0 0`,
        }}
      >
        <Typography
          fontSize={{
            xl: `32px`,
            sm: `26px`,
            xs: `20px`,
          }}
          textAlign="center"
          fontWeight={700}
          marginBottom={2}
          color="white"
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          textAlign="justify"
          fontSize={{
            xl: `18px`,
            sm: `18px`,
            xs: `14px`,
          }}
        >
          {description}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default CardServices
