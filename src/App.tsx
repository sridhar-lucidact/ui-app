import { history } from './__helper/history';
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  // init custom history object to allow navigation from 
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();
  

  return <div>App</div>
}

export default App
