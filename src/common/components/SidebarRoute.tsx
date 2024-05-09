import { Typography } from '@mui/material'
import { useSpring, animated, useScroll } from '@react-spring/web'
import { NavLink } from 'react-router-dom'

interface SidebarRouteProps {
  label: string
  route: string
}

const SidebarRoute = ({ label, route }: SidebarRouteProps): JSX.Element => {
  const [sidebarItemStyles, sidebarItemApi] = useSpring(() => ({
    to: { color: `black` },
  }))
  useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      if (
        (scrollYProgress > 0 && scrollYProgress < 0.13) ||
        (scrollYProgress > 0.62 && scrollYProgress < 0.86)
      ) {
        sidebarItemApi.start({ color: `white` })
      } else {
        sidebarItemApi.start({ color: `black` })
      }
    },
  })
  return (
    <NavLink
      to={route}
      style={{
        textDecoration: `none`,
      }}
    >
      <animated.div
        style={{
          ...sidebarItemStyles,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            paddingY: 1,
            transition: `color 0.3s`,
            '&:hover': {
              color: `primary.light`,
              cursor: `pointer`,
            },
          }}
        >
          {label}
        </Typography>
      </animated.div>
    </NavLink>
  )
}

export default SidebarRoute
