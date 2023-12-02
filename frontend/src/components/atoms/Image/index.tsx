import { SxProps, Theme } from "@mui/material";

export interface ImageProps {
  height?: string | number;
  width?: string | number;
  src?: string;
  alt?: string;
  style?: React.CSSProperties;
  sx?: SxProps<Theme>;
}
export default function Image(props: ImageProps) {
  return <img data-testid="image" {...props} />;
}
