import Container from '@/common/components/Container'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { HEADER_BG } from '@/assets'

const Extension = (): JSX.Element => {
  return (
    <Grid
      id="extension"
      container
      minHeight="60vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        // backgroundColor: `common.white`,
        padding: {
          xs: `32px 32px 32px 32px`,
          sm: `48px 48px 48px 48px`,
          md: `48px 48px 48px 300px`,
        },
      }}
    >
      <Container>
        <Grid container gap={6} minHeight="60vh">
          <Grid container item xs={12}>
            <Grid container item xs={12} xl={10} flexDirection="column">
              <Grid container gap={3} marginBottom={2} alignItems="center">
                <Grid container width={50}>
                  <Divider
                    sx={{
                      width: `100%`,
                      height: `2px`,
                      backgroundColor: `common.black`,
                      borderRadius: `5px`,
                    }}
                  />
                </Grid>
                <Grid container xs>
                  <Typography variant="h3" textTransform="uppercase">
                    Compañia Dantza
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body1" textAlign="justify">
                  La Compañía Dantza es un espacio dentro de nuestro estudio en donde se potencia a
                  aquellas estudiantes que en sus clases regulares muestran un talento, interés y
                  compromiso especial. Estas y otras características las fortalecemos a través de un
                  entrenamiento semanal guiado por nuestras profesoras, quienes, con un trabajo
                  planificado, buscan la mejora constante en los aspectos físicos, técnicos,
                  creativos, expresivos, artísticos y actitudinales.
                  <br />
                  <br />
                  Todo este trabajo tiene como primer objetivo brindar este espacio artístico
                  profesional dentro del estudio, y también representarnos en distintas competencias
                  de Danza, actividades en diversas instituciones y también en nuestras Galas de fin
                  de año.
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container gap={1.5}>
            <Grid
              container
              gap={1.5}
              justifyContent="space-between"
              maxWidth={{
                xl: 812,
                xs: `100%`,
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: `100%`,
                    lg: `49%`,
                  },
                  maxHeight: 250,
                }}
              >
                <img
                  src={HEADER_BG}
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: `cover`,
                    objectPosition: `center`,
                    imageOrientation: `from-image`,
                    borderRadius: `10px`,
                    border: `1px solid #00000033`,
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: {
                    xs: `100%`,
                    lg: `49%`,
                  },
                  maxHeight: 250,
                }}
              >
                <img
                  src={HEADER_BG}
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: `cover`,
                    objectPosition: `center`,
                    imageOrientation: `from-image`,
                    borderRadius: `10px`,
                    border: `1px solid #00000033`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: {
                    xs: `100%`,
                  },
                  maxHeight: 250,
                }}
              >
                <img
                  src={HEADER_BG}
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: `cover`,
                    objectPosition: `center`,
                    imageOrientation: `from-image`,
                    borderRadius: `10px`,
                    border: `1px solid #00000033`,
                  }}
                />
              </Box>
            </Grid>
            <Box
              sx={{
                width: {
                  xs: `100%`,
                  xl: 400,
                },
                maxHeight: {
                  xs: 250,
                  xl: 512,
                },
              }}
            >
              <img
                src={HEADER_BG}
                width="100%"
                height="100%"
                style={{
                  objectFit: `cover`,
                  objectPosition: `center`,
                  imageOrientation: `from-image`,
                  borderRadius: `10px`,
                  border: `1px solid #00000033`,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default Extension
