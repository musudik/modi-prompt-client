import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import modiPromptLogo from '../assets/MODI-PROMPT.gif';

const Terms: React.FC = () => {
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
            <h1 className="h2 fw-bold mb-0">Modi-Prompt</h1>
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

        {/* Terms of Service */}
        <div className="mb-5">
          <h1 className="display-4 fw-bold mb-3 text-center">Terms of Service</h1>
          <p className="text-gray-400 text-center mb-5">
            Last updated: January 2025
          </p>

          <div className="text-gray-300">
            <h2 className="h4 fw-bold mb-3">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Modi-Prompt, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>

            <h2 className="h4 fw-bold mb-3">Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily use Modi-Prompt for personal and commercial 
              prompt generation purposes. This is the grant of a license, not a transfer of title.
            </p>

            <h2 className="h4 fw-bold mb-3">User Responsibilities</h2>
            <ul className="mb-4">
              <li>Provide accurate information when using our services</li>
              <li>Maintain the security of your API keys</li>
              <li>Use the service in compliance with applicable laws</li>
              <li>Respect intellectual property rights</li>
            </ul>

            <h2 className="h4 fw-bold mb-3">API Key Usage</h2>
            <p className="mb-4">
              You are responsible for your own API keys and any costs associated with their usage. 
              Modi-Prompt is not liable for charges incurred through third-party AI services.
            </p>

            <h2 className="h4 fw-bold mb-3">Limitation of Liability</h2>
            <p className="mb-4">
              Modi-Prompt shall not be liable for any damages arising from the use or inability 
              to use our service, including but not limited to direct, indirect, incidental, 
              punitive, and consequential damages.
            </p>

            <h2 className="h4 fw-bold mb-3">Contact Information</h2>
            <p className="mb-4">
              For questions regarding these Terms of Service, please contact us at{' '}
              <a href="mailto:info@fkgpt.dev" className="text-purple-400 text-decoration-none">
                info@fkgpt.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;