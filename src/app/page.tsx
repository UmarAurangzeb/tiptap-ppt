"use client"

import dynamic from 'next/dynamic';

// Dynamically import the TiptapEditor to avoid SSR issues
const TiptapEditor = dynamic(() => import('./components/TiptapEditor'), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 bg-gray-100 rounded-lg mx-auto max-w-4xl"></div>
});

// Dynamically import the ExportButton to avoid SSR issues
const ExportButton = dynamic(() => import('./components/ExportButton'), {
  ssr: false,
  loading: () => <div className="animate-pulse h-12 bg-gray-100 rounded-lg w-48"></div>
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Export */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Slide Editor</h1>
              <p className="text-gray-600 mt-1">Create presentations with pixel-perfect PowerPoint export</p>
            </div>
            <ExportButton />
          </div>
        </div>

        {/* Editor */}
        <TiptapEditor />
      </div>
    </div>
  );
}
