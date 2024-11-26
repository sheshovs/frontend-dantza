import { DisciplineReturn } from '@/common/types'
import {
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import dayjs from 'dayjs'
import './calendar.css'
import 'dayjs/locale/es'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.locale(`es`)
dayjs.extend(updateLocale)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(`America/Santiago`)

dayjs.updateLocale(`es`, {
  weekdays: [`Domingo`, `Lunes`, `Martes`, `Miércoles`, `Jueves`, `Viernes`, `Sábado`],
  months: [
    `Enero`,
    `Febrero`,
    `Marzo`,
    `Abril`,
    `Mayo`,
    `Junio`,
    `Julio`,
    `Agosto`,
    `Septiembre`,
    `Octubre`,
    `Noviembre`,
    `Diciembre`,
  ],
})

interface CalendarEvent {
  uuid: string
  title: string
  start: Date
  end: Date
  day: string
  category: string
}

enum Days {
  LUNES = `Lunes`,
  MARTES = `Martes`,
  MIERCOLES = `Miércoles`,
  JUEVES = `Jueves`,
  VIERNES = `Viernes`,
  SABADO = `Sábado`,
  DOMINGO = `Domingo`,
}

const dayjsLabelDate: Record<string, number> = {
  [Days.LUNES]: 1,
  [Days.MARTES]: 2,
  [Days.MIERCOLES]: 3,
  [Days.JUEVES]: 4,
  [Days.VIERNES]: 5,
  [Days.SABADO]: 6,
  [Days.DOMINGO]: 0,
}

const formatEvents = (disciplines: DisciplineReturn[]): CalendarEvent[] => {
  const events: CalendarEvent[] = []

  disciplines.forEach((discipline) => {
    Object.keys(discipline.schedule).forEach((level) => {
      discipline.schedule[level].forEach((daySchedule) => {
        daySchedule.daySchedule.forEach((schedule) => {
          const nextDate = dayjs().day(dayjsLabelDate[daySchedule.label]).toDate()
          events.push({
            title: discipline.name,
            start: dayjs(nextDate)
              .set(`hour`, +schedule.start.split(`:`)[0])
              .set(`minute`, +schedule.start.split(`:`)[1])
              .toDate(),
            end: dayjs(nextDate)
              .set(`hour`, +schedule.end.split(`:`)[0])
              .set(`minute`, +schedule.end.split(`:`)[1])
              .toDate(),
            day: daySchedule.label,
            category: level,
            uuid: discipline.uuid,
          })
        })
      })
    })
  })

  return events
}

interface CalendarDisciplinesProps {
  disciplines: DisciplineReturn[]
  handleOpenDiscipline: (disciplineId: string) => void
}

const CalendarDisciplines = ({
  disciplines,
  handleOpenDiscipline,
}: CalendarDisciplinesProps): JSX.Element => {
  const {
    palette: { primary },
    breakpoints,
  } = useTheme()
  const widthAboveLg = useMediaQuery(breakpoints.up(1200))

  const events = formatEvents(disciplines)

  const days = [`Lunes`, `Martes`, `Miércoles`, `Jueves`, `Viernes`, `Sábado`]
  const schedule = days.map((day) => ({
    day,
    slots: events
      .filter((event) => event.day === day)
      .map((event) => ({
        time: {
          start: `${new Date(event.start).getHours()}:00`,
          end: `${new Date(event.end).getHours()}:00`,
        },
        title: event.title,
        category: event.category,
        uuid: event.uuid,
      })),
  }))

  const hours = Array.from({ length: 12 }, (_, i) => `${i + 9}:00`)

  const groupedEvents = days.map((day) => ({
    day,
    events: events
      .filter((event) => event.day === day)
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()),
  }))

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: `2-digit`, minute: `2-digit` })
  }

  return (
    <Grid container marginY={2} height="100%" id="schedule" overflow="auto">
      <Typography variant="h3" textTransform="uppercase" marginBottom={2}>
        Horario dantza
      </Typography>
      {widthAboveLg ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ width: `8%`, borderRight: `1px solid ${primary.light}` }}
                >
                  <strong>Hora</strong>
                </TableCell>
                {days.map((day, index) => (
                  <TableCell
                    key={day}
                    align="center"
                    style={{
                      width: `${92 / days.length}%`,
                      borderLeft: index === 0 ? `none` : `1px solid ${primary.light}`,
                    }}
                  >
                    <strong>{day}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {hours.map((hour) => (
                <TableRow key={hour}>
                  <TableCell
                    align="center"
                    style={{
                      borderRight: `1px solid ${primary.light}`,
                    }}
                  >
                    {hour}
                  </TableCell>
                  {schedule.map((daySchedule, index) => {
                    const eventsAtTime = daySchedule.slots.filter(
                      (slot) => slot.time.start === hour,
                    )

                    return (
                      <TableCell
                        key={`${daySchedule.day}-${hour}`}
                        style={{
                          position: `relative`,
                          padding: 0,
                          borderLeft: index === 0 ? `none` : `1px solid ${primary.light}`,
                        }}
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          justifySelf="center"
                          height="100%"
                          width="98%"
                          style={{
                            display: `flex`,
                            gap: `2px`,
                            flexWrap: `nowrap`,
                          }}
                        >
                          {eventsAtTime.map((event, index) => (
                            <Box
                              key={index}
                              sx={{
                                flexGrow: 1,
                                maxWidth: `${100 / eventsAtTime.length}%`,
                                backgroundColor: `primary.main`,
                                color: `white`,
                                padding: `5px`,
                                textAlign: `center`,
                                borderRadius: `4px`,
                                cursor: `pointer`,
                                transition: `background-color 0.3s`,
                                '&:hover': {
                                  backgroundColor: `primary.light`,
                                },
                              }}
                              onClick={() => {
                                handleOpenDiscipline(event.uuid)
                              }}
                            >
                              <Typography variant="body2" fontWeight={700}>
                                {event.title}
                              </Typography>
                              <Typography variant="caption">
                                {event.time.start} - {event.time.end}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container flexDirection="column">
          {groupedEvents.map((group, index) => (
            <Box key={index} sx={{ marginBottom: `16px` }}>
              {/* Encabezado del día */}
              <Typography variant="h6" sx={{ marginBottom: `8px` }}>
                {group.day}
              </Typography>

              {group.events.length > 0 ? (
                <List>
                  {group.events.map((event) => (
                    <ListItem
                      key={event.uuid}
                      sx={{
                        display: `flex`,
                        flexDirection: `column`,
                        alignItems: `flex-start`,
                        backgroundColor: `primary.main`,
                        color: `white`,
                        borderRadius: `8px`,
                        marginBottom: `8px`,
                        padding: `10px`,
                      }}
                      onClick={() => {
                        handleOpenDiscipline(event.uuid)
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ fontWeight: `bold` }}>
                            {event.title}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2">
                            {formatTime(String(event.start))} - {formatTime(String(event.end))}
                            {` `}| {event.category}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No hay eventos para este día.
                </Typography>
              )}
            </Box>
          ))}
        </Grid>
      )}
    </Grid>
  )
}

export default CalendarDisciplines
