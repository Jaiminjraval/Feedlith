// import React, { useState } from "react";

// export default function AddTeacher({ onAdd, onCancel }) {
//   const [name, setName] = useState("");
//   const [subject, setSubject] = useState("");
//   const [wallet, setWallet] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onAdd({
//       id: Date.now(),
//       name,
//       subject,
//       // wallet,
//       teacherId,
//     });

//     setName("");
//     setSubject("");
//     setWallet("");
//   };

//   return (
//     <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold text-white mb-6">Add Teacher</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           required
//           placeholder="Teacher Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white"
//         />

//         <input
//           required
//           placeholder="Subject"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white"
//         />

//         <input
//           required
//           placeholder="Teacher Wallet / ID"
//           // value={wallet}
//           value={teacherId}
//           onChange={(e) => setWallet(e.target.value)}
//           className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white"
//         />

//         <div className="flex justify-end gap-4 pt-4">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-5 py-2 bg-slate-700 text-white rounded-lg"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold"
//           >
//             Add Teacher
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";

export default function AddTeacher({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass data back to App.jsx
    onAdd({
      id: Date.now(),
      name,
      subject,
      teacherId,
    });
    // Reset form
    setName("");
    setSubject("");
    setTeacherId("");
  };

  return (
    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-white mb-6">Add Teacher</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-slate-400 text-sm mb-1 block">
            Teacher Name
          </label>
          <input
            required
            placeholder="Dr. Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="text-slate-400 text-sm mb-1 block">
            Subject / Department
          </label>
          <input
            required
            placeholder="Computer Science"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="text-slate-400 text-sm mb-1 block">
            Teacher ID (For Blockchain)
          </label>
          <input
            required
            placeholder="EMP-001"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-indigo-500 outline-none"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-lg transition-colors"
          >
            Add Teacher
          </button>
        </div>
      </form>
    </div>
  );
}
