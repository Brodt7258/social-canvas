import { useEffect } from 'react';

export const useLogOnChange = (label, logged) => {
  useEffect(() => {
    console.log(label, logged);
  }, [label, logged]);
};
