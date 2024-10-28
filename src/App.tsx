import './App.css';

import { RouterProvider } from 'react-router-dom';
import router from './Router.js';

export default function App() {
  return <RouterProvider router={router} />;
}
