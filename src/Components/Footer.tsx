import './style.css';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer-tabs" onClick={() => navigate('/main')}>
        <i className="bi bi-house footer-icon"></i>
        <div className="footer-tab-font">Home</div>
      </div>
      <div className="footer-tabs" onClick={() => navigate('/create')}>
        <i className="bi bi-plus-circle footer-icon"></i>
        <div className="footer-tab-font">Create</div>
      </div>
      <div className="footer-tabs" onClick={() => navigate('/notifications')}>
        <i className="bi bi-bell footer-icon"></i>
        <div className="footer-tab-font">Notifications</div>
      </div>
    </div>
  );
}

export default Footer;
