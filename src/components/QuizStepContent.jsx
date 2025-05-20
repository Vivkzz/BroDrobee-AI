
import { SingleOptionSelector, MultiOptionSelector } from './OptionSelector';
import SelfieUploader from './SelfieUploader';

const QuizStepContent = ({ step, quizData, onSingleSelect, onMultiSelect, onSelfieChange }) => {
  switch (step.type) {
    case 'single':
      return (
        <SingleOptionSelector
          options={step.options}
          selectedValue={quizData[step.field]}
          onSelect={(value) => onSingleSelect(step.field, value)}
        />
      );
      
    case 'multi':
      return (
        <MultiOptionSelector
          options={step.options}
          selectedValues={quizData[step.field]}
          onSelect={(value) => onMultiSelect(step.field, value)}
        />
      );
      
    case 'file':
      return (
        <SelfieUploader
          value={quizData.selfieUrl}
          onChange={onSelfieChange}
        />
      );
      
    default:
      return <p>Unknown step type</p>;
  }
};

export default QuizStepContent;
