import { useState } from "react";

export default initialValue => {
  const [value, setValue] = useState(initialValue);

  const changeValue = text => {
    setValue(text);
  };

  const resetValue = () => {
    setValue("");
  };

  return [value, changeValue, resetValue];
};
