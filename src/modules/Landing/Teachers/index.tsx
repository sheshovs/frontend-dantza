import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import Container from '../../../common/components/Container'
import { useTeacherByIdQuery, useTeacherQuery } from '@/common/querys/useTeacherQuery'
import { useMemo, useState } from 'react'
import DrawerTeachers from './components/DrawerTeacher'
import CardTeacher from './components/CardTeacher'

const Teachers = (): JSX.Element => {
  const [openAllTeachers, setOpenAllTeachers] = useState(false)
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | undefined>(undefined)
  const { data: teachersQuery } = useTeacherQuery()
  const { data: teacherQuery } = useTeacherByIdQuery(selectedTeacherId!)

  const { teachersLinks, teachers } = useMemo(() => {
    if (!teachersQuery?.data) {
      return { teachersLinks: [], teachers: [] }
    }

    const teachersLinks = teachersQuery.data.map((teacher) => ({
      name: teacher.name,
      uuid: teacher.uuid,
    }))

    const teachers = teachersQuery.data

    return { teachersLinks, teachers }
  }, [teachersQuery])

  const teacher = useMemo(() => {
    if (!teacherQuery?.data) {
      return undefined
    }

    return teacherQuery.data
  }, [teacherQuery])

  const handleOpenAllTeachers = (): void => {
    setOpenAllTeachers(true)
  }
  const handleCloseAllTeachers = (): void => {
    setOpenAllTeachers(false)
    setSelectedTeacherId(undefined)
  }
  const handleOpenTeacher = (teacherId: string): void => {
    setSelectedTeacherId(teacherId)
    setOpenAllTeachers(true)
  }
  const handleCloseTeacher = (): void => {
    setSelectedTeacherId(undefined)
  }
  return (
    <>
      <DrawerTeachers
        open={openAllTeachers}
        onClose={handleCloseAllTeachers}
        teacher={teacher}
        teachers={teachers}
        handleOpenTeacher={handleOpenTeacher}
        handleCloseTeacher={handleCloseTeacher}
      />
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
            <Grid container item xs={12} gap={4} marginBottom={{ md: 10, xs: 8 }}>
              <Grid container item xs={12} md={4}>
                <Typography variant="h3" textTransform="uppercase">
                  Nuestras profesoras
                </Typography>
              </Grid>

              <Grid container item xs={12} md={7} flexDirection="column">
                <Grid container alignItems="center" gap={3} marginBottom={2}>
                  <Grid container item width="fit-content">
                    <Divider
                      sx={{
                        width: `50px`,
                        height: `2px`,
                        backgroundColor: `common.black`,
                        borderRadius: `5px`,
                      }}
                    />
                  </Grid>
                  <Grid container item xs>
                    <Typography variant="h4">Conoce a nuestro equipo de profesionales</Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body1" paddingLeft={2}>
                    Nuestras profesoras son profesionales en el ámbito de la danza, con años de
                    experiencia y formación en distintas disciplinas. Conócelas y descubre todo lo
                    que pueden ofrecerte.
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
                    <Typography
                      key={teacher.uuid}
                      variant="body1"
                      color="primary"
                      onClick={() => handleOpenTeacher(teacher.uuid)}
                      sx={{
                        cursor: `pointer`,
                        '&:hover': {
                          textDecoration: `underline`,
                        },
                      }}
                    >
                      {teacher.name}
                    </Typography>
                  )
                }
                return (
                  <>
                    <Typography
                      key={teacher.uuid}
                      variant="body1"
                      color="primary"
                      onClick={() => handleOpenTeacher(teacher.uuid)}
                      sx={{
                        cursor: `pointer`,
                        '&:hover': {
                          textDecoration: `underline`,
                        },
                      }}
                    >
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
              {teachers.slice(0, 4).map((teacher) => (
                <CardTeacher key={teacher.uuid} teacher={teacher} onClick={handleOpenTeacher} />
              ))}
              <Grid container item width="fit-content" marginBottom={{ md: 4, xs: 0 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    width: `220px`,
                    height: `350px`,
                  }}
                  onClick={handleOpenAllTeachers}
                >
                  Ver más
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  )
}

export default Teachers
