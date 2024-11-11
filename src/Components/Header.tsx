import { Logout } from '../routes/Logout/Index';
import './style.css';

function Header() {
  return (
    <div className="header">
      <div className="heading">Popular Opinion</div>
      <div className="header-tabs">
        <div>Hot</div>
        <div>Best</div>
        <div>Worst</div>
      </div>
      <Logout />
    </div>
  );
}

export default Header;
