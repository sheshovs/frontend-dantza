import Container from '@/common/components/Container'
import { Divider, Grid, Typography } from '@mui/material'

import CardServices from './components/CardServices'

const Others = (): JSX.Element => {
  return (
    <Grid
      id="other-services"
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
        <Grid container gap={4} minHeight="60vh">
          <Grid container item xs={12} flexDirection="column">
            <Grid container gap={3} alignItems="center">
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
                  Otros servicios
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container gap={3}>
            <CardServices
              title="Arriendo de sala"
              description={`Dantza Estudio es un espacio versátil disponible para arrendar,
                ideal para clases de danza y otras disciplinas, grabaciones o sesiones fotográficas,
                y encuentros grupales. El estudio cuenta con un área de 10x5 metros equipada con
                espejos de 10x2 metros, baño/camarín, equipo de música, casilleros, terraza,
                mini refrigerador, TV, WiFi, y calefactor/ventilador. Para conocer los valores por hora,
                no dudes en consultar.`}
            />

            <CardServices
              title="Clases Particulares y para Novios"
              description={`Nuestro estudio cuenta en su equipo con bailarinas profesionales que se han
                especializado en distintas disciplinas, lo cuál nos permite ofrecer una gran
                variedad de clases particulares, tanto individuales como grupales. También podemos
                preparar a aquellas parejas que en alguna ceremonia quieran sorprender a sus
                invitados con algún baile, ya sea el clásico Vals o bien alguna coreografía de algún
                ritmo de preferencia.`}
            />

            <CardServices
              title="Dantza Store"
              description={`En nuestro estudio contamos con una gran variedad de uniformes y artículos que te
                acompañarán en la experiencia Dantza.`}
            />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default Others
