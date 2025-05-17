"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      try {
        // In a real app, you would call your API to get user data
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUserName("John Doe"); // Demo data
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const courseProgress = [
    { id: 1, name: "Introduction to Mathematics", progress: 60 },
    { id: 2, name: "Advanced Physics", progress: 25 },
    { id: 3, name: "English Literature", progress: 90 },
    { id: 4, name: "Computer Science Basics", progress: 45 },
  ];

  const upcomingAssignments = [
    { id: 1, name: "Math Quiz", dueDate: "Tomorrow", urgent: true },
    { id: 2, name: "Physics Lab Report", dueDate: "Next week", urgent: false },
    { id: 3, name: "Essay Submission", dueDate: "In 3 days", urgent: false },
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
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}!</h1>
                <p className="mt-2 text-lg text-gray-600">Here's an overview of your learning progress</p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Course Progress */}
                <div className="bg-white rounded-lg shadow-sm p-6 col-span-2">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Courses</h2>
                  <div className="space-y-4">
                    {courseProgress.map((course) => (
                      <div key={course.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">{course.name}</span>
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
                      View all courses
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Assignments</h2>
                  <div className="space-y-4">
                    {upcomingAssignments.map((task) => (
                      <div key={task.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-start">
                          <div className="flex-grow">
                            <p className="font-medium text-gray-800">{task.name}</p>
                            <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                          </div>
                          {task.urgent && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                              Urgent
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
                      View all assignments
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Study Recommendations</h2>
                <p className="text-gray-600 mb-4">Based on your learning patterns, we recommend focusing on these topics:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 hover:border-indigo-500 transition-colors cursor-pointer">
                    <h3 className="font-medium text-gray-800">Algebra Concepts</h3>
                    <p className="text-sm text-gray-500 mt-1">Strengthen your understanding of core principles</p>
                  </div>
                  <div className="border rounded-lg p-4 hover:border-indigo-500 transition-colors cursor-pointer">
                    <h3 className="font-medium text-gray-800">Physics Formulas</h3>
                    <p className="text-sm text-gray-500 mt-1">Review key equations for your upcoming test</p>
                  </div>
                  <div className="border rounded-lg p-4 hover:border-indigo-500 transition-colors cursor-pointer">
                    <h3 className="font-medium text-gray-800">Essay Structure</h3>
                    <p className="text-sm text-gray-500 mt-1">Practice organizing your writing more effectively</p>
                  </div>
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