import { Link, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useSpring, animated, useScroll } from '@react-spring/web'

interface SidebarRouteProps {
  label: string
  route: string
  color?: string
  onClick?: () => void
}

const SidebarRoute = ({ label, color, route, onClick }: SidebarRouteProps): JSX.Element => {
  const { breakpoints } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))
  const [sidebarItemStyles, sidebarItemApi] = useSpring(() => ({
    from: { color: `black` },
    to: { color: `white` },
  }))

  useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      if ((scrollYProgress > 0.077 && scrollYProgress < 0.5) || scrollYProgress > 0.59) {
        sidebarItemApi.start({ color: `black` })
      } else {
        sidebarItemApi.start({ color: `white` })
      }
    },
  })

  return (
    <Link
      href={route}
      sx={{
        textDecoration: `none`,
      }}
      onClick={onClick}
    >
      <animated.div
        style={{
          ...sidebarItemStyles,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            paddingY: widthAboveLg ? 1 : 1.5,
            transition: `color 0.3s`,
            color: color,
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
