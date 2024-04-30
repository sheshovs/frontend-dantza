import Header from './modules/Header'
import Sidebar from './common/components/Sidebar'
import About from './modules/About'
import { Grid } from '@mui/material'

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
    </Grid>
  )
}

export default App
