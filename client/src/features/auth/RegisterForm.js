import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../auth/authApiSlice";
import { setCredentials } from './authSlice';
import useTitle from "../../hooks/useTitle";
import EmailInput from '../../components/accountFormInputs/EmailInput.js'
import PasswordInput from '../../components/accountFormInputs/PasswordInput.js'
import PhoneInput from '../../components/accountFormInputs/PhoneInput.js'
import CountrySelector from '../../components/accountFormInputs/CountrySelector.js';

//[4-12 chars incl. !@#$%]


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
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(null);
  const [ok, setOk] = useState({email: false, password: false, phone: false, country: false});

  useEffect(() => {
    console.log(ok);
    console.log(Object.keys(ok).every(k => {
      console.log(k, ok[k]);
      return ok[k];
    }) && !isLoading);
    if(Object.values(ok).every(ok => ok) && !isLoading) {
      console.log('can save!')
    }
  }, [ok.email, ok.password, ok.phone, ok.country]);


  const canSave = Object.values(ok).every(ok => ok) && !isLoading;

  const onSaveClientClicked = async (e) => {
    console.log(email, password, phone, country);
    e.preventDefault();
    if (canSave) {
      const { accessToken } = await addNewClient({ email, password, phone, country }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setEmail('');
      setPassword('');
      setPhone('');
      setCountry('');
      navigate('/home');
    }
  }

  const content = (
      <section className="container mt-5 mb-5 bg-light p-4 border rounded" style={{maxWidth: "500px"}} md={2}>
        <h2 className="h1 mb-5">Регистрируйся сейчас!</h2>
        <form onSubmit={onSaveClientClicked} className="form-horizontal">
          <EmailInput state={{setEmail, setOk}} />
          <PasswordInput state={{setPassword, setOk}} />
          <PhoneInput state={{setPhone, setOk}} />
          <CountrySelector state={{setCountry, setOk}} />

          <button
            className="btn btn-warning w-100 btn-lg"
            type='submit'
            title="Зарегистрироваться"
            //disabled={!(true || !canSave)}
          >
            Зарегистрироваться
          </button>
        </form>
      </section>
  );

  return content;
}
export default RegisterForm;
