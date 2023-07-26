import ListHeader from './components/ListHeader/ListHeader';
import ListItem from './components/ListItem/ListItem';
import {useEffect, useState} from 'react';
import Auth from './components/Auth/Auth';
import { useCookies } from 'react-cookie';
import PacmanLoader from 'react-spinners/PacmanLoader';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  const signOut = () => {
    removeCookie('Email');
    removeCookie('AuthToken');
    window.location.reload();
  }

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json();
      if(json?.name) {
        setLoading(false);
        console.error(json);
        signOut();
      } else {
        setLoading(false);
        setTasks(json);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  useEffect(()=> {
    if(authToken) {
      getData();
    }
  }, []);

  //Sort by date 
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <>
      {!authToken && <Auth/>} 
      
      {
        authToken &&
        <div className="app">
          <ListHeader 
            listName={'🌴 Holiday tick list'} 
            getData={getData}
            signOut={signOut}
          />
          <p className='user-email'>Welcome back {userEmail}</p>
          <PacmanLoader
            className='loading-icon'
            color={'rgb(255,175,163)'}
            loading={loading}
            size={20}
            aria-label="Loading"
            />
          {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
          <p className='copyright'>© Created By Stasy Karpenka</p>
        </div>
      }
      
    </>
  );
}

export default App;
