import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import Container from '../../common/components/Container'

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

const Disciplines = (): JSX.Element => {
  return (
    <Grid
      id="disciplines"
      container
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: `common.white`,
        padding: `48px 48px 48px 300px`,
      }}
    >
      <Container>
        <Grid container>
          <Grid container item xs={12} gap={4} marginBottom={12}>
            <Grid container item xs={4}>
              <Typography variant="h3" textTransform="uppercase">
                Lorem ipsum dolor sit amet
              </Typography>
            </Grid>

            <Grid container item xs={5} flexDirection="column">
              <Grid container alignItems="center" gap={3} marginBottom={2}>
                <Divider
                  sx={{
                    width: `50px`,
                    height: `2px`,
                    backgroundColor: `common.black`,
                    borderRadius: `5px`,
                  }}
                />
                <Typography variant="h4">Lorem ipsum dolor</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. A consectetur ipsam,
                  mollitia at quam eius!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container alignItems="center" gap={3} marginBottom={8}>
            {disciplinesLabels.map((label, index) => {
              if (index === disciplinesLabels.length - 1) {
                return (
                  <Typography key={label} variant="body1" color="primary">
                    {label}
                  </Typography>
                )
              }
              return (
                <>
                  <Typography key={label} variant="body1" color="primary">
                    {label}
                  </Typography>
                  <Box
                    sx={{
                      width: `4px`,
                      height: `4px`,
                      backgroundColor: `common.black`,
                      borderRadius: `50%`,
                    }}
                  />
                </>
              )
            })}
          </Grid>
          <Grid container justifyContent="space-between">
            <Grid container item width="fit-content" flexDirection="column" gap={4}>
              <img src="https://placehold.co/220x350" alt="placeholder" />
              <Typography variant="h5" fontWeight={700}>
                Lorem
              </Typography>
            </Grid>
            <Grid container item width="fit-content" flexDirection="column" gap={4}>
              <img src="https://placehold.co/220x350" alt="placeholder" />
              <Typography variant="h5" fontWeight={700}>
                Ipsum
              </Typography>
            </Grid>
            <Grid container item width="fit-content" flexDirection="column" gap={4}>
              <img src="https://placehold.co/220x350" alt="placeholder" />
              <Typography variant="h5" fontWeight={700}>
                Dolor
              </Typography>
            </Grid>
            <Grid container item width="fit-content" flexDirection="column" gap={4}>
              <img src="https://placehold.co/220x350" alt="placeholder" />
              <Typography variant="h5" fontWeight={700}>
                Sit
              </Typography>
            </Grid>
            <Grid container item width="fit-content">
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  width: `220px`,
                  height: `350px`,
                }}
              >
                Ver más
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default Disciplines
