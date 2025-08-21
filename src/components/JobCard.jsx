import { FiUserPlus } from 'react-icons/fi';        // Experience icon (user plus)
import { HiOfficeBuilding } from 'react-icons/hi';  // Onsite icon (office building)
import { FaLayerGroup } from 'react-icons/fa';      // Salary icon (stacked layers)
import { FaRegClock } from 'react-icons/fa';        // Time (clock)

function formatTimeAgo() {
  return "24h Ago";
}

export default function JobCard({ job }) {
  const points = [
    job.description || 'Job description goes here.',
    ...(job.responsibilities || [])
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col space-y-3 border border-gray-200 relative">
      {/* Top-right "24h Ago" in dim blue container */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-blue-100 rounded-full px-3 py-1">
        <FaRegClock className="text-blue-700 text-xs" />
        <span className="text-xs text-blue-700 font-semibold">{formatTimeAgo(job.createdAt)}</span>
      </div>
      {/* Top logo at left */}
      <div className="flex items-center mb-2">
        <div className="rounded-full bg-gray-200 p-2 flex items-center justify-center mr-3">
          {/* Company logo, placeholder for now */}
          <FiUserPlus className="text-lg text-blue-600" />
        </div>
        <div>
          <div className="font-bold text-lg">{job.title}</div>
          <div className="text-sm text-gray-700">{job.company}</div>
          <div className="text-sm text-gray-500">{job.location}</div>
        </div>
      </div>
      {/* Row with icons */}
      <div className="flex flex-row gap-8 items-center mt-2">
        <div className="flex items-center gap-1">
          <FiUserPlus className="text-gray-600" />
          <span className="text-sm text-gray-600">{job.experience || "1-3 yr Exp"}</span>
        </div>
        <div className="flex items-center gap-1">
          <HiOfficeBuilding className="text-gray-600" />
          <span className="text-sm text-gray-600">{job.mode || "Onsite"}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaLayerGroup className="text-gray-600" />
          <span className="text-sm text-gray-600">{job.salaryRange || "12LPA"}</span>
        </div>
      </div>
      {/* Points (description and responsibilities) */}
      <ul className="list-none mt-4 ml-2 space-y-2">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="h-2 w-2 bg-gray-900 rounded-full"></span>
            <span className="text-sm text-gray-700">{point}</span>
          </li>
        ))}
      </ul>
      {/* Block Apply Button */}
      <button className="bg-blue-600 text-white w-full px-4 py-2 rounded text-base mt-4 font-semibold">Apply</button>
    </div>
  );
}
