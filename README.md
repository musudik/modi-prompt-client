# Modi-Prompt
A powerful AI-driven video prompt generation platform that helps creators, filmmakers, and video production professionals generate detailed, customizable video prompts using multiple AI models.

## 🚀 Features
- Multi-AI Support : Integrates with leading AI providers (OpenAI GPT, Anthropic Claude, Google Gemini, Groq, OpenRouter)
- Customizable Prompts : Fine-tune your prompts with style, camera angles, pacing, and special effects
- Real-time Generation : Generate detailed video prompts with JSON output formatting
- Responsive Design : Modern, mobile-first interface built with React and Bootstrap
- API Key Management : Secure local storage of your own API keys
- Copy & Export : Easy copying and exporting of generated prompts
## 🛠️ Tech Stack
### Frontend
- React 19.1.0 with TypeScript
- Vite for build tooling
- Bootstrap 5.3.0 for styling
- React Router 7.7.1 for navigation
- Lucide React for icons
### Backend
- Node.js with Express 5.1.0
- TypeScript for type safety
- Axios for HTTP requests
- CORS for cross-origin requests
- dotenv for environment management
## 📋 Prerequisites
- Node.js 18+
- npm or yarn
- API keys from supported AI providers (OpenAI, Anthropic, Google, etc.)
### Environment Configuration Backend Environment (.env)
Create a .env file in the backend directory:


### Environment Configuration 

### Backend Environment (.env)
```
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
FREE_OPENAI_KEYS=your_openai_key_1,your_openai_key_2
```

### Frontend Environment (optional)
Create a .env file in the root directory:
```
VITE_API_URL=http://localhost:3001
VITE_FREE_OPENAI_KEYS=your_openai_key_1,your_openai_key_2
```
## Deployment

### Option 1: Vercel
Frontend Deployment
1.Install Vercel CLI
Bash
```
npm i -g vercel
```
1. Login to Vercel
Bash
```
vercel login
```
1. Deploy Frontend
Bash
```
vercel --prod
```
1. Configure Environment Variables In your Vercel dashboard, add these environment variables:
```
VITE_API_URL: Your backend API URL
VITE_FREE_OPENAI_KEYS: Your OpenAI API keys (optional)
Backend Deployment Options
Option 1: Vercel Functions
```
1. Create vercel.json in the backend directory:
JSON
```
{  
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```
1. Update backend package.json scripts:
JSON
```
{  
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "vercel-build": "npm run build"
  }
}
```
1. Deploy backend:
Bash
```
cd backend
vercel --prod
```
### Option 2: Heroku

1. 1.
   Create a Heroku app:
```
heroku create your-app-name-backend
```
2. 1.
   Set environment variables:
```
heroku config:set NODE_ENV=production
heroku config:set PORT=3001
heroku config:set FRONTEND_URL=https://your-frontend-url.vercel.app
```
3. 1.
   Deploy:
```
git subtree push --prefix backend heroku main
```
### Option 2: Repl.it

## 6. Quick Start Commands
### Make the script executable and run:
```
chmod +x deploy-replit.sh
./deploy-replit.sh
```
Or run individual commands:
# Install all dependencies
```
npm run install:all
```
# Build everything
```
npm run build:all
```
# Start the application
```
npm run start:replit
```

### Full Stack Deployment Configuration
1. 1.
   Deploy Backend First and note the URL
2. 2.
   Update Frontend Environment with backend URL
3. 3.
   Deploy Frontend with updated environment variables
4. 4.
   Update Backend CORS settings with frontend URL

## 📁 Project Structure

Modi-Prompt/
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Privacy.tsx
│   │   ├── PromptGenerator.tsx
│   │   └── Terms.tsx
│   ├── services/
│   │   └── aiService.ts
│   ├── assets/
│   │   └── MODI-PROMPT.gif
│   ├── styles/
│   │   └── slider.css
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── backend/
│   ├── src/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── public/
├── package.json
├── vite.config.ts
└── README.md

## 🔑 API Keys Setup
The application supports multiple AI providers. You'll need API keys from:

- OpenAI : For GPT models
- Anthropic : For Claude models
- Google : For Gemini models
- Groq : For Groq models
- OpenRouter : For OpenRouter models
API keys are stored locally in your browser and are not transmitted to our servers unless necessary for prompt generation.

## 🎯 Usage
1. 1.
   Enter your API key in the application settings
2. 2.
   Input your concept for the video prompt
3. 3.
   Select AI model from supported providers
4. 4.
   Customize parameters :
   - Style (Cinematic, Documentary, etc.)
   - Camera Style (Handheld, Steady, etc.)
   - Camera Direction (Wide shot, Close-up, etc.)
   - Pacing (Slow, Medium, Fast)
   - Special Effects
   - Custom Elements
   - CFG Scale
5. 5.
   Generate prompt and copy the JSON output
## 🤝 Contributing
1. 1.
   Fork the repository
2. 2.
   Create a feature branch ( git checkout -b feature/amazing-feature )
3. 3.
   Commit your changes ( git commit -m 'Add amazing feature' )
4. 4.
   Push to the branch ( git push origin feature/amazing-feature )
5. 5.
   Open a Pull Request
## 📄 License
This project is licensed under the ISC License.

## 🔗 Links
- Powered by : www.fkgpt.dev
- Frontend : Deployed on Vercel
- Backend : Deployed on Railway/Heroku/Vercel
## 🐛 Troubleshooting
### Common Issues
1. 1.
   CORS Errors : Ensure backend FRONTEND_URL matches your frontend deployment URL
2. 2.
   API Key Issues : Verify API keys are correctly set in environment variables
3. 3.
   Build Errors : Ensure all dependencies are installed and TypeScript compiles without errors
4. 4.
   Port Conflicts : Change ports in environment variables if needed
### Development Tips
- Use npm run lint to check code quality
- Backend runs on port 3001, frontend on 5173 by default
- Check browser console for detailed error messages
- Ensure both frontend and backend are running for full functionality