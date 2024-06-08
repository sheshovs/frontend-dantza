import { Grid, Skeleton } from '@mui/material'

const CardLoading = (): JSX.Element[] => {
  return Array.from({ length: 4 }).map((_, index) => (
    <Grid
      key={index}
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
    >
      <Skeleton variant="rounded" width={220} height={350} />

      <Skeleton variant="text" width={220} height={48} />
    </Grid>
  ))
}

export default CardLoading
