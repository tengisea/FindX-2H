'use client';

import { useState } from 'react';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { useGetStudentQuery, useGetApprovedOlympiadsQuery } from '@/generated';

const StudentPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'olympiads' | 'results' | 'achievements' | 'settings'>('profile');
  
  // For now, using a hardcoded student ID. In a real app, this would come from authentication
  const studentId = '68c54f1d22ed3250680b05c5';

  const { data: studentData, loading: studentLoading, error: studentError } = useGetStudentQuery({
    variables: { id: studentId }
  });

  const { data: olympiadsData, loading: olympiadsLoading } = useGetApprovedOlympiadsQuery();

  const student = studentData?.getStudent;
  const olympiads = olympiadsData?.getAllApprovedOlympiads || [];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile</h2>
            
            {studentLoading ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ) : studentError ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <p className="text-red-600">Error loading student data: {studentError.message}</p>
              </div>
            ) : student ? (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {student.profilePicture ? (
                        <img 
                          src={student.profilePicture} 
                          alt={student.name} 
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-2xl">
                          {student.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{student.name}</h3>
                      <p className="text-gray-600">{student.email}</p>
                      <p className="text-gray-500">{student.school} • Grade {student.class}</p>
                      <p className="text-gray-500">{student.location}</p>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Score</p>
                        <p className="text-3xl font-bold text-blue-600">{student.totalScore || 0}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">PI Points</p>
                        <p className="text-3xl font-bold text-green-600">{student.piPoints || 0}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Olympiads</p>
                        <p className="text-3xl font-bold text-purple-600">
                          {Array.isArray(student.participatedOlympiads) ? student.participatedOlympiads.length : 0}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Student ID</label>
                      <p className="mt-1 text-sm text-gray-900">{student.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Member Since</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(student.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(student.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Current Grade</label>
                      <p className="mt-1 text-sm text-gray-900">Grade {student.class}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-600">No student data found.</p>
              </div>
            )}
          </div>
        );
      case 'olympiads':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Olympiads</h2>
            
            {olympiadsLoading ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : olympiads.length > 0 ? (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {olympiads.length} Olympiad{olympiads.length !== 1 ? 's' : ''} Available
                    </h3>
                    <div className="text-sm text-gray-500">
                      Filter by grade: {student?.class || 'All'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {olympiads.map((olympiad) => (
                    <div key={olympiad.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{olympiad.name}</h4>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{olympiad.description}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          olympiad.status === 'APPROVED' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {olympiad.status}
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(olympiad.date).toLocaleDateString()}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {olympiad.location}
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {olympiad.organizer?.organizationName || 'Unknown Organizer'}
                        </div>
                      </div>

                      {/* Class Types */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Available Grades:</h5>
                        <div className="flex flex-wrap gap-2">
                          {olympiad.classtypes.map((classType) => (
                            <span 
                              key={classType.id}
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                classType.classYear === student?.class 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {classType.classYear.replace('GRADE_', 'Grade ')}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Questions Summary */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Total Questions:</span>
                          <span className="font-semibold">
                            {olympiad.classtypes.reduce((total, ct) => total + ct.questions.length, 0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Max Score:</span>
                          <span className="font-semibold">
                            {olympiad.classtypes.reduce((total, ct) => total + ct.maxScore, 0)}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                          View Details
                        </button>
                        <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium">
                          Register
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Olympiads Available</h3>
                <p className="text-gray-600">There are currently no approved olympiads available for registration.</p>
              </div>
            )}
          </div>
        );
      case 'results':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Results & Performance</h2>
            
            <div className="space-y-6">
              {/* Performance Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{student?.totalScore || 0}</div>
                    <div className="text-sm text-blue-600">Total Score</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{student?.piPoints || 0}</div>
                    <div className="text-sm text-green-600">PI Points</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {Array.isArray(student?.participatedOlympiads) ? student.participatedOlympiads.length : 0}
                    </div>
                    <div className="text-sm text-purple-600">Olympiads</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {student?.totalScore && student?.participatedOlympiads && Array.isArray(student.participatedOlympiads) && student.participatedOlympiads.length > 0
                        ? Math.round(student.totalScore / student.participatedOlympiads.length) 
                        : 0}
                    </div>
                    <div className="text-sm text-yellow-600">Avg Score</div>
                  </div>
                </div>
              </div>

              {/* Recent Results */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Results</h3>
                
                {/* Mock data - in real app, this would come from a results query */}
                <div className="space-y-4">
                  {[
                    {
                      id: '1',
                      olympiadName: 'Mathematics Olympiad 2024',
                      date: '2024-01-15',
                      score: 85,
                      maxScore: 100,
                      rank: 12,
                      totalParticipants: 150,
                      grade: 'A'
                    },
                    {
                      id: '2',
                      olympiadName: 'Science Olympiad 2024',
                      date: '2024-01-10',
                      score: 92,
                      maxScore: 100,
                      rank: 8,
                      totalParticipants: 200,
                      grade: 'A+'
                    },
                    {
                      id: '3',
                      olympiadName: 'English Olympiad 2023',
                      date: '2023-12-20',
                      score: 78,
                      maxScore: 100,
                      rank: 25,
                      totalParticipants: 180,
                      grade: 'B+'
                    }
                  ].map((result) => (
                    <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{result.olympiadName}</h4>
                          <p className="text-sm text-gray-600">{new Date(result.date).toLocaleDateString()}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          result.grade === 'A+' ? 'bg-green-100 text-green-800' :
                          result.grade === 'A' ? 'bg-blue-100 text-blue-800' :
                          result.grade === 'B+' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {result.grade}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Score:</span>
                          <span className="ml-2 font-semibold">{result.score}/{result.maxScore}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Rank:</span>
                          <span className="ml-2 font-semibold">#{result.rank}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Participants:</span>
                          <span className="ml-2 font-semibold">{result.totalParticipants}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Percentage:</span>
                          <span className="ml-2 font-semibold">{Math.round((result.score / result.maxScore) * 100)}%</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Performance</span>
                          <span>{Math.round((result.score / result.maxScore) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              result.score >= 90 ? 'bg-green-500' :
                              result.score >= 80 ? 'bg-blue-500' :
                              result.score >= 70 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${(result.score / result.maxScore) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p>Performance chart will be displayed here</p>
                    <p className="text-sm">Chart integration coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Achievements & Badges</h2>
            
            <div className="space-y-6">
              {/* Achievement Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">3</div>
                    <div className="text-sm text-yellow-600">Badges Earned</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1</div>
                    <div className="text-sm text-blue-600">Medals Won</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">2</div>
                    <div className="text-sm text-green-600">Certificates</div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Badges</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      id: '1',
                      name: 'First Olympiad',
                      description: 'Participated in your first olympiad',
                      icon: '🏆',
                      earned: true,
                      date: '2023-12-20'
                    },
                    {
                      id: '2',
                      name: 'High Scorer',
                      description: 'Scored above 90% in an olympiad',
                      icon: '⭐',
                      earned: true,
                      date: '2024-01-10'
                    },
                    {
                      id: '3',
                      name: 'Consistent Performer',
                      description: 'Participated in 3+ olympiads',
                      icon: '🎯',
                      earned: true,
                      date: '2024-01-15'
                    },
                    {
                      id: '4',
                      name: 'Top 10',
                      description: 'Achieved top 10 rank',
                      icon: '🥇',
                      earned: false,
                      date: null
                    }
                  ].map((badge) => (
                    <div 
                      key={badge.id} 
                      className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                        badge.earned 
                          ? 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100' 
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h4 className={`font-semibold mb-1 ${
                        badge.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {badge.name}
                      </h4>
                      <p className={`text-xs mb-2 ${
                        badge.earned ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {badge.description}
                      </p>
                      {badge.earned && badge.date && (
                        <p className="text-xs text-yellow-600 font-medium">
                          Earned: {new Date(badge.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Medals */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medals & Certificates</h3>
                <div className="space-y-4">
                  {[
                    {
                      id: '1',
                      type: 'medal',
                      name: 'Science Olympiad 2024',
                      achievement: 'Silver Medal',
                      icon: '🥈',
                      date: '2024-01-10',
                      description: 'Ranked 8th out of 200 participants'
                    },
                    {
                      id: '2',
                      type: 'certificate',
                      name: 'Mathematics Olympiad 2024',
                      achievement: 'Certificate of Excellence',
                      icon: '📜',
                      date: '2024-01-15',
                      description: 'Scored 85/100 points'
                    }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="text-3xl">{item.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.achievement}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{item.date}</p>
                        <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Settings</h2>
            
            <div className="space-y-6">
              {/* Profile Settings */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        value={student?.name || ''} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        value={student?.email || ''} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
                      <input 
                        type="text" 
                        value={student?.school || ''} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                      <input 
                        type="text" 
                        value={student?.class || ''} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input 
                        type="text" 
                        value={student?.location || ''} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Olympiad Notifications</h4>
                      <p className="text-sm text-gray-600">Get notified about new olympiads</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Result Notifications</h4>
                      <p className="text-sm text-gray-600">Get notified when results are published</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Achievement Notifications</h4>
                      <p className="text-sm text-gray-600">Get notified about new badges and achievements</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="font-medium text-gray-900">Change Password</div>
                    <div className="text-sm text-gray-600">Update your account password</div>
                  </button>
                  <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="font-medium text-gray-900">Download Data</div>
                    <div className="text-sm text-gray-600">Export your olympiad data</div>
                  </button>
                  <button className="w-full text-left px-4 py-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200">
                    <div className="font-medium text-red-600">Delete Account</div>
                    <div className="text-sm text-red-500">Permanently delete your account</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        studentId={studentId}
      />
      <div className="ml-80">
        {renderContent()}
      </div>
    </div>
  );
};

export default StudentPage;