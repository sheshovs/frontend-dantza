import { DisciplineReturn } from '@/common/types'
import { Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
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

const messages = {
  allDay: `Todo el día`,
  previous: `Anterior`,
  next: `Siguiente`,
  today: `Hoy`,
  month: `Mes`,
  week: `Semana`,
  day: `Día`,
  agenda: `Agenda`,
  date: `Fecha`,
  time: `Hora`,
  event: `Evento`,
  noEventsInRange: `No hay eventos en este rango`,
  showMore: (total: number) => `+ ${total} eventos`,
}

const localizer = dayjsLocalizer(dayjs)

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

interface ComponentEventProps {
  event: CalendarEvent
  handleOpenDiscipline: (disciplineId: string) => void
}

const ComponentEvent = ({ event, handleOpenDiscipline }: ComponentEventProps): JSX.Element => {
  return (
    <Grid container height="100%">
      <Grid
        container
        height="95%"
        bgcolor="primary.main"
        onClick={() => {
          handleOpenDiscipline(event.uuid)
        }}
        paddingY={0.25}
        paddingX={0.625}
        sx={{
          borderRadius: 1,
          border: `1px solid #ffffff33`,
          flexWrap: `nowrap`,
          flexDirection: `column`,
        }}
      >
        <Typography variant="subtitle2">{event.title}</Typography>
        <Typography variant="subtitle2">{`${dayjs(event.start).format(`HH:mm`)} - ${dayjs(
          event.end,
        ).format(`HH:mm`)}`}</Typography>
      </Grid>
    </Grid>
  )
}

interface CalendarDisciplinesProps {
  disciplines: DisciplineReturn[]
  handleOpenDiscipline: (disciplineId: string) => void
}

const CalendarDisciplines = ({
  disciplines,
  handleOpenDiscipline,
}: CalendarDisciplinesProps): JSX.Element => {
  const events = formatEvents(disciplines)
  const minHour = dayjs().hour(9).minute(0).toDate()
  const maxHour = dayjs().hour(21).minute(0).toDate()

  return (
    <Grid container marginBottom={2} height="100%" id="schedule">
      <Typography variant="h3" textTransform="uppercase" marginBottom={2}>
        Horario dantza
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ width: `100%` }}
        step={60}
        timeslots={1}
        view="week"
        views={[`week`]}
        defaultView="week"
        defaultDate={dayjs().day(1).toDate()}
        min={minHour}
        max={maxHour}
        messages={messages}
        formats={{
          dayFormat: (date) => dayjs(date).format(`dddd`),
        }}
        components={{
          event: (event) => (
            <ComponentEvent event={event.event} handleOpenDiscipline={handleOpenDiscipline} />
          ),
          toolbar: () => null,
        }}
      />
    </Grid>
  )
}

export default CalendarDisciplines
