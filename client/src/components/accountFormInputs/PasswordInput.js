import { useEffect, useState } from 'react';

const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const PasswordInput = ({ state }) => {
  const [password, setPassword] = useState(state.value || '');
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    state.setPassword(password);
    if(PWD_REGEX.test(password)) {
      state.setOk(prev => ({...prev, password: true}));
    }
    else{
      state.setOk(prev => ({...prev, password: false}));
    }

  }, [password]);

  const onPasswordChanged = e => setPassword(e.target.value);

  return (<>
    <div className="form-gourp form-floating mb-3">
      <input 
        value={password}
        onChange={e => setPassword(e.target.value)}
        //isvalid={PWD_REGEX.test(password)}
        //isInvalid={password && !PWD_REGEX.test(password)}
        className={`input-lg form-control ${password && (PWD_REGEX.test(password) ? 'is-valid' : 'is-invalid')}`}
        id="password-input"
        type="password" 
        required
        placeholder="Ваш пароль" />
      <label htmlFor="password-input">Пароль</label>
    </div>
  </>);
}

export default PasswordInput;
