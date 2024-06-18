import Icon from '@/common/components/Icon'
import { Image } from '@/common/types'
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import SortableList, { SortableItem } from 'react-easy-sort'

interface GeneralProps {
  name: string
  description: string
  images: File[]
  imagesUploaded: Image[]
  categories: string[]
  setTabValue: (value: string) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSortEnd: (oldIndex: number, newIndex: number) => void
  handleDeleteImage: (image: File | Image) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCategoryChange: (values: string[]) => void
}

const General = ({
  name,
  description,
  images,
  imagesUploaded,
  categories,
  setTabValue,
  handleInputChange,
  onSortEnd,
  handleDeleteImage,
  handleChange,
  handleCategoryChange,
}: GeneralProps): JSX.Element => {
  const [isHover, setIsHover] = useState(``)

  const onMouseEnter = (name: string): void => {
    setIsHover(name)
  }
  const onMouseLeave = (): void => {
    setIsHover(``)
  }

  const allImages = [...imagesUploaded, ...images]

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
            <span
              style={{
                color: allImages.length > 10 ? `red` : ``,
              }}
            >
              Fotos · {allImages.length}/10
            </span>
            {` `}- Puedes agregar un máximo de 10 fotos.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
            {allImages.map((image) => (
              <SortableItem key={image.name}>
                <Box
                  className="item"
                  onMouseEnter={() => {
                    onMouseEnter(image.name)
                  }}
                  onMouseLeave={onMouseLeave}
                >
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleDeleteImage(image)
                    }}
                    sx={{
                      display: isHover === image.name ? `flex` : `none`,
                      position: `absolute`,
                      top: 0,
                      right: 0,
                      zIndex: 1,
                      padding: 0,
                      borderRadius: `0 0 0 5px`,
                      width: `20px`,
                      height: `20px`,
                      backgroundColor: `common.white`,
                      '&:hover': {
                        backgroundColor: `#ffffffe6`,
                      },
                    }}
                  >
                    <Icon
                      icon="close"
                      sx={{
                        fontSize: `16px`,
                      }}
                    />
                  </IconButton>
                  <img
                    src={image instanceof File ? URL.createObjectURL(image) : image.url}
                    alt={image.name}
                    width={100}
                    height={100}
                    style={{
                      objectFit: `cover`,
                      borderRadius: `5px`,
                      pointerEvents: `none`,
                    }}
                  />
                </Box>
              </SortableItem>
            ))}
            <Button
              sx={{
                width: `100px`,
                height: `100px`,
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
              Agregar foto
            </Button>
          </SortableList>
        </Grid>
        <Grid item xs={12} marginTop={2}>
          <Alert severity="info">
            <Typography variant="body2">
              La primera imagen será la principal de la disciplina.
            </Typography>
          </Alert>
        </Grid>
      </Grid>
      <Grid container item xs gap={1} justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          disabled={!name || !description || allImages.length < 1 || allImages.length > 10}
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
