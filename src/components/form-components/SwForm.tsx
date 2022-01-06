import { Form } from 'react-final-form';
import FormStateToRedux from './FormStateListener';

const SwForm = ({ children, initialValues, changeHandler, ...rest }) => {
  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues} {...rest}>
      {(args) => (
        <form
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          autoComplete="off"
        >
          <FormStateToRedux changeHandler={changeHandler} />
          {children(args)}
        </form>
      )}
    </Form>
  );
};

export default SwForm;
