import {useState} from 'react';

export default initialValue => {
  const [value, setValue] = useState(initialValue);

  const toggleValue = () => {
    setValue(!value);
  };

  return [value, toggleValue];
};
