# Modi-Prompt - Project Brief & Guidelines

## Project Overview

**Modi-Prompt** is a simplified AI prompt management platform built with React, TypeScript, and modern web technologies. It enables users to create, organize, test, and manage AI prompts with a clean black and purple themed interface.

## General Project Rules

### Code Quality Standards

#### TypeScript Usage
- **Strict Mode**: All TypeScript files must use strict mode
- **Type Safety**: Explicit typing for all function parameters and returns
- **Interface Definitions**: Comprehensive interfaces for all data structures
- **No Any Types**: Avoid `any` type usage; use proper type definitions
- **Generic Types**: Use generics for reusable components and functions

#### Code Organization
- **File Structure**: Organized by feature and component hierarchy
- **Naming Conventions**: PascalCase for components, camelCase for functions/variables
- **Import Organization**: Group imports (external, internal, relative)
- **Component Structure**: Single responsibility principle for all components
- **Custom Hooks**: Extract reusable logic into custom hooks

#### Documentation Requirements
- **Component Documentation**: JSDoc comments for all public components
- **API Documentation**: Clear endpoint documentation
- **README Files**: Clear setup and usage instructions
- **Code Comments**: Explain complex business logic
- **Type Documentation**: Document complex type definitions

### Development Guidelines

#### Frontend Development
- **React Best Practices**: Use functional components with hooks
- **State Management**: Zustand for global state, local state for components
- **Performance**: Implement React.memo and useMemo for optimization
- **Accessibility**: ARIA labels and semantic HTML elements
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Theme**: Black and purple color scheme throughout

#### Backend Integration
- **RESTful API**: Follow REST principles for all endpoints
- **Error Handling**: Consistent error response format
- **Input Validation**: Client and server-side validation
- **Security**: JWT authentication with secure token handling
- **Logging**: Comprehensive logging for debugging

### Security Guidelines

#### Authentication & Authorization
- **JWT Tokens**: Access tokens with reasonable expiration
- **API Key Management**: Secure storage and encryption of AI provider keys
- **Role-based Access**: Basic user permissions
- **Password Security**: Strong password requirements
- **Session Management**: Secure token storage

#### Input Security
- **Validation**: Server-side validation for all inputs
- **Sanitization**: XSS prevention through input sanitization
- **Rate Limiting**: API endpoint protection
- **CORS**: Properly configured cross-origin resource sharing
- **Headers**: Security headers implementation

## Usage Guidelines

### Development Workflow

#### Environment Setup
1. **Prerequisites**: Node.js 18+, npm 8+
2. **Installation**: Clone repository and install dependencies
3. **Configuration**: Set up environment variables
4. **Development**: Start development server
5. **Testing**: Run tests before commits

#### Code Development
1. **Feature Branches**: Create feature branches for new development
2. **Code Review**: Peer review for all code changes
3. **Testing**: Write unit tests for new functionality
4. **Documentation**: Update documentation for new features
5. **Integration**: Test API integrations

### API Usage Guidelines

#### Request Format
- **Content-Type**: `application/json` for all API requests
- **Authentication**: Bearer token in Authorization header
- **Validation**: Client-side validation before API calls
- **Error Handling**: Graceful handling of API errors
- **Retry Logic**: Implement retry for transient failures

#### AI Provider Integration
- **Multiple Providers**: Support for OpenAI, Anthropic, Google
- **Key Management**: Secure API key storage
- **Rate Limiting**: Respect provider rate limits
- **Error Handling**: Graceful fallbacks for provider errors
- **Cost Tracking**: Monitor usage and costs

## Notes for Development

### Performance Considerations
- **Bundle Size**: Monitor and optimize JavaScript bundle size
- **API Calls**: Optimize API calls and implement caching
- **Memory Usage**: Monitor and prevent memory leaks
- **Loading States**: Implement proper loading indicators
- **Debouncing**: Debounce search and input operations

### UI/UX Guidelines
- **Color Scheme**: Primary black (#000000) and purple (#8B5CF6) theme
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent spacing using Tailwind utilities
- **Components**: Reusable UI components
- **Animations**: Subtle animations for better UX

### Maintenance Guidelines
- **Dependency Updates**: Regular security and feature updates
- **Code Refactoring**: Continuous code quality improvement
- **Performance Monitoring**: Regular performance audits
- **Security Audits**: Periodic security assessments
- **Documentation Updates**: Keep documentation current
