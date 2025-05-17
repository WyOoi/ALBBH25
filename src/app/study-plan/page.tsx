"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";

interface StudyTask {
  id: string;
  titleKey: string;
  style: 'V' | 'A' | 'R' | 'K'; 
  color: string; 
  styleLabelKey: string;
}

interface LearningProfileScores {
  V: number;
  A: number;
  R: number;
  K: number;
}
interface UserLearningProfile {
  scores: LearningProfileScores;
  dominantStyle: string; // This string can contain multiple styles like "Visual, Auditory (Multimodal)"
  timestamp: string;
}

const allTasks: StudyTask[] = [
  { id: 'v1', titleKey: 'study_plan.task.v1_title', style: 'V', color: 'bg-blue-500', styleLabelKey: 'study_plan.style_v_short' },
  { id: 'v2', titleKey: 'study_plan.task.v2_title', style: 'V', color: 'bg-blue-500', styleLabelKey: 'study_plan.style_v_short' },
  { id: 'v3', titleKey: 'study_plan.task.v3_title', style: 'V', color: 'bg-blue-500', styleLabelKey: 'study_plan.style_v_short' },
  { id: 'a1', titleKey: 'study_plan.task.a1_title', style: 'A', color: 'bg-green-500', styleLabelKey: 'study_plan.style_a_short' },
  { id: 'a2', titleKey: 'study_plan.task.a2_title', style: 'A', color: 'bg-green-500', styleLabelKey: 'study_plan.style_a_short' },
  { id: 'a3', titleKey: 'study_plan.task.a3_title', style: 'A', color: 'bg-green-500', styleLabelKey: 'study_plan.style_a_short' },
  { id: 'r1', titleKey: 'study_plan.task.r1_title', style: 'R', color: 'bg-orange-500', styleLabelKey: 'study_plan.style_r_short' },
  { id: 'r2', titleKey: 'study_plan.task.r2_title', style: 'R', color: 'bg-orange-500', styleLabelKey: 'study_plan.style_r_short' },
  { id: 'r3', titleKey: 'study_plan.task.r3_title', style: 'R', color: 'bg-orange-500', styleLabelKey: 'study_plan.style_r_short' },
  { id: 'k1', titleKey: 'study_plan.task.k1_title', style: 'K', color: 'bg-purple-500', styleLabelKey: 'study_plan.style_k_short' },
  { id: 'k2', titleKey: 'study_plan.task.k2_title', style: 'K', color: 'bg-purple-500', styleLabelKey: 'study_plan.style_k_short' },
  { id: 'k3', titleKey: 'study_plan.task.k3_title', style: 'K', color: 'bg-purple-500', styleLabelKey: 'study_plan.style_k_short' },
];

const getDefaultTasks = (): StudyTask[] => {
  // Returns one task of each style if no profile is available
  return [
    allTasks.find(task => task.style === 'V')!,
    allTasks.find(task => task.style === 'A')!,
    allTasks.find(task => task.style === 'R')!,
    allTasks.find(task => task.style === 'K')!,
  ].filter(task => task !== undefined);
};

export default function StudyPlanPage() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [userLearningProfile, setUserLearningProfile] = useState<UserLearningProfile | null>(null);
  const [todaysTasks, setTodaysTasks] = useState<StudyTask[]>(getDefaultTasks());
  const [goal, setGoal] = useState("");
  const [timeBudget, setTimeBudget] = useState("");

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('vteachLearningProfile');
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile) as UserLearningProfile;
        if (profileData && profileData.scores && typeof profileData.dominantStyle === 'string') {
            setUserLearningProfile(profileData);
            setTodaysTasks(selectTasksForToday(profileData, allTasks));
        } else {
            setTodaysTasks(getDefaultTasks());
        }
      } else {
        setTodaysTasks(getDefaultTasks());
      }
    } catch (error) {
        console.error("Failed to load learning profile or select tasks:", error);
        setUserLearningProfile(null); 
        setTodaysTasks(getDefaultTasks());
    }
  }, []);

  const selectTasksForToday = (profile: UserLearningProfile | null, allAvailableTasks: StudyTask[]): StudyTask[] => {
    if (!profile || !profile.dominantStyle) return getDefaultTasks();

    const dominantStyles: Array<'V' | 'A' | 'R' | 'K'> = [];
    if (profile.dominantStyle.includes('Visual') || profile.dominantStyle.includes('V')) dominantStyles.push('V');
    if (profile.dominantStyle.includes('Auditory') || profile.dominantStyle.includes('A')) dominantStyles.push('A');
    if (profile.dominantStyle.includes('Reading/Writing') || profile.dominantStyle.includes('R')) dominantStyles.push('R');
    if (profile.dominantStyle.includes('Kinesthetic') || profile.dominantStyle.includes('K')) dominantStyles.push('K');

    let selectedTasks: StudyTask[] = [];
    const tasksPerStyle: { [key in 'V' | 'A' | 'R' | 'K']: StudyTask[] } = {
      V: allAvailableTasks.filter(task => task.style === 'V'),
      A: allAvailableTasks.filter(task => task.style === 'A'),
      R: allAvailableTasks.filter(task => task.style === 'R'),
      K: allAvailableTasks.filter(task => task.style === 'K'),
    };

    // Helper to pick a random task from a list, avoiding duplicates in selectedTasks
    const pickRandomTask = (style: 'V' | 'A' | 'R' | 'K', count: number) => {
      const available = tasksPerStyle[style].filter(task => !selectedTasks.some(st => st.id === task.id));
      for (let i = 0; i < count && available.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * available.length);
        selectedTasks.push(available.splice(randomIndex, 1)[0]);
      }
    };
    
    if (dominantStyles.length === 0) return getDefaultTasks();

    if (dominantStyles.length === 1) {
      const style = dominantStyles[0];
      pickRandomTask(style, 2); // 2 tasks of the dominant style
      const otherStyles = (['V', 'A', 'R', 'K'] as Array<'V' | 'A' | 'R' | 'K'>).filter(s => s !== style);
      otherStyles.forEach(s => pickRandomTask(s, 1)); // 1 task from two other styles
    } else if (dominantStyles.length === 2) {
      dominantStyles.forEach(style => pickRandomTask(style, 2)); // 2 tasks from each dominant style
    } else if (dominantStyles.length === 3) {
      dominantStyles.forEach(style => pickRandomTask(style, 1)); // 1 task from each dominant style
      const remainingStyles = (['V', 'A', 'R', 'K'] as Array<'V' | 'A' | 'R' | 'K'>).filter(s => !dominantStyles.includes(s));
      if (remainingStyles.length > 0) pickRandomTask(remainingStyles[Math.floor(Math.random() * remainingStyles.length)], 1); // 1 random task to make it 4
    } else { // 4 dominant styles or multimodal not specifically parsed as 1-3
      (['V', 'A', 'R', 'K'] as Array<'V' | 'A' | 'R' | 'K'>).forEach(style => pickRandomTask(style, 1));
    }
    
    // Ensure we have exactly 4 tasks, fill with defaults if not
    let defaultIdx = 0;
    const defaultTaskList = getDefaultTasks(); // a fresh list to pick from
    while (selectedTasks.length < 4 && defaultIdx < defaultTaskList.length) {
        const defaultTask = defaultTaskList[defaultIdx];
        if (!selectedTasks.some(st => st.id === defaultTask.id)) {
            selectedTasks.push(defaultTask);
        }
        defaultIdx++;
    }
    
    // Shuffle the final list of 4 tasks
    for (let i = selectedTasks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selectedTasks[i], selectedTasks[j]] = [selectedTasks[j], selectedTasks[i]];
    }

    return selectedTasks.slice(0, 4); // Ensure exactly 4 tasks
  };

  const handleGeneratePlan = () => {
    console.log("Generating plan with Goal:", goal, "Time Budget:", timeBudget, "Profile:", userLearningProfile);
    // Placeholder for actual plan generation logic
    alert("Plan generation feature coming soon!");
  };

  const handleTakeAssessment = () => {
    router.push('/study-plan/assessment');
  };

  const calculatePercentage = (score: number, total: number) => {
    if (total === 0) return "0%";
    return `${Math.round((score / total) * 100)}%`;
  };

  const getTotalScores = (scores: LearningProfileScores | undefined) => {
    if (!scores) return 0;
    return scores.V + scores.A + scores.R + scores.K;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {t("study_plan.title")}
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              {t("study_plan.subtitle")}
            </p>
          </header>

          {/* Learning Profile Section */}
          <div className="bg-white shadow-xl rounded-lg p-6 mb-8 ring-1 ring-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("study_plan.learning_profile_title")}</h2>
            {userLearningProfile && userLearningProfile.scores ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">{t("study_plan.profile_dominant_style_title")}</h3>
                  <p className="text-xl font-semibold text-indigo-600 py-2 px-4 bg-indigo-50 rounded-md inline-block">{userLearningProfile.dominantStyle}</p>
                  {userLearningProfile.timestamp && (
                     <p className="text-xs text-gray-500 mt-1">
                        {t("study_plan.last_assessment_date", { date: new Date(userLearningProfile.timestamp).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' }) })}
                     </p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">{t("study_plan.profile_scores_title")}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    {[ {key: 'V', nameKey: 'study_plan.style_v', color: 'text-blue-600', bgColor: 'bg-blue-50'},
                       {key: 'A', nameKey: 'study_plan.style_a', color: 'text-green-600', bgColor: 'bg-green-50'},
                       {key: 'R', nameKey: 'study_plan.style_r', color: 'text-orange-600', bgColor: 'bg-orange-50'},
                       {key: 'K', nameKey: 'study_plan.style_k', color: 'text-purple-600', bgColor: 'bg-purple-50'}
                    ].map(style => {
                        const totalScores = getTotalScores(userLearningProfile.scores);
                        const scoreValue = userLearningProfile.scores?.[style.key as keyof LearningProfileScores] || 0;
                        return (
                            <div key={style.key} className={`p-4 rounded-lg ${style.bgColor} shadow`}>
                                <p className={`font-semibold ${style.color} text-md`}>{t(style.nameKey)}</p>
                                <p className={`text-2xl font-bold ${style.color}`}>{calculatePercentage(scoreValue, totalScores)}</p>
                                <p className="text-xs text-gray-500">({scoreValue} {t('assessment.result.points')})</p>
                            </div>
                        );
                    })}
                  </div>
                </div>
                <button 
                  onClick={handleTakeAssessment}
                  className="mt-4 w-full sm:w-auto bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {t("study_plan.retake_assessment_button")}
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">{t("study_plan.assessment_placeholder")}</p>
                <button 
                  onClick={handleTakeAssessment}
                  className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {t("study_plan.take_assessment_button")}
                </button>
              </div>
            )}
          </div>

          {/* Today's Plan Section */}
          <div className="bg-white shadow-xl rounded-lg p-6 mb-8 ring-1 ring-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t("study_plan.todays_plan_title")}</h2>
            {todaysTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {todaysTasks.map(task => (
                  <div key={task.id} className={`p-4 rounded-lg shadow-md ${task.color} text-white flex flex-col justify-between min-h-[120px]`}>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{t(task.titleKey)}</h3>
                      <p className="text-xs opacity-80 mb-2">{t(task.styleLabelKey)}</p>
                    </div>
                    {/* Optional: Progress bar or completion indicator can be added here */}
                    <div className={`w-full h-2 rounded-full mt-2 bg-white/30`}>
                       {/* Example progress: <div className="h-full w-1/2 bg-white rounded-full"></div> */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">{t('study_plan.no_tasks_today')}</p> // Add this translation key
            )}
          </div>
          
          {/* Plan Generation & Customization Section */}
          <div className="bg-white shadow-xl rounded-lg p-6 mb-8 ring-1 ring-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t("study_plan.generate_plan_title")}</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700">{t("study_plan.goal_oriented_label")}</label>
                <input 
                  type="text" 
                  id="goal" 
                  value={goal} 
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder={t("study_plan.goal_placeholder")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="timeBudget" className="block text-sm font-medium text-gray-700">{t("study_plan.time_budget_label")}</label>
                <input 
                  type="text" 
                  id="timeBudget" 
                  value={timeBudget} 
                  onChange={(e) => setTimeBudget(e.target.value)}
                  placeholder={t("study_plan.time_placeholder")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button 
                onClick={handleGeneratePlan}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-lg font-semibold"
              >
                {t("study_plan.generate_button")}
              </button>
            </div>
          </div>

          {/* Weekly Plan & Style Balance (Placeholders) */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white shadow-xl rounded-lg p-6 ring-1 ring-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("study_plan.week_ahead_title")}</h2>
              <p className="text-gray-600"> {/* Placeholder for calendar or weekly task list */} Calendar/Weekly task view coming soon...</p>
            </div>
            <div className="bg-white shadow-xl rounded-lg p-6 ring-1 ring-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("study_plan.style_balance_meter_title")}</h2>
              <p className="text-gray-600">{t("study_plan.style_balance_placeholder")} {/* Placeholder for radar chart or other visual */} </p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
} 