import { Button, Grid, Typography } from '@mui/material'
import { HEADER_BG } from '../../assets'
import Icon from '../../common/components/Icon'
import Container from '../../common/components/Container'

const Header = (): JSX.Element => {
  return (
    <Grid
      container
      minHeight='100vh'
      justifyContent='center'
      sx={{
        background: 'radial-gradient(circle, rgba(35,61,71,1) 0%, rgba(30,28,55,1) 100%)',
      }}>
      <Container>
        <Grid
          container
          id='home'
          justifyContent='space-between'
          sx={{
            backgroundImage: `url(${HEADER_BG})`,
            backgroundSize: 'cover',
            backgroundPositionX: 'left',
            height: '100vh',
            width: '100%',
            paddingY: 6,
            paddingLeft: 35,
            paddingRight: 6,
          }}
        >
          <Grid container height='100%' xs={8} justifyContent='flex-end' flexDirection='column'>
            <Typography
              variant='h1'
              color='rgba(0,0,0,0)'
              fontWeight={700}
              sx={{
                WebkitTextStroke: '2px white',
                fontFamily: 'Roboto',
                textTransform: 'uppercase',
                fontSize: '5rem !important'
              }}
            >
              Lorem ipsum dolor sit amet consectetur
            </Typography>
            <Typography variant='h1' color='white' fontWeight={700} sx={{
              fontFamily: 'Roboto',
              textTransform: 'uppercase',
              fontSize: '5rem !important'
            }}>
              adipisicing elit. Qui, amet.
            </Typography>
          </Grid>
          <Grid
            container
            height='100%'
            xs={3}
            flexDirection='column'
            justifyContent='space-between'
          >
            <Grid container item flexDirection='column' alignItems='flex-end'>
              <Grid>
                <Typography variant='body1' color='white'>
                  +569 8765 4321
                </Typography>
                <Typography variant='body2' color='primary.light'>
                  Lorem ipsum
                </Typography>
              </Grid>
            </Grid>

            <Grid container item justifyContent='flex-end' gap={5}>
              <Grid container item xs={6}>
                <Typography variant='body1' color='white'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Typography>
              </Grid>
              <Grid container item xs={12} justifyContent='flex-end'>
                <Button
                  variant='contained'
                  color='primary'
                  endIcon={<Icon icon='arrowRight' />}
                  sx={{
                    paddingY: 2.5,
                    paddingX: 6,
                  }}
                >
                  Lorem ipsum
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default Header