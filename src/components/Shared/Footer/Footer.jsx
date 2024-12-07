import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "Branding", path: "/services/branding" },
      { name: "Design", path: "/services/design" },
      { name: "Marketing", path: "/services/marketing" },
      { name: "Advertisement", path: "/services/advertisement" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Career", path: "/career" },
      { name: "Departments", path: "/departments" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of use", path: "/terms" },
      { name: "Privacy policy", path: "/privacy" },
      { name: "Cookie policy", path: "/cookies" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="flex flex-col lg:flex-row gap-8 bg-primary text-white p-6 md:p-10 lg:p-12">
      {/* Logo and description */}
      <aside className="w-full lg:w-1/3 flex flex-col items-center lg:items-start gap-4">
        <Link to={"/"} className="w-36 md:w-48 invert">
          <img src={logo} alt="Logo" loading="lazy" />
        </Link>
        <p className="text-gray-400 text-center lg:text-left text-sm md:text-base">
          A platform designed to help individuals and teams grow their skills,
          build networks, and achieve success in personal and professional
          development.
        </p>
      </aside>

      {/* Footer links */}
      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row gap-8">
        {footerLinks.map((section, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 lg:w-1/3 flex flex-col gap-3"
          >
            <h6 className="footer-title text-lg font-semibold">
              {section.title}
            </h6>
            {section.links.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className="link link-hover text-gray-200 hover:text-white text-sm md:text-base"
              >
                {link.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
