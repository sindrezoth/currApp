import { useEffect, useState, useRef } from 'react';
import { Form } from 'react-bootstrap';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const EmailInput = ({ state }) => {
  const [email, setEmail] = useState(state?.value || '');
  const [isValid, setIsValid] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    state.setEmail(email);
    if (!email) {
      setIsValid(null);
    }else {
      if(EMAIL_REGEX.test(email)) {
        setIsValid(true);
        state.setOk(prev => ({...prev, email: true}));
      }
      else{
        setIsValid(false);
        state.setOk(prev => ({...prev, email: false}));
      }
    }

  }, [email]);

  useEffect(() => {
    setEmail(state.value);
  }, [state.value]);

  useEffect(() => {
    const inp = inputRef.current;
    if(inp) {
      inp.addEventListener('input', handleInput);
    }

    return () => {
      if(inp) {
        inp.removeEventListener('input', handleInput);
      }
    }
  }, [])

  function handleInput(e) {
    //console.log(e.target.value)
    setEmail(e.target.value);
    setIsValid(EMAIL_REGEX.test(email));
  }

  return (
    <div className="form-group form-floating mb-3">
      <input 
        ref={inputRef}
        value={email} 
        //onInput={handleInput}
        onChange={handleInput} 
        id='email-input'
        type="email" 
        required
        className={`input-lg form-control ${email && (isValid ? 'is-valid' : 'is-invalid')}`}
        placeholder="" />
      <label className="text-gray" htmlFor='email-input'>Почта</label>
    </div>
  );
}

export default EmailInput;
