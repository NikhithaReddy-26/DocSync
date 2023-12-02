import { Button, ButtonProps } from "@mui/material";
import Icon, { IconProps } from "./../Icons";

interface Props extends ButtonProps {
  iconProps?: IconProps;
}

const MuiButton: React.FC<Props> = ({ children, iconProps, ...rest }) => {
  if (iconProps) {
    return (
      <Button startIcon={<Icon {...iconProps} />} {...rest}>
        {children}
      </Button>
    );
  }
  return <Button {...rest}>{children}</Button>;
};

export default MuiButton;
