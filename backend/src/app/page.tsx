export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            FindX Backend API
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            GraphQL API Server powered by Next.js and Apollo Server
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              API Endpoints
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-mono text-sm">GraphQL Playground</span>
                <a
                  href="/api/graphql"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Access Playground
                </a>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-mono text-sm">GraphQL Endpoint</span>
                <code className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm">
                  POST /api/graphql
                </code>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🎯 Olympiads
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Manage academic competitions and tournaments
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                👥 Students
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Student registration and answer management
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🏆 Organizers
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Host and organizer management system
              </p>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Server Status:{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold">
                ✅ Online
              </span>
            </p>
            <p>
              Database:{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold">
                ✅ Connected
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
