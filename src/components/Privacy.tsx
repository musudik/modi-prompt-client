import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import modiPromptLogo from '../assets/MODI-PROMPT.gif';

const Privacy: React.FC = () => {
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

        {/* Privacy Policy */}
        <div className="mb-5">
          <h1 className="display-4 fw-bold mb-3 text-center">Privacy Policy</h1>
          <p className="text-gray-400 text-center mb-5">
            Last updated: January 2025
          </p>

          <div className="text-gray-300">
            <h2 className="h4 fw-bold mb-3">Information We Collect</h2>
            <p className="mb-4">
              Modi-Prompt is designed with privacy in mind. We collect minimal information necessary 
              to provide our service:
            </p>
            <ul className="mb-4">
              <li>API keys you provide (stored locally in your browser)</li>
              <li>Prompt generation requests and responses</li>
              <li>Basic usage analytics to improve our service</li>
            </ul>

            <h2 className="h4 fw-bold mb-3">How We Use Your Information</h2>
            <p className="mb-4">
              Your information is used solely to:
            </p>
            <ul className="mb-4">
              <li>Generate video prompts using AI services</li>
              <li>Improve our platform and user experience</li>
              <li>Provide customer support when requested</li>
            </ul>

            <h2 className="h4 fw-bold mb-3">Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your information. API keys are 
              stored locally in your browser and are not transmitted to our servers unless necessary 
              for prompt generation.
            </p>

            <h2 className="h4 fw-bold mb-3">Third-Party Services</h2>
            <p className="mb-4">
              Modi-Prompt integrates with third-party AI services (OpenAI, Anthropic, Google, etc.). 
              When you use these services, their respective privacy policies apply.
            </p>

            <h2 className="h4 fw-bold mb-3">Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy, please contact us at{' '}
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

export default Privacy;