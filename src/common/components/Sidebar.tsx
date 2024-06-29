import { Grid } from '@mui/material'
import { animated, useScroll, useSpring } from '@react-spring/web'
import SidebarRoute from './SidebarRoute'
import { FaInstagram, FaWhatsapp, FaFacebookF } from 'react-icons/fa6'
import { LOGO_COLOR, LOGO_WHITE } from '../../assets'
import { useState } from 'react'
import { routes } from './routes'

const Sidebar = (): JSX.Element => {
  const [sidebarStyles, sidebarApi] = useSpring(() => ({
    from: {
      opacity: 0,
      background: `rgba(255,255,255,0.2)`,
      bottom: 0,
    },
    to: {
      opacity: 1,
      background: `rgba(255,255,255,0.2)`,
      bottom: 0,
    },
    delay: 500,
  }))
  const [iconStyles, iconApi] = useSpring(() => ({
    from: { color: `black` },
    to: { color: `white` },
  }))

  const [sidebarLogo, setSidebarLogo] = useState(LOGO_WHITE)

  useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      if ((scrollYProgress > 0.13 && scrollYProgress < 0.62) || scrollYProgress > 0.86) {
        sidebarApi.start({ background: `white` })
        iconApi.start({ color: `black` })
        setSidebarLogo(LOGO_COLOR)
      } else {
        sidebarApi.start({ background: `rgba(255,255,255,0.2)` })
        iconApi.start({ color: `white` })
        setSidebarLogo(LOGO_WHITE)
      }

      if (scrollYProgress > 0.99) {
        sidebarApi.start({ bottom: 400 })
      } else {
        sidebarApi.start({ bottom: 0 })
      }
    },
  })

  return (
    <animated.div
      style={{
        width: `185px`,
        height: `100vh`,
        padding: `48px 24px`,
        position: `fixed`,
        zIndex: 100,
        left: `3.5%`,
        backdropFilter: `blur(3px)`,
        boxShadow: `0px 0px 10px 0px rgba(0,0,0,0.2)`,
        ...sidebarStyles,
      }}
    >
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        height="80%"
      >
        <Grid container item>
          <img src={sidebarLogo} width={137} alt="Logo Dantza" />
        </Grid>

        <Grid container item flexDirection="column">
          {routes.map((route) => (
            <SidebarRoute key={route.id} label={route.label} route={route.route} />
          ))}
        </Grid>

        <Grid container item flexDirection="column" gap={2}>
          <animated.a
            style={{ ...iconStyles, transition: `color 0.3s`, cursor: `pointer` }}
            href="https://www.instagram.com/dantzaestudio"
            target="_blank"
          >
            <FaInstagram size={20} />
          </animated.a>
          <animated.a
            style={{ ...iconStyles, transition: `color 0.3s`, cursor: `pointer` }}
            href="https://wa.me/56979640980"
            target="_blank"
          >
            <FaWhatsapp size={20} />
          </animated.a>
          <animated.a
            style={{ ...iconStyles, transition: `color 0.3s`, cursor: `pointer` }}
            href="https://web.facebook.com/profile.php?id=100065174723983"
            target="_blank"
          >
            <FaFacebookF size={20} />
          </animated.a>
        </Grid>
      </Grid>
    </animated.div>
  )
}

export default Sidebar
