import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Login from './routes/Login/Index';
import Register from './routes/Register/Index';
import Setup from './routes/Setup/Index';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/setup" element={<Setup />}></Route>
    </>
  )
);

export default router;
