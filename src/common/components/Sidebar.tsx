import { Grid } from '@mui/material'
import { animated, useScroll, useSpring } from '@react-spring/web'
import SidebarRoute from './SidebarRoute'
import { FaInstagram, FaWhatsapp, FaFacebookF } from 'react-icons/fa6'
import { LOGO_COLOR, LOGO_WHITE } from '../../assets'
import { useState } from 'react'

const Sidebar = (): JSX.Element => {
  const [sidebarStyles, sidebarApi] = useSpring(() => ({
    to: {
      opacity: 0,
      background: `rgba(255,255,255,0.2)`,
      bottom: 0,
    },
  }))
  const [iconStyles, iconApi] = useSpring(() => ({
    to: { color: `black` },
  }))

  const [sidebarLogo, setSidebarLogo] = useState(LOGO_WHITE)

  useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      if (
        (scrollYProgress > 0 && scrollYProgress < 0.13) ||
        (scrollYProgress > 0.62 && scrollYProgress < 0.86)
      ) {
        sidebarApi.start({ background: `rgba(255,255,255,0.2)` })
        setSidebarLogo(LOGO_WHITE)
        iconApi.start({ color: `white` })
      } else {
        iconApi.start({ color: `black` })
        sidebarApi.start({ background: `white` })
        setSidebarLogo(LOGO_COLOR)
      }

      if (scrollYProgress > 0.02) {
        sidebarApi.start({ opacity: 1 })
      } else {
        sidebarApi.start({ opacity: 0 })
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
          <SidebarRoute label="Inicio" route="#home" />
          <SidebarRoute label="Nosotros" route="#about" />
          <SidebarRoute label="Disciplinas" route="#disciplines" />
          <SidebarRoute label="Profesores" route="#teachers" />
          <SidebarRoute label="Eventos" route="#events" />
        </Grid>

        <Grid container item flexDirection="column" gap={2}>
          <animated.span style={{ ...iconStyles, transition: `color 0.3s` }}>
            <FaInstagram size={20} />
          </animated.span>
          <animated.span style={{ ...iconStyles, transition: `color 0.3s` }}>
            <FaWhatsapp size={20} />
          </animated.span>
          <animated.span style={{ ...iconStyles, transition: `color 0.3s` }}>
            <FaFacebookF size={20} />
          </animated.span>
        </Grid>
      </Grid>
    </animated.div>
  )
}

export default Sidebar
