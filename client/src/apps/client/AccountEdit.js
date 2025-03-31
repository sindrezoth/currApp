import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import {  useLocation, Link, useNavigate } from "react-router-dom";
import { useUpdateClientAccountMutation } from "../../features/clients/clientApiSlice.js";
import useTitle from "../../hooks/useTitle";

import CountrySelector from '../../components/accountFormInputs/CountrySelector.js';
import EmailInput from '../../components/accountFormInputs/EmailInput.js'
import NameInput from '../../components/accountFormInputs/NameInput.js'
import PhoneInput from '../../components/accountFormInputs/PhoneInput.js'
import PasswordInput from '../../components/accountFormInputs/PasswordInput.js'

//[4-12 chars incl. !@#$%]

const RegisterForm = ({client}) => {
  useTitle('Ваш Аккаунт');
  const dispatch = useDispatch();
  const location = useLocation();

  const [updateClientAccount, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateClientAccountMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [country, setCountry] = useState({});
  const [ok, setOk] = useState({email: false, phone: false, country: false});
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    console.log(ok);
    if(Object.values(ok).every(ok => ok) && isChanged && !isLoading) {
      console.log('can save!')
    }
  }, [ok.email, ok.phone, ok.country]);

  useEffect(() => {
    if(email !== client.email || phone !== client.phone 
      || Object.keys(country || {})
        .map(key => country[key] === client.country[key])
        .some(pairEq => !pairEq)
      || client.firstname == undefined ? firstname.length : firstname !== client.firstname
      || client.lastname == undefined ? lastname.length : lastname !== client.lastname
    ) {
      setIsChanged(true);
    }
    else {
      setIsChanged(false);
    }
  }, [email, phone, country, firstname, lastname]);

  useEffect(() => {
    setEmail(client.email);
    setPhone(client.phone);
    setCountry(client.country);
    setFirstname(client.firstname || '');
    setLastname(client.lastname || '');
  }, [client])


  const canSave = Object.values(ok).every(ok => ok)
    && isChanged
    && !isLoading;
  console.log('isChanged', isChanged);

  const onSaveClientClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      
      const data = await updateClientAccount({ email, phone, country, firstname, lastname }).unwrap();
      console.log(data);
    }
  }

  const content = (
    <div className="container">
      <div className="row p-3">
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
      <form className="form" onSubmit={onSaveClientClicked}>
        <NameInput state={{setName: setFirstname, value: firstname, label: 'Имя', type: 'firstname'}} />
        <NameInput state={{setName: setLastname, value: lastname, label: 'Фамилия', type: 'lastname'}} />
        <EmailInput state={{setEmail, setOk, value: email}} />
        <PhoneInput state={{setPhone, setOk, value: phone}} />
        <CountrySelector state={{setCountry, setOk, value: country}} />


        <button
          type='submit'
          title="сохранить"
          disabled={!canSave}
          className="btn btn-primary"
        >
          Сохранить
        </button>
      </form>
      </div>
      </div>
    </div>
  );

  return content;
}
export default RegisterForm;
