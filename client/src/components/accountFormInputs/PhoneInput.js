import ReactPhoneInput from 'react-phone-input-2';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Form } from 'react-bootstrap';
import 'react-phone-input-2/lib/bootstrap.css';

const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/;

const PhoneInput = ({ state }) => {
  const [phone, setPhone] = useState(state.value || '');
  const inputRef = useRef(null);
  const selectionStartRef = useRef(null);
  const selectionEndRef = useRef(null);

  const saveSelection = e => {
    const {selectionStart: start, selectionEnd: end, value} = e.target;
//    console.log(start, end)
//    console.log([...value].map((c, i) => /\d/.test(c) ? start === i ? 2 : 1 : 0));
    if(start === end) {
      //console.log(value[selectionStart]);
      //console.log(value[selectionStart-1]);
      //console.log(value[selectionEnd]);
      //console.log(value[selectionEnd-1]);
      //console.log(selectionStartRef.current - e.target.selectionStart);
    }
    selectionStartRef.current = start;
    selectionEndRef.current = end;
  }

  const handleChange = e => {
    //console.log(e.target.value);
    saveSelection(e);
    if(e.target.value.length < 13) {
      setPhone(e.target.value.replace(/[^\d]/g, "").slice(0,11));
    }
  }

  useLayoutEffect(() => {
    if(inputRef.current && selectionStartRef.current !== null) {
      //inputRef.current.setSelectionRange(selectionStartRef.current, selectionEndRef.current);
//      console.log('fixed? :' + inputRef.current.selectionEnd);
    }
  });

  useEffect(() => {
    state.setPhone(phone);
    if(PHONE_REGEX.test(phone)) {
      state.setOk(prev => ({ ...prev, phone: true }));
    }
    else {
      state.setOk(prev => ({ ...prev, phone: false }));
    }
  }, [phone]);

  useEffect(() => {
    setPhone(state.value);
  }, [state.value])

  return (
    <div className="form-group form-floating">

      {/*<ReactPhoneInput
        country={'ru'}
        value={phone}
        onChange={(phone, country) => {
          setPhone(phone);
        }}
        placeholder="Номер телефона"
        inputClass={`form-control w-100 ${phone && PHONE_REGEX.test(phone) ? 'is-valid' : 'is-invalid'}`}
        showDropdown={true}
        disabledDropdown={true}
        inputProps={{
          id: 'phone-input',
          required: true
        }}
        //isValid={(value, country) => {
        //  if (value.match(PHONE_REGEX)) {
        //    //state.setOk(prev => ({...prev, phone: true}));
        //    return true;
        //  } else {
        //    //state.setOk(prev => ({...prev, phone: false}));
        //    return false;
        //  }
        //}}
      >

      </ReactPhoneInput>*/}
      <input 
        value={phone 
          && '+' + phone
          //phone.slice(0,1) + 
          //(phone.slice(1) ? ' (' + phone.slice(1, 4) : '') +
          //(phone.slice(4) ?  ') ' + phone.slice(4, 7) : '') +
          //(phone.slice(7) ? '-' + phone.slice(7, 9) : '') +
          //(phone.slice(9) ? '-' + phone.slice(9, 11) : '')
        }
        onChange={handleChange}
        onSelect={saveSelection}
        placeholder="Номер телефона"
        id="phone-input"
        ref={inputRef}
        required
        className={`form-control mb-3 w-100 ${phone && (PHONE_REGEX.test(phone) ? 'is-valid' : 'is-invalid')}`} 
        type="tel"/>
      <label htmlFor="phone-input">Номер телефона</label>
    </div>
  );
}

export default PhoneInput;
