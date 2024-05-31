import Icon from '@/common/components/Icon'
import { TeacherReturn } from '@/common/types'
import { Divider, Grid, Typography } from '@mui/material'

interface CardProps {
  teacher: TeacherReturn
  onClick: (teacherId: string) => void
}

const CardTeacher = ({ teacher, onClick }: CardProps): JSX.Element => {
  const mainPicture = teacher.images.find((image) => image.isMain)
  return (
    <Grid
      key={teacher.uuid}
      container
      item
      width="220px"
      flexDirection="column"
      gap={{ md: 3, xs: 2 }}
      marginBottom={{ md: 4, xs: 0 }}
      sx={{
        borderRadius: `4px`,
        '&:hover': {
          cursor: `pointer`,
        },
      }}
      onClick={() => onClick(teacher.uuid)}
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
      <Grid container flexDirection="column" padding={1}>
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
}

export default CardTeacher
