import { Grid, Link, Paper, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import API from '@/common/api'
import { useAuth } from '@/common/context/AuthContext'

const backgroundImages = [
  `https://images-dantza.s3.us-east-2.amazonaws.com/d1665fc1-5436-4191-b385-d021e6a9bd37.webp`,
  `https://images-dantza.s3.us-east-2.amazonaws.com/d5674b78-563c-49e8-9869-9d870d97258b.jpeg`,
  `https://images-dantza.s3.us-east-2.amazonaws.com/94902adf-6ea9-423b-a285-31d16fc9120c.jpeg`,
  `https://images-dantza.s3.us-east-2.amazonaws.com/5c604c12-bd45-4eb4-944d-b60cc1abd880.jpeg`,
]

const Login = (): JSX.Element => {
  const [backgroundImage, setBackgroundImage] = useState(0)
  const [state, setState] = useState({
    email: ``,
    password: ``,
  })
  const { email, password } = state
  const { logIn } = useAuth()

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage((prev) => {
        if (prev === backgroundImages.length - 1) {
          return 0
        }
        return prev + 1
      })
    }, 6000)
    return () => clearInterval(interval)
  }, [])

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
      window.location.href = `/dashboard/disciplines`
    },
  })
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: `100vh` }}>
      <Grid
        container
        xs
        height="100vh"
        justifyContent="center"
        alignItems="center"
        position="relative"
        overflow="hidden"
      >
        {backgroundImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            style={{
              position: `absolute`,
              top: `50%`,
              left: `50%`,
              width: `100%`,
              height: `100%`,
              objectFit: `cover`,
              transform: `translate(-50%, -50%)`,
              transition: `opacity .5s ease-in-out`,
              opacity: index === backgroundImage ? 1 : 0,
            }}
          />
        ))}
        <Paper
          elevation={3}
          sx={{
            padding: 6,
            paddingBottom: 3,
            borderRadius: 2,
            width: `400px`,
            zIndex: 10,
            backgroundColor: `rgba(255, 255, 255, 0.9)`,
          }}
        >
          <Grid container gap={2}>
            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h4">
                <b>Iniciar sesión</b>
              </Typography>
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
            <Grid container justifyContent="center" alignItems="center" marginTop={1}>
              <Link
                href="/"
                sx={{
                  textDecoration: `none`,
                }}
              >
                <Typography variant="body1" color="primary">
                  Volver a Dantza Estudio
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Login
