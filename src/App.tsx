import Header from './modules/Header'
import Sidebar from './common/components/Sidebar'
import About from './modules/About'
import { Grid } from '@mui/material'
import Disciplines from './modules/Disciplines'
import Teachers from './modules/Teachers'

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
      <Teachers />
    </Grid>
  )
}

export default App
