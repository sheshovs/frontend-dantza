import Icon from '@/common/components/Icon'
import { TeacherReturn } from '@/common/types'
import { Divider, Grid, Typography } from '@mui/material'

interface CardProps {
  teacher: TeacherReturn
  onClick: (teacherId: string) => void
}

const CardTeacher = ({ teacher, onClick }: CardProps): JSX.Element => {
  const mainPicture = teacher.imagesUploaded.find((image) => image.isMain)
  return (
    <Grid
      key={teacher.uuid}
      className="card-container"
      container
      item
      width="220px"
      flexDirection="column"
      gap={{ md: 3, xs: 2 }}
      marginBottom={{ md: 4, xs: 0 }}
      sx={{
        width: `220px`,
        minHeight: `350px`,
        '&:hover': {
          cursor: `pointer`,
        },
      }}
      onClick={() => onClick(teacher.uuid)}
    >
      <Grid
        item
        sx={{
          width: `100%`,
          height: `350px`,
          overflow: `hidden`,
          borderRadius: `4px`,
        }}
      >
        <img
          className="card-image"
          src={mainPicture?.url}
          alt={`Foto de ${teacher.name}`}
          width={220}
          height={350}
        />
      </Grid>
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
