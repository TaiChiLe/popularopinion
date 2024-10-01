import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Login from './routes/Login';
import Signup from './routes/Signup';
import Mainpage from './routes/Mainpage';
import Pollinfo from './routes/Pollinfo';
import Profile from './routes/Profile';
import ProfileSettings from './routes/ProfileSettings';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/mainpage" element={<Mainpage />}></Route>
      <Route path="/pollinfo" element={<Pollinfo />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/profilesettings" element={<ProfileSettings />}></Route>
    </>
  )
);

export default router;
