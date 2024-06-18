import {
  Collapse,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  SwitchProps,
  Typography,
  styled,
  useTheme,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { isDayjs } from 'dayjs'
import Icon from './Icon'
import { DisciplineSchedule, DisciplineState } from '../types/discipline'

const CustomSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 45,
  height: 22,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: `300ms`,
    '&.Mui-checked': {
      transform: `translateX(23px)`,
      color: `#fff`,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === `dark` ? `#4baea0` : `#4baea0`,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: `#4baea0`,
      border: `6px solid #fff`,
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === `light` ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === `light` ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: `border-box`,
    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === `light` ? `#E9E9EA` : `#39393D`,
    opacity: 1,
    transition: theme.transitions.create([`background-color`], {
      duration: 500,
    }),
  },
}))

interface AccordionProps {
  category?: string
  dayItem: DisciplineSchedule
  isExpanded: boolean
  setExpanded: (value: string) => void
  setState: React.Dispatch<React.SetStateAction<DisciplineState>>
  handleChange: (panel: string) => void
}

const Accordion = ({
  category,
  dayItem,
  isExpanded,
  setExpanded,
  setState,
  handleChange,
}: AccordionProps): JSX.Element => {
  const {
    palette: { primary },
  } = useTheme()

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.checked) {
      setExpanded(``)
    }

    if (!category) {
      return setState((prevState) => ({
        ...prevState,
        categorySchedule: {
          ...prevState.categorySchedule,
          [`General`]: prevState.categorySchedule[`General`].map((categoryDayItem) => {
            if (categoryDayItem.label === dayItem.label) {
              return {
                ...categoryDayItem,
                isActive: e.target.checked,
              }
            }
            return categoryDayItem
          }),
        },
      }))
    }

    setState((prevState) => ({
      ...prevState,
      categorySchedule: {
        ...prevState.categorySchedule,
        [category]: prevState.categorySchedule[category].map((categoryDayItem) => {
          if (categoryDayItem.label === dayItem.label) {
            return {
              ...categoryDayItem,
              isActive: e.target.checked,
            }
          }
          return categoryDayItem
        }),
      },
    }))
  }

  const handleStartChange = (
    date: dayjs.Dayjs,
    item: {
      id: number
      start: string
      end: string
    },
  ): void => {
    if (!category) {
      return setState((prevState) => ({
        ...prevState,
        categorySchedule: {
          ...prevState.categorySchedule,
          [`General`]: prevState.categorySchedule[`General`].map((categoryDayItem) => {
            if (categoryDayItem.label === dayItem.label) {
              return {
                ...categoryDayItem,
                daySchedule: categoryDayItem.daySchedule.map((day) => {
                  if (day.id === item.id) {
                    return {
                      ...day,
                      start: date.format(`HH:mm`),
                    }
                  }
                  return day
                }),
              }
            }
            return categoryDayItem
          }),
        },
      }))
    }

    setState((prevState) => ({
      ...prevState,
      categorySchedule: {
        ...prevState.categorySchedule,
        [category]: prevState.categorySchedule[category].map((categoryDayItem) => {
          if (categoryDayItem.label === dayItem.label) {
            return {
              ...categoryDayItem,
              daySchedule: categoryDayItem.daySchedule.map((day) => {
                if (day.id === item.id) {
                  return {
                    ...day,
                    start: date.format(`HH:mm`),
                  }
                }
                return day
              }),
            }
          }
          return categoryDayItem
        }),
      },
    }))
  }

  const handleEndChange = (
    date: dayjs.Dayjs,
    item: {
      id: number
      start: string
      end: string
    },
  ): void => {
    if (!category) {
      return setState((prevState) => ({
        ...prevState,
        categorySchedule: {
          ...prevState.categorySchedule,
          [`General`]: prevState.categorySchedule[`General`].map((categoryDayItem) => {
            if (categoryDayItem.label === dayItem.label) {
              return {
                ...categoryDayItem,
                daySchedule: categoryDayItem.daySchedule.map((day) => {
                  if (day.id === item.id) {
                    return {
                      ...day,
                      end: date.format(`HH:mm`),
                    }
                  }
                  return day
                }),
              }
            }
            return categoryDayItem
          }),
        },
      }))
    }

    setState((prevState) => ({
      ...prevState,
      categorySchedule: {
        ...prevState.categorySchedule,
        [category]: prevState.categorySchedule[category].map((categoryDayItem) => {
          if (categoryDayItem.label === dayItem.label) {
            return {
              ...categoryDayItem,
              daySchedule: categoryDayItem.daySchedule.map((day) => {
                if (day.id === item.id) {
                  return {
                    ...day,
                    end: date.format(`HH:mm`),
                  }
                }
                return day
              }),
            }
          }
          return categoryDayItem
        }),
      },
    }))
  }

  const handleAddSchedule = (): void => {
    if (!category) {
      return setState((prevState) => ({
        ...prevState,
        categorySchedule: {
          ...prevState.categorySchedule,
          [`General`]: prevState.categorySchedule[`General`].map((categoryDayItem) => {
            if (categoryDayItem.label === dayItem.label) {
              return {
                ...categoryDayItem,
                daySchedule: [
                  ...categoryDayItem.daySchedule,
                  {
                    id: categoryDayItem.daySchedule.length + 1,
                    start: ``,
                    end: ``,
                  },
                ],
              }
            }
            return categoryDayItem
          }),
        },
      }))
    }

    setState((prevState) => ({
      ...prevState,
      categorySchedule: {
        ...prevState.categorySchedule,
        [category]: prevState.categorySchedule[category].map((categoryDayItem) => {
          if (categoryDayItem.label === dayItem.label) {
            return {
              ...categoryDayItem,
              daySchedule: [
                ...categoryDayItem.daySchedule,
                {
                  id: categoryDayItem.daySchedule.length + 1,
                  start: ``,
                  end: ``,
                },
              ],
            }
          }
          return categoryDayItem
        }),
      },
    }))
  }

  const handleDeleteSchedule = (itemIndex: number): void => {
    if (!category) {
      return setState((prevState) => ({
        ...prevState,
        categorySchedule: {
          ...prevState.categorySchedule,
          [`General`]: prevState.categorySchedule[`General`].map((categoryDayItem) => {
            if (categoryDayItem.label === dayItem.label) {
              return {
                ...categoryDayItem,
                daySchedule: categoryDayItem.daySchedule.filter((_, index) => index !== itemIndex),
              }
            }
            return categoryDayItem
          }),
        },
      }))
    }

    setState((prevState) => ({
      ...prevState,
      categorySchedule: {
        ...prevState.categorySchedule,
        [category]: prevState.categorySchedule[category].map((categoryDayItem) => {
          if (categoryDayItem.label === dayItem.label) {
            return {
              ...categoryDayItem,
              daySchedule: categoryDayItem.daySchedule.filter((_, index) => index !== itemIndex),
            }
          }
          return categoryDayItem
        }),
      },
    }))
  }

  return (
    <Grid container key={dayItem.label}>
      <Grid
        container
        alignItems="center"
        sx={{
          border: isExpanded ? `1px solid ${primary.main}` : `1px solid #E9E9EA`,
          borderRadius: `5px`,
          transition: `border 0.3s ease`,
        }}
      >
        <Grid container>
          <FormControlLabel
            sx={{
              paddingLeft: 2,
            }}
            control={
              <CustomSwitch
                sx={{ m: 1 }}
                checked={dayItem.isActive}
                onChange={handleSwitchChange}
              />
            }
            label=""
          />
          <Grid
            container
            item
            xs
            paddingRight={2}
            paddingY={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{
              cursor: `pointer`,
            }}
            onClick={() => (dayItem.isActive ? handleChange(dayItem.label) : null)}
          >
            <Grid container item xs alignItems="center" gap={1} flexWrap="nowrap">
              <Typography variant="h6" width="fit-content">
                {dayItem.label}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: `flex`,
                  gap: 1,
                  flexWrap: `nowrap`,
                  overflow: `hidden`,
                  height: `20px`,
                }}
              >
                {dayItem.daySchedule.map((item) => {
                  if (item.start && item.end) {
                    return `  ·  ${item.start} - ${item.end}`
                  }
                })}
              </Typography>
            </Grid>

            {dayItem.isActive ? (
              <ExpandMoreIcon
                sx={{
                  transform: isExpanded ? `rotate(180deg)` : `rotate(0deg)`,
                  transition: `transform 0.3s ease`,
                  color: primary.main,
                }}
              />
            ) : null}
          </Grid>
        </Grid>

        <Collapse
          in={isExpanded}
          sx={{
            width: `100%`,
            paddingX: 2,
          }}
        >
          {dayItem.daySchedule.map((item, index) => (
            <Grid key={item.id} container gap={2} alignItems="center" marginY={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={
                    isDayjs(item.start)
                      ? item.start
                      : dayjs()
                        .set(`hour`, +item.start.split(`:`)[0])
                        .set(`minute`, +item.start.split(`:`)[1])
                  }
                  onChange={(date) => {
                    if (!date) return
                    handleStartChange(date, item)
                  }}
                  format="HH:mm"
                  ampm={false}
                  sx={{
                    width: `180px`,
                    height: `45px`,
                    div: {
                      height: `45px`,
                    },
                  }}
                />
                a
                <TimePicker
                  value={
                    isDayjs(item.end)
                      ? item.end
                      : dayjs()
                        .set(`hour`, +item.end.split(`:`)[0])
                        .set(`minute`, +item.end.split(`:`)[1])
                  }
                  onChange={(date) => {
                    if (!date) return
                    handleEndChange(date, item)
                  }}
                  format="HH:mm"
                  ampm={false}
                  sx={{
                    width: `180px`,
                    height: `45px`,
                    div: {
                      height: `45px`,
                    },
                  }}
                />
              </LocalizationProvider>

              <Grid container item xs>
                {index === dayItem.daySchedule.length - 1 ? (
                  <IconButton
                    sx={{
                      padding: `4px`,
                      borderRadius: `4px`,
                    }}
                    onClick={handleAddSchedule}
                  >
                    <Icon icon="addCircle" color="primary" />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{
                      padding: `4px`,
                      borderRadius: `4px`,
                    }}
                    onClick={() => {
                      handleDeleteSchedule(index)
                    }}
                  >
                    <Icon icon="delete" color="error" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </Collapse>
      </Grid>
    </Grid>
  )
}

export default Accordion
