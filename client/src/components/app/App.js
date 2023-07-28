import ListHeader from '../ListHeader/ListHeader';
import ListItem from '../ListItem/ListItem';
import {useEffect, useState} from 'react';
import Auth from '../Auth/Auth';
import { useCookies } from 'react-cookie';
import {useHttp} from '../../hooks/http.hook';
import PacmanLoader from 'react-spinners/PacmanLoader';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  const {request} = useHttp();

  const signOut = () => {
    removeCookie('Email');
    removeCookie('AuthToken');
    window.location.reload();
  }

  const getData = async () => {
    setLoading(true);
    request(`todos/${userEmail}`)
      .then((data) => {
        setLoading(false);
        setTasks(data);
      })
      .catch((err) => {
        signOut();
        setLoading(false);
        console.error(err);
      })
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
