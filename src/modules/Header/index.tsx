import { Button, Grid, Typography } from '@mui/material'
import { HEADER_BG } from '../../assets'
import Icon from '../../common/components/Icon'
import Container from '../../common/components/Container'
import { useScroll, useSpring, animated } from '@react-spring/web'

const Header = (): JSX.Element => {
  const [rightTextStyles, rightTextApi] = useSpring(() => ({
    to: { opacity: 0 },
  }))
  const [titleStyles, titleApi] = useSpring(() => ({
    to: { bottom: `-100px`, opacity: 0, display: `none` },
  }))
  const [backgroundStyles, backgroundApi] = useSpring(() => ({
    to: { backgroundSize: `160%`, opacity: 0 },
  }))
  useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress > 0.09) {
        titleApi.start({ bottom: `0px`, opacity: 1, display: `flex` })
        rightTextApi.start({ opacity: 1 })
        return
      }
      if (scrollYProgress > 0.02) {
        backgroundApi.start({ backgroundSize: `120%`, opacity: 1 })
        return
      }

      rightTextApi.start({ opacity: 0 })
      titleApi.start({ bottom: `-100px`, opacity: 0, display: `none` })
      backgroundApi.start({ backgroundSize: `160%`, opacity: 0 })
    },
  })
  return (
    <animated.div
      id="home"
      style={{
        minHeight: `100vh`,
        backgroundImage: `url(${HEADER_BG})`,
        backgroundPosition: `30% top`,
        backgroundRepeat: `no-repeat`,
        height: `120vh`,
        width: `100%`,
        display: `flex`,
        justifyContent: `center`,
        padding: `48px 48px 48px 280px`,
        ...backgroundStyles,
      }}
    >
      <Container>
        <Grid container justifyContent="space-between" position="relative">
          <animated.div
            style={{
              ...titleStyles,
              display: `flex`,
              flexDirection: `column`,
              justifyContent: `flex-end`,
              height: `100%`,
              width: `70%`,
              position: `relative`,
            }}
          >
            <Typography
              variant="h1"
              color="rgba(0,0,0,0)"
              fontWeight={700}
              sx={{
                WebkitTextStroke: `0.2px white`,
                fontFamily: `Poppins, sans-serif`,
                textTransform: `uppercase`,
                fontSize: `5rem !important`,
              }}
            >
              Lorem ipsum dolor sit amet consectetur
            </Typography>
            <Typography
              variant="h1"
              color="white"
              fontWeight={700}
              sx={{
                fontFamily: `Poppins, sans-serif`,
                textTransform: `uppercase`,
                fontSize: `5rem !important`,
              }}
            >
              adipisicing elit. Qui, amet.
            </Typography>
          </animated.div>
          <animated.div
            style={{
              ...rightTextStyles,
              display: `flex`,
              width: `25%`,
              height: `90vh`,
              top: 200,
              justifyContent: `space-between`,
              flexDirection: `column`,
              position: `relative`,
            }}
          >
            <Grid container item flexDirection="column" alignItems="flex-end">
              <Grid>
                <Typography variant="body1" color="white">
                  +569 8765 4321
                </Typography>
                <Typography variant="body2" color="primary.light">
                  Lorem ipsum
                </Typography>
              </Grid>
            </Grid>

            <Grid container item justifyContent="flex-end" gap={5}>
              <Grid container item xs={6}>
                <Typography variant="body1" color="white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Typography>
              </Grid>
              <Grid container item xs={12} justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<Icon icon="arrowRight" />}
                  sx={{
                    paddingY: 2.5,
                    paddingX: 6,
                  }}
                >
                  Lorem ipsum
                </Button>
              </Grid>
            </Grid>
          </animated.div>
        </Grid>
      </Container>
    </animated.div>
  )
}

export default Header
