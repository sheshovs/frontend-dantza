import { Grid, useTheme } from '@mui/material'
import SidebarRoute from './SidebarRoute'
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa6";
import { LOGO } from '../../assets';

const Sidebar = () => {
  const { palette: { common } } = useTheme()
  return (
    <Grid
      container
      width={185}
      height='100vh'
      paddingY={6}
      paddingX={3}
      sx={{
        left: 120,
        position: 'fixed',
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(3px)',
      }}
    >

      <Grid
        container
        flexDirection='column'
        alignItems='center'
        justifyContent='space-between'
        height='80%'
      >
        <Grid container item>
          <img src={LOGO} width={137} alt='Logo Dantza' />
        </Grid>

        <Grid container item flexDirection='column'>
          <SidebarRoute label='Inicio' route='#home' />
          <SidebarRoute label='Nosotros' route='#about-us' />
          <SidebarRoute label='Disciplinas' route='#disciplines' />
          <SidebarRoute label='Profesores' route='#teachers' />
          <SidebarRoute label='Eventos' route='#events' />
        </Grid>

        <Grid container item flexDirection='column' gap={2}>
          <FaInstagram size={20} color={common.white} />
          <FaWhatsapp size={20} color={common.white} />
          <FaFacebook size={20} color={common.white} />
        </Grid>
      </Grid>
    </Grid >
  )
}

export default Sidebar