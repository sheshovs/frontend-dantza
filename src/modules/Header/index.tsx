import { Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { HEADER_BG } from '../../assets'
import Icon from '../../common/components/Icon'
import Container from '../../common/components/Container'
import { useScroll, useSpring, animated } from '@react-spring/web'

const Header = (): JSX.Element => {
  const { breakpoints } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))
  const [rightTextStyles, rightTextApi] = useSpring(() => ({
    to: { opacity: 0 },
  }))
  const [titleStyles, titleApi] = useSpring(() => ({
    to: { bottom: `-100px`, opacity: 0, display: `none` },
  }))
  const [backgroundStyles, backgroundApi] = useSpring(() => ({
    to: { opacity: 0 },
  }))
  useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress > 0.03) {
        titleApi.start({ bottom: `0px`, opacity: 1, display: `flex` })
        rightTextApi.start({ opacity: 1 })
        return
      }
      if (scrollYProgress > 0.005) {
        backgroundApi.start({ opacity: 1 })
        return
      }

      rightTextApi.start({ opacity: 0 })
      titleApi.start({ bottom: `-100px`, opacity: 0, display: `none` })
      backgroundApi.start({ opacity: 0 })
    },
  })
  return (
    <animated.div
      id="home"
      style={{
        minHeight: `100vh`,
        backgroundImage: `url(${HEADER_BG})`,
        backgroundPosition: `center`,
        backgroundRepeat: `no-repeat`,
        backgroundSize: `cover`,
        height: `120vh`,
        width: `100%`,
        display: `flex`,
        justifyContent: `center`,
        padding: widthAboveLg ? `48px 48px 48px 300px` : `0px`,
        ...backgroundStyles,
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
              padding: widthAboveLg ? `0px` : `0px 48px`,
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
              }}
            >
              adipisicing elit. Qui, amet.
            </Typography>
          </animated.div>
          <animated.div
            style={{
              ...rightTextStyles,
              display: `flex`,
              width: widthAboveLg ? `25%` : `100%`,
              height: widthAboveLg ? `90vh` : `auto`,
              top: widthAboveLg ? 200 : 0,
              justifyContent: `space-between`,
              flexDirection: `column`,
              position: `relative`,
              background: widthAboveLg
                ? ``
                : `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 80%)`,
              padding: widthAboveLg ? `0px` : `48px 48px 48px 48px`,
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
                <Typography variant="body1" color="white">
                  +569 8765 4321
                </Typography>
                <Typography variant="body2" color="primary.light">
                  Lorem ipsum
                </Typography>
              </Grid>
            </Grid>

            <Grid container item justifyContent="flex-end" gap={widthAboveLg ? 5 : 2}>
              <Grid container item xs={widthAboveLg ? 6 : 12}>
                <Typography variant="body1" color="white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Typography>
              </Grid>
              <Grid container item xs={12} justifyContent="flex-end">
                <Button
                  fullWidth={widthAboveLg ? false : true}
                  variant="contained"
                  color="primary"
                  endIcon={<Icon icon="arrowRight" />}
                  sx={{
                    paddingY: widthAboveLg ? 2.5 : 1.5,
                    paddingX: widthAboveLg ? 6 : 2,
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
