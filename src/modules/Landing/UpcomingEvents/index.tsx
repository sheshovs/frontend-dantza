import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import Container from '../../../common/components/Container'
import { EVENT_BG } from '../../../assets'
import Countdown, { zeroPad } from 'react-countdown'
import dayjs from 'dayjs'
import { useNextEventsQuery } from '@/common/querys/useEventQuery'
import { useMemo } from 'react'
import Icon from '@/common/components/Icon'

const CountdownRendererLarge = ({ days, hours, minutes, seconds }: any): JSX.Element => {
  return (
    <Grid container gap={2} alignItems="center">
      <Grid container item xs flexDirection="column" alignItems="center">
        <Typography
          variant="h2"
          color="common.white"
          sx={{
            lineHeight: `${1} !important`,
          }}
        >
          {zeroPad(days)}
        </Typography>
        <Typography
          variant="body2"
          color="common.white"
          textTransform="uppercase"
          letterSpacing={3}
        >
          dias
        </Typography>
      </Grid>
      <Divider
        orientation="vertical"
        sx={{
          backgroundColor: `common.grey`,
          height: `65%`,
        }}
      />
      <Grid container item xs flexDirection="column" alignItems="center">
        <Typography
          variant="h2"
          color="common.white"
          sx={{
            lineHeight: `${1} !important`,
          }}
        >
          {zeroPad(hours)}
        </Typography>
        <Typography
          variant="body2"
          color="common.white"
          textTransform="uppercase"
          letterSpacing={3}
        >
          horas
        </Typography>
      </Grid>
      <Divider
        orientation="vertical"
        sx={{
          backgroundColor: `common.grey`,
          height: `65%`,
        }}
      />
      <Grid container item xs flexDirection="column" alignItems="center">
        <Typography
          variant="h2"
          color="common.white"
          sx={{
            lineHeight: `${1} !important`,
          }}
        >
          {zeroPad(minutes)}
        </Typography>
        <Typography
          variant="body2"
          color="common.white"
          textTransform="uppercase"
          letterSpacing={3}
        >
          minutos
        </Typography>
      </Grid>
      <Divider
        orientation="vertical"
        sx={{
          backgroundColor: `common.grey`,
          height: `65%`,
        }}
      />
      <Grid container item xs flexDirection="column" alignItems="center">
        <Typography
          variant="h2"
          color="common.white"
          sx={{
            lineHeight: `${1} !important`,
          }}
        >
          {zeroPad(seconds)}
        </Typography>
        <Typography
          variant="body2"
          color="common.white"
          textTransform="uppercase"
          letterSpacing={3}
        >
          segundos
        </Typography>
      </Grid>
    </Grid>
  )
}

const CountdownRendererSmall = ({ days, hours, minutes, seconds }: any): JSX.Element => {
  return (
    <Grid container gap={2} alignItems="center" flexDirection="column">
      <Grid container item xs width="60%" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h2"
          color="common.white"
          sx={{
            lineHeight: `${1} !important`,
          }}
        >
          {zeroPad(days)}
        </Typography>
        <Typography
          variant="body2"
          color="common.white"
          textTransform="uppercase"
          letterSpacing={3}
        >
          dias
        </Typography>
      </Grid>
      <Divider
        orientation="horizontal"
        sx={{
          backgroundColor: `common.grey`,
          width: `65%`,
        }}
      />
      <Grid container item xs width="60%" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h2"
          color="common.white"
          sx={{
            lineHeight: `${1} !important`,
          }}
        >
          {zeroPad(hours)}
        </Typography>
        <Typography
          variant="body2"
          color="common.white"
          textTransform="uppercase"
          letterSpacing={3}
        >
          horas
        </Typography>
      </Grid>
      <Divider
        orientation="horizontal"
        sx={{
          backgroundColor: `common.grey`,
          width: `65%`,
        }}
      />
      <Grid container item xs width="60%" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h2"
          color="common.white"
          sx={{
            lineHeight: `${1} !important`,
          }}
        >
          {zeroPad(minutes)}
        </Typography>
        <Typography
          variant="body2"
          color="common.white"
          textTransform="uppercase"
          letterSpacing={3}
        >
          minutos
        </Typography>
      </Grid>
      <Divider
        orientation="horizontal"
        sx={{
          backgroundColor: `common.grey`,
          width: `65%`,
        }}
      />
      <Grid container item xs width="60%" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h2"
          color="common.white"
          sx={{
            lineHeight: `${1} !important`,
          }}
        >
          {zeroPad(seconds)}
        </Typography>
        <Typography
          variant="body2"
          color="common.white"
          textTransform="uppercase"
          letterSpacing={3}
        >
          segundos
        </Typography>
      </Grid>
    </Grid>
  )
}

const UpcomingEvents = (): JSX.Element => {
  const {
    palette: { common },
    breakpoints,
  } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(900))
  const { data: eventsQuery } = useNextEventsQuery()

  const nextEvents = useMemo(() => {
    if (!eventsQuery?.data) {
      return []
    }

    return eventsQuery.data
  }, [eventsQuery])

  return (
    <Grid
      id="upcoming-events"
      container
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `url(${EVENT_BG})`,
        backgroundPosition: `center`,
        backgroundRepeat: `no-repeat`,
        backgroundSize: `cover`,
        padding: {
          xs: `32px 32px 32px 32px`,
          sm: `48px 48px 48px 48px`,
          md: `48px 48px 48px 300px`,
        },
        position: `relative`,
        '&:after': {
          content: `''`,
          position: `absolute`,
          top: 0,
          left: 0,
          width: `100%`,
          height: `100%`,
          backgroundColor: `rgba(0,0,0,0.7)`,
          zIndex: 50,
        },
      }}
    >
      <Container>
        <Grid container zIndex={51} gap={{ md: 8, xs: 4 }}>
          <Grid container>
            <Typography variant="h3" textTransform="uppercase" color="common.white">
              Próximos eventos
            </Typography>
          </Grid>
          {nextEvents.length > 0 ? (
            <Grid container gap={4}>
              {nextEvents.slice(0, 3).map((event) => (
                <Grid
                  container
                  item
                  xs={12}
                  gap={4}
                  key={event.uuid}
                  paddingY={3}
                  paddingLeft={{ md: 4, xs: 3 }}
                  paddingRight={{ md: 8, xs: 3 }}
                  sx={{
                    backgroundColor: `rgba(0,0,0,0.6)`,
                    border: `1px solid rgba(255,255,255,0.4)`,
                    borderRadius: 4,
                  }}
                >
                  <Grid container item xs gap={2}>
                    <Grid item>
                      <Typography variant="h4" color="common.white" marginBottom={0.5}>
                        {event.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={`${common.white}99`}
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          gap: 1,
                          lineHeight: `1 !important`,
                        }}
                      >
                        <Icon
                          icon="location"
                          sx={{
                            fontSize: 20,
                          }}
                        />
                        {event.location} -
                        <Icon
                          icon="datetime"
                          sx={{
                            fontSize: 20,
                          }}
                        />
                        {dayjs(event.date).format(`DD/MM/YYYY HH:mm`)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={11}>
                      <Typography variant="body1" color={`${common.white}99`}>
                        {event.description}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} md={5} color="common.white">
                    <Countdown
                      date={dayjs(event.date).toDate()}
                      renderer={widthAboveLg ? CountdownRendererLarge : CountdownRendererSmall}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container gap={8}>
              <Grid container item xs flexDirection="column" gap={2}>
                <Typography variant="h4" color="common.white">
                  No hay eventos próximos
                </Typography>
                <Typography variant="body1" color={`${common.white}CC`}>
                  Actualmente no tenemos eventos programados, pero estamos trabajando en nuevas y
                  emocionantes actividades para ti. ¡Mantente atento a nuestras actualizaciones y no
                  te pierdas la oportunidad de ser parte de nuestros futuros eventos! Síguenos en
                  nuestras redes sociales para ser el primero en enterarte de todas las novedades y
                  oportunidades para explorar tu pasión artística con Estudio Dantza.
                </Typography>
              </Grid>
              <Grid container item xs>
                <Grid width="500px" height="auto" justifyContent="center" alignItems="center">
                  <img
                    src={EVENT_BG}
                    style={{
                      width: `100%`,
                      height: `auto`,
                      borderRadius: 4,
                      boxShadow: `0px 0px 15px 0px rgba(255,255,255,0.4)`,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </Grid>
  )
}

export default UpcomingEvents
