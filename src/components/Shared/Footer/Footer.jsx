import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const footerLinks = [
  {
    title: 'Services',
    links: [
      { name: 'Branding', path: '/services/branding' },
      { name: 'Design', path: '/services/design' },
      { name: 'Marketing', path: '/services/marketing' },
      { name: 'Advertisement', path: '/services/advertisement' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Career', path: '/career' },
      { name: 'Departments', path: '/departments' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms of use', path: '/terms' },
      { name: 'Privacy policy', path: '/privacy' },
      { name: 'Cookie policy', path: '/cookies' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="flex gap-4 bg-primary text-white p-10">
      <aside className="basis-2/5 flex-col flex">
        <Link to={'/'} className="w-48 invert">
          <img src={logo} alt="Logo" />
        </Link>
        <p className="text-gray-400 w-3/4">
          A platform designed to help individuals and teams grow their skills, build networks, and achieve success in personal and professional development.
        </p>
      </aside>

      {footerLinks.map((section, index) => (
        <div key={index} className="basis-1/5 flex-col gap-3 flex">
          <h6 className="footer-title">{section.title}</h6>
          {section.links.map((link, idx) => (
            <Link key={idx} to={link.path} className="link link-hover">
              {link.name}
            </Link>
          ))}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
