import Header from './modules/Header'
import Sidebar from './common/components/Sidebar'
import About from './modules/About'
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import Disciplines from './modules/Disciplines'
import Teachers from './modules/Teachers'
import UpcomingEvents from './modules/UpcomingEvents'
import Footer from './modules/Footer'
import { useEffect, useState } from 'react'
import Navbar from './common/components/Navbar'

interface ScrollState {
  isActive: string
  offset: number
}

const initialScrollState = {
  isActive: `home`,
  offset: 0,
}

function App() {
  const { breakpoints } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))
  const [scrollState, setScrollState] = useState<ScrollState>(initialScrollState)
  const { isActive, offset } = scrollState

  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenu = (): void => {
    setMenuOpen(!menuOpen)
  }

  const handleCloseMenu = (): void => {
    setMenuOpen(false)
  }

  useEffect(() => {
    const onScroll = (): void => {
      setScrollState({ ...scrollState, offset: window.scrollY })
    }
    window.removeEventListener(`scroll`, onScroll)
    window.addEventListener(`scroll`, onScroll, { passive: true })
    return () => window.removeEventListener(`scroll`, onScroll)
  }, [])

  useEffect(() => {
    const aboutSectionTop = document.getElementById(`about`)?.offsetTop
    const disciplinesSectionTop = document.getElementById(`disciplines`)?.offsetTop
    const upcomingEventsSectionTop = document.getElementById(`upcoming-events`)?.offsetTop
    const teachersSectionTop = document.getElementById(`teachers`)?.offsetTop

    if (offset < Number(aboutSectionTop) - 150) {
      return setScrollState({ ...scrollState, isActive: `home` })
    } else if (
      offset >= Number(aboutSectionTop) - 150 &&
      offset < Number(disciplinesSectionTop) - 150
    ) {
      return setScrollState({ ...scrollState, isActive: `about` })
    } else if (
      offset >= Number(disciplinesSectionTop) - 150 &&
      offset < Number(upcomingEventsSectionTop) - 150
    ) {
      return setScrollState({ ...scrollState, isActive: `disciplines` })
    } else if (
      offset >= Number(upcomingEventsSectionTop) - 150 &&
      offset < Number(teachersSectionTop) - 150
    ) {
      return setScrollState({ ...scrollState, isActive: `upcoming-events` })
    } else if (offset >= Number(teachersSectionTop) - 150) {
      return setScrollState({ ...scrollState, isActive: `teachers` })
    }
  }, [offset])
  return (
    <Grid
      sx={{
        backgroundColor: `rgba(0,0,0,1)`,
      }}
    >
      {widthAboveLg ? (
        <Sidebar isActive={isActive} />
      ) : (
        <Navbar
          isActive={isActive}
          menuOpen={menuOpen}
          handleMenu={handleMenu}
          handleCloseMenu={handleCloseMenu}
        />
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

export default App
