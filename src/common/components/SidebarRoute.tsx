import { Typography } from '@mui/material'
import { useSpring, animated, useScroll } from '@react-spring/web'
import { Link } from 'react-router-dom'

interface SidebarRouteProps {
  label: string
  route: string
}

const SidebarRoute = ({ label, route }: SidebarRouteProps): JSX.Element => {
  const [sidebarItemStyles, sidebarItemApi] = useSpring(() => ({
    to: { color: `white` },
  }))
  useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress > 0.6) {
        sidebarItemApi.start({ color: `black` })
        return
      }
      sidebarItemApi.start({ color: `white` })
    },
  })
  return (
    <Link
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
    </Link>
  )
}

export default SidebarRoute
