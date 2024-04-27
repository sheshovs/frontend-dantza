import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

interface SidebarRouteProps {
  label: string
  route: string
}

const SidebarRoute = ({ label, route }: SidebarRouteProps): JSX.Element => {
  return (
    <Link to={route} style={{
      textDecoration: 'none',
    }}>
      <Typography variant='body1' color='white' sx={{
        paddingY: 1,
        transition: 'color 0.3s',
        '&:hover': {
          color: 'primary.light',
          cursor: 'pointer',
        }
      }}>
        {label}
      </Typography>
    </Link>
  )
}

export default SidebarRoute