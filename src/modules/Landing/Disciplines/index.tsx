import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import Container from '../../../common/components/Container'
import { useDisciplineByIdQuery } from '@/common/querys/useDisciplineQuery'
import { useMemo, useState } from 'react'
import CardDiscipline from './components/CardDiscipline'
import DrawerDisciplines from './components/DrawerDisciplines'
import { DisciplineReturn } from '@/common/types'

interface DisciplinesProps {
  disciplinesLinks: {
    name: string
    uuid: string
  }[]
  disciplines: DisciplineReturn[]
}

const Disciplines = ({ disciplinesLinks, disciplines }: DisciplinesProps): JSX.Element => {
  const [openAllDisciplines, setOpenAllDisciplines] = useState(false)
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | undefined>(undefined)
  const { data: disciplineQuery } = useDisciplineByIdQuery(selectedDisciplineId!)

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
        disciplines={disciplines}
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
            <Grid container item xs={12} gap={4} marginBottom={{ md: 10, xs: 8 }}>
              <Grid container item xs={12} md={4}>
                <Typography variant="h3" textTransform="uppercase">
                  Disciplinas Artísticas
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
                    <Typography variant="h4">Explora la variedad de artes que ofrecemos</Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body1" paddingLeft={2}>
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
              marginBottom={8}
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
        </Container>
      </Grid>
    </>
  )
}

export default Disciplines
