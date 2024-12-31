import Container from '@/common/components/Container'
import Icon from '@/common/components/Icon'
import { useEventQuery } from '@/common/querys/useEventQuery'
import { Box, Button, Divider, Grid, Paper, Skeleton, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import DrawerGallery from './components/DrawerGallery'
import { EventReturn } from '@/common/types'
import { useEventStore } from '@/common/store/useEventStore'

const Gallery = (): JSX.Element => {
  const { data: eventsQuery, isLoading } = useEventQuery()

  const { setGalleryEvents } = useEventStore()

  const eventsWithImages = useMemo(() => {
    if (!eventsQuery?.data) {
      return []
    }

    return eventsQuery.data
      .filter((event) => event.imagesUploaded.length > 0)
      .sort((a, b) => {
        return dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1
      })
      .slice(0, 7)
  }, [eventsQuery])

  useEffect(() => {
    setGalleryEvents(eventsWithImages)
  }, [eventsWithImages])

  const [selectedEvent, setSelectedEvent] = useState<EventReturn | undefined>(undefined)
  const [openAllEvents, setOpenAllEvents] = useState(false)

  const handleOpenAllEvents = (): void => {
    setOpenAllEvents(true)
  }
  const handleCloseAllEvents = (): void => {
    setOpenAllEvents(false)
    setSelectedEvent(undefined)
  }
  const handleOpenEvent = (event: EventReturn): void => {
    setSelectedEvent(event)
    setOpenAllEvents(true)
  }
  const handleCloseEvent = (): void => {
    setSelectedEvent(undefined)
  }

  if (!eventsWithImages.length) {
    return <></>
  }

  return (
    <Grid
      id="gallery"
      container
      minHeight="60vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: {
          xs: `32px 32px 32px 32px`,
          sm: `48px 48px 48px 48px`,
          md: `48px 48px 48px 300px`,
        },
      }}
    >
      <DrawerGallery
        open={openAllEvents}
        onClose={handleCloseAllEvents}
        selectedEvent={selectedEvent}
        events={eventsWithImages}
        handleOpenEvent={handleOpenEvent}
        handleCloseEvent={handleCloseEvent}
      />
      <Container>
        <Grid container gap={6} minHeight="60vh">
          <Grid container item xs={12}>
            <Grid container gap={3} marginBottom={2} alignItems="center">
              <Grid container width={50}>
                <Divider
                  sx={{
                    width: `100%`,
                    height: `2px`,
                    backgroundColor: `common.black`,
                    borderRadius: `5px`,
                  }}
                />
              </Grid>
              <Grid container xs>
                <Typography variant="h3" textTransform="uppercase">
                  Galeria
                </Typography>
              </Grid>
            </Grid>
            <Grid container gap={3} marginBottom={2} alignItems="center">
              {isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                  <Paper
                    key={index}
                    sx={{
                      width: `300px`,
                      minHeight: `330px`,
                      padding: 1,
                      borderRadius: `16px`,
                      position: `relative`,
                    }}
                    elevation={3}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="189px"
                      animation="wave"
                      sx={{
                        borderRadius: `8px`,
                      }}
                    />

                    <Grid container padding={1} flex={1} gap={1}>
                      <Skeleton variant="text" width="100%" height="32px" animation="wave" />
                      <Skeleton variant="text" width="80%" height="21px" animation="wave" />
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="36px"
                        animation="wave"
                        sx={{
                          borderRadius: `4px`,
                        }}
                      />
                    </Grid>
                  </Paper>
                ))
                : null}
              {eventsWithImages.map((event) => {
                const mainImage = event.imagesUploaded.find((image) => image.isMain)
                return (
                  <Paper
                    key={event.uuid}
                    sx={{
                      width: `300px`,
                      minHeight: `330px`,
                      padding: 1,
                      borderRadius: `16px`,
                      position: `relative`,
                    }}
                    elevation={3}
                  >
                    <Box
                      sx={{
                        position: `absolute`,
                        top: 16,
                        left: 16,
                        backgroundColor: `common.white`,
                        paddingY: 0.5,
                        paddingX: 1,
                        borderRadius: `4px`,
                      }}
                    >
                      <Typography variant="body2" color="common.black">
                        {dayjs(event.date).format(`DD/MM/YYYY`)}
                      </Typography>
                    </Box>
                    <img
                      src={mainImage?.url}
                      alt={event.name}
                      width="100%"
                      style={{
                        borderRadius: `8px`,
                      }}
                    />
                    <Grid container padding={1} flex={1} gap={1} flexDirection="column">
                      <Typography variant="h6">{event.name}</Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          gap: 0.5,
                        }}
                      >
                        <Icon
                          icon="location"
                          sx={{
                            fontSize: 16,
                          }}
                        />
                        {event.location}
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          textTransform: `none`,
                        }}
                        onClick={() => setSelectedEvent(event)}
                      >
                        Ver imágenes
                      </Button>
                    </Grid>
                  </Paper>
                )
              })}
              {eventsWithImages.length >= 7 ? (
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    width: `300px`,
                    height: `354px`,
                    borderRadius: 4,
                  }}
                  onClick={handleOpenAllEvents}
                >
                  Ver más
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default Gallery
