import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import PacmanLoader from 'react-spinners/PacmanLoader';
import {useHttp} from '../../hooks/http.hook';
import ListHeader from '../ListHeader/ListHeader';
import ListItem from '../ListItem/ListItem';
import Auth from '../Auth/Auth';

import {
  tasksFetching, 
  authTokenExp, 
  tasksFetched, 
  tasksFetchingError, 
  selectAll
} from '../ListItem/ListItemSlice';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const tasks = useSelector(selectAll);
  const {tasksLoadingStatus} = useSelector(state => state.tasks);

  const dispatch = useDispatch();
  const {request} = useHttp();

  const signOut = () => {
    removeCookie('Email');
    removeCookie('AuthToken');
    window.location.reload();
  }

  const getData = async () => {
    dispatch(tasksFetching());
    request(`todos/${userEmail}`)
      .then(data => {
        if(data.name) {
          dispatch(authTokenExp());
          signOut();
        } else { 
          dispatch(tasksFetched(data))
        }
      })
      .catch((err) =>{
        dispatch(tasksFetchingError());
      });
  }

  useEffect(()=> {
    if(authToken) {
      getData();
    }
    // eslint-disable-next-line
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
            loading={tasksLoadingStatus === 'loading' ? true : false}
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
