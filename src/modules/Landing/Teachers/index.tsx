import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import Container from '../../../common/components/Container'
import Icon from '../../../common/components/Icon'
import { useTeacherQuery } from '@/common/querys/useTeacherQuery'
import { useMemo } from 'react'

const Teachers = (): JSX.Element => {
  const { data: teachersQuery } = useTeacherQuery()

  const { teachersLinks, teachers } = useMemo(() => {
    if (!teachersQuery?.data) {
      return { teachersLinks: [], teachers: [] }
    }

    const teachersLinks = teachersQuery.data.map((teacher) => ({
      name: teacher.name,
      uuid: teacher.uuid,
    }))

    const teachers = teachersQuery.data.slice(0, 4).map((teacher) => ({
      uuid: teacher.uuid,
      name: teacher.name,
      images: teacher.images,
    }))

    return { teachersLinks, teachers }
  }, [teachersQuery])
  return (
    <Grid
      id="teachers"
      container
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: `#f9f7f8`,
        padding: {
          xs: `32px 32px 32px 32px`,
          sm: `48px 48px 48px 48px`,
          md: `48px 48px 48px 300px`,
        },
      }}
    >
      <Container>
        <Grid container>
          <Grid container item xs={12} gap={4} marginBottom={{ md: 12, xs: 8 }}>
            <Grid container xs={12} md={4}>
              <Typography variant="h3" textTransform="uppercase">
                Lorem ipsum dolor sit amet
              </Typography>
            </Grid>

            <Grid container item xs={12} md={5} flexDirection="column">
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorum assumenda
                  recusandae nobis accusantium modi unde pariatur aliquid fugiat repellendus.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={{ xs: `center`, md: `flex-start` }}
            alignItems="center"
            gap={3}
            marginBottom={8}
          >
            {teachersLinks.map((teacher, index) => {
              if (index === teachersLinks.length - 1) {
                return (
                  <Typography key={teacher.uuid} variant="body1" color="primary">
                    {teacher.name}
                  </Typography>
                )
              }
              return (
                <>
                  <Typography key={teacher.uuid} variant="body1" color="primary">
                    {teacher.name}
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
          <Grid
            container
            justifyContent={{ md: `flex-start`, xs: `center` }}
            gap={{ md: 4, xs: 5 }}
          >
            {teachers.map((teacher) => {
              const mainPicture = teacher.images.find((image) => image.isMain)
              return (
                <Grid
                  key={teacher.uuid}
                  container
                  item
                  width="fit-content"
                  flexDirection="column"
                  gap={{ md: 4, xs: 2 }}
                  marginBottom={{ md: 4, xs: 0 }}
                >
                  <img
                    src={mainPicture?.url}
                    alt={`Foto de ${teacher.name}`}
                    width={220}
                    height={350}
                    style={{
                      objectFit: `cover`,
                      objectPosition: `center`,
                      imageOrientation: `from-image`,
                      borderRadius: `4px`,
                    }}
                  />
                  <Grid container flexDirection="column" gap={1}>
                    <Typography variant="h6" fontWeight={700}>
                      {teacher.name}
                    </Typography>
                    <Grid container alignItems="center" gap={1}>
                      <Divider
                        sx={{
                          width: `50px`,
                          height: `2px`,
                          backgroundColor: `primary.main`,
                          borderRadius: `5px`,
                        }}
                      />
                      <Typography variant="body1" color="primary">
                        Saber más
                      </Typography>
                      <Icon icon="arrowForward" color="primary" />
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
            <Grid container item width="fit-content" marginBottom={{ md: 4, xs: 0 }}>
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

export default Teachers
