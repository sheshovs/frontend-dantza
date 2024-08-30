import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import Container from '../../../common/components/Container'
import { useTeacherByIdQuery, useTeacherQuery } from '@/common/querys/useTeacherQuery'
import { useMemo, useState } from 'react'
import DrawerTeachers from './components/DrawerTeacher'
import CardTeacher from './components/CardTeacher'
import CardLoading from '@/common/components/CardLoading'

const Teachers = (): JSX.Element => {
  const [openAllTeachers, setOpenAllTeachers] = useState(false)
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | undefined>(undefined)
  const { data: teachersQuery, isLoading: isLoadingTeachers } = useTeacherQuery()
  const { data: teacherQuery, isLoading: isLoadingTeacher } = useTeacherByIdQuery(
    selectedTeacherId!,
  )

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
      <Grid
        id="teachers"
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
        position="relative"
      >
        <DrawerTeachers
          open={openAllTeachers}
          onClose={handleCloseAllTeachers}
          teacher={teacher}
          isLoadingTeacher={isLoadingTeacher}
          teachers={teachers}
          isLoadingTeachers={isLoadingTeachers}
          handleOpenTeacher={handleOpenTeacher}
          handleCloseTeacher={handleCloseTeacher}
        />
        <Container>
          <Grid container>
            <Grid container item xs={12} gap={4} marginBottom={{ md: 10, xs: 8 }}>
              <Grid container item xs={12} md={4}>
                <Typography variant="h3" textTransform="uppercase">
                  Nuestros profesores
                </Typography>
              </Grid>

              <Grid container item xs={12} md={7} flexDirection="column">
                <Grid container gap={3} marginBottom={2} alignItems="center">
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
                    <Typography variant="h4">Conoce a nuestro equipo de profesionales</Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    Nuestros profesores son profesionales en el ámbito de la danza, con años de
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
              {isLoadingTeachers ? <CardLoading /> : null}
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
