import { SvgIconProps } from '@mui/material'
import {
  ArrowForwardIosRounded,
  ArrowRightAltRounded,
  CloseRounded,
  MenuRounded,
} from '@mui/icons-material'
export const icons = {
  arrowRight: ArrowRightAltRounded,
  arrowForward: ArrowForwardIosRounded,
  close: CloseRounded,
  menuExpand: MenuRounded,
}
interface IconProps extends SvgIconProps {
  icon: keyof typeof icons
}
const Icon: React.FunctionComponent<IconProps> = ({ icon, ...props }) => {
  const IconComponent = icons[icon]
  return <IconComponent {...props} />
}

export default Icon
