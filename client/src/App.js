import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import {useEffect, useState} from 'react';
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';

const App = () => {
  // const userEmail = 'nastya123@some.com';
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [tasks, setTasks] = useState(null);

  const signOut = () => {
    removeCookie('Email');
    removeCookie('AuthToken');
    window.location.reload();
  }

  // const authToken = false;

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json();
      if(json?.name) {
        console.error(json);
        signOut();
      } else {
        setTasks(json);
      }
    } catch (error) {
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
          {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
          <p className='copyright'>© Created By Stasy Karpenka</p>
        </div>
      }
      
    </>
  );
}

export default App;
