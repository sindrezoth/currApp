import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const userRef = useRef()
  const errRef = useRef()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ email, password }).unwrap()
      console.log(accessToken);
      dispatch(setCredentials({ accessToken }))
      setEmail('')
      setPassword('')
      navigate('/home')
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

  const handleUserInput = (e) => setEmail(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist(prev => !prev)

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return <PulseLoader color={"#FFF"} />

  const content = (
    <section className="public">
      <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">Почта: </label>
        <input
          className="form__input"
          type="text"
          id="email"
          ref={userRef}
          value={email}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Пароль: </label>
        <input
          className="form__input"
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={password}
          required
        />
        <button className="form__submit-button">Войти</button>

        <label htmlFor="persist" className="form__persist">
          <input
            type="checkbox"
            className="form__checkbox"
            id="persist"
            onChange={handleToggle}
            checked={persist}
          />
          запомнить меня
        </label>
      </form>
    </section>
  )

  return content
}
export default Login
