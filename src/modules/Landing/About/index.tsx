import { Divider, Grid, List, Typography } from '@mui/material'
import Container from '../../../common/components/Container'
import { ABOUT_IMG } from '@/assets'

const About = (): JSX.Element => {
  return (
    <Grid
      id="about"
      container
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: {
          xs: `32px 32px 32px 32px`,
          sm: `48px 48px 48px 48px`,
          md: `48px 48px 48px 300px`,
        },
      }}
    >
      <Container>
        <Grid container gap={8} minHeight="60vh">
          <Grid container item xs={12} md={4} flexDirection="column" justifyContent="space-between">
            <Typography variant="h3" textTransform="uppercase" marginBottom={4}>
              Acerca de Dantza Estudio
            </Typography>
            <img
              src={ABOUT_IMG}
              alt={`Foto de Danitza González, directora de Dantza Estudio`}
              width="100%"
              style={{
                objectFit: `cover`,
                objectPosition: `center`,
                imageOrientation: `from-image`,
                borderRadius: `4px`,
                boxShadow: `5px 5px 5px 0px rgba(0,0,0,0.3)`,
              }}
            />
          </Grid>
          <Grid container item xs flexDirection="column" gap={3}>
            <Grid container gap={1}>
              <Grid container alignItems="center" gap={3}>
                <Divider
                  sx={{
                    width: `50px`,
                    height: `2px`,
                    backgroundColor: `common.black`,
                    borderRadius: `5px`,
                  }}
                />
                <Typography variant="h4">Nuestra historia</Typography>
              </Grid>
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
            <Grid container gap={1}>
              <Grid container alignItems="center" gap={3}>
                <Divider
                  sx={{
                    width: `50px`,
                    height: `2px`,
                    backgroundColor: `common.black`,
                    borderRadius: `5px`,
                  }}
                />
                <Typography variant="h4">Nuestros desafios</Typography>
              </Grid>
              <Grid item paddingLeft={2}>
                <List
                  sx={{
                    listStyle: `initial`,
                    gap: `16px`,
                    display: `flex`,
                    flexDirection: `column`,
                    fontFamily: `Poppins`,
                  }}
                >
                  <li>Ofrecer una educación artística de excelencia.</li>
                  <li>Llegar a la mayor variedad de personas posible.</li>
                  <li>Contar con un equipo altamente capacitado de profesionales.</li>
                  <li>Ofrecer una amplia gama de disciplinas artísticas.</li>
                  <li>Promover el respeto por el cuerpo y sus diferentes movimientos.</li>
                  <li>
                    Favorecer a que cada miembro de nuestra comunidad pueda expresar sus deseos
                    artísticos.
                  </li>
                </List>
              </Grid>
            </Grid>
            <Grid container gap={1}>
              <Grid container alignItems="center" gap={3}>
                <Divider
                  sx={{
                    width: `50px`,
                    height: `2px`,
                    backgroundColor: `common.black`,
                    borderRadius: `5px`,
                  }}
                />
                <Typography variant="h4">Nuestros sueños</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" textAlign="justify">
                  Ser un estudio de danzas y otras artes pionero en potenciar el desarrollo
                  artístico y humano de quienes lo integran, aportando de forma amorosa y respetuosa
                  la autorrealización personal y colectiva a través de las artes.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default About
