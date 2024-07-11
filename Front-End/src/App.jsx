import './App.css'
import Home from './components/Home'
import SingleView from './components/SingleView'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  

  return (
   
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/singleView' element={<SingleView />} />
      </Routes>
    </Router>
  )
}

export default App
