import { Divider, Grid, List, Typography } from '@mui/material'
import Container from '../../common/components/Container'

const About = (): JSX.Element => {
  return (
    <Grid
      id="about"
      container
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: `#f9f7f8`,
        padding: `48px 48px 48px 300px`,
      }}
    >
      <Container>
        <Grid container gap={4} height="60vh">
          <Grid container item xs={4} flexDirection="column" justifyContent="space-between">
            <Typography variant="h3" textTransform="uppercase">
              Lorem ipsum dolor sit amet
            </Typography>
            <img src="https://placehold.co/400x250" alt="placeholder" width="100%" />
          </Grid>
          <Grid container item xs flexDirection="column">
            <Grid container alignItems="center" gap={3} marginBottom={2}>
              <Divider
                sx={{
                  width: `50px`,
                  height: `2px`,
                  backgroundColor: `common.black`,
                  borderRadius: `5px`,
                }}
              />
              <Typography variant="h4">Lorem ipsum dolor sit</Typography>
            </Grid>
            <Grid item paddingLeft={2}>
              <List
                sx={{
                  listStyle: `initial`,
                }}
              >
                <li
                  style={{
                    marginBottom: `16px`,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur.
                </li>
                <li
                  style={{
                    marginBottom: `16px`,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque minus corporis
                  autem praesentium eligendi?
                </li>
                <li
                  style={{
                    marginBottom: `16px`,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, non?
                </li>
                <li
                  style={{
                    marginBottom: `16px`,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias doloremque
                  deleniti debitis.
                </li>
                <li
                  style={{
                    marginBottom: `16px`,
                  }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </li>
                <li
                  style={{
                    marginBottom: `16px`,
                  }}
                >
                  Lorem ipsum dolor sit amet.
                </li>
                <li
                  style={{
                    marginBottom: `16px`,
                  }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, eaque!
                </li>
                <li
                  style={{
                    marginBottom: `16px`,
                  }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </li>
                <li
                  style={{
                    marginBottom: `16px`,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing.
                </li>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default About
