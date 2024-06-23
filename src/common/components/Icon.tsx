import { SvgIconProps } from '@mui/material'
import {
  AddCircleOutlineRounded,
  AddRounded,
  AddToPhotosRounded,
  ArrowBackRounded,
  ArrowForwardIosRounded,
  ArrowRightAltRounded,
  CloseRounded,
  DeleteRounded,
  EditRounded,
  EventRounded,
  LocationOnRounded,
  MenuRounded,
} from '@mui/icons-material'
export const icons = {
  arrowRight: ArrowRightAltRounded,
  arrowForward: ArrowForwardIosRounded,
  arrowBack: ArrowBackRounded,
  close: CloseRounded,
  menuExpand: MenuRounded,
  addPhotos: AddToPhotosRounded,
  delete: DeleteRounded,
  add: AddRounded,
  addCircle: AddCircleOutlineRounded,
  edit: EditRounded,
  location: LocationOnRounded,
  datetime: EventRounded,
}
interface IconProps extends SvgIconProps {
  icon: keyof typeof icons
}
const Icon: React.FunctionComponent<IconProps> = ({ icon, ...props }) => {
  const IconComponent = icons[icon]
  return <IconComponent {...props} />
}

export default Icon
