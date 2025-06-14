import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Login from './routes/Login/Index';

import Setup from './routes/Setup/Index';
import Create from './routes/Create/Index';
import Onboarding from './routes/Onboarding/Index';
import { Register } from './routes/Register/Index';
import { MainPage } from './routes/MainPage/Index';
import { PollDetails } from './routes/PollDetails/Index';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/setup" element={<Setup />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/main" element={<MainPage />}></Route>
      <Route path="/onboarding" element={<Onboarding />}></Route>
      <Route path="/polldetails/:id" element={<PollDetails />}></Route>
    </>
  )
);

export default router;
