import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
const Footer = () => {
  return (
    <footer className="flex gap-4 bg-primary text-white p-10">
      <aside className='basis-2/5
       flex-col flex'>
        <Link to={'/'} className="w-48 invert"><img src={logo} alt="" /></Link>
        <p className="text-gray-400 w-3/4
        ">
          A platform designed to help individuals and teams grow their skills, build networks, and achieve success in personal and professional development.
        </p>
      </aside>
      <div className='basis-1/5
       flex-col flex'>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </div>
      <div className='basis-1/5
       flex-col flex'>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div className='basis-1/5
       flex-col flex'>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer >
  );
};

export default Footer;
