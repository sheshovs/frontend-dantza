import {
  Box,
  CircularProgress,
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
        <Typography variant="h4">Todas las profesoras</Typography>

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
    <Grid
      container
      minHeight="100vh"
      position="absolute"
      top={0}
      bottom={0}
      right={0}
      width={open ? `100%` : 0}
    >
      <Grid
        container
        height="100%"
        sx={{
          position: `absolute`,
          right: 0,
          display: `flex`,
          flexDirection: `column`,
          // eslint-disable-next-line no-nested-ternary
          width: open ? (teacher ? `45%` : `97%`) : 0,
          transition: `width 0.3s ease-in-out`,
          backgroundColor: `white`,
          zIndex: 1002,
          boxShadow: `0px 0px 10px 0px rgba(0,0,0,0.2)`,
          overflowY: `auto`,
          flexWrap: `wrap`,
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
      </Grid>
      <Box
        onClick={onClose}
        sx={{
          position: `absolute`,
          right: 0,
          width: open ? `100%` : 0,
          height: `100%`,
          backgroundColor: `rgba(0,0,0,0.5)`,
          zIndex: 1001,
        }}
      />
    </Grid>
  )
}

export default DrawerTeachers
