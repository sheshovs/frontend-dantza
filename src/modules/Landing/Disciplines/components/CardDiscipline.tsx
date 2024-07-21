import { DisciplineReturn } from '@/common/types'
import { Grid, Typography } from '@mui/material'

interface CardProps {
  discipline: DisciplineReturn
  onClick: (disciplineId: string) => void
}

const CardDiscipline = ({ discipline, onClick }: CardProps): JSX.Element => {
  const mainPicture = discipline.imagesUploaded.find((image) => image.isMain)
  return (
    <Grid
      key={discipline.uuid}
      className="card-container"
      container
      item
      flexDirection="column"
      gap={{ md: 3, xs: 2 }}
      marginBottom={{ md: 4, xs: 0 }}
      sx={{
        width: `220px`,
        minHeight: `350px`,
        transition: `color 0.3s ease`,
        '&:hover': {
          cursor: `pointer`,
          color: `primary.main`,
        },
      }}
      onClick={() => onClick(discipline.uuid)}
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
          alt={`Foto de la disciplina ${discipline.name}`}
          width={220}
          height={350}
        />
      </Grid>

      <Typography variant="h5" fontWeight={700} padding={1} flexWrap="wrap">
        {discipline.name}
      </Typography>
    </Grid>
  )
}

export default CardDiscipline
