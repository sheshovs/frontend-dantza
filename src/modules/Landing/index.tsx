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
import Extension from './Extension'
import Others from './Others'

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
        background: `linear-gradient(180deg, #f2f2f2 0%, #FFFFFF 50%, #f2f2f2 100%)`,
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
      <Extension />
      <Others />
      <Footer />
    </Grid>
  )
}

export default Landing
