import React from "react";
import Icon from "../Icons";
import SpinnerLogo from "../../../../public/images/spinner.gif";
import NotificationLogo from "../../../../public/images/notification_loader.gif";
import Loader from "./loader";
import { ProgressBarInterfaceProps } from "../../../utils/interfaces";

const ProgressBar = ({
  progressVariant,
  loaderProps,
  spinnerProps,
  notificationProps,
}: ProgressBarInterfaceProps) => {
  let Component;

  switch (progressVariant) {
    case "spinner":
      Component = (
        <Icon src={SpinnerLogo} {...spinnerProps} data-testid="spinner" />
      );
      break;
    case "notification":
      Component = (
        <Icon
          src={NotificationLogo}
          {...notificationProps}
          data-testid="notification-loader"
        />
      );
      break;
    default:
      Component = <Loader {...loaderProps} />;
      break;
  }
  return <>{Component}</>;
};

export default ProgressBar;
