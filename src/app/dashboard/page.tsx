"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";

export default function Dashboard() {
  const { t } = useLanguage();
  const [userName, setUserName] = useState("John Doe"); // Demo data, consider making this translatable or backend-driven
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Shorter delay for demo
        // In a real app, user data (including name) might come from an API and could be localized there.
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Demo data - in a real app, this would come from an API and course names might need specific translation keys or be translated server-side.
  const courseProgress = [
    { id: 1, nameKey: "dashboard.course.math", progress: 60 }, 
    { id: 2, nameKey: "dashboard.course.physics", progress: 25 },
    { id: 3, nameKey: "dashboard.course.english", progress: 90 },
    { id: 4, nameKey: "dashboard.course.compsci", progress: 45 },
  ];

  const upcomingAssignments = [
    { id: 1, nameKey: "dashboard.assignment.math_quiz", dueDateKey: "dashboard.due.tomorrow", urgent: true },
    { id: 2, nameKey: "dashboard.assignment.physics_report", dueDateKey: "dashboard.due.next_week", urgent: false },
    { id: 3, nameKey: "dashboard.assignment.essay", dueDateKey: "dashboard.due.in_3_days", urgent: false },
  ];

  const studyRecommendations = [
    { id: 1, titleKey: "dashboard.recommendation.algebra.title", descKey: "dashboard.recommendation.algebra.desc"},
    { id: 2, titleKey: "dashboard.recommendation.physics.title", descKey: "dashboard.recommendation.physics.desc"},
    { id: 3, titleKey: "dashboard.recommendation.essay.title", descKey: "dashboard.recommendation.essay.desc"},
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">{t("dashboard.welcome")}, {userName}!</h1>
                <p className="mt-2 text-lg text-gray-600">{t("dashboard.overview")}</p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Course Progress */}
                <div className="bg-white rounded-lg shadow-sm p-6 col-span-2">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("dashboard.courses")}</h2>
                  <div className="space-y-4">
                    {courseProgress.map((course) => (
                      <div key={course.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">{t(course.nameKey)}</span>
                          <span className="text-indigo-600 font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-indigo-600 h-2.5 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link 
                      href="/courses" 
                      className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    >
                      {t("dashboard.view_courses")}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("dashboard.assignments")}</h2>
                  <div className="space-y-4">
                    {upcomingAssignments.map((task) => (
                      <div key={task.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-start">
                          <div className="flex-grow">
                            <p className="font-medium text-gray-800">{t(task.nameKey)}</p>
                            <p className="text-sm text-gray-500">{t("dashboard.due")}: {t(task.dueDateKey)}</p>
                          </div>
                          {task.urgent && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                              {t("dashboard.urgent")}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link 
                      href="/assignments" 
                      className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    >
                      {t("dashboard.view_assignments")}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("dashboard.recommendations")}</h2>
                <p className="text-gray-600 mb-4">{t("dashboard.recommendations.desc")}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {studyRecommendations.map((rec) => (
                    <div key={rec.id} className="border rounded-lg p-4 hover:border-indigo-500 transition-colors cursor-pointer">
                      <h3 className="font-medium text-gray-800">{t(rec.titleKey)}</h3>
                      <p className="text-sm text-gray-500 mt-1">{t(rec.descKey)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
} 