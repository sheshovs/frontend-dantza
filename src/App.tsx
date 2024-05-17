import Header from './modules/Header'
import Sidebar from './common/components/Sidebar'
import About from './modules/About'
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import Disciplines from './modules/Disciplines'
import Teachers from './modules/Teachers'
import UpcomingEvents from './modules/UpcomingEvents'
import Footer from './modules/Footer'

function App() {
  const { breakpoints } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))
  return (
    <Grid
      sx={{
        backgroundColor: `rgba(0,0,0,1)`,
      }}
    >
      {widthAboveLg ? <Sidebar /> : null}
      <Header />
      <About />
      <Disciplines />
      <UpcomingEvents />
      <Teachers />
      <Footer />
    </Grid>
  )
}

export default App
