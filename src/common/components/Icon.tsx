import { SvgIconProps } from '@mui/material'
import {
  ArrowRightAltRounded
} from '@mui/icons-material'
export const icons = {
  arrowRight: ArrowRightAltRounded
}
interface IconProps extends SvgIconProps {
  icon: keyof typeof icons
}
const Icon: React.FunctionComponent<IconProps> = ({ icon, ...props }) => {
  const IconComponent = icons[icon]
  return <IconComponent {...props} />
}

export default Icon