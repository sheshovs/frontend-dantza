import Header from './modules/Header'
import Sidebar from './common/components/Sidebar'
import About from './modules/About'
import { Grid } from '@mui/material'
import Disciplines from './modules/Disciplines'
import Teachers from './modules/Teachers'
import UpcomingEvents from './modules/UpcomingEvents'
import Footer from './modules/Footer'

function App() {
  return (
    <Grid
      sx={{
        backgroundColor: `rgba(0,0,0,1)`,
      }}
    >
      <Sidebar />
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
