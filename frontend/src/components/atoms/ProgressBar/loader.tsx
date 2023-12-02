import React from 'react'
import { LinearProgress } from "@mui/material";
import { LoaderProps } from '../../../utils/interfaces';
const Loader = ({ ...loaderProps }: LoaderProps) => {
    const [progress, setProgress] = React.useState(10);
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 10
        );
      }, 200);
      return () => {
        clearInterval(timer);
      };
    }, []);
    return (
      <>
        <LinearProgress variant="determinate" value={progress} {...loaderProps} data-testid="loader" />
      </>
    );
  };

export default Loader
