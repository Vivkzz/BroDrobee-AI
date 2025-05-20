import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../App.tsx';
import { toast } from "@/components/ui/use-toast";
import QuizStepContent from '../components/QuizStepContent';
import { useQuizState } from '../hooks/useQuizState';

// Quiz steps data
const QUIZ_STEPS = [
  {
    title: "What's your skin tone?",
    field: "skinTone",
    type: "single",
    options: [
      { value: "fair", label: "Fair", color: "#F8D5C2" },
      { value: "light", label: "Light", color: "#F3C099" },
      { value: "medium", label: "Medium", color: "#E8B170" },
      { value: "olive", label: "Olive", color: "#C99F67" },
      { value: "tan", label: "Tan", color: "#BB8A52" },
      { value: "deep", label: "Deep", color: "#896A45" },
      { value: "dark", label: "Dark", color: "#6A4F33" },
      { value: "deep-dark", label: "Deep Dark", color: "#4A3520" },
    ]
  },
  {
    title: "What's your undertone?",
    field: "undertone",
    type: "single",
    options: [
      { value: "cool", label: "Cool (blue/pink undertones)" },
      { value: "warm", label: "Warm (yellow/golden undertones)" },
      { value: "neutral", label: "Neutral (mix of cool and warm)" },
      { value: "olive", label: "Olive (greenish undertones)" },
    ]
  },
  {
    title: "What's your style preference?",
    field: "stylePreferences",
    type: "multi",
    options: [
      { value: "casual", label: "Casual" },
      { value: "formal", label: "Formal" },
      { value: "streetwear", label: "Streetwear" },
      { value: "vintage", label: "Vintage" },
      { value: "minimalist", label: "Minimalist" },
      { value: "bohemian", label: "Bohemian" },
      { value: "preppy", label: "Preppy" },
      { value: "athleisure", label: "Athleisure" },
    ]
  },
  {
    title: "What occasions do you dress for most often?",
    field: "occasionPreferences",
    type: "multi",
    options: [
      { value: "work", label: "Work/Office" },
      { value: "casual-outings", label: "Casual Outings" },
      { value: "formal-events", label: "Formal Events" },
      { value: "dates", label: "Dates" },
      { value: "parties", label: "Parties" },
      { value: "outdoor-activities", label: "Outdoor Activities" },
      { value: "exercise", label: "Exercise" },
    ]
  },
  {
    title: "What colors do you like to wear?",
    field: "colorPreferences",
    type: "multi",
    options: [
      { value: "black", label: "Black", color: "#000000" },
      { value: "white", label: "White", color: "#FFFFFF" },
      { value: "gray", label: "Gray", color: "#808080" },
      { value: "navy", label: "Navy", color: "#000080" },
      { value: "blue", label: "Blue", color: "#0000FF" },
      { value: "green", label: "Green", color: "#008000" },
      { value: "red", label: "Red", color: "#FF0000" },
      { value: "yellow", label: "Yellow", color: "#FFFF00" },
      { value: "purple", label: "Purple", color: "#800080" },
      { value: "pink", label: "Pink", color: "#FFC0CB" },
      { value: "orange", label: "Orange", color: "#FFA500" },
      { value: "brown", label: "Brown", color: "#A52A2A" },
    ]
  },
  {
    title: "Upload a selfie (optional)",
    field: "selfieUrl",
    type: "file",
  }
];

const Quiz = () => {
  const { user, setStyleProfile } = useUser();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleProfileComplete = (profile) => {
    // Update global state with the new profile
    setStyleProfile(profile);
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const {
    step,
    quizData,
    handleSingleSelect,
    handleMultiSelect,
    handleSelfieChange,
    handleNextStep,
    handlePrevStep,
    handleSubmitQuiz
  } = useQuizState(user, handleProfileComplete);

  // If not authenticated, return null
  if (!user) return null;

  const currentStep = QUIZ_STEPS[step];
  const isLastStep = step === QUIZ_STEPS.length - 1;
  const isStepComplete = currentStep.type === 'file' || quizData[currentStep.field];

  return (
    <div className="min-h-screen bg-fashion-light-gray flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white shadow-sm p-4 z-10">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-fashion-deep-purple">BroDrobe AI</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 flex-1 flex flex-col">
        <div className="max-w-2xl mx-auto w-full">
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 bg-fashion-purple rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / QUIZ_STEPS.length) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600 text-right">
              Step {step + 1} of {QUIZ_STEPS.length}
            </div>
          </div>

          <div className="fashion-card p-8">
            <h2 className="text-2xl font-semibold mb-6">{currentStep.title}</h2>

            <QuizStepContent
              step={currentStep}
              quizData={quizData}
              onSingleSelect={handleSingleSelect}
              onMultiSelect={handleMultiSelect}
              onSelfieChange={handleSelfieChange}
            />

            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevStep}
                className={`fashion-button-outline ${step === 0 ? 'invisible' : ''}`}
              >
                Back
              </button>

              {isLastStep ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="fashion-button"
                >
                  Complete Profile
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  className="fashion-button"
                  disabled={!isStepComplete}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
