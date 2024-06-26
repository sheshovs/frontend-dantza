import { Divider, Grid, IconButton, Link, Slide, Typography, Zoom, useTheme } from '@mui/material'
import { LOGO_COLOR } from '../../assets'
import Icon from './Icon'
import { routes } from './routes'
import SidebarRoute from './SidebarRoute'
import { useSpring, animated } from '@react-spring/web'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa6'

interface NavbarProps {
  menuOpen: boolean
  handleMenu: () => void
  handleCloseMenu: () => void
}

const Navbar = ({ menuOpen, handleMenu, handleCloseMenu }: NavbarProps): JSX.Element => {
  const {
    palette: { common, primary },
  } = useTheme()
  const sidebarStyles = useSpring({
    from: {
      opacity: 0,
      top: -60,
    },
    to: {
      opacity: 1,
      top: 0,
    },
    delay: 500,
  })
  return (
    <>
      <animated.div
        style={{
          ...sidebarStyles,
          boxShadow: `0px 0px 10px ${common.black}33`,
          position: `fixed`,
          width: `100%`,
          display: `flex`,
          height: 60,
          zIndex: 100,
          backgroundColor: common.white,
          justifyContent: `space-between`,
          alignItems: `center`,
          padding: `0 32px`,
        }}
      >
        <Zoom in={true}>
          <Link
            href="#home"
            sx={{
              width: `auto`,
              height: `85%`,
            }}
          >
            <img
              src={LOGO_COLOR}
              alt="Dantza Logo"
              style={{
                width: `auto`,
                height: `100%`,
              }}
            />
          </Link>
        </Zoom>
        <IconButton
          onClick={handleMenu}
          sx={{
            padding: `4px`,
            borderRadius: `4px`,
          }}
        >
          <Icon
            icon={menuOpen ? `close` : `menuExpand`}
            sx={{
              fontSize: `32px`,
              color: primary.main,
            }}
          />
        </IconButton>
      </animated.div>

      <Slide in={menuOpen} direction="down">
        <Grid
          container
          position="fixed"
          top={60}
          width="100%"
          height={window.innerHeight - 60}
          bgcolor="common.white"
          flexDirection="column"
          justifyContent="space-between"
          flexWrap="nowrap"
          zIndex={99}
          sx={{
            overflowY: `auto`,
            boxShadow: `0px 5px 10px ${common.black}`,
          }}
        >
          <Grid container flexDirection="column" alignItems="center" justifyContent="center">
            {routes.map((route) => (
              <>
                <SidebarRoute
                  key={route.id}
                  label={route.label}
                  route={route.route}
                  color="common.black"
                  onClick={handleCloseMenu}
                />
                <Divider
                  sx={{
                    width: `100%`,
                  }}
                />
              </>
            ))}
          </Grid>
          <Grid container justifyContent="center">
            <Typography variant="body1" color="common.black" textAlign="center" marginBottom={2}>
              Redes sociales
            </Typography>
            <Grid container item gap={4} justifyContent="center" marginBottom={4}>
              <Link
                href="https://www.instagram.com/dantzaestudio"
                target="_blank"
                sx={{
                  borderRadius: `50%`,
                  backgroundColor: primary.main,
                  color: common.white,
                  height: 48,
                  padding: 1.5,
                }}
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://wa.me/56979640980"
                target="_blank"
                sx={{
                  borderRadius: `50%`,
                  backgroundColor: primary.main,
                  color: common.white,
                  height: 48,
                  padding: 1.5,
                }}
              >
                <FaWhatsapp size={24} />
              </Link>
              <Link
                href="https://web.facebook.com/profile.php?id=100065174723983"
                target="_blank"
                sx={{
                  borderRadius: `50%`,
                  backgroundColor: primary.main,
                  color: common.white,
                  height: 48,
                  padding: 1.5,
                }}
              >
                <FaFacebookF size={24} />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Slide>
    </>
  )
}

export default Navbar
