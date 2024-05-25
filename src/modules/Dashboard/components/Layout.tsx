import { Grid, Paper } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Grid container height="100vh">
      <Sidebar />
      <Grid container width="calc(100% - 200px)" padding={4} bgcolor="#ececec">
        <Paper
          elevation={2}
          sx={{
            width: `100%`,
            padding: 4,
          }}
        >
          {children}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Layout
