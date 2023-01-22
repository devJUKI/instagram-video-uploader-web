import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import FacebookCode from './FacebookCode'
import './App.css'

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/facebook-token' element={<FacebookCode />} />
          <Route path='/' element={<HomeScreen />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
