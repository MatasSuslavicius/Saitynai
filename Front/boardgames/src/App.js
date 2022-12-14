//import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'antd';
import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom'
import User from './components/User';
import Admin from './components/Admin';
import Layout from './components/Layout';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home';
import LinkPage from './components/LinkPage';
import Unauthorized from './components/Unauthorized';
import Games from './components/Games/Games';
import AddGames from './components/Games/AddGames';
import EditGames from './components/Games/EditGames';
import Ads from './components/Ads/Ads';
import AddAd from './components/Ads/AddAd';
import EditAd from './components/Ads/EditAd';
import AdDetailed from './components/Ads/AdDetailed';


const ROLES = {
  'SimpleUser': "SimpleUser",
  'Admin': "Admin"
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />
        <Route path="games" element={<Games />} />
        <Route path="games/add" element={<AddGames />} />
        <Route path="games/edit" element={<EditGames />} />
        <Route path="ads" element={<Ads />} />
        <Route path="ads/add" element={<AddAd />} />
        <Route path="ads/edit" element={<EditAd />} />
        <Route path="ads/detailed" element={<AdDetailed />} />
        {/* Home */}
        

        {/* we want to protect these routes */}

        <Route element={<RequireAuth allowedRoles={[ROLES.SimpleUser]} />}>
          <Route path="user" element={<User />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
export default App;
