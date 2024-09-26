import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Login from './routes/Login';
import Signup from './routes/Signup';
import Mainpage from './routes/Mainpage';
import Exam from './routes/Exam';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/mainpage" element={<Mainpage />}></Route>
      <Route path="/exam" element={<Exam />}></Route>
    </>
  )
);

export default router;
