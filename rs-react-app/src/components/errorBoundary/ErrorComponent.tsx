import { useState } from 'react';

const ErrorComponent = () => {
  const [throwError, setThrowError] = useState(false);
  const handleClick = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('This is a test error!');
  }

  return <button onClick={handleClick}>Throw Error</button>;
};

export default ErrorComponent;
