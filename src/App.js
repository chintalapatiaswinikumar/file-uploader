import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm/index'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Register from './components/Register'
import Records from './components/Records'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/records" component={Records} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)
export default App
