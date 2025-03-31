import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from '../../features/auth/authSlice';
import useTitle from "../../hooks/useTitle";
import EmailInput from '../../components/accountFormInputs/EmailInput.js'
import PasswordInput from '../../components/accountFormInputs/PasswordInput.js'
import PhoneInput from '../../components/accountFormInputs/PhoneInput.js'
import CountrySelector from '../../components/accountFormInputs/CountrySelector.js';
import logoImg from './../../images/logo.png';

const SignUp = () => {
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
  const [is18, setIs18] = useState(false);
  const [ok, setOk] = useState({email: false, password: false, phone: false, country: false, is18: false});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(ok);
    console.log(Object.keys(ok).every(k => {
      console.log(k, ok[k]);
      return ok[k];
      }));
    if(Object.values(ok).every(ok => ok) && !isLoading) {
      console.log('can save!')
    }
  }, [ok.email, ok.password, ok.phone, ok.country]);


  const canSave = Object.values(ok).every(ok => ok) && !isLoading;

  const onSaveClientClicked = async (e) => {
    console.log(email, password, phone, country);
    e.preventDefault();
    if (canSave) {
      try {
        const { accessToken } = await addNewClient({ email, password, phone, country }).unwrap()
        console.log(accessToken);
        dispatch(setCredentials({ accessToken }))
        setEmail('');
        setPassword('');
        setPhone('');
        setCountry('');
        navigate('/home');
      }
      catch (err) {
        console.log(err)
        setPassword('');
      }
    }
  }

  const is18Handler = e => {
    setIs18(e.target.checked);
    setOk(prev => ({...prev, is18: e.target.checked}))
  }

  return (
    <div className="show" id="main-wrapper">
      <div className="authincation section-padding mb-5">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-xl-5 col-md-6">
              <div className="mini-logo text-center my-4">
                <Link to="/"><img src={logoImg} alt="М1 logo" /></Link>
                <h4 className="card-title mt-3">Создать новый аккаунт</h4>
              </div>
              <div className="auth-form card">
                <div className="card-body">
                  <form onSubmit={onSaveClientClicked} name="myform" className="signin_validate row g-3">
                    <div className="col-12">
                      <EmailInput state={{setEmail, setOk}} />
                    </div>
                    <div className="col-12">
                      <PasswordInput state={{setPassword, setOk}} />
                    </div>
                    <div className="col-12">
                      <PhoneInput state={{setPhone, setOk}} />
                    </div>
                    <div className="col-12">
                      <CountrySelector state={{setCountry, setOk}} />
                    </div>
                    <div className="col-12">
                      <div className="form-check form-switch">
                        <input className="form-check-input" 
                          type="checkbox" 
                          id="flexSwitchCheckDefault" 
                          checked={is18}
                          onChange={is18Handler}/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault"> {/*------------------ LINK */}
                          Я подтверждаю что мне исполнилось 18 лет и соглашаюсь с <a href="/privacy-policy"
                            className="text-primary">Условиями пользователя</a> и <a href="/terms-of-use"
                            className="text-primary">Политикой конфедициальности</a>.
                        </label>
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" 
                        className={"btn btn-primary btn-block" }
                      disabled={ !canSave ? true : false }>Создать аккаунт</button>
                    </div>
                  </form>
                  <div className="text-center">
                    <p className="mt-3 mb-0"> <Link className="text-primary" to="signin">Войти</Link> в свой аккаунт</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
