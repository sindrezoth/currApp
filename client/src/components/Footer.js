import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-auto bg-dark text-center p-4">
      <div className="container">
        <Link className="text-bg-dark" to='/support'>Связаться с службой поддержки</Link>
        <hr />

        <p className="text-bg-dark m-0">License 2025</p>
      </div>
    </footer>
  );
}

export default Footer;
