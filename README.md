# AI Sales Agent

An AI-powered sales automation platform that fetches leads, qualifies them, and generates personalized outreach messages.

## 🏗️ Project Structure

```
ai-sales-agent/
│
├── backend/
│   ├── index.ts        # Sales Agent pipeline
│   ├── tools.ts        # AI tools (fetchLeads, qualifyLead, draftOutreach)
│   ├── prompts.ts      # System prompt
│   ├── server.ts       # Express server
│   └── package.json
│
├── frontend/
│   ├── package.json
│   ├── src/
│   │   └── app/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── globals.css
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── README.md
└── reflection.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- OpenAI API key

### Backend Setup
```bash
cd backend
npm install
# or
bun install

# Set your OpenAI API key
export OPENAI_API_KEY="your-api-key-here"

# Run the backend server
npm run dev
# or
bun run server.ts
```

### Frontend Setup
```bash
cd frontend
npm install

# Run the frontend
npm run dev
```

### Access the Application
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

## 🔧 Features

### Sales Pipeline
1. **Fetch Leads** - Retrieves all leads from the database
2. **Qualify Leads** - Scores leads based on budget, company size, and engagement
3. **Generate Outreach** - Creates personalized email and LinkedIn messages for qualified leads

### Lead Scoring Algorithm
- **Budget**: High (40 pts), Medium (25 pts), Low (10 pts)
- **Company Size**: 500+ (30 pts), 100-500 (25 pts), 10-50 (15 pts)
- **Engagement**: Active (20 pts), Warm (15 pts), Cold (5 pts)

### Lead Classification
- **Hot Lead**: 70+ points
- **Warm Lead**: 50-69 points
- **Cold Lead**: 30-49 points
- **Unqualified**: <30 points

## 🛠️ API Endpoints

### Backend (`http://localhost:3000`)

- `GET /health` - Health check
- `POST /run-agent` - Execute the full sales pipeline

## 📊 Sample Data

The system includes sample leads:
- **John Smith** (TechCorp Inc) - VP of Engineering
- **Sarah Johnson** (StartupXYZ) - CEO  
- **Mike Davis** (Enterprise Solutions) - CTO

## 🔄 Pipeline Flow

1. Fetch all leads from database
2. Qualify each lead using scoring algorithm
3. Generate outreach messages for Hot/Warm leads
4. Skip Cold/Unqualified leads
5. Display results with summary statistics

## 🎯 Usage

### Command Line
```bash
cd backend
bun run index.ts
```

### Web Interface
1. Start both backend and frontend servers
2. Open http://localhost:3001
3. Click "Run Sales Agent Pipeline"
4. View results and generated outreach messages

## 🧠 AI Integration

- **Model**: OpenAI GPT-4o-mini
- **Tools**: Custom functions for lead management
- **Personalization**: Dynamic message generation based on lead data
- **Streaming**: Real-time response streaming

## 📝 Development

### Backend Development
```bash
cd backend
bun run server.ts  # Start development server
```

### Frontend Development
```bash
cd frontend
npm run dev       # Start Next.js development server
```

## 🔐 Environment Variables

Create a `.env` file in the backend directory:
```
OPENAI_API_KEY=your-openai-api-key
```

## 📈 Future Enhancements

- Real database integration
- Advanced ML-based lead scoring
- A/B testing for outreach messages
- CRM system integration
- Analytics dashboard
- Webhook support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details