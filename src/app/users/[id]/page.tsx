interface Props {
  params: { id: string };
}

export default function UserProfilePage({ params }: Props) {
  return (
    <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
      <p className="text-gray-700">
        This is the profile page for user ID: <strong>{params.id}</strong>
      </p>
      
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h2 className="text-lg font-medium mb-2">Next.js 15 Routing Features:</h2>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>Dynamic parameters via [id] folder structure</li>
          <li>Type-safe params with TypeScript</li>
          <li>Automatic route generation</li>
          <li>No manual route definitions needed</li>
        </ul>
      </div>
    </main>
  );
} 