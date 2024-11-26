import Container from '@/common/components/Container'
import { Divider, Grid, Typography } from '@mui/material'

import CardServices from './components/CardServices'
import DrawerServices from './components/DrawerServices'
import { useState } from 'react'

export enum Services {
  ARRENDAR = `ARRENDAR`,
  CLASES_PARTICULARES = `CLASES_PARTICULARES`,
  DANTZA_STORE = `DANTZA_STORE`,
}

export const ServicesOptions: Record<
  Services,
  {
    title: string
    images: string[]
  }
> = {
  [Services.ARRENDAR]: {
    title: `Arriendo de sala`,
    images: [
      `https://images-dantza.s3.us-east-2.amazonaws.com/e3318794-5a71-456f-9c53-2160c59de1a1.jpeg`,
      `https://images-dantza.s3.us-east-2.amazonaws.com/b45130aa-649b-4284-bf4b-e564f2b48978.jpeg`,
      `https://images-dantza.s3.us-east-2.amazonaws.com/39ebc7e2-f8c6-417b-aa3c-e0276030bb28.jpeg`,
      `https://images-dantza.s3.us-east-2.amazonaws.com/d6649175-6806-4530-b9ca-5d1fdcb3bc3f.jpeg`,
      `https://images-dantza.s3.us-east-2.amazonaws.com/2a1f83c6-4c4e-4221-8e54-2f17a999a053.jpeg`,
      `https://images-dantza.s3.us-east-2.amazonaws.com/06296580-51b4-4877-8b1c-abe37192d7ad.jpeg`,
    ],
  },
  [Services.CLASES_PARTICULARES]: {
    title: `Clases Particulares y para Novios`,
    images: [],
  },
  [Services.DANTZA_STORE]: {
    title: `Dantza Store`,
    images: [
      `https://images-dantza.s3.us-east-2.amazonaws.com/4a341521-3adf-488c-b64b-e10bdd6bfe35.jpeg`,
      `https://images-dantza.s3.us-east-2.amazonaws.com/e917c7c6-8d57-4ef8-8ad3-877a084ee2fb.jpeg`,
      `https://images-dantza.s3.us-east-2.amazonaws.com/5a87bd45-a176-4a74-b608-bfa963bcc555.jpeg`,
      `https://images-dantza.s3.us-east-2.amazonaws.com/7589ccc8-38aa-433a-86ed-90a68650dc72.jpeg`,
      `https://images-dantza.s3.us-east-2.amazonaws.com/7112f0ad-cb9d-4126-b02d-763fa016d53d.jpeg`,
    ],
  },
}

const Others = (): JSX.Element => {
  const [selectedService, setSelectedService] = useState<Services | undefined>(undefined)

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
      <DrawerServices
        open={selectedService !== undefined}
        onClose={() => setSelectedService(undefined)}
        selectedService={selectedService}
      />
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
              cardBackground="https://images-dantza.s3.us-east-2.amazonaws.com/b45130aa-649b-4284-bf4b-e564f2b48978.jpeg"
              title="Arriendo de sala"
              description={`Dantza Estudio es un espacio versátil disponible para arrendar,
                ideal para clases de danza y otras disciplinas, grabaciones o sesiones fotográficas,
                y encuentros grupales. El estudio cuenta con un área de 10x5 metros equipada con
                espejos de 10x2 metros, baño/camarín, equipo de música, casilleros, terraza,
                mini refrigerador, TV, WiFi, y calefactor/ventilador. Para conocer los valores por hora,
                no dudes en consultar.`}
              onClick={() => setSelectedService(Services.ARRENDAR)}
            />

            <CardServices
              title="Clases Particulares y para Novios"
              description={`Nuestro estudio cuenta en su equipo con bailarinas profesionales 
                que se han especializado en distintas disciplinas, lo cuál nos permite ofrecer 
                una gran variedad de clases particulares, tanto individuales como grupales.
                También podemos preparar a aquellas parejas que en alguna ceremonia quieran
                sorprender a sus invitados con algún baile, ya sea el clásico Vals o bien 
                alguna coreografía de algún ritmo de preferencia.
                Cuéntanos tu idea y te ayudaremos para aquel día tan especial.`}
              // onClick={() => setSelectedService(Services.CLASES_PARTICULARES)}
            />

            <CardServices
              cardBackground="https://images-dantza.s3.us-east-2.amazonaws.com/7589ccc8-38aa-433a-86ed-90a68650dc72.jpeg"
              title="Dantza Store"
              description={`En nuestro estudio contamos con una gran variedad de
                uniformes y artículos que te acompañarán en la experiencia Dantza,
                cada uno de ellos está pensado con el cariño que nos caracteriza.
                Consulta por valores en el Estudio.`}
              onClick={() => setSelectedService(Services.DANTZA_STORE)}
            />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default Others
