//import 'bootstrap/dist/css/bootstrap.min.css'
import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route , Link, Navigate, useNavigate} from 'react-router-dom'
import Layout2 from './components/Layout';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import Games from './components/Games/Games';
import AddGames from './components/Games/AddGames';
import EditGames from './components/Games/EditGames';
import Ads from './components/Ads/Ads';
import AddAd from './components/Ads/AddAd';
import EditAd from './components/Ads/EditAd';
import AdDetailed from './components/Ads/AdDetailed';
import Questions from './components/Questions/Questions';
import AddQuestion from './components/Questions/AddQuestion';
import EditQuestion from './components/Questions/EditQuestion';
import QuestionDetailed from './components/Questions/QuestionDetailed';
import React, { useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";

const ROLES = {
  'SimpleUser': "SimpleUser",
  'Admin': "Admin"
}

const { Header, Content, Footer } = Layout;
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout className="layout"
    style={{
      height: '98vh'
    }}>
      <Header>
        <div className="logo" />
        <Link to="/">
            <AiIcons.AiFillHome />
            <span >Home</span>
        </Link>
        <Link to="/login" style={{float: 'right'}}>
            <span>Login</span>
            <FiIcons.FiLogIn />
        </Link>
      </Header>
      <Content
        style={{
          padding: '0 50px',
            textAlign: 'center',
            
        }}
      >
        <div>
            <h2 style={{ color: 'black'}}>Boardgames</h2>
        </div>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Routes>
      <Route path="/" element={<Layout2 />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Games />} />
        <Route path="ads" element={<Ads />} />
        <Route path="ads/detailed" element={<AdDetailed />} />
        <Route path="questions" element={<Questions />} />
        <Route path="questions/detailed" element={<QuestionDetailed />} />
        {/* Home */}
        

        {/* we want to protect these routes */}

        <Route element={<RequireAuth allowedRoles={[ROLES.SimpleUser]} />}>
          <Route path="questions/add" element={<AddQuestion />} />
          <Route path="ads/add" element={<AddAd />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="questions/edit" element={<EditQuestion />} />
          <Route path="ads/edit" element={<EditAd />} />
          <Route path="games/add" element={<AddGames />} />
          <Route path="games/edit" element={<EditGames />} />
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
        </div>
      </Content>
      <Footer className="fixed-bottom"
        style={{
          textAlign: 'center',
        }}
      >
        ©2022 Created by Matas Suslavičius
      </Footer>
    </Layout>
  );
};
export default App

