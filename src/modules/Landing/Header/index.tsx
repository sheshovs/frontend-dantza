import { Button, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material'
import { HEADER_BG } from '../../../assets'
import Icon from '../../../common/components/Icon'
import Container from '../../../common/components/Container'
import { useSpring, animated } from '@react-spring/web'
import { FaWhatsapp } from 'react-icons/fa6'

const Header = (): JSX.Element => {
  const { breakpoints } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))
  const backgroundStyles = useSpring({
    from: { opacity: 0, backgroundSize: `140%` },
    to: { opacity: 1, backgroundSize: `cover` },
    delay: 300,
  })
  const rightTextStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  })
  const titleStyles = useSpring({
    from: { bottom: `-100px`, opacity: 0, display: `none` },
    to: { bottom: `0`, opacity: 1, display: `flex` },
    delay: 700,
  })

  return (
    <animated.div
      id="home"
      style={{
        ...backgroundStyles,
        minHeight: `100vh`,
        backgroundImage: `url(${HEADER_BG})`,
        backgroundPosition: `center`,
        backgroundRepeat: `no-repeat`,
        height: `100vh`,
        width: `100%`,
        display: `flex`,
        justifyContent: `center`,
        padding: widthAboveLg ? `48px 48px 48px 300px` : `0px`,
      }}
    >
      <Container>
        <Grid
          container
          justifyContent="space-between"
          position="relative"
          flexDirection={widthAboveLg ? `row` : `column`}
        >
          <animated.div
            style={{
              ...titleStyles,
              display: `flex`,
              flexDirection: `column`,
              justifyContent: `flex-end`,
              height: widthAboveLg ? `100%` : `70%`,
              width: widthAboveLg ? `70%` : `100%`,
              position: `relative`,
              padding: widthAboveLg ? `0px` : `0px 32px`,
            }}
          >
            <Typography
              variant="h1"
              color="rgba(0,0,0,0)"
              fontWeight={700}
              sx={{
                WebkitTextStroke: widthAboveLg ? `0.1px white` : `0.6px white`,
                textTransform: `uppercase`,
              }}
            >
              Estudio de danza
            </Typography>
            <Typography
              variant="h1"
              color="white"
              fontWeight={700}
              sx={{
                textTransform: `uppercase`,
              }}
            >
              y otras artes
            </Typography>
          </animated.div>
          <animated.div
            style={{
              ...rightTextStyles,
              display: `flex`,
              width: widthAboveLg ? `25%` : `100%`,
              height: widthAboveLg ? `90vh` : `auto`,
              justifyContent: `space-between`,
              flexDirection: `column`,
              position: `relative`,
              background: widthAboveLg
                ? ``
                : `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 80%)`,
              padding: widthAboveLg ? `0px` : `0px 32px 32px 32px`,
              gap: widthAboveLg ? 0 : 24,
            }}
          >
            <Grid
              container
              item
              flexDirection="column"
              alignItems={widthAboveLg ? `flex-end` : `flex-start`}
            >
              <Grid>
                <Button variant="contained" startIcon={<FaWhatsapp size={20} />}>
                  <Link
                    href="https://wa.me/56979640980"
                    target="_blank"
                    sx={{
                      textDecoration: `none`,
                      color: `white`,
                      fontWeight: 700,
                    }}
                  >
                    Contáctanos
                  </Link>
                </Button>
              </Grid>
            </Grid>

            <Grid container item justifyContent="flex-end" gap={widthAboveLg ? 3 : 2}>
              <Grid container item xs={10}>
                <Typography variant="body1" color="white">
                  Descubre la pasión por el arte en cada movimiento
                </Typography>
              </Grid>
              <Grid container item xs={10} justifyContent="flex-end">
                <Link
                  href="#disciplines"
                  underline="none"
                  sx={{
                    width: `100%`,
                  }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    endIcon={<Icon icon="arrowRight" />}
                    sx={{
                      paddingY: widthAboveLg ? 2.5 : 1.5,
                      paddingX: widthAboveLg ? 4 : 1,
                    }}
                  >
                    Explorar disciplinas
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </animated.div>
        </Grid>
      </Container>
    </animated.div>
  )
}

export default Header
