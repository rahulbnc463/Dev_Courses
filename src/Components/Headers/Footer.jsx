import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // Add your subscription logic here
    console.log("Subscribing with email:", email);
  };

  const services = [
    { id: 1, name: "Web Development", url: "#" },
    { id: 2, name: "Daily Update", url: "#" },
    { id: 3, name: "Server Design", url: "#" },
    { id: 4, name: "Exercise", url: "#" },
  ];

  const about = [
    { id: 1, name: "About", url: "#" },
    { id: 2, name: "Careers", url: "#" },
    { id: 3, name: "History", url: "#" },
    { id: 4, name: "Our Team", url: "#" },
  ];

  const support = [
    { id: 1, name: "FAQs", url: "#" },
    { id: 2, name: "Contact", url: "#" },
    { id: 3, name: "Live Chat", url: "#" },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 mb-5">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Want us to email you with the <br />
          latest IT Courses?
        </h2>
        <div className="flex justify-center mb-8">
          <input
            type="email"
            placeholder="example@company.com"
            className="bg-white border border-gray-300 rounded-l-md py-3 px-4 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md py-3 px-6 font-medium"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col justify-start mt-8">
            <p className="text-left">
              Our Experienced instructors will guide you through structured
              lessons, helping you develop a solid foundation and job ready
              condition
            </p>
            <div className="flex justify-start mt-8">
              <a href="#" className="text-primary hover:text-primary mx-2">
                <FaFacebookF />
              </a>
              <a href="#" className="text-primary hover:text-primary mx-2">
                <FaInstagram />
              </a>
              <a href="#" className="text-primary hover:text-primary mx-2">
                <FaTwitter />
              </a>
              <a href="#" className="text-primary hover:text-primary mx-2">
                <FaGithub />
              </a>
            </div>
          </div>
          <div className="services">
            <h3 className="text-lg font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={service.url}
                    className="text-primary hover:text-primary"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="about">
            <h3 className="text-lg font-medium mb-4">About</h3>
            <ul className="space-y-2">
              {about.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    className="text-primary hover:text-primary"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="support">
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    className="text-primary hover:text-primary"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <p className="mt-6 text-center text-sm text-gray-500">
        @ Dev Courses 2024. All right reserved.
      </p>
      <p className="mt-1 text-center text-sm text-gray-500">
        Created By :
        <Link
          className="text-primary"
          to="https://www.linkedin.com/in/rahul-deb-0949a3246/"
          target="_blank"
        >
          Rahul_Deb
        </Link>
      </p>
    </div>
  );
};

export default Footer;
