import Icon from '@/common/components/Icon'
import { Alert, Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SortableList, { SortableItem } from 'react-easy-sort'

interface GeneralProps {
  disciplineName: string
  disciplineDescription: string
  secondaryImages: File[]
  setTabValue: (value: string) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSortEnd: (oldIndex: number, newIndex: number) => void
  handleDeleteImage: (name: string) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const General = ({
  disciplineName,
  disciplineDescription,
  secondaryImages,
  setTabValue,
  handleInputChange,
  onSortEnd,
  handleDeleteImage,
  handleChange,
}: GeneralProps): JSX.Element => {
  const [isHover, setIsHover] = useState(``)

  const onMouseEnter = (name: string): void => {
    setIsHover(name)
  }
  const onMouseLeave = (): void => {
    setIsHover(``)
  }
  return (
    <Grid container item xs gap={2} flexDirection="column">
      <Grid container item xs gap={1}>
        <Grid item xs={12}>
          <Typography variant="body1">Nombre</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            fullWidth
            name="disciplineName"
            value={disciplineName}
            onChange={handleInputChange}
          />
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
            name="disciplineDescription"
            value={disciplineDescription}
            onChange={handleInputChange}
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
                color: secondaryImages.length > 10 ? `red` : ``,
              }}
            >
              Fotos · {secondaryImages.length}/10
            </span>
            {` `}- Puedes agregar un máximo de 10 fotos.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
            {secondaryImages.map((image) => (
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
                      handleDeleteImage(image.name)
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
                    src={URL.createObjectURL(image)}
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
              disabled={secondaryImages.length >= 10}
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
          disabled={
            !disciplineName ||
            !disciplineDescription ||
            secondaryImages.length < 1 ||
            secondaryImages.length > 10
          }
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
