import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Bottom Bar */}
        <hr className="border-gray-700 my-4" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-gray-500 small mb-0">
              © 2025 Modi-Prompt. All rights reserved.
            </p>
            <p className="text-gray-500 small mb-0 mt-1">
              Powered by{' '}
              <a 
                href="https://www.fkgpt.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 text-decoration-none hover-purple"
              >
                www.fkgpt.dev
              </a>
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end gap-3">
              <Link to="/" className="text-gray-400 text-decoration-none small hover-purple">
                Home
              </Link>
              <Link to="/about" className="text-gray-400 text-decoration-none small hover-purple">
                About
              </Link>
              <Link to="/privacy" className="text-gray-400 text-decoration-none small hover-purple">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 text-decoration-none small hover-purple">
                Terms
              </Link>
              <Link to="/contact" className="text-gray-400 text-decoration-none small hover-purple">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;