import { SxProps, Theme } from "@mui/material";

export interface IconProps {
  height?: string | number;
  width?: string | number;
  src?: string;
  alt?: string;
  style?: React.CSSProperties;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}
export default function Icon(props: IconProps) {
  return <img data-testid="icon" {...props} />;
}
