import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../App.tsx';
import { toast } from "@/components/ui/use-toast";
import QuizStepContent from '../components/QuizStepContent';
import { useQuizState } from '../hooks/useQuizState';
import { QUIZ_STEPS } from '../constants/quiz';

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
