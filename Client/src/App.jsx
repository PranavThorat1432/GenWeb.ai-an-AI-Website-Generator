/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import useGetCurrentUser from './Hooks/useGetCurrentUser';
import Dashboard from './Pages/Dashboard';
import Generate from './Pages/Generate';
import { useSelector } from 'react-redux';
import Editor from './Pages/EditorPage';
import LiveSite from './Pages/LiveSite';
import Pricing from './Pages/Pricing';

export const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

const App = () => {

  useGetCurrentUser();

  const { userData } = useSelector((state) => state.user);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={userData ? <Dashboard/> : <Home/>} />
        <Route path='/generate' element={userData ? <Generate/> : <Home/>} />
        <Route path='/editor/:id' element={userData ? <Editor/> : <Home/>} />
        <Route path='/site/:id' element={<LiveSite/>} />
        <Route path='/pricing' element={<Pricing/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
