import { LOGO_COLOR } from '@/assets'
import { useAuth } from '@/common/context/AuthContext'
import { Grid, Link, MenuItem, Typography } from '@mui/material'

const Sidebar = (): JSX.Element => {
  const { logOut } = useAuth()

  const handleLogout = (): void => {
    logOut()
  }
  return (
    <Grid
      container
      width={200}
      height="100%"
      bgcolor="#ececec"
      paddingX={2}
      paddingTop={6}
      paddingBottom={10}
    >
      <Grid container xs item flexDirection="column" alignItems="center" gap={2}>
        <Grid item width="fit-content">
          <img src={LOGO_COLOR} width={110} height="auto" alt="Logo Dantza" />
        </Grid>
        <Grid container xs item flexDirection="column" paddingX={2} justifyContent="space-between">
          <Grid item xs flexDirection="column">
            <Link
              href={`/dashboard/disciplines`}
              sx={{
                textDecoration: `none`,
              }}
            >
              <MenuItem>
                <Typography
                  variant="body1"
                  sx={{
                    paddingY: 0.5,
                    '&:hover': {
                      color: `primary.light`,
                      cursor: `pointer`,
                    },
                  }}
                >
                  Disciplinas
                </Typography>
              </MenuItem>
            </Link>
            <Link
              href={`/dashboard/teachers`}
              sx={{
                textDecoration: `none`,
              }}
            >
              <MenuItem>
                <Typography
                  variant="body1"
                  sx={{
                    paddingY: 0.5,
                    '&:hover': {
                      color: `primary.light`,
                      cursor: `pointer`,
                    },
                  }}
                >
                  Profesoras
                </Typography>
              </MenuItem>
            </Link>
            <Link
              href={`/dashboard/events`}
              sx={{
                textDecoration: `none`,
              }}
            >
              <MenuItem>
                <Typography
                  variant="body1"
                  sx={{
                    paddingY: 0.5,
                    '&:hover': {
                      color: `primary.light`,
                      cursor: `pointer`,
                    },
                  }}
                >
                  Eventos
                </Typography>
              </MenuItem>
            </Link>
          </Grid>
          <Grid item>
            <MenuItem onClick={handleLogout}>
              <Typography variant="body1">Cerrar sesión</Typography>
            </MenuItem>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Sidebar
