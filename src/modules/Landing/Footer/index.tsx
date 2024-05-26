import { Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material'
import { FaInstagram, FaWhatsapp, FaFacebookF } from 'react-icons/fa6'
import { LOGO_COLOR } from '../../../assets'

interface FooterProps {
  disciplinesLinks: { name: string; uuid: string }[]
}

const Footer = ({ disciplinesLinks }: FooterProps): JSX.Element => {
  const { breakpoints } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))
  return (
    <Grid
      container
      paddingY={8}
      paddingX={{ md: 16, xs: 6 }}
      alignItems="center"
      sx={{
        backgroundColor: `#20202a`,
        minHeight: `400px`,
      }}
    >
      <Grid
        container
        minHeight={200}
        gap={{ md: 4, xs: 6 }}
        flexDirection={{ xs: `column`, md: `row` }}
      >
        <Grid
          item
          xs={12}
          md={2}
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: `center`, md: `flex-start` }}
          flexDirection="column"
        >
          <img src={LOGO_COLOR} width={130} height="auto" alt="Logo Dantza" />

          {widthAboveLg ? (
            <Grid container>
              <Typography variant="body1" textTransform="uppercase" sx={{ color: `white` }}>
                Dantza Estudio
              </Typography>
            </Grid>
          ) : null}
        </Grid>
        <Grid
          item
          xs={12}
          md
          sx={
            widthAboveLg
              ? {
                display: `grid`,
                gridTemplateColumns: `repeat(5, auto)`,
                gridTemplateRows: `repeat(4, 35px)`,
              }
              : {
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                gap: 3,
              }
          }
        >
          {disciplinesLinks.map((discipline) => (
            <Typography key={discipline.uuid} variant="body1" color="primary">
              {discipline.name}
            </Typography>
          ))}
        </Grid>
        <Grid
          item
          width={{ xs: `100%`, md: `fit-content` }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap={{ xs: 3, md: 0 }}
        >
          <Grid
            container
            flexDirection="column"
            gap={{ xs: 2, md: 1 }}
            alignItems={{ xs: `center`, md: `flex-start` }}
          >
            <Typography variant="body1" sx={{ color: `white` }}>
              +569 7964 0980
            </Typography>
            <Typography
              component="a"
              variant="body1"
              sx={{
                textDecoration: `none`,
                color: `primary.main`,
                '&:hover': {
                  textDecoration: `underline`,
                },
              }}
              href="mailto:contacto@dantzaestudio.com"
            >
              contacto@dantzaestudio.com
            </Typography>
            <Typography variant="body1" sx={{ color: `white` }}>
              Ramón Liborio Carvallo N°5, San Bernardo
            </Typography>
          </Grid>
          <Grid
            color="common.white"
            container
            gap={{ xs: 4, md: 2 }}
            justifyContent={{ xs: `center`, md: `flex-start` }}
          >
            {widthAboveLg ? (
              <>
                <Link
                  href="https://www.instagram.com/dantzaestudio"
                  target="_blank"
                  sx={{
                    color: `white`,
                    '&:hover': {
                      color: `#f5f5f5`,
                    },
                  }}
                >
                  <FaInstagram size={20} />
                </Link>
                <Link
                  href="https://wa.me/56979640980"
                  target="_blank"
                  sx={{
                    color: `white`,
                    '&:hover': {
                      color: `#f5f5f5`,
                    },
                  }}
                >
                  <FaWhatsapp size={20} />
                </Link>
                <Link
                  href="https://web.facebook.com/profile.php?id=100065174723983"
                  target="_blank"
                  sx={{
                    color: `white`,
                    '&:hover': {
                      color: `#f5f5f5`,
                    },
                  }}
                >
                  <FaFacebookF size={20} />
                </Link>
              </>
            ) : (
              <>
                <FaInstagram size={24} />
                <FaWhatsapp size={24} />
                <FaFacebookF size={24} />

                <Grid container justifyContent="center" marginTop={2}>
                  <Typography variant="body1" textTransform="uppercase" sx={{ color: `white` }}>
                    Dantza Estudio
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Footer
