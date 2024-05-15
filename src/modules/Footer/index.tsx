import { Grid, Typography } from '@mui/material'
import { FaInstagram, FaWhatsapp, FaFacebookF } from 'react-icons/fa6'
import { LOGO_COLOR } from '../../assets'

const disciplinesLabels = [
  `Lorem`,
  `Ipsum`,
  `Dolor`,
  `Sit`,
  `Amet`,
  `Consectetur`,
  `Adipisicing`,
  `Elit`,
  `Sunt`,
  `Non`,
  `Lorem`,
  `Ipsum`,
  `Dolor`,
  `Sit`,
  `Amet`,
  `Consectetur`,
  `Adipisicing`,
  `Elit`,
  `Sunt`,
  `Non`,
]

const Footer = (): JSX.Element => {
  return (
    <Grid
      container
      paddingY={8}
      paddingX={16}
      alignItems="center"
      sx={{
        backgroundColor: `#20202a`,
        height: `400px`,
      }}
    >
      <Grid container height={200} gap={4}>
        <Grid item xs={2} display="flex" justifyContent="space-between" flexDirection="column">
          <img src={LOGO_COLOR} width={130} height="auto" alt="Logo Dantza" />

          <Grid container>
            <Typography variant="body1" textTransform="uppercase" sx={{ color: `white` }}>
              Dantza Estudio
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs
          sx={{
            display: `grid`,
            gridTemplateColumns: `repeat(5, auto)`,
            gridTemplateRows: `repeat(4, 35px)`,
          }}
        >
          {disciplinesLabels.map((label, index) => (
            <Typography key={index} variant="body1" color="primary">
              {label}
            </Typography>
          ))}
        </Grid>
        <Grid
          item
          width="fit-content"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Grid container flexDirection="column" gap={1}>
            <Typography variant="body1" sx={{ color: `white` }}>
              Lorem ipsum dolor sit amet
            </Typography>
            <Typography variant="body1" sx={{ color: `white` }}>
              Lorem ipsum dolor sit amet
            </Typography>
            <Typography variant="body1" sx={{ color: `white` }}>
              Lorem ipsum dolor sit amet
            </Typography>
            <Typography variant="body1" sx={{ color: `white` }}>
              Lorem ipsum dolor sit amet
            </Typography>
            <Typography variant="body1" sx={{ color: `white` }}>
              Lorem ipsum dolor sit amet
            </Typography>
          </Grid>
          <Grid container color="common.white" gap={2}>
            <FaInstagram size={20} />
            <FaWhatsapp size={20} />
            <FaFacebookF size={20} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Footer
