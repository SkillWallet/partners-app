import debounce from 'lodash.debounce';
import { useMemo } from 'react';
import { FormSpy } from 'react-final-form';

const FormStateListener = ({ changeHandler, debounceTime = 300 }) => {
  const debouncedChangeHandler = useMemo(() => {
    return debounce(changeHandler, debounceTime);
  }, [changeHandler, debounceTime]);

  return <FormSpy onChange={debouncedChangeHandler} />;
};

export default FormStateListener;
