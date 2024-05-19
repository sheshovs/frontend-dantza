import { Link, Typography } from '@mui/material'
import { useSpring, animated, useScroll } from '@react-spring/web'

interface SidebarRouteProps {
  label: string
  route: string
  isActive: boolean
  color?: string
  onClick?: () => void
}

const SidebarRoute = ({
  label,
  route,
  isActive,
  color,
  onClick,
}: SidebarRouteProps): JSX.Element => {
  const [sidebarItemStyles, sidebarItemApi] = useSpring(() => ({
    from: { color: `black` },
    to: { color: `white` },
  }))

  useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      if ((scrollYProgress > 0.13 && scrollYProgress < 0.62) || scrollYProgress > 0.86) {
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
            paddingY: 1,
            transition: `color 0.3s`,
            color: isActive ? `primary.light` : color,
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
