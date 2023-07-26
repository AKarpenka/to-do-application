import {useState} from 'react';
import {useCookies} from 'react-cookie';
import Spinner from './Spinner';

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);

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

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    });
    
    const data = await response.json();

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
          <input 
            type="password" 
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && 
          <input 
            type="password" 
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />}
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