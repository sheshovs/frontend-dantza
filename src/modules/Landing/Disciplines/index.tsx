import { Box, Button, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import Container from '../../../common/components/Container'
import { useDisciplineByIdQuery } from '@/common/querys/useDisciplineQuery'
import { useMemo, useState } from 'react'
import CardDiscipline from './components/CardDiscipline'
import DrawerDisciplines from './components/DrawerDisciplines'
import { DisciplineReturn } from '@/common/types'
import CardLoading from '@/common/components/CardLoading'
import CalendarDisciplines from './components/CalendarDisciplines'

interface DisciplinesProps {
  disciplinesLinks: {
    name: string
    uuid: string
  }[]
  disciplines: DisciplineReturn[]
  isLoadingDisciplines: boolean
}

const Disciplines = ({
  disciplinesLinks,
  disciplines,
  isLoadingDisciplines,
}: DisciplinesProps): JSX.Element => {
  const { breakpoints } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))
  const [openAllDisciplines, setOpenAllDisciplines] = useState(false)
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | undefined>(undefined)
  const { data: disciplineQuery, isLoading: isLoadingDiscipline } = useDisciplineByIdQuery(
    selectedDisciplineId!,
  )

  const discipline = useMemo(() => {
    if (!disciplineQuery?.data) {
      return undefined
    }

    return disciplineQuery.data
  }, [disciplineQuery])

  const handleOpenAllDisciplines = (): void => {
    setOpenAllDisciplines(true)
  }
  const handleCloseAllDisciplines = (): void => {
    setOpenAllDisciplines(false)
    setSelectedDisciplineId(undefined)
  }
  const handleOpenDiscipline = (disciplineId: string): void => {
    setSelectedDisciplineId(disciplineId)
    setOpenAllDisciplines(true)
  }
  const handleCloseDiscipline = (): void => {
    setSelectedDisciplineId(undefined)
  }

  return (
    <>
      <DrawerDisciplines
        open={openAllDisciplines}
        onClose={handleCloseAllDisciplines}
        discipline={discipline}
        isLoadingDiscipline={isLoadingDiscipline}
        disciplines={disciplines}
        isLoadingDisciplines={isLoadingDisciplines}
        handleOpenDiscipline={handleOpenDiscipline}
        handleCloseDiscipline={handleCloseDiscipline}
      />
      <Grid
        id="disciplines"
        container
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: `common.white`,
          padding: {
            xs: `32px 32px 32px 32px`,
            sm: `48px 48px 48px 48px`,
            md: `48px 48px 48px 300px`,
          },
        }}
      >
        <Container>
          <Grid container>
            <Grid container item xs={12} gap={4} marginBottom={{ md: 8, xs: 6 }}>
              <Grid container item xs={12} md={4}>
                <Typography variant="h3" textTransform="uppercase">
                  Disciplinas Artísticas
                </Typography>
              </Grid>

              <Grid container item xs={12} md={7} flexDirection="column">
                <Grid container alignItems="center" gap={3} marginBottom={2}>
                  <Divider
                    sx={{
                      width: `50px`,
                      height: `2px`,
                      backgroundColor: `common.black`,
                      borderRadius: `5px`,
                    }}
                  />

                  <Typography variant="h4">Explora la variedad de artes que ofrecemos</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" paddingLeft={widthAboveLg ? 2 : 0}>
                    En Dantza, ofrecemos una amplia gama de disciplinas artísticas para todos los
                    niveles y edades. Únete a nosotros y descubre la pasión por el arte en cada
                    movimiento.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent={{ xs: `center`, md: `flex-start` }}
              alignItems="center"
              gap={3}
              marginBottom={6}
            >
              {disciplinesLinks.map((discipline, index) => {
                if (index === disciplinesLinks.length - 1) {
                  return (
                    <Typography
                      key={discipline.uuid}
                      variant="body1"
                      color="primary"
                      onClick={() => handleOpenDiscipline(discipline.uuid)}
                      sx={{
                        cursor: `pointer`,
                        '&:hover': {
                          textDecoration: `underline`,
                        },
                      }}
                    >
                      {discipline.name}
                    </Typography>
                  )
                }
                return (
                  <>
                    <Typography
                      key={discipline.uuid}
                      variant="body1"
                      color="primary"
                      onClick={() => handleOpenDiscipline(discipline.uuid)}
                      sx={{
                        cursor: `pointer`,
                        '&:hover': {
                          textDecoration: `underline`,
                        },
                      }}
                    >
                      {discipline.name}
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
              {isLoadingDisciplines ? <CardLoading /> : null}

              {disciplines.slice(0, 4).map((discipline) => (
                <CardDiscipline
                  key={discipline.uuid}
                  discipline={discipline}
                  onClick={handleOpenDiscipline}
                />
              ))}

              <Grid container item width="fit-content" marginBottom={{ md: 4, xs: 0 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    width: `220px`,
                    height: `350px`,
                  }}
                  onClick={handleOpenAllDisciplines}
                >
                  Ver más
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <CalendarDisciplines
            disciplines={disciplines}
            handleOpenDiscipline={handleOpenDiscipline}
          />
        </Container>
      </Grid>
    </>
  )
}

export default Disciplines
