import {
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CardTeacher from './CardTeacher'
import { TeacherReturn } from '@/common/types'
import Icon from '@/common/components/Icon'
import SelectedTeacher from './SelectedTeacher'
import CardLoading from '@/common/components/CardLoading'

interface DrawerTeachersProps {
  open: boolean
  teacher: TeacherReturn | undefined
  isLoadingTeacher: boolean
  teachers: TeacherReturn[]
  isLoadingTeachers: boolean
  onClose: () => void
  handleOpenTeacher: (teacherId: string) => void
  handleCloseTeacher: () => void
}

const DrawerTeachers = ({
  open,
  teacher,
  isLoadingTeacher,
  teachers,
  isLoadingTeachers,
  onClose,
  handleOpenTeacher,
  handleCloseTeacher,
}: DrawerTeachersProps): JSX.Element => {
  const { breakpoints } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))

  const handleDrawerContent = (): JSX.Element => {
    if (isLoadingTeacher && !teacher) {
      return (
        <Grid container height="100vh" justifyContent="center" alignItems="center" padding={6}>
          <CircularProgress />
        </Grid>
      )
    }

    if (teacher) {
      return <SelectedTeacher teacher={teacher} handleCloseTeacher={handleCloseTeacher} />
    }

    return (
      <Grid container padding={6} gap={4}>
        <Typography variant="h4">Todos los profesores</Typography>

        <Grid container gap={3} justifyContent={widthAboveLg ? `flex-start` : `center`}>
          {isLoadingTeachers ? <CardLoading /> : null}

          {teachers.map((teacher) => (
            <CardTeacher key={teacher.uuid} teacher={teacher} onClick={handleOpenTeacher} />
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

export default DrawerTeachers
