import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Login from './routes/Login/Index';

import Setup from './routes/Setup/Index';
import Create from './routes/Post/Create/Index';
import Onboarding from './routes/Onboarding/Index';
import { Register } from './routes/Register/Index';
import { MainPage } from './routes/MainPage/Index';
import { PollDetails } from './routes/PollDetails/Index';
import Calculator from './routes/Practice/Calculator';
import Item3 from './routes/Practice/Item-3';
import Item5 from './routes/Practice/Item-5';
import Item1 from './routes/Practice/Item-1';
import Item2 from './routes/Practice/Item-2';
import Item4 from './routes/Practice/Item-4';
import Item6 from './routes/Practice/Item-6';
import Item7 from './routes/Practice/Item-7';
import Item8 from './routes/Practice/Item-8';
import Item9 from './routes/Practice/Item-9';
import Item10 from './routes/Practice/Item-10';
import Item14 from './routes/Practice/Item-14';
import Item20 from './routes/Practice/item-20';
import Test1 from './routes/Practice/Test-1';
import Item21 from './routes/Practice/Item-21';
import Item22 from './routes/Practice/Item-22';
import Item23 from './routes/Practice/Item-23';

import Item25 from './routes/Practice/Item-25';
import Item24 from './routes/Practice/Item-24';
import Item26 from './routes/Practice/Item-26/index.tsx';
import Item27 from './routes/Practice/Item-27/index.tsx';
import Item27learning from './routes/Practice/Item-27-learning/index.tsx';
import Item30 from './routes/Practice/Item-30/index.tsx';
import Item30Learning from './routes/Practice/Item-30-learning/index.tsx';
import Item31todo from './routes/Practice/Item-31-todo/index.tsx';

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
      <Route path="/practice/calculator" element={<Calculator />}></Route>
      <Route path="/practice/item-3" element={<Item3 />}></Route>
      <Route path="/practice/item-5" element={<Item5 />}></Route>
      <Route path="/practice/item-1" element={<Item1 />}></Route>
      <Route path="/practice/item-2" element={<Item2 />}></Route>
      <Route path="/practice/item-4" element={<Item4 />}></Route>
      <Route path="/practice/item-6" element={<Item6 />}></Route>
      <Route path="/practice/item-7" element={<Item7 />}></Route>
      <Route path="/practice/item-8" element={<Item8 />}></Route>
      <Route path="/practice/item-9" element={<Item9 />}></Route>
      <Route path="/practice/item-10" element={<Item10 />}></Route>
      <Route path="/practice/item-14" element={<Item14 />}></Route>
      <Route path="/practice/item-20" element={<Item20 />}></Route>
      <Route path="/practice/test-1" element={<Test1 />}></Route>
      <Route path="/practice/item-21" element={<Item21 />}></Route>
      <Route path="/practice/item-22" element={<Item22 />}></Route>
      <Route path="/practice/item-23" element={<Item23 />}></Route>
      <Route path="/practice/item-24" element={<Item24 />}></Route>
      <Route path="/practice/item-25" element={<Item25 />}></Route>
      <Route path="/practice/item-26" element={<Item26 />}></Route>
      <Route path="/practice/item-27" element={<Item27 />}></Route>
      <Route path="/practice/item-30" element={<Item30 />}></Route>
      <Route path="/practice/item-31-to-do" element={<Item31todo />}></Route>
      <Route
        path="/practice/item-30-learning"
        element={<Item30Learning />}
      ></Route>
      <Route
        path="/practice/item-27-learning"
        element={<Item27learning />}
      ></Route>
    </>
  )
);

export default router;
