/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import Navbar from '../../common/components/Navbar'
import Sidebar from '../../common/components/Sidebar'
import Header from './Header'
import About from './About'
import Disciplines from './Disciplines'
import UpcomingEvents from './UpcomingEvents'
import Teachers from './Teachers'
import Footer from './Footer'

function Landing(): JSX.Element {
  const { breakpoints } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))

  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenu = (): void => {
    setMenuOpen(!menuOpen)
  }

  const handleCloseMenu = (): void => {
    setMenuOpen(false)
  }

  return (
    <Grid
      sx={{
        backgroundColor: `rgba(0,0,0,1)`,
      }}
    >
      {widthAboveLg ? (
        <Sidebar />
      ) : (
        <Navbar menuOpen={menuOpen} handleMenu={handleMenu} handleCloseMenu={handleCloseMenu} />
      )}
      <Header />
      <About />
      <Disciplines />
      <UpcomingEvents />
      <Teachers />
      <Footer />
    </Grid>
  )
}

export default Landing
