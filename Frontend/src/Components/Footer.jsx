import React from "react";
import newLogo from "../assets/newLogo.png";

const Footer = () => {
  return (
    <footer className="mt-40 py-10 border-t border-gray-300 text-gray-700">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between gap-10">
        {/* Logo & About */}
        <div className="flex-1">
          <img src={newLogo} alt="Cloths4U Logo" className="mb-5 w-32" />
          <p className="text-sm leading-relaxed text-gray-600 md:w-2/3">
            Cloths4U brings you the perfect blend of style, comfort, and
            quality. We’re committed to making fashion affordable and accessible
            for everyone — because great style should never be out of reach.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="font-semibold mb-3 text-gray-800">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-black">
                Home
              </a>
            </li>
            <li>
              <a href="/collection" className="hover:text-black">
                Shop
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-black">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-black">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex-1">
          <h3 className="font-semibold mb-3 text-gray-800">Get in Touch</h3>
          <p className="text-sm text-gray-600">
            Have questions? We’re here to help!
          </p>
          <p className="text-sm text-gray-600 mt-2">📧 support@cloths4u.com</p>
          <p className="text-sm text-gray-600">📞 +91 98765 43210</p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-200 pt-5">
        © {new Date().getFullYear()} Cloths4U — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
