import {useState} from 'react';
import {useCookies} from 'react-cookie';
import {useHttp} from '../../hooks/http.hook';
import Spinner from '../Spinner/Spinner';
import './Auth.scss';

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const {request} = useHttp();

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  }

  const handleSubmit = async (e, endpoint) => {
    setLoading(true);
    e.preventDefault();

    if(!isLogin && password !== confirmPassword) {
      setLoading(false);
      setError('Make sure passwords match!');
      return;
    }

    const data = await request(endpoint, "POST", JSON.stringify({email, password}));

    if(data.detail) {
      setLoading(false);
      setError(data.detail);
    } else {
      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);
      setLoading(false);

      window.location.reload();
    }
  }

  return (
    <div className="auth-container"> 
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? 'Please log in' : 'Please sign up!'}</h2>
          <input 
            type="email" 
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <input 
              type={passwordShown ? "text" : "password"}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div 
              className='eye'
              onClick={() => setPasswordShown(!passwordShown)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
              </svg>
            </div>
          </div>
          {!isLogin && 
          <div>
            <input 
              type={confirmPasswordShown ? "text" : "password"}
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div 
              className='eye'
              onClick={() => setConfirmPasswordShown(!confirmPasswordShown)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
              </svg>
            </div>
          </div>
          }
          <input 
            type="submit" 
            value="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}
          />
          {error && <p>{error}</p>}
        </form>

        <div className='auth-options'>
          <button 
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor : !isLogin ? 'white': '#c7c6c6b0',
              color: !isLogin ? 'black': '#6e6e6eb0',
              fontSize: !isLogin ? '15px' : '12px'
            }}
          >
            Sign Up
          </button>
          <button 
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor : isLogin ? 'white': '#c7c6c6b0',
              color: isLogin ? 'black': '#6e6e6eb0',
              fontSize: isLogin ? '15px' : '12px'
            }}
          >
            Login
          </button>
        </div>

      </div>
      {loading && <Spinner/>}
    </div>
  );
}
  
  export default Auth;