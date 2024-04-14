import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { fetchRegisterUser } from '../../services/auth/action';
import { clearErrorMessage, selectError } from '../../services/auth/slice';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = { name, email, password };
    dispatch(fetchRegisterUser(data));
  };

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
