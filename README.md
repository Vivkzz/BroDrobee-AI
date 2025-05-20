# Outfit Advisor AI

Outfit Advisor AI is a web application that helps users get personalized outfit recommendations using AI and Supabase as the backend. Users can upload selfies, answer quizzes, and manage their wardrobe to receive tailored clothing suggestions.

## Features

- **User Authentication:** Secure sign-up and login using Supabase Auth.
- **Personalized Quiz:** Users answer questions to help the AI understand their style preferences.
- **Selfie Uploader:** Upload a selfie to enhance recommendations.
- **Wardrobe Management:** Add, view, and manage clothing items in your digital wardrobe.
- **AI-Powered Recommendations:** Get outfit suggestions based on your preferences, wardrobe, and uploaded images.
- **Responsive UI:** Modern, mobile-friendly interface built with React, Vite, and Tailwind CSS.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Supabase (Database & Auth)
- **AI Integration:** Custom AI logic for outfit recommendations
- **Deployment:** Vercel

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Vivkzz/BroDrobee-AI.git
cd outfit-advisor-ai-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your Supabase credentials:

```
VITE_SUPABASE_URL="https://mswnlbuxhnxfwnrtdlcb.supabase.co"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

> Replace `your-supabase-anon-key` with your actual Supabase anon key.

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or as indicated in your terminal).

### 5. Deploy to Vercel

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/) and import your repository.
3. Add the same environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) in the Vercel dashboard.
4. Click "Deploy".

## Project Structure

```
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── integrations/
│   │   └── supabase/      # Supabase client and types
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── types/             # TypeScript types
│   └── utils/             # AI and helper utilities
├── .env                   # Environment variables
├── package.json           # Project metadata and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Project documentation
```

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.
