'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { LanguageContext } from '@/app/contexts/LanguageContext';
import translations from '@/app/translations';

type AnswerOption = 'a' | 'b' | 'c' | 'd';

type Answer = {
  questionIndex: number;
  optionKey: AnswerOption;
  category: 'V' | 'A' | 'R' | 'K';
};

type Scores = {
  V: number;
  A: number;
  R: number;
  K: number;
};

const questionOptionMapping: Record<number, Record<AnswerOption, 'V' | 'A' | 'R' | 'K'>> = {
  0: { a: 'V', b: 'A', c: 'R', d: 'K' }, // Question 1
  1: { a: 'R', b: 'K', c: 'V', d: 'A' }, // Question 2
  2: { a: 'K', b: 'R', c: 'A', d: 'V' }, // Question 3
  3: { a: 'A', b: 'V', c: 'K', d: 'R' }, // Question 4
  4: { a: 'V', b: 'A', c: 'R', d: 'K' }, // Question 5
  5: { a: 'R', b: 'K', c: 'V', d: 'A' }, // Question 6
  6: { a: 'K', b: 'R', c: 'A', d: 'V' }, // Question 7
  7: { a: 'A', b: 'V', c: 'K', d: 'R' }, // Question 8
  8: { a: 'V', b: 'A', c: 'R', d: 'K' }, // Question 9
  9: { a: 'R', b: 'K', c: 'V', d: 'A' }  // Question 10
};

const AssessmentPage = () => {
  const { language, t } = useContext(LanguageContext);
  const router = useRouter();

  const [answers, setAnswers] = useState<(Answer | null)[]>(Array(10).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState<Scores>({ V: 0, A: 0, R: 0, K: 0 });
  const [dominantStyle, setDominantStyle] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const questionKeys = Array.from({ length: 10 }, (_, i) => `assessment.question${i + 1}.text`);

  const handleAnswerChange = (questionIndex: number, optionKey: AnswerOption) => {
    const category = questionOptionMapping[questionIndex]?.[optionKey];
    if (!category) {
      console.error(`Category not found for question ${questionIndex + 1}, option ${optionKey}`);
      return;
    }
    const newAnswers = [...answers];
    newAnswers[questionIndex] = { questionIndex, optionKey, category };
    setAnswers(newAnswers);
    setFeedbackMessage(''); // Clear feedback message on new answer
  };

  const calculateResults = () => {
    if (answers.some(a => a === null)) {
        setFeedbackMessage(t('assessment.error.incomplete'));
        return;
    }
    setFeedbackMessage('');

    const newScores: Scores = { V: 0, A: 0, R: 0, K: 0 };
    answers.forEach(answer => {
      if (answer) {
        newScores[answer.category]++;
      }
    });

    setScores(newScores);

    let maxScore = 0;
    let dominantStylesArray: string[] = [];
    const scoreEntries = Object.entries(newScores) as [keyof Scores, number][];

    for (const [style, score] of scoreEntries) {
      if (score > maxScore) {
        maxScore = score;
        dominantStylesArray = [style];
      } else if (score === maxScore && maxScore > 0) {
        dominantStylesArray.push(style);
      }
    }
    
    let currentDominantStyle = '';
    if (dominantStylesArray.length === 0 && maxScore === 0) { 
        currentDominantStyle = t('assessment.result.noDominantStyle');
    } else if (dominantStylesArray.length === 1) {
      currentDominantStyle = t(`assessment.result.style.${dominantStylesArray[0]}`) || dominantStylesArray[0];
    } else if (dominantStylesArray.length > 1) {
       currentDominantStyle = dominantStylesArray.map(s => t(`assessment.result.style.${s}`) || s).join(', ') + ` (${t('assessment.result.multimodal')})`;
    } else { 
        currentDominantStyle = t('assessment.result.noDominantStyle');
    }
    setDominantStyle(currentDominantStyle);
    setShowResults(true);

    // Save results to localStorage
    try {
      const profileData = {
        scores: newScores,
        dominantStyle: currentDominantStyle,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('vteachLearningProfile', JSON.stringify(profileData));
    } catch (error) {
      console.error("Failed to save learning profile to localStorage:", error);
    }
  };

  if (t('assessment.title') === 'assessment.title') { 
    return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Loading translations...</div>;
  }
  
  const getQuestionOptions = (questionIndex: number): Record<AnswerOption, string> => {
    return {
      a: t(`assessment.question${questionIndex + 1}.options.a`),
      b: t(`assessment.question${questionIndex + 1}.options.b`),
      c: t(`assessment.question${questionIndex + 1}.options.c`),
      d: t(`assessment.question${questionIndex + 1}.options.d`),
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-2xl rounded-lg p-6 sm:p-10">
        <button
          onClick={() => router.push('/study-plan')}
          className="mb-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out flex items-center shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H15a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          {t('assessment.backToStudyPlan')}
        </button>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-purple-300">
          {t('assessment.title')}
        </h1>
        <p className="text-center text-gray-400 mb-8">{t('assessment.subTitle')}</p>

        {!showResults ? (
          <>
            <p className="mb-8 text-lg text-gray-300 bg-gray-700 p-4 rounded-md">
              {t('assessment.instructions')}
            </p>
            {feedbackMessage && (
                <div className="mb-6 p-3 bg-red-500 text-white rounded-md text-center text-sm">
                    {feedbackMessage}
                </div>
            )}
            <div className="space-y-10">
              {questionKeys.map((qKey, index) => {
                const options = getQuestionOptions(index);
                return (
                  <div key={index} className="p-6 bg-gray-750 rounded-xl shadow-lg transition-all duration-300 hover:shadow-purple-500/20">
                    <p className="text-xl font-semibold mb-5 text-purple-300">{`${index + 1}. ${t(qKey)}`}</p>
                    <div className="space-y-4">
                      {Object.entries(options).map(([optKey, optText]) => (
                        <label 
                            key={optKey} 
                            className={`flex items-center space-x-3 p-4 rounded-lg transition duration-150 cursor-pointer 
                                        ${answers[index]?.optionKey === optKey ? 'bg-purple-600 ring-2 ring-purple-400 shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={optKey}
                            checked={answers[index]?.optionKey === optKey}
                            onChange={() => handleAnswerChange(index, optKey as AnswerOption)}
                            className="opacity-0 w-0 h-0" // Visually hide radio, rely on label style
                          />
                          <span className={`font-medium text-sm sm:text-base ${answers[index]?.optionKey === optKey ? 'text-white' : 'text-gray-200'}`}>{String(optText)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={calculateResults} // This now also saves to localStorage
              className="mt-10 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
            >
              {t('assessment.submitAnswers')}
            </button>
          </>
        ) : (
          <div className="p-6 sm:p-10 bg-gray-750 rounded-xl shadow-xl text-center transform transition-all duration-500 ease-in-out scale-100">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-green-400">{t('assessment.result.title')}</h2>
            <div className="mb-6">
                <p className="text-xl mb-2 text-gray-200">{t('assessment.result.dominantStyleIs')}</p>
                <p className="text-2xl font-semibold text-purple-300 py-3 px-5 border-2 border-purple-400 rounded-lg inline-block bg-gray-800 shadow-md">{dominantStyle}</p>
            </div>
            
            <div className="my-8 border-t border-gray-700"></div>

            <h3 className="text-2xl font-semibold mb-5 text-gray-200">{t('assessment.result.breakdown')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-left max-w-lg mx-auto mb-8">
              {([
                 {key: 'V', labelKey: 'assessment.result.scores.V', color: 'text-blue-300', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500'},
                 {key: 'A', labelKey: 'assessment.result.scores.A', color: 'text-yellow-300', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500'},
                 {key: 'R', labelKey: 'assessment.result.scores.R', color: 'text-red-300', bgColor: 'bg-red-500/10', borderColor: 'border-red-500'},
                 {key: 'K', labelKey: 'assessment.result.scores.K', color: 'text-indigo-300', bgColor: 'bg-indigo-500/10', borderColor: 'border-indigo-500'}
               ] as {key: keyof Scores, labelKey: string, color: string, bgColor: string, borderColor: string}[]).map(item => (
                <div key={item.key} className={`p-4 ${item.bgColor} rounded-lg shadow-md border-l-4 ${item.borderColor}`}>
                    <p className={`text-lg font-medium ${item.color}`}>{t(`assessment.result.style.${item.key}`)}: <span className="font-bold text-xl">{scores[item.key]}</span></p>
                </div>
              ))}
            </div>
            
            <p className="mt-8 text-md text-gray-400 italic">
              {t('assessment.result.explanation')}
            </p>
             <button
              onClick={() => {
                setShowResults(false);
                setAnswers(Array(10).fill(null));
                setScores({V:0,A:0,R:0,K:0});
                setDominantStyle('');
                setFeedbackMessage('');
                // No need to clear localStorage here, retake implies new results will overwrite or user navigates away
              }}
              className="mt-8 mr-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-150 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {t('assessment.retakeQuiz')}
            </button>
            <button
              onClick={() => router.push('/study-plan')}
              className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-150 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {t('assessment.continueToStudyPlan')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentPage; 