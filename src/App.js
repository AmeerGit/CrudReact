import logo from './logo.svg';
import './App.css';
import Employee from './components/Employee';
import AddEmployee from './components/AddEmployee';
import { Button } from 'primereact/button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'primeflex/primeflex.css';
import { TabMenu } from 'primereact/tabmenu';

const App = (props) => {


  return (
    <Router >

      <div className="App" style={{ width: '70%' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"><b>Home</b>  </Link></li>
            <li><Link to={'/addEmployee'} className="nav-link"><b>Add Employee</b></Link></li>
          </ul>
          </nav>
          <hr />  
     <br></br>
        <Switch>
          <Route path="/" exact component={Employee} />
          <Route path="/addEmployee" component={AddEmployee} />
          <Route path={`/edit/:id`} component={AddEmployee} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;
