import ListHeader from './components/ListHeader';
import {useEffect} from 'react';

const App = () => {
  const userEmail = 'nastya123@some.com';

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> getData, []);

  return (
    <div className="app"> 
      <ListHeader listName={'🌴 Holiday tick list'}/>
    </div>
  );
}

export default App;
