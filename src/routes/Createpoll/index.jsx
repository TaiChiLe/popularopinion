import './index.css';
import Header from '../Mainpage/components/Header';
import Footer from '../Mainpage/components/Footer';
import Pollform from './compenents/pollform';
function Createpoll() {
  return (
    <>
      <Header></Header>
      <Pollform></Pollform>
      <Footer></Footer>
    </>
  );
}

export default Createpoll;
