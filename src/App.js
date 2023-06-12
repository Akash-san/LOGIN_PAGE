import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/dashboard' element={<h1>
            HELLO WORLD
          </h1>} />
          <Route path='/home' element={<h1>
            HOME
          </h1>} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
