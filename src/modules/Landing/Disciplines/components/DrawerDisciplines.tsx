import {
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CardDiscipline from './CardDiscipline'
import { DisciplineOneReturn, DisciplineReturn } from '@/common/types'
import Icon from '@/common/components/Icon'
import CardLoading from '@/common/components/CardLoading'
import SelectedDiscipline from './SelectedDiscipline'

interface DrawerDisciplinesProps {
  open: boolean
  discipline: DisciplineOneReturn | undefined
  isLoadingDiscipline: boolean
  disciplines: DisciplineReturn[]
  isLoadingDisciplines: boolean
  onClose: () => void
  handleOpenDiscipline: (disciplineId: string) => void
  handleCloseDiscipline: () => void
}

const DrawerDisciplines = ({
  open,
  discipline,
  isLoadingDiscipline,
  disciplines,
  isLoadingDisciplines,
  onClose,
  handleOpenDiscipline,
  handleCloseDiscipline,
}: DrawerDisciplinesProps): JSX.Element => {
  const { breakpoints } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))

  const handleDrawerContent = (): JSX.Element => {
    if (isLoadingDiscipline && !discipline) {
      return (
        <Grid container height="100vh" justifyContent="center" alignItems="center" padding={6}>
          <CircularProgress />
        </Grid>
      )
    }

    if (discipline) {
      return (
        <SelectedDiscipline
          discipline={discipline}
          widthAboveLg={widthAboveLg}
          handleCloseDiscipline={handleCloseDiscipline}
        />
      )
    }

    return (
      <Grid container padding={6} gap={4}>
        <Typography variant="h4">Todas las disciplinas</Typography>

        <Grid container gap={3} justifyContent={widthAboveLg ? `flex-start` : `center`}>
          {isLoadingDisciplines ? <CardLoading /> : null}

          {disciplines.map((discipline) => (
            <CardDiscipline
              key={discipline.uuid}
              discipline={discipline}
              onClick={handleOpenDiscipline}
            />
          ))}
        </Grid>
      </Grid>
    )
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          width: widthAboveLg ? `97%` : `100%`,
          height: `100%`,
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: `absolute`,
          top: 20,
          right: 20,
          borderRadius: 0.5,
        }}
      >
        <Icon icon="close" />
      </IconButton>

      {handleDrawerContent()}
    </Drawer>
  )
}

export default DrawerDisciplines
