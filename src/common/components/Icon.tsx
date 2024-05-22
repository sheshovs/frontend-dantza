import { SvgIconProps } from '@mui/material'
import {
  AddCircleOutlineRounded,
  AddRounded,
  AddToPhotosRounded,
  ArrowForwardIosRounded,
  ArrowRightAltRounded,
  CloseRounded,
  DeleteRounded,
  MenuRounded,
} from '@mui/icons-material'
export const icons = {
  arrowRight: ArrowRightAltRounded,
  arrowForward: ArrowForwardIosRounded,
  close: CloseRounded,
  menuExpand: MenuRounded,
  addPhotos: AddToPhotosRounded,
  delete: DeleteRounded,
  add: AddRounded,
  addCircle: AddCircleOutlineRounded,
}
interface IconProps extends SvgIconProps {
  icon: keyof typeof icons
}
const Icon: React.FunctionComponent<IconProps> = ({ icon, ...props }) => {
  const IconComponent = icons[icon]
  return <IconComponent {...props} />
}

export default Icon
