# Modi-Prompt - Project Rules

## Development Rules

### Code Standards
1. **TypeScript Only**: All code must be written in TypeScript with strict mode
2. **No Any Types**: Avoid `any` type; use proper type definitions
3. **Component Props**: All component props must have defined interfaces
4. **Function Types**: All functions must have explicit return types
5. **Import Organization**: Group imports (external, internal, relative)

### Naming Conventions
1. **Components**: PascalCase (e.g., `PromptEditor`, `TestingInterface`)
2. **Files**: kebab-case for files (e.g., `prompt-editor.tsx`, `api-client.ts`)
3. **Variables**: camelCase (e.g., `promptData`, `apiResponse`)
4. **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_PROMPTS`)
5. **CSS Classes**: Tailwind utilities only, no custom CSS classes

### File Organization
1. **Single Responsibility**: One component per file
2. **Index Files**: Use index.ts for clean imports
3. **Type Definitions**: Separate types in dedicated files
4. **Utility Functions**: Group related utilities together
5. **Service Classes**: Separate API services by domain

## Design Rules

### Color Scheme
1. **Primary Black**: #000000 for main backgrounds and text
2. **Primary Purple**: #8B5CF6 for accents and interactive elements
3. **Secondary Purple**: #A78BFA for hover states and highlights
4. **Gray Scale**: Use Tailwind gray scale for neutral elements
5. **White**: #FFFFFF for contrast and light backgrounds

### Typography
1. **Font Family**: Use system fonts or Inter for consistency
2. **Font Sizes**: Use Tailwind text utilities (text-sm, text-base, etc.)
3. **Font Weights**: Use semantic weights (normal, medium, semibold, bold)
4. **Line Height**: Use Tailwind leading utilities for proper spacing
5. **Letter Spacing**: Use Tailwind tracking utilities sparingly

### Spacing & Layout
1. **Consistent Spacing**: Use Tailwind spacing scale (4, 8, 16, 24, 32px)
2. **Grid System**: Use CSS Grid or Flexbox for layouts
3. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
4. **Component Spacing**: Consistent padding and margins within components
5. **Page Layout**: Consistent page structure and navigation

## Component Rules

### React Components
1. **Functional Components**: Use function components with hooks only
2. **Props Interface**: Define props interface for every component
3. **Default Props**: Use default parameters instead of defaultProps
4. **Ref Forwarding**: Use forwardRef for components that need refs
5. **Memo Usage**: Use React.memo for expensive components

### Custom Hooks
1. **Naming**: Start with 'use' prefix (e.g., `usePrompts`, `useApiKey`)
2. **Single Purpose**: Each hook should have a single responsibility
3. **Return Object**: Return objects for multiple values
4. **Dependencies**: Properly manage useEffect dependencies
5. **Error Handling**: Include error states in hook returns

### State Management
1. **Zustand Stores**: Use Zustand for global state
2. **Local State**: Use useState for component-specific state
3. **Derived State**: Use useMemo for computed values
4. **State Updates**: Use immutable update patterns
5. **State Structure**: Keep state flat and normalized

## API Rules

### Request/Response Format
1. **JSON Only**: All API communication in JSON format
2. **Consistent Structure**: Standardized response format
3. **Error Handling**: Consistent error response structure
4. **Status Codes**: Proper HTTP status codes for all responses
5. **Validation**: Server-side validation for all inputs

### Authentication
1. **JWT Tokens**: Use JWT for authentication
2. **Token Storage**: Secure token storage in httpOnly cookies
3. **Token Expiration**: Reasonable token expiration times
4. **Refresh Logic**: Automatic token refresh when needed
5. **Logout**: Proper token cleanup on logout

### AI Provider Integration
1. **Key Security**: Encrypt API keys before storage
2. **Rate Limiting**: Respect provider rate limits
3. **Error Handling**: Graceful handling of provider errors
4. **Timeout Handling**: Reasonable timeouts for API calls
5. **Cost Tracking**: Monitor usage and costs

## Security Rules

### Input Validation
1. **Client Validation**: Validate all user inputs on client
2. **Server Validation**: Re-validate all inputs on server
3. **Sanitization**: Sanitize inputs to prevent XSS
4. **Type Checking**: Validate data types and formats
5. **Length Limits**: Enforce reasonable input length limits

### Data Protection
1. **API Key Encryption**: Encrypt sensitive data at rest
2. **HTTPS Only**: All communications over HTTPS
3. **No Sensitive Logs**: Never log sensitive information
4. **Error Messages**: Don't expose sensitive data in errors
5. **Access Control**: Proper authorization for all operations

## Performance Rules

### Frontend Performance
1. **Code Splitting**: Lazy load routes and heavy components
2. **Bundle Size**: Monitor and optimize bundle size
3. **Image Optimization**: Optimize all images and assets
4. **Caching**: Implement appropriate caching strategies
5. **Debouncing**: Debounce expensive operations

### Backend Performance
1. **Response Time**: Target < 300ms for API responses
2. **Database Queries**: Optimize all database operations
3. **Caching**: Cache frequently accessed data
4. **Compression**: Compress API responses
5. **Connection Pooling**: Efficient database connections

## Testing Rules

### Unit Testing
1. **Test Coverage**: Aim for 80%+ test coverage
2. **Component Testing**: Test all public component interfaces
3. **Hook Testing**: Test custom hooks thoroughly
4. **Utility Testing**: Test all utility functions
5. **Mock External**: Mock all external dependencies

### Integration Testing
1. **API Testing**: Test all API endpoints
2. **User Flows**: Test critical user workflows
3. **Error Scenarios**: Test error handling paths
4. **Authentication**: Test auth flows thoroughly
5. **Provider Integration**: Test AI provider integrations

## Documentation Rules

### Code Documentation
1. **JSDoc Comments**: Document all public functions and components
2. **Type Documentation**: Document complex type definitions
3. **README Files**: Maintain up-to-date README files
4. **API Documentation**: Document all API endpoints
5. **Setup Instructions**: Clear development setup guide

### Comments
1. **Why Not What**: Explain why, not what the code does
2. **Complex Logic**: Comment complex algorithms and business logic
3. **TODO Comments**: Use TODO for future improvements
4. **No Dead Code**: Remove commented-out code
5. **Update Comments**: Keep comments in sync with code