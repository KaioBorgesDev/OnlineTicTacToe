# Deployment Guide - TicTacToe Backend

## Azure App Service Configuration

### Required Environment Variables
Configure these in your Azure App Service settings:

- `PORT`: 8080 (Azure uses this port)
- `NODE_ENV`: production
- `FRONTEND_URL`: Your frontend domain URL

### Azure Configuration Steps

1. **App Service Settings**:
   - Runtime stack: Node.js 22 LTS
   - Operating System: Linux
   - Region: Choose your preferred region

2. **Configuration**:
   - Go to Configuration > Application Settings
   - Add the environment variables mentioned above
   - Enable WebSockets in Configuration > General Settings

3. **Deployment**:
   - The GitHub Actions workflow will automatically deploy when you push to main branch
   - Make sure your Azure secrets are properly configured in GitHub

### Local Testing Before Deploy

```bash
cd backend
npm install
npm run build
npm start
```

### Files Structure After Deploy
```
/
├── dist/           # Compiled TypeScript files
├── package.json    # Dependencies
├── web.config      # IIS configuration for Azure
├── startup.cmd     # Azure startup script
└── .nvmrc         # Node version specification
```

### Troubleshooting

1. **Check logs**: Go to Azure Portal > App Service > Log stream
2. **Verify environment variables**: Configuration > Application Settings
3. **WebSocket issues**: Ensure WebSockets are enabled in Configuration
4. **CORS issues**: Update FRONTEND_URL environment variable
