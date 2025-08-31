import React from "react";

const Page = () => {
  return (
    <div className="container bg-[#f0f2f5] p-5">
      <div className="mx-auto space-y-10 px-4 sm:px-6 lg:px-8 ">
        <header>
          <h1 className="text-3xl sm:text-4xl font-bold flex flex-wrap items-center gap-2">
            📊 Dashboard Analytics Project
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-700 leading-relaxed">
            A modern <strong>analytics dashboard</strong> built with{" "}
            <strong>Next.js</strong> for uploading, parsing, and visualizing
            large datasets in CSV/XLSX format. Data is stored locally in{" "}
            <strong>IndexedDB</strong> for performance, with{" "}
            <strong>Redux Toolkit</strong> managing global state and{" "}
            <strong>Highcharts/Recharts</strong> powering interactive charts.
          </p>
        </header>

        {/* Tech Stack */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            🚀 Tech Stack
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
            <li>
              <b>Framework:</b> Next.js (v15.5.2)
            </li>
            <li>
              <b>State Management:</b> Redux Toolkit + Redux Persist
            </li>
            <li>
              <b>Charts & Visualization:</b> Highcharts, Recharts
            </li>
            <li>
              <b>File Handling:</b> xlsx (for parsing CSV/XLSX)
            </li>
            <li>
              <b>Storage:</b> IndexedDB (via idb) → optimized for large datasets
            </li>
            <li>
              <b>UI & Styling:</b> TailwindCSS + Flowbite
            </li>
            <li>
              <b>Notifications & Icons:</b> React Hot Toast, React Icons
            </li>
          </ul>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            📂 Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
            <li>
              📤 Upload files in <b>CSV/XLSX</b> format.
            </li>
            <li>
              💾 Parse and store data in <b>IndexedDB</b> (1–2 MB datasets).
            </li>
            <li>
              🔄 Manage global state with <b>Redux Toolkit</b>.
            </li>
            <li>
              📈 Generate interactive analytics with <b>Highcharts</b> and{" "}
              <b>Recharts</b>.
            </li>
            <li>
              ♻️ Persistent state using <b>redux-persist</b>.
            </li>
            <li>
              🎨 Responsive UI with <b>TailwindCSS + Flowbite</b>.
            </li>
            <li>
              🔔 Real-time feedback with <b>React Hot Toast</b>.
            </li>
          </ul>
        </section>

        {/* Scripts */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">⚙️ Scripts</h2>
          <pre className="bg-gray-900 text-green-300 p-4 rounded-lg text-xs sm:text-sm overflow-x-auto">
            <code>
              {`{
  "dev": "next dev --turbopack",
  "build": "next build --turbopack",
  "start": "next start",
  "lint": "eslint"
}`}
            </code>
          </pre>
        </section>
      </div>
    </div>
  );
};

export default Page;
