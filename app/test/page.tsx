export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">✅ Test Page Works!</h1>
        <p className="text-lg text-gray-600 mb-6">Routes are working correctly.</p>
        <div className="space-y-2 text-left bg-white p-6 rounded-lg shadow">
          <p><strong>Try these links:</strong></p>
          <ul className="list-disc list-inside space-y-1 text-blue-600">
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
            <li><a href="/customer/dashboard">Dashboard</a></li>
            <li><a href="/admin/dashboard">Admin</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
