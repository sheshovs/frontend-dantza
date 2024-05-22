import { Grid, Paper, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import API from '@/common/api'
import { useAuth } from '@/common/context/AuthContext'

const Login = (): JSX.Element => {
  const [state, setState] = useState({
    email: ``,
    password: ``,
  })
  const { email, password } = state

  const { logIn } = useAuth()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleSubmit = (): void => {
    submitLogin({ email, password })
  }

  const { mutate: submitLogin, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      API.login(email, password),
    onError: (error: any) => {
      console.log(error)
    },
    onSuccess: (authorizedUser) => {
      logIn(authorizedUser.data)
      window.location.href = `/dashboard`
    },
  })
  return (
    <Grid container height="100vh" justifyContent="center" alignItems="center" bgcolor="#2F3333">
      <Paper elevation={3} sx={{ padding: 6, borderRadius: 2, width: `400px` }}>
        <Grid container gap={2}>
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h4">Login</Typography>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" gap={1}>
            <Grid container item>
              <Typography variant="h6">Email</Typography>
            </Grid>
            <TextField
              variant="outlined"
              fullWidth
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Grid>
          <Grid container justifyContent="center" alignItems="center" gap={1}>
            <Grid container item>
              <Typography variant="h6">Contraseña</Typography>
            </Grid>
            <TextField
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
            />
          </Grid>
          <Grid container justifyContent="center" alignItems="center" marginTop={1}>
            <LoadingButton
              loading={isLoading}
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{
                height: `50px`,
              }}
            >
              Iniciar sesión
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Login
