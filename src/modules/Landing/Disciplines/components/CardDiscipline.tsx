import { DisciplineReturn } from '@/common/types'
import { Grid, Typography } from '@mui/material'

interface CardProps {
  discipline: DisciplineReturn
  onClick: (disciplineId: string) => void
}

const CardDiscipline = ({ discipline, onClick }: CardProps): JSX.Element => {
  const mainPicture = discipline.images.find((image) => image.isMain)
  return (
    <Grid
      key={discipline.uuid}
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
      onClick={() => onClick(discipline.uuid)}
    >
      <img
        src={mainPicture?.url}
        alt={`Foto de la disciplina ${discipline.name}`}
        width={220}
        height={350}
        style={{
          objectFit: `cover`,
          objectPosition: `center`,
          imageOrientation: `from-image`,
          borderRadius: `4px`,
        }}
      />
      <Typography variant="h5" fontWeight={700} padding={1} flexWrap="wrap">
        {discipline.name}
      </Typography>
    </Grid>
  )
}

export default CardDiscipline
