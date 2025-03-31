import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import PhoneInput from 'react-phone-input-2';
import { useRegisterMutation } from "../auth/authApiSlice";
import { setCredentials } from './authSlice';
import useTitle from "../../hooks/useTitle";
//import CountrySelector from '../../components/CountrySelector.js';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
//[4-12 chars incl. !@#$%]
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const COUNTRY_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const RegisterForm = () => {
  useTitle('Регистрация');
  const dispatch = useDispatch();

  const [addNewClient, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRegisterMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [phone, setPhone] = useState('');
  const [validPhone, setValidPhone] = useState(false);

  const [country, setCountry] = useState(null);
  const [validCountry, setValidCountry] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidCountry(!!country);
  }, [country]);

  const onEmailChanged = e => setEmail(e.target.value);
  const onPasswordChanged = e => setPassword(e.target.value);
  const onPhoneChanged = e => setPhone(e.target.value);
  const onCountryChanged = e => setCountry({value: e.value, label: e.label});

  const canSave = [validEmail, validPassword, validPhone, validCountry].every(Boolean) && !isLoading;
  console.log([validEmail, validPassword, validPhone, validCountry].every(Boolean) && !isLoading)

  const onSaveClientClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      const { accessToken } = await addNewClient({ email, password, phone, country: country.value }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setEmail('');
      setPassword('');
      setPhone('');
      setCountry('');
      navigate('/home');
    }
  }

  const content = (
    <>
      <form className="form" onSubmit={onSaveClientClicked}>
        <div className="form__title-row">
          <h2>Регистрируйся сейчас!</h2>
        </div>
        <label htmlFor="email">Почта: </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="on"
          value={email}
          onChange={onEmailChanged}
        />

        <label htmlFor="password">Пароль: </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <PhoneInput 
          inputProps={{
            required: true
          }}
          specialLabel="Номер телефона"
          country={'ru'}
          value={phone}
          onChange={(phone, country) => {
            setPhone(phone)
          }}
          isValid={(value, country) => {
            if (value.match(PHONE_REGEX)) {

              console.log('valid!!');
              return true;
            } else {
              console.log(value);
              console.log('invalid!');
              return false;
            }
          }}
        />

        { /* <CountrySelector value={{value:country?.value, label: country?.label}} onChange={onCountryChanged}/> */ }

{/*
        <label className="form__label" htmlFor="Country">
          Страна: <span className="nowrap"></span>
        </label>
        <input
          id="country"
          name="country"
          type="text"
          autoComplete='country-name'
          value={country}
          onChange={onCountryChanged}
        /> */}

        <div className="form__action-buttons">
          <button
            className="icon-button"
            title="Save"
            disabled={!canSave}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </>
  );

  return content;
}
export default RegisterForm;
