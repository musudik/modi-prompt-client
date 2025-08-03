# Modi-Prompt - Technical Context

## Technology Stack

### Frontend Technologies
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development and optimized builds)
- **Styling**: Tailwind CSS (utility-first CSS framework)
- **State Management**: Zustand for global state management
- **HTTP Client**: Axios with request/response interceptors
- **Routing**: React Router DOM v6
- **Forms**: React Hook Form for form handling
- **Animations**: Framer Motion for smooth animations
- **Development**: ESLint + TypeScript ESLint for code quality

### Backend Technologies
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM (or JSON file storage for simplicity)
- **Authentication**: JWT tokens with secure storage
- **Security**: Helmet, CORS, express-rate-limit
- **Validation**: Joi or Zod for input validation
- **Middleware**: Custom authentication and error handling

### AI Provider Integration
- **OpenAI**: GPT-4, GPT-3.5 Turbo integration
- **Anthropic**: Claude models support
- **Google**: Gemini Pro integration
- **API Management**: Secure key storage and rotation
- **Rate Limiting**: Provider-specific rate limiting

### Authentication & Security
- **Authentication**: JWT access tokens
- **API Key Encryption**: Encrypted storage of AI provider keys
- **Rate Limiting**: Express-rate-limit for API protection
- **CORS**: Configured for cross-origin resource sharing
- **Security Headers**: Helmet.js for HTTP security headers
- **Input Validation**: Server-side validation for all endpoints

### Development Environment
- **Package Manager**: npm
- **Development Server**: Vite dev server (frontend) + nodemon (backend)
- **Code Quality**: ESLint, TypeScript strict mode
- **Environment Variables**: dotenv for configuration management
- **Testing**: Jest for unit testing

## Architecture Patterns

### Frontend Architecture
- **Pattern**: Component-based architecture with custom hooks
- **State Management**: Zustand stores for global state
- **API Layer**: Service classes with Axios interceptors
- **Component Structure**: Atomic design principles
- **Routing**: Protected routes with authentication

### Backend Architecture
- **Pattern**: RESTful API with middleware layers
- **Structure**: Route-based organization
- **Error Handling**: Centralized error handling
- **Validation**: Input validation at route level
- **Authentication**: Middleware-based JWT verification

### Data Management
- **Prompt Storage**: Structured prompt data with metadata
- **Version Control**: Simple versioning for prompts
- **Categories**: Tag-based organization system
- **Search**: Full-text search capabilities

## Key Technical Decisions

### Technology Choices
1. **React over Vue/Angular**: Better ecosystem and community
2. **Zustand over Redux**: Simpler state management
3. **Vite over Create React App**: Faster development experience
4. **Tailwind over styled-components**: Utility-first approach
5. **TypeScript**: Type safety and better developer experience

### Simplification Decisions
1. **Single User Focus**: No complex team features initially
2. **File-based Storage**: Simple JSON storage over complex database
3. **Basic Authentication**: Simple JWT without complex roles
4. **Essential Features Only**: Focus on core prompt management
5. **Black & Purple Theme**: Consistent, modern design

### Performance Optimizations
1. **Code Splitting**: Lazy loading for routes
2. **Memoization**: React.memo and useMemo for optimization
3. **Debouncing**: Search and input debouncing
4. **Caching**: API response caching
5. **Bundle Optimization**: Vite's optimized bundling

## Development Setup

### Prerequisites
- Node.js 18+ (for ES2022 support)
- npm 8+ (package management)

### Environment Configuration
```bash
# Backend (.env)
NODE_ENV=development
PORT=3001
JWT_SECRET=your-secret-key
ENCRYPTION_KEY=your-encryption-key

# Frontend (.env)
VITE_API_URL=http://localhost:3001
```

### Development Commands
```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Technical Constraints

### Performance Requirements
- **Response Time**: < 300ms for API endpoints
- **Bundle Size**: < 1MB for initial load
- **Memory Usage**: Efficient memory management
- **Search Performance**: < 100ms for prompt search

### Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Support**: iOS Safari 14+, Chrome Mobile 90+
- **JavaScript**: ES2022 features with appropriate polyfills

## Dependencies

### Critical Dependencies
- **react**: Frontend framework
- **typescript**: Type safety
- **tailwindcss**: Styling framework
- **zustand**: State management
- **react-router-dom**: Routing
- **axios**: HTTP client
- **react-hook-form**: Form handling
- **framer-motion**: Animations

### Development Dependencies
- **vite**: Build tool and dev server
- **eslint**: Code quality
- **jest**: Testing framework
