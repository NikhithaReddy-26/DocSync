import { useState, useEffect } from 'react';

export const useUploadLoader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return { visible };
};
