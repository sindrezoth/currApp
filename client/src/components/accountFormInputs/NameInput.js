import { useEffect, useState, useRef } from 'react';

const NameInput = ({state}) =>{
  const [name, setName] = useState(state?.value || '');
  const [isValid, setIsValid] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    state.setName(name);
    if (!name) {
      setIsValid(null);
    }else {
      if(name.length > 1) {
        setIsValid(true);
      }
      else{
        setIsValid(false);
      }
    }

  }, [name]);

  useEffect(() => {
    setName(state.value);
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
    setName(e.target.value);
    setIsValid(e.target.value.length > 1);
  }

  return (
    <div className="form-group form-floating mb-3">
      <input 
        ref={inputRef}
        value={name} 
        //onInput={handleInput}
        onChange={handleInput} 
        id={state.type+'-input'}
        type="text" 
        className={`input-lg form-control ${name && (isValid ? 'is-valid' : 'is-invalid')}`}
        placeholder="" />
      <label className="text-dark" htmlFor='name-input'>{state?.label}</label>
    </div>
  );
} 

export default NameInput;
