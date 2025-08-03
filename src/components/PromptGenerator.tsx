import React, { useState, useEffect } from 'react';
import { ChevronDown, X, Copy, Check } from 'lucide-react';
import { generatePrompt, getAvailableModels } from '../services/aiService';
import modiPromptLogo from '../assets/MODI-PROMPT.gif';

interface PromptGeneratorProps {}

interface FormData {
  inputConcept: string;
  model: string;
  apiKey: string;
  images: File[];
  style: string;
  cameraStyle: string;
  cameraDirection: string;
  pacing: string;
  specialEffects: string;
  promptLength: string;
  customElements: string;
  cfgScale: number; // Add this line
}

const PromptGenerator: React.FC<PromptGeneratorProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    inputConcept: '',
    model: 'Gemini 2.5 Flash',
    apiKey: '',
    images: [],
    style: 'Cinematic',
    cameraStyle: 'Drone aerials',
    cameraDirection: 'Orbital rotation',
    pacing: 'Gradual build',
    specialEffects: 'Practical effects',
    promptLength: 'Medium',
    customElements: '',
    cfgScale: 0.7 // Add this line
  });

  const [error, setError] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Add these state variables for models
  const [availableModels, setAvailableModels] = useState<Array<{name: string, icon: string}>>([]);
  // Remove unused modelsLoading state

  // Load available models on component mount
  useEffect(() => {
    const loadModels = async () => {
      try {
        const models = await getAvailableModels();
        setAvailableModels(models);
      } catch (error) {
        console.error('Failed to load models:', error);
        setAvailableModels([]);
      }
    };

    loadModels();
  }, []);

  const handleCopyPrompt = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatJsonOutput = (text: string): string => {
    try {
      // First try to parse as JSON
      const parsed = JSON.parse(text);
      return JSON.stringify(parsed, null, 2);
    } catch {
      // If not valid JSON, try to format as readable text
      return text;
    }
  };

  const renderJsonWithSyntaxHighlighting = (jsonString: string): React.ReactElement[] => {
    const formattedJson = formatJsonOutput(jsonString);
    
    return formattedJson.split('\n').map((line, index) => {
      let coloredLine = line;
      
      // Color coding based on JSON syntax with improved regex patterns
      coloredLine = coloredLine
        // Property names (light blue) - improved to handle nested objects
        .replace(/^(\s*)"([^"]*)": /gm, '$1<span style="color: #7dd3fc">"$2"</span>: ')
        // String values (green) - only values after colons
        .replace(/: "([^"]*)"/g, ': <span style="color: #98d982">"$1"</span>')
        // Numbers (orange)
        .replace(/: (-?\d+\.?\d*)/g, ': <span style="color: #fbbf24">$1</span>')
        // Booleans (purple)
        .replace(/: (true|false)/g, ': <span style="color: #c084fc">$1</span>')
        // null (red)
        .replace(/: (null)/g, ': <span style="color: #f87171">$1</span>')
        // Brackets and braces (white)
        .replace(/([\[\]{}])/g, '<span style="color: #ffffff">$1</span>')
        // Commas (gray)
        .replace(/(,)$/gm, '<span style="color: #9ca3af">$1</span>');
      
      return (
        <div 
          key={index} 
          style={{ 
            minHeight: '20px',
            textAlign: 'left',
            whiteSpace: 'pre',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
            fontSize: '13px',
            lineHeight: '1.5'
          }}
        >
          <span dangerouslySetInnerHTML={{ __html: coloredLine }} />
        </div>
      );
    });
  };

  const handleInputChange = (field: keyof FormData, value: string | number): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, images: files }));
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index: number): void => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[index]);
    
    setFormData(prev => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);
  };

  const handleGenerate = async (): Promise<void> => {
    if (!formData.apiKey.trim()) {
      setError('Please set your API Key in Settings.');
      return;
    }
    
    if (!formData.inputConcept.trim()) {
      setError('Please enter an input concept.');
      return;
    }

    setError('');
    setIsGenerating(true);
    setGeneratedPrompt('');
    
    try {
      const options = {
        style: formData.style,
        cameraStyle: formData.cameraStyle,
        cameraDirection: formData.cameraDirection,
        pacing: formData.pacing,
        specialEffects: formData.specialEffects,
        customElements: formData.customElements
      };

      const prompt = await generatePrompt(
        formData.model,
        formData.inputConcept,  // Fixed: prompt parameter
        options,
        formData.apiKey         // Fixed: apiKey parameter
      );
      
      setGeneratedPrompt(prompt);
    } catch (err) {
      console.error('Error generating prompt:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate prompt. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Add provider URL mapping
  const getProviderApiKeyUrl = (modelName: string): string => {
    if (modelName.includes('Claude') || modelName.includes('Sonnet') || modelName.includes('Opus')) {
      return 'https://console.anthropic.com/settings/keys';
    } else if (modelName.includes('Gemini')) {
      return 'https://aistudio.google.com/app/apikey';
    } else if (modelName.includes('GPT') || modelName.includes('o4')) {
      return 'https://platform.openai.com/api-keys';
    } else if (modelName.includes('OpenRouter')) {
      return 'https://openrouter.ai/keys';
    }
    return '#'; // fallback
  };

  const getProviderName = (modelName: string): string => {
    if (modelName.includes('Claude') || modelName.includes('Sonnet') || modelName.includes('Opus')) {
      return 'Anthropic';
    } else if (modelName.includes('Gemini')) {
      return 'Google AI Studio';
    } else if (modelName.includes('GPT') || modelName.includes('o4')) {
      return 'OpenAI';
    } else if (modelName.includes('OpenRouter')) {
      return 'OpenRouter';
    }
    return 'Provider';
  };

  // Cleanup preview URLs on unmount
  React.useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

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
          {/* <button className="btn btn-outline-secondary p-2 border-0" 
                  style={{ backgroundColor: 'var(--gray-800)' }}>
            <Settings size={24} />
          </button> */}
        </div>

        {/* Subtitle */}
        <p className="text-gray-400 mb-4 text-center">
          Create detailed video prompts, optionally with image references.
        </p>

        {/* Input Concept */}
        <div className="mb-4">
          <label className="form-label text-center d-block fw-medium">
            Input Concept
          </label>
          <textarea
            value={formData.inputConcept}
            onChange={(e) => handleInputChange('inputConcept', e.target.value)}
            placeholder="The Sculpting of Earth (4.6 - 4.0 billion years ago )"
            className="form-control bg-gray-900 border-gray-700 text-white"
            style={{ height: '96px', backgroundColor: 'var(--gray-900)', borderColor: 'var(--gray-700)' }}
            onFocus={(e) => e.target.classList.add('focus-ring-purple')}
            onBlur={(e) => e.target.classList.remove('focus-ring-purple')}
          />
        </div>

        {/* CFG Scale */}
        <div className="mb-4">
            <label className="form-label text-center d-block fw-medium">
            Cfg Scale
            </label>
            <div className="position-relative">
            <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.cfgScale}
                onChange={(e) => handleInputChange('cfgScale', parseFloat(e.target.value))}
                className="form-range slider w-100"
            />
            <span className="position-absolute end-0 text-gray-400" 
                    style={{ bottom: '-24px', fontSize: '14px' }}>{formData.cfgScale}</span>
            </div>
        </div>

        {/* Model Selection */}
        <div className="mb-4">
          <label className="form-label text-center d-block fw-medium">
            Select Model
          </label>
          <div className="position-relative">
            <select
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              className="form-select bg-gray-900 border-gray-700 text-white"
              style={{ backgroundColor: 'var(--gray-900)', borderColor: 'var(--gray-700)' }}
              onFocus={(e) => e.target.classList.add('focus-ring-purple')}
              onBlur={(e) => e.target.classList.remove('focus-ring-purple')}
            >
                {(availableModels instanceof Promise ? [] : availableModels).map((model) => (
                <option key={model.name} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>
            <ChevronDown className="position-absolute text-gray-400" 
                        style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
                        size={20} />
          </div>
        </div>

        {/* API Key Input */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="form-label fw-medium mb-0">
              API Key
            </label>
            <a
              href={getProviderApiKeyUrl(formData.model)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
              style={{ 
                color: 'var(--primary-purple)',
                fontSize: '14px',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--secondary-purple)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--primary-purple)';
              }}
            >
              Create {getProviderName(formData.model)} API Key →
            </a>
          </div>
          <input
            type="password"
            value={formData.apiKey}
            onChange={(e) => handleInputChange('apiKey', e.target.value)}
            placeholder="Enter your API key"
            className="form-control bg-gray-900 border-gray-700 text-white"
            style={{ backgroundColor: 'var(--gray-900)', borderColor: 'var(--gray-700)' }}
            onFocus={(e) => e.target.classList.add('focus-ring-purple')}
            onBlur={(e) => e.target.classList.remove('focus-ring-purple')}
          />
        </div>

        {/* Image Upload and Style Row */}
        <div className="row mb-4">
          {/* Upload Images */}
          <div className="col-lg-6 mb-3 mb-lg-0">
            <label className="form-label fw-medium">
              Upload Images (Optional)
            </label>
            <div className="position-relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="d-none"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="d-flex align-items-center justify-content-center w-100 bg-gray-900 border border-gray-700 rounded p-3 text-gray-400"
                style={{ height: '48px', backgroundColor: 'var(--gray-900)', borderColor: 'var(--gray-700)', cursor: 'pointer' }}
              >
                <span>
                  {formData.images.length > 0 ? `${formData.images.length} file(s) chosen` : 'Choose files'}
                </span>
              </label>
            </div>
            <small className="text-gray-500">Max 10 images</small>
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-3">
                <div className="d-flex flex-wrap gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="position-relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="rounded"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="btn btn-sm position-absolute top-0 end-0 p-1"
                        style={{ 
                          backgroundColor: 'rgba(220, 53, 69, 0.8)', 
                          border: 'none',
                          transform: 'translate(50%, -50%)'
                        }}
                      >
                        <X size={12} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Style */}
          <div className="col-lg-6">
            <label className="form-label fw-medium">
              Style
            </label>
            <div className="position-relative">
              <select
                value={formData.style}
                onChange={(e) => handleInputChange('style', e.target.value)}
                className="form-select bg-gray-900 border-gray-700 text-white"
                style={{ backgroundColor: 'var(--gray-900)', borderColor: 'var(--gray-700)' }}
                onFocus={(e) => e.target.classList.add('focus-ring-purple')}
                onBlur={(e) => e.target.classList.remove('focus-ring-purple')}
              >
                <option value="Default">Default</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Simple">Simple</option>
                <option value="Detailed">Detailed</option>
                <option value="Descriptive">Descriptive</option>
                <option value="Dynamic">Dynamic</option>
                <option value="Cinematic">Cinematic</option>
                <option value="Documentary">Documentary</option>
                <option value="Experimental">Experimental</option>
                <option value="Animation">Animation</option>
                <option value="Action">Action</option>
              </select>
              <ChevronDown className="position-absolute text-gray-400" 
                          style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
                          size={20} />
            </div>
          </div>
        </div>

        {/* Camera Style and Direction Row */}
        <div className="row mb-4">
          <div className="col-lg-6 mb-3 mb-lg-0">
            <label className="form-label fw-medium">
              Camera Style
            </label>
            <div className="position-relative">
              <select
                value={formData.cameraStyle}
                onChange={(e) => handleInputChange('cameraStyle', e.target.value)}
                className="form-select bg-gray-900 border-gray-700 text-white"
                style={{ backgroundColor: 'var(--gray-900)', borderColor: 'var(--gray-700)' }}
                onFocus={(e) => e.target.classList.add('focus-ring-purple')}
                onBlur={(e) => e.target.classList.remove('focus-ring-purple')}
              >
                <option value="Default">Default</option>
                <option value="None">None</option>
                <option value="Steadicam flow">Steadicam flow</option>
                <option value="Drone aerials">Drone aerials</option>
                <option value="Handheld urgency">Handheld urgency</option>
                <option value="Crane elegance">Crane elegance</option>
                <option value="Dolly precision">Dolly precision</option>
                <option value="VR 360">VR 360</option>
                <option value="Multi-angle rig">Multi-angle rig</option>
                <option value="Static tripod">Static tripod</option>
                <option value="Gimbal smoothness">Gimbal smoothness</option>
              </select>
              <ChevronDown className="position-absolute text-gray-400" 
                          style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
                          size={20} />
            </div>
          </div>

          <div className="col-lg-6">
            <label className="form-label fw-medium">
              Camera Direction
            </label>
            <div className="position-relative">
              <select
                value={formData.cameraDirection}
                onChange={(e) => handleInputChange('cameraDirection', e.target.value)}
                className="form-select bg-gray-900 border-gray-700 text-white"
                style={{ backgroundColor: 'var(--gray-900)', borderColor: 'var(--gray-700)' }}
                onFocus={(e) => e.target.classList.add('focus-ring-purple')}
                onBlur={(e) => e.target.classList.remove('focus-ring-purple')}
              >
                <option value="Default">Default</option>
                <option value="None">None</option>
                <option value="Zoom in">Zoom in</option>
                <option value="Zoom out">Zoom out</option>
                <option value="Pan left">Pan left</option>
                <option value="Pan right">Pan right</option>
                <option value="Tilt up">Tilt up</option>
                <option value="Tilt down">Tilt down</option>
                <option value="Orbital rotation">Orbital rotation</option>
                <option value="Push in">Push in</option>
                <option value="Pull out">Pull out</option>
              </select>
              <ChevronDown className="position-absolute text-gray-400" 
                          style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
                          size={20} />
            </div>
          </div>
        </div>

        {/* Pacing and Special Effects Row */}
        <div className="row mb-4">
          <div className="col-lg-6 mb-3 mb-lg-0">
            <label className="form-label fw-medium">
              Pacing
            </label>
            <div className="position-relative">
              <select
                value={formData.pacing}
                onChange={(e) => handleInputChange('pacing', e.target.value)}
                className="form-select bg-gray-900 border-gray-700 text-white"
                style={{ backgroundColor: 'var(--gray-900)', borderColor: 'var(--gray-700)' }}
                onFocus={(e) => e.target.classList.add('focus-ring-purple')}
                onBlur={(e) => e.target.classList.remove('focus-ring-purple')}
              >
                <option value="Default">Default</option>
                <option value="None">None</option>
                <option value="Slow burn">Slow burn</option>
                <option value="Rhythmic pulse">Rhythmic pulse</option>
                <option value="Frantic energy">Frantic energy</option>
                <option value="Ebb and flow">Ebb and flow</option>
                <option value="Hypnotic drift">Hypnotic drift</option>
                <option value="Time-lapse rush">Time-lapse rush</option>
                <option value="Stop-motion staccato">Stop-motion staccato</option>
                <option value="Gradual build">Gradual build</option>
                <option value="Quick cut rhythm">Quick cut rhythm</option>
              </select>
              <ChevronDown className="position-absolute text-gray-400" 
                          style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
                          size={20} />
            </div>
          </div>

          <div className="col-lg-6">
            <label className="form-label fw-medium">
              Special Effects
            </label>
            <div className="position-relative">
              <select
                value={formData.specialEffects}
                onChange={(e) => handleInputChange('specialEffects', e.target.value)}
                className="form-select bg-gray-900 border-gray-700 text-white"
                style={{ backgroundColor: 'var(--gray-900)', borderColor: 'var(--gray-700)' }}
                onFocus={(e) => e.target.classList.add('focus-ring-purple')}
                onBlur={(e) => e.target.classList.remove('focus-ring-purple')}
              >
                <option value="Default">Default</option>
                <option value="None">None</option>
                <option value="Practical effects">Practical effects</option>
                <option value="CGI enhancement">CGI enhancement</option>
                <option value="Analog glitches">Analog glitches</option>
                <option value="Light painting">Light painting</option>
                <option value="Projection mapping">Projection mapping</option>
                <option value="Nanosecond exposures">Nanosecond exposures</option>
                <option value="Double exposure">Double exposure</option>
                <option value="Smoke diffusion">Smoke diffusion</option>
                <option value="Lens flare artistry">Lens flare artistry</option>
              </select>
              <ChevronDown className="position-absolute text-gray-400" 
                          style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
                          size={20} />
            </div>
          </div>
        </div>

        {/* Prompt Length */}
        <div className="mb-4">
          <label className="form-label text-center d-block fw-medium">
            Prompt Length (Word Count)
          </label>
          <div className="position-relative">
            <select
              value={formData.promptLength}
              onChange={(e) => handleInputChange('promptLength', e.target.value)}
              className="form-select bg-gray-900 border-gray-700 text-white"
              style={{ backgroundColor: 'var(--gray-900)', borderColor: 'var(--gray-700)' }}
              onFocus={(e) => e.target.classList.add('focus-ring-purple')}
              onBlur={(e) => e.target.classList.remove('focus-ring-purple')}
            >
              <option value="50">50 words</option>
              <option value="100">100 words</option>
              <option value="150">150 words</option>
              <option value="200">200 words</option>
              <option value="250">250 words</option>
              <option value="300">300 words</option>
              <option value="350">350 words</option>
              <option value="400">400 words</option>
              <option value="450">450 words</option>
              <option value="500">500 words</option>
              <option value="500+">500+ words</option>
            </select>
            <ChevronDown className="position-absolute text-gray-400" 
                        style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
                        size={20} />
          </div>
        </div>

        {/* Custom Elements */}
        <div className="mb-4">
          <label className="form-label text-center d-block fw-medium">
            Custom Elements (Optional)
          </label>
          <input
            type="text"
            value={formData.customElements}
            onChange={(e) => handleInputChange('customElements', e.target.value)}
            placeholder="e.g., neon signs, flying cars"
            className="form-control bg-gray-900 border-gray-700 text-white"
            style={{ backgroundColor: 'var(--gray-900)', borderColor: 'var(--gray-700)' }}
            onFocus={(e) => e.target.classList.add('focus-ring-purple')}
            onBlur={(e) => e.target.classList.remove('focus-ring-purple')}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mb-4" 
               style={{ backgroundColor: 'rgba(220, 53, 69, 0.2)', borderColor: 'rgba(220, 53, 69, 0.5)' }}>
            <p className="text-center mb-0" style={{ color: '#f87171' }}>
              Video Prompt Error<br />
              {error}
            </p>
          </div>
        )}

        {/* Generated Prompt Display */}
        {generatedPrompt && (
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label fw-medium mb-0">
                Generated Video Prompt
              </label>
              <div className="position-relative">
                <button
                  onClick={handleCopyPrompt}
                  className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
                  title="Copy prompt"
                >
                  {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                  {copySuccess ? 'Copied!' : 'Copy'}
                </button>
                {copySuccess && (
                  <div 
                    className="position-absolute top-0 start-50 translate-middle-x"
                    style={{
                      marginTop: '-35px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      zIndex: 1000,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}
                  >
                    Prompt copied!
                    <div 
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '4px solid transparent',
                        borderRight: '4px solid transparent',
                        borderTop: '4px solid #10b981'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div 
              className="p-3 rounded position-relative" 
              style={{ 
                backgroundColor: '#1a1a1a',
                borderColor: '#374151', 
                border: '1px solid',
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
                fontSize: '13px',
                lineHeight: '1.5',
                maxHeight: '400px',
                overflowY: 'auto'
              }}
            >
              <div 
                style={{ 
                  color: '#e5e7eb',
                  whiteSpace: 'pre',
                  wordWrap: 'break-word',
                  textAlign: 'left'
                }}
              >
                {renderJsonWithSyntaxHighlighting(generatedPrompt)}
              </div>
            </div>
            <div className="d-flex gap-2 mt-2">
              <button
                onClick={() => setGeneratedPrompt('')}
                className="btn btn-outline-secondary btn-sm"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="btn w-100 text-white fw-medium py-3"
          style={{ 
            backgroundColor: isGenerating ? 'var(--gray-600)' : 'var(--primary-purple)',
            borderColor: isGenerating ? 'var(--gray-600)' : 'var(--primary-purple)'
          }}
          onMouseEnter={(e) => {
            if (!isGenerating) {
              e.currentTarget.style.backgroundColor = 'var(--secondary-purple)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isGenerating) {
              e.currentTarget.style.backgroundColor = 'var(--primary-purple)';
            }
          }}
        >
          {isGenerating ? 'Generating...' : 'Generate Video Prompt'}
        </button>
      </div>
    </div>
  );
};

export default PromptGenerator;