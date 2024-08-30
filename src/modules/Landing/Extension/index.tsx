import Container from '@/common/components/Container'
import { Grid, Typography } from '@mui/material'
import React from 'react'

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
          <Grid container flexDirection="column">
            <Typography variant="h3" textTransform="uppercase" marginBottom={4}>
              Compañia Dantza
            </Typography>
            <Grid container gap={1}>
              <Grid item>
                <Typography variant="body1" textAlign="justify">
                  El Estudio Dantza llega a concretar y proyectar una vida ligada al arte y el gusto
                  por cultivar los sueños. De este modo, <b>Danitza González</b>, la directora del
                  estudio, el año 2020 decide iniciar un proyecto que tuvo sus primeras experiencias
                  de clases de danza de manera online; para luego volver a su casa, la cual cobijó
                  sus sueños de niña, y comenzar a darle vida a este espacio que intenta canalizar
                  de forma amorosa y respetuosa el bienestar personal y los deseos artísticos de
                  quienes lo integran.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container gap={1.5} maxHeight={412}>
            <Grid container gap={1.5} width={612}>
              <Grid container gap={1.5}>
                <img
                  src={``}
                  width={300}
                  height={200}
                  style={{
                    objectFit: `cover`,
                    objectPosition: `center`,
                    imageOrientation: `from-image`,
                    borderRadius: `10px`,
                    border: `1px solid #00000033`,
                  }}
                />
                <img
                  src={``}
                  width={300}
                  height={200}
                  style={{
                    objectFit: `cover`,
                    objectPosition: `center`,
                    imageOrientation: `from-image`,
                    borderRadius: `10px`,
                    border: `1px solid #00000033`,
                  }}
                />
              </Grid>

              <img
                src={``}
                width="100%"
                height={200}
                style={{
                  objectFit: `cover`,
                  objectPosition: `center`,
                  imageOrientation: `from-image`,
                  borderRadius: `10px`,
                  border: `1px solid #00000033`,
                }}
              />
            </Grid>
            <Grid container width={300}>
              <img
                src={``}
                width="100%"
                height="412px"
                style={{
                  objectFit: `cover`,
                  objectPosition: `center`,
                  imageOrientation: `from-image`,
                  borderRadius: `10px`,
                  border: `1px solid #00000033`,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default Extension
