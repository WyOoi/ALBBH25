"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";

// Define a type for mock tasks (can be expanded later)
interface StudyTask {
  id: string;
  titleKey: string;
  style: 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic';
  completed: boolean;
  color: string; // For color-coding tiles
}

export default function StudyPlanPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [userLearningProfile, setUserLearningProfile] = useState<any>(null); // Replace any with a proper type later
  const [goal, setGoal] = useState("");
  const [timeBudget, setTimeBudget] = useState("");

  // Mock data for Today's Plan - replace with dynamic data later
  const mockTodaysTasks: StudyTask[] = [
    { id: '1', titleKey: "study_plan.task.visual_example", style: 'Visual', completed: false, color: 'bg-blue-500' },
    { id: '2', titleKey: "study_plan.task.auditory_example", style: 'Auditory', completed: true, color: 'bg-green-500' },
    { id: '3', titleKey: "study_plan.task.reading_writing_example", style: 'Reading/Writing', completed: false, color: 'bg-orange-500' },
    { id: '4', titleKey: "study_plan.task.kinesthetic_example", style: 'Kinesthetic', completed: false, color: 'bg-purple-500' },
  ];

  const handleGeneratePlan = () => {
    console.log("Generating plan with Goal:", goal, "Time Budget:", timeBudget, "Profile:", userLearningProfile);
    // Placeholder for actual plan generation logic
    alert("Plan generation feature coming soon!");
  };

  const handleTakeAssessment = () => {
    router.push('/study-plan/assessment');
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
            {userLearningProfile ? (
              <div>{/* Placeholder for profile display (e.g., pie chart, thermometer) */}</div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockTodaysTasks.map(task => (
                <div key={task.id} className={`p-4 rounded-lg shadow-md ${task.color} text-white flex flex-col justify-between`}>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{t(task.titleKey)}</h3>
                    <p className="text-xs opacity-80 mb-2">{task.style}</p>
                  </div>
                  <div className={`w-full h-2 rounded-full mt-2 ${task.completed ? 'bg-white/70' : 'bg-white/30'}`}>
                    {task.completed && <div className="h-full w-full bg-white rounded-full"></div>}
                  </div>
                </div>
              ))}
            </div>
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