import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Target, Users } from 'lucide-react';
import modiPromptLogo from '../assets/MODI-PROMPT.gif';

const About: React.FC = () => {
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

        {/* About Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">About Modi-Prompt</h1>
          <p className="text-gray-400 lead">
            Empowering creators with AI-driven video prompt generation.
          </p>
        </div>

        <hr className="border-gray-700 mb-5" />

        {/* Mission */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="h3 fw-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              Modi-Prompt is designed to revolutionize the way creators generate video prompts. 
              By leveraging cutting-edge AI technology, we provide detailed, customizable prompts 
              that help bring your creative visions to life.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="row mb-5">
          <div className="col-md-4 mb-4 text-center">
            <div className="mb-3">
              <Zap size={48} className="text-purple-400" />
            </div>
            <h3 className="h5 fw-bold mb-3">AI-Powered</h3>
            <p className="text-gray-400 small">
              Utilize multiple AI models including GPT, Claude, and Gemini for diverse prompt generation.
            </p>
          </div>
          <div className="col-md-4 mb-4 text-center">
            <div className="mb-3">
              <Target size={48} className="text-purple-400" />
            </div>
            <h3 className="h5 fw-bold mb-3">Customizable</h3>
            <p className="text-gray-400 small">
              Fine-tune your prompts with style, camera angles, pacing, and special effects options.
            </p>
          </div>
          <div className="col-md-4 mb-4 text-center">
            <div className="mb-3">
              <Users size={48} className="text-purple-400" />
            </div>
            <h3 className="h5 fw-bold mb-3">Creator-Focused</h3>
            <p className="text-gray-400 small">
              Built specifically for content creators, filmmakers, and video production professionals.
            </p>
          </div>
        </div>

        {/* Technology */}
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold mb-4">Technology</h2>
          <p className="text-gray-300 mb-4" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Modi-Prompt integrates with leading AI providers to offer you the best prompt generation 
            experience. Our platform supports multiple models and allows you to use your own API keys 
            for maximum flexibility and control.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;