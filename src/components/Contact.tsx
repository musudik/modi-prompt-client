import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import modiPromptLogo from '../assets/MODI-PROMPT.gif';

const Contact: React.FC = () => {
  return (
    <div className="min-vh-100 bg-black text-white p-4">
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <img 
              src={modiPromptLogo} 
              alt="Modi-Prompt Logo" 
              className="me-3" 
              style={{ width: '200px', height: '200px', objectFit: 'contain' }}
            />
          </div>
          <Link 
            to="/" 
            className="btn btn-outline-secondary d-flex align-items-center gap-2 text-decoration-none"
            style={{ backgroundColor: 'var(--gray-800)', borderColor: 'var(--gray-700)' }}
          >
            <ArrowLeft size={16} />
            Back to App
          </Link>
        </div>

        {/* Contact Us Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
          <p className="text-gray-400 lead">
            We'd love to hear from you.
          </p>
        </div>

        <hr className="border-gray-700 mb-5" />

        {/* General Inquiries */}
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold mb-4">General Inquiries</h2>
          <p className="text-gray-300 mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
            For any questions, feedback, or partnership opportunities, please don't hesitate to 
            reach out. We appreciate your input and will get back to you as soon as possible.
          </p>
          <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
            <Mail size={20} className="text-purple-400" />
            <a 
              href="mailto:info@fkgpt.dev" 
              className="text-white text-decoration-none fw-medium"
            >
              info@fkgpt.dev
            </a>
          </div>
        </div>

        {/* Follow Us */}
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold mb-4">Follow Us</h2>
          <p className="text-gray-300 mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Stay up to date with the latest news, features, and updates by following us on our 
            social media channels.
          </p>
        </div>

        {/* Please Note */}
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold mb-4">Please Note</h2>
          <p className="text-gray-300 mb-3" style={{ maxWidth: '700px', margin: '0 auto' }}>
            This is a contact page for digital correspondence only. We do not offer support via phone and do 
            not have a physical location for inquiries. For information regarding your data, please see our{' '}
            <Link to="/privacy" className="text-purple-400 text-decoration-none">
              Privacy Policy
            </Link>
            . For our terms of use, please visit the{' '}
            <Link to="/terms" className="text-purple-400 text-decoration-none">
              Terms of Service
            </Link>
            {' '}page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;