import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader'

import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation, useRegisterMutation } from "../../features/auth/authApiSlice";

import usePersist from '../../hooks/usePersist';
import useTitle from '../../hooks/useTitle';

import EmailInput from '../../components/accountFormInputs/EmailInput.js'
import PasswordInput from '../../components/accountFormInputs/PasswordInput.js'
import logoImg from './../../images/logo.png';

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()
  const [ok, setOk] = useState({email: false, password: false})

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(ok);
  }, [ ok.email, ok.password ]);

  const userRef = useRef()
  const errRef = useRef()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef?.current?.focus()
  }, [userRef.current])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(ok.email && ok.password) {
      try {
        const { accessToken } = await login({ email, password }).unwrap()
        dispatch(setCredentials({ accessToken }))
        setEmail('')
        setPassword('')
        navigate('/')
      } catch (err) {
        if (!err.status) {
          setErrMsg('No Server Response');
        } else if (err.status === 400) {
          setErrMsg('Missing Email or Password');
        } else if (err.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg(err.data?.message);
        }
        //errRef.current.focus();
      }
    }
    else {
      setErrMsg('SHOTONETAK')
    }
  }

  const handleUserInput = (e) => setEmail(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = (e) => setPersist(e.target.checked)

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return <PulseLoader color={"#FFF"} />
  return (
    <div className="show" id="main-wrapper">
      <div className="authincation section-padding">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-xl-5 col-md-6">
              <div className="mini-logo text-center my-4">
                <Link to="/"><img src={logoImg} alt="Logo image" /></Link>
                <h4 className="card-title mt-3">Войти в 21M Club</h4>
              </div>
              <div className="auth-form card">
                <div className="card-body">
                  <form onSubmit={handleSubmit} name="myform" className="signin_validate row g-3">
                    <div className="col-12">
                      <EmailInput state={{setEmail, setOk}} />
                    </div>
                    <div className="col-12">
                      <PasswordInput state={{setPassword, setOk}} />
                    </div>
                    <div className="col-6">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={persist} onChange={handleToggle}/>
                        <label className="form-check-label" for="flexSwitchCheckDefault">Запомнить на этом устройстве</label>
                      </div>
                    </div>
                    {/*<div className="col-6 text-right">
                      <a href="reset.html">Forgot Password?</a>
                    </div>*/}
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-block">Войти</button>
                    </div>
                  </form>
                  <p className="mt-3 mb-0">Ещё не зарегестрированны? <Link className="text-primary" to="/">Зарегистрироваться</Link></p>
                </div>

              </div>
              <div className="privacy-link text-center w-100">
                <br />
                <a href="/privacy-policy">Политика конфедициальности</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
