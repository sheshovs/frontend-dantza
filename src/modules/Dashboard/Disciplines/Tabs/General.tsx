import Icon from '@/common/components/Icon'
import { Image } from '@/common/types'
import { formatFileName } from '@/common/utils/format'
import {
  Alert,
  Autocomplete,
  Button,
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'

interface GeneralProps {
  name: string
  description: string
  categories: string[]
  allImages: (File | Image)[]
  mainImageName: string
  disableScheduleTab: boolean
  setTabValue: (value: string) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleDeleteImage: (image: File | Image) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCategoryChange: (values: string[]) => void
  handleClickMainImage: (name: string) => void
}

const General = ({
  name,
  description,
  categories,
  allImages,
  mainImageName,
  disableScheduleTab,
  setTabValue,
  handleInputChange,
  handleDeleteImage,
  handleChange,
  handleCategoryChange,
  handleClickMainImage,
}: GeneralProps): JSX.Element => {
  return (
    <Grid container item xs gap={2} flexDirection="column">
      <Grid container item xs gap={1}>
        <Grid item xs={12}>
          <Typography variant="body1">Nombre</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField size="small" fullWidth name="name" value={name} onChange={handleInputChange} />
        </Grid>
      </Grid>

      <Grid container item xs gap={1}>
        <Grid item xs={12}>
          <Typography variant="body1">Descripción</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={3}
            fullWidth
            name="description"
            value={description}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Grid container item xs gap={1}>
        <Grid container item xs={12} alignItems="center" gap={0.5}>
          <Typography variant="body1" width="fit-content">
            Categorias
          </Typography>
          <Typography
            variant="body2"
            width="fit-content"
            sx={{ color: `text.secondary`, fontSize: `13px !important` }}
          >
            (opcional)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={[]}
            freeSolo
            value={categories}
            onChange={(_, value) => {
              handleCategoryChange(value)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  '& .MuiAutocomplete-inputRoot': {
                    paddingY: 0.5,
                    paddingX: 1,
                  },
                }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid container item xs gap={1}>
        <Grid item xs={12}>
          <Typography variant="body1">Imágenes</Typography>
          <Typography
            variant="body2"
            sx={{
              color: `text.secondary`,
              fontSize: `13px !important`,
            }}
          >
            Puedes agregar un máximo de 10 imágenes ·{` `}
            <span
              style={{
                color: allImages.length > 10 ? `red` : ``,
              }}
            >
              {allImages.length}/10
            </span>
          </Typography>
        </Grid>
        <Grid container item xs={12} gap={2}>
          <Button
            fullWidth
            sx={{
              height: `75px`,
              textTransform: `none`,
              flexDirection: `column`,
              fontSize: `12px`,
              alignItems: `center`,
              padding: `0`,
            }}
            variant="outlined"
            color="primary"
            component="label"
            disabled={allImages.length >= 10}
          >
            <input
              hidden
              multiple
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleChange}
            />
            <Icon
              icon="addPhotos"
              sx={{
                fontSize: `20px`,
              }}
            />
            Agregar imágenes
          </Button>
          {allImages.length > 0 ? (
            <Grid
              item
              xs
              maxHeight={180}
              sx={{
                borderRadius: `5px`,
                border: `1px solid rgba(0, 0, 0, 0.2)`,
                overflowY: `auto`,
                '&::-webkit-scrollbar': {
                  width: `0.4em`,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: `rgba(0, 0, 0, 0.2)`,
                  borderRadius: `5px`,
                },
              }}
            >
              {allImages.map((image, index) => {
                const isMainImage = image.name === mainImageName
                const isLastImage = index === allImages.length - 1
                return (
                  <Grid
                    container
                    key={image.name}
                    padding={1}
                    gap={2}
                    alignItems="center"
                    sx={{
                      borderBottom: isLastImage ? `` : `1px solid rgba(0, 0, 0, 0.12)`,
                      backgroundColor: isMainImage ? `#c8e6c9` : ``,
                      '&:hover': {
                        backgroundColor: isMainImage ? `` : `rgba(0, 0, 0, 0.03)`,
                        cursor: `pointer`,
                      },
                    }}
                    onClick={() => {
                      handleClickMainImage(image.name)
                    }}
                  >
                    <Grid container item xs alignItems="center" gap={1}>
                      <img
                        src={image instanceof File ? URL.createObjectURL(image) : image.url}
                        alt={image.name}
                        width={50}
                        height={50}
                        style={{
                          objectFit: `cover`,
                          borderRadius: `3px`,
                          pointerEvents: `none`,
                        }}
                      />
                      <Typography variant="body2" sx={{ marginLeft: 1 }}>
                        {formatFileName(image.name, 30)}
                      </Typography>
                    </Grid>
                    {isMainImage ? (
                      <Chip label="Principal" size="small" sx={{ marginLeft: 1 }} color="primary" />
                    ) : null}
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleDeleteImage(image)
                      }}
                      sx={{
                        width: `20px`,
                        height: `20px`,
                        borderRadius: `5px`,
                        padding: 2,
                      }}
                    >
                      <Icon
                        icon="close"
                        sx={{
                          fontSize: `24px`,
                        }}
                      />
                    </IconButton>
                  </Grid>
                )
              })}
            </Grid>
          ) : null}
        </Grid>
        <Grid item xs={12} marginTop={2}>
          <Alert severity="info">
            <Typography variant="body2">
              Haz clic en una imagen para seleccionarla como principal
            </Typography>
          </Alert>
        </Grid>
      </Grid>
      <Grid container item xs gap={1} justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          disabled={disableScheduleTab}
          onClick={() => {
            setTabValue(`schedule`)
          }}
        >
          Siguiente
        </Button>
      </Grid>
    </Grid>
  )
}

export default General
