// import React, { useState } from "react";
// import {
//   Activity,
//   Search,
//   CheckCircle,
//   AlertTriangle,
//   User,
//   ChevronRight,
//   TrendingUp,
//   Copy,
//   Database,
// } from "lucide-react";

// // Import Components
// import LoginScreen from "./components/LoginScreen";
// import Sidebar from "./components/SideBar";
// import FeedbackModal from "./components/FeedbackModal";

// // Import Data
// import { COURSES, INITIAL_BLOCKS, FACULTY_STATS } from "./data/mockData";
// import AddStudent from "./components/AddStudent";
// import AddTeacher from "./components/AddTeacher";

// export default function FeedbackApp() {
//   const [user, setUser] = useState(null);
//   const [currentView, setCurrentView] = useState("dashboard");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);

//   // Modal State
//   const [isMining, setIsMining] = useState(false);
//   const [miningStep, setMiningStep] = useState(0);
//   const [notification, setNotification] = useState(null);

//   const addStudent = (student) => {
//     setStudents([...students, student]);
//     setCurrentView("explorer");
//   };

//   const addTeacher = (teacher) => {
//     setTeachers([...teachers, teacher]);
//     setCurrentView("analytics");
//   };

//   const handleLogin = (role, id) => {
//     setUser({ role, id });
//     setCurrentView("dashboard");
//     showNotification("success", "Wallet Connected Successfully");
//   };

//   const showNotification = (type, msg) => {
//     setNotification({ type, msg });
//     setTimeout(() => setNotification(null), 4000);
//   };

//   const handleFeedbackSubmit = async (ratings, comment) => {
//     if (
//       !ratings.teaching ||
//       !ratings.comms ||
//       !ratings.fairness ||
//       !ratings.engage
//     ) {
//       showNotification("error", "Please complete all rating fields.");
//       return;
//     }

//     setIsMining(true);

//     const ratingsArray = [
//       ratings.teaching,
//       ratings.comms,
//       ratings.fairness,
//       ratings.engage,
//     ];

//     // Simulate Blockchain Process
//     const steps = [
//       () => setMiningStep(1), // Hashing
//       () => setMiningStep(2), // Encrypting
//       () => setMiningStep(3), // Consensus
//       () => {
//         // Finalizing
//         const newBlock = {
//           id: blocks.length + 1,
//           hash:
//             "0x" +
//             Array(64)
//               .fill(0)
//               .map(() => Math.floor(Math.random() * 16).toString(16))
//               .join(""),
//           prevHash: blocks[blocks.length - 1].hash,
//           studentHash:
//             "0x" +
//             Array(10)
//               .fill(0)
//               .map(() => Math.floor(Math.random() * 16).toString(16))
//               .join(""),
//           course: selectedCourse.id,
//           // rating: Object.values(ratings).reduce((a, b) => a + b, 0),
//           rating: ratingsArray.reduce((a, b) => a + b, 0),
//           timestamp: new Date().toLocaleString(),
//         };
//         setBlocks([newBlock, ...blocks]);
//         setIsMining(false);
//         setMiningStep(0);
//         setSelectedCourse(null);
//         showNotification(
//           "success",
//           "Transaction Mined: Feedback Recorded Immutably."
//         );
//       },
//     ];

//     for (let i = 0; i < steps.length; i++) {
//       setTimeout(steps[i], (i + 1) * 1200);
//     }
//   };

//   if (!user) return <LoginScreen onLogin={handleLogin} />;

//   return (
//     <div className="flex h-screen bg-[#0f172a] text-slate-100 font-sans overflow-hidden">
//       <Sidebar
//         user={user}
//         currentView={currentView}
//         setCurrentView={setCurrentView}
//         onLogout={() => setUser(null)}
//       />

//       {/* MAIN CONTENT AREA */}
//       <main className="flex-1 overflow-y-auto relative bg-[#0f172a] scroll-smooth">
//         {/* Top Header */}
//         {/* <header className="sticky top-0 z-20 bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 px-8 py-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-xl font-bold text-white tracking-tight">
//               {currentView === "dashboard"
//                 ? "Overview"
//                 : currentView === "explorer"
//                 ? "Blockchain Ledger"
//                 : "Analytics"}
//             </h1>
//             <p className="text-xs text-slate-500 font-mono mt-0.5">
//               Network: Ethereum Goerli Testnet • Block Height: #
//               {14230 + blocks.length}
//             </p>
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="hidden md:flex items-center px-3 py-1.5 bg-slate-800 rounded-full border border-slate-700 text-xs font-mono text-slate-400">
//               <Activity className="w-3 h-3 mr-2 text-emerald-400" />
//               Gas: 12 Gwei
//             </div>
//             <button className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
//               <Search className="w-5 h-5" />
//             </button>
//           </div>
//         </header> */}

//         {/* Content Padding */}
//         <div className="p-8 max-w-7xl mx-auto">
//           {/* Notification Toast */}
//           {notification && (
//             <div
//               className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center space-x-4 text-white transform transition-all animate-in slide-in-from-bottom duration-500 border ${
//                 notification.type === "success"
//                   ? "bg-emerald-900/90 border-emerald-500"
//                   : "bg-red-900/90 border-red-500"
//               }`}
//             >
//               <div
//                 className={`p-2 rounded-full ${
//                   notification.type === "success"
//                     ? "bg-emerald-500"
//                     : "bg-red-500"
//                 }`}
//               >
//                 {notification.type === "success" ? (
//                   <CheckCircle className="w-5 h-5 text-white" />
//                 ) : (
//                   <AlertTriangle className="w-5 h-5 text-white" />
//                 )}
//               </div>
//               <div>
//                 <p className="font-bold text-sm">
//                   {notification.type === "success" ? "Success" : "System Error"}
//                 </p>
//                 <p className="text-xs opacity-90">{notification.msg}</p>
//               </div>
//             </div>
//           )}

//           {/* DASHBOARD VIEW (STUDENT) */}
//           {user.role === "student" && currentView === "dashboard" && (
//             <>
//               <div className="mb-10 p-8 rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-900 relative overflow-hidden shadow-2xl">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-16 -mt-16"></div>
//                 <h2 className="text-3xl font-extrabold text-white mb-2 relative z-10">
//                   Hello, Student.
//                 </h2>
//                 <p className="text-indigo-200 max-w-xl relative z-10">
//                   Your feedback drives the future of education. All submissions
//                   are encrypted and stored permanently on the blockchain.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {COURSES.map((course) => (
//                   <div
//                     key={course.id}
//                     className={`group relative bg-slate-800 rounded-2xl p-6 border transition-all duration-300 ${
//                       course.active
//                         ? "border-slate-700 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
//                         : "border-slate-800 opacity-60"
//                     }`}
//                   >
//                     <div className="flex justify-between items-start mb-6">
//                       <div
//                         className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
//                           course.active
//                             ? "bg-indigo-500/20 text-indigo-400"
//                             : "bg-slate-700 text-slate-500"
//                         }`}
//                       >
//                         {course.dept}
//                       </div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-bold border ${
//                           course.active
//                             ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
//                             : "bg-slate-700 text-slate-400 border-slate-600"
//                         }`}
//                       >
//                         {course.active ? "Accepting Feedback" : "Closed"}
//                       </span>
//                     </div>

//                     <h3 className="font-bold text-xl text-white mb-2 group-hover:text-indigo-400 transition-colors">
//                       {course.name}
//                     </h3>
//                     <p className="text-slate-400 text-sm mb-6 flex items-center">
//                       <User className="w-4 h-4 mr-2" />
//                       {course.faculty}
//                     </p>

//                     <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
//                       <span className="text-xs text-slate-500 font-mono">
//                         {course.id}
//                       </span>
//                       <button
//                         onClick={() =>
//                           course.active
//                             ? setSelectedCourse(course)
//                             : showNotification(
//                                 "error",
//                                 "Feedback period closed."
//                               )
//                         }
//                         className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 transition-all ${
//                           course.active
//                             ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
//                             : "bg-slate-700 text-slate-400 cursor-not-allowed"
//                         }`}
//                       >
//                         <span>Review</span>
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* DASHBOARD VIEW (ADMIN) */}
//           {user.role === "admin" && currentView === "dashboard" && (
//             <div className="space-y-8">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
//                   <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
//                     Total Students
//                   </p>
//                   <p className="text-4xl font-extrabold text-white">
//                     {blocks.length}
//                   </p>
//                   <div className="mt-4 flex items-center text-emerald-400 text-sm font-bold">
//                     <TrendingUp className="w-4 h-4 mr-1" /> +12% this week
//                   </div>
//                 </div>
//                 <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
//                   <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
//                     Total Teachers
//                   </p>
//                   <p className="text-4xl font-extrabold text-white">3</p>
//                 </div>
//                 <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
//                   <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
//                     Total Submiited Feedbacks
//                   </p>
//                   <p className="text-4xl font-extrabold text-emerald-400">
//                     99.9%
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
//                 <div className="p-6 border-b border-slate-700 flex justify-between items-center">
//                   <h3 className="font-bold text-lg text-white">
//                     Recent Feedbacks
//                   </h3>
//                   <button className="text-indigo-400 text-sm font-bold hover:text-indigo-300">
//                     View All
//                   </button>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left">
//                     <thead className="bg-slate-900/50">
//                       <tr className="text-slate-400 text-xs uppercase tracking-wider">
//                         {/* <th className="py-4 px-6 font-medium">Hash</th> */}
//                         <th className="py-4 px-6 font-medium">Student Name</th>
//                         {/* <th className="py-4 px-6 font-medium">Block</th> */}
//                         <th className="py-4 px-6 font-medium">Index no.</th>
//                         <th className="py-4 px-6 font-medium">Time</th>
//                         <th className="py-4 px-6 font-medium">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-700">
//                       {blocks.slice(0, 5).map((block) => (
//                         <tr
//                           key={block.id}
//                           className="hover:bg-slate-700/30 transition-colors"
//                         >
//                           {/* <td className="py-4 px-6 font-mono text-indigo-400 text-xs">
//                             <div className="flex items-center space-x-2">
//                               <span>{block.hash.substring(0, 12)}...</span>
//                               <Copy className="w-3 h-3 cursor-pointer hover:text-white" />
//                             </div>
//                           </td> */}
//                           <td className="py-4 px-6 font-mono text-indigo-400 text-xs">
//                             #{block.Name}
//                           </td>
//                           <td className="py-4 px-6 text-white font-mono">
//                             #{block.id}
//                           </td>
//                           <td className="py-4 px-6 text-slate-400 text-sm">
//                             {block.timestamp}
//                           </td>
//                           <td className="py-4 px-6">
//                             <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs font-bold">
//                               Confirmed
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ANALYTICS VIEW */}
//           {currentView === "analytics" && (
//             <>
//               <div className="flex justify-end mb-4">
//                 <button
//                   onClick={() => setCurrentView("addTeacher")}
//                   className="px-5 py-2.5 rounded-xl
//                    bg-indigo-600 hover:bg-indigo-700
//                    text-white font-semibold
//                    shadow-lg transition-all"
//                 >
//                   + Add Teacher
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 gap-6">
//                 {FACULTY_STATS.map((fac, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
//                   >
//                     <div className="flex justify-between items-end mb-4">
//                       <div>
//                         <h4 className="text-lg font-bold text-white">
//                           {fac.name}
//                         </h4>
//                         <p className="text-slate-500 text-sm">
//                           {fac.feedbacks} Verified Reviews
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-2xl font-bold text-white">
//                           {fac.score}
//                         </p>
//                         <p
//                           className={`text-xs font-bold ${
//                             fac.trend.startsWith("+")
//                               ? "text-emerald-400"
//                               : "text-red-400"
//                           }`}
//                         >
//                           {fac.trend} vs last sem
//                         </p>
//                       </div>
//                     </div>
//                     <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
//                       <div
//                         className="bg-indigo-500 h-2 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
//                         style={{ width: `${(fac.score / 5) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* LEDGER EXPLORER */}

//           {/* {currentView === "explorer" && (
//               <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
//                 <div className="p-6 bg-slate-900 border-b border-slate-700">
//                   <h3 className="text-lg font-bold text-white flex items-center">
//                     <Database className="w-5 h-5 mr-2 text-indigo-500" />
//                     Student List
//                   </h3>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left border-collapse">
//                     <thead className="bg-slate-900/80 text-xs uppercase text-slate-400">
//                       <tr>
//                         <th className="p-4 border-b border-slate-700">
//                           Student ID
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Student Name
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Details
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Feedback Data
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Timestamp
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-700 text-sm">
//                       {blocks.map((block) => (
//                         <tr
//                           key={block.id}
//                           className="hover:bg-slate-700/30 transition-colors"
//                         >
//                           <td className="p-4 align-top">
//                             <span className="font-mono text-indigo-400 font-bold text-lg">
//                               #{block.id}
//                             </span>
//                           </td>
//                           <td className="p-4 align-top">
//                             <span className="font-mono text-indigo-400 font-bold text-lg">
//                               {block.Name}
//                             </span>
//                           </td>
//                           <td className="p-4 align-top space-y-2">
//                             <div>
//                               <span className="text-xs text-slate-500 block mb-1">
//                                 BLOCK HASH
//                               </span>
//                               <span className="font-mono text-xs text-slate-300 bg-slate-900 px-2 py-1 rounded border border-slate-700 block w-max">
//                                 {block.hash.substring(0, 24)}...
//                               </span>
//                             </div>
//                             <div>
//                               <span className="text-xs text-slate-500 block mb-1">
//                                 PREV HASH
//                               </span>
//                               <span className="font-mono text-xs text-slate-400 block">
//                                 {block.prevHash.substring(0, 16)}...
//                               </span>
//                             </div>
//                           </td>
//                           <td className="p-4 align-top">
//                             <div className="flex items-center space-x-2 mb-2">
//                               <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white font-bold">
//                                 {block.course}
//                               </span>
//                               <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded text-xs border border-indigo-500/20">
//                                 Score: {block.rating}/20
//                               </span>
//                             </div>
//                             <div className="text-xs text-slate-500 font-mono">
//                               Student: {block.studentHash}
//                             </div>
//                           </td>
//                           <td className="p-4 align-top text-slate-400">
//                             {block.timestamp}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//           )} */}
//           {/* LEDGER EXPLORER */}
//           {currentView === "explorer" && (
//             <>
//               {/* Add Student Button */}
//               <div className="flex justify-end mb-4">
//                 <button
//                   onClick={() => setCurrentView("addStudent")}
//                   className="px-5 py-2.5 rounded-xl
//                    bg-indigo-600 hover:bg-indigo-700
//                    text-white font-semibold
//                    shadow-lg transition-all"
//                 >
//                   + Add Student
//                 </button>
//               </div>

//               {/* Student List */}
//               <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
//                 <div className="p-6 bg-slate-900 border-b border-slate-700">
//                   <h3 className="text-lg font-bold text-white flex items-center">
//                     <Database className="w-5 h-5 mr-2 text-indigo-500" />
//                     Student List
//                   </h3>
//                 </div>

//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left border-collapse">
//                     <thead className="bg-slate-900/80 text-xs uppercase text-slate-400">
//                       <tr>
//                         <th className="p-4 border-b border-slate-700">
//                           Student ID
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Student Name
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Details
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Feedback Data
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Timestamp
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-slate-700 text-sm">
//                       {blocks.map((block) => (
//                         <tr
//                           key={block.id}
//                           className="hover:bg-slate-700/30 transition-colors"
//                         >
//                           <td className="p-4 align-top">
//                             <span className="font-mono text-indigo-400 font-bold text-lg">
//                               #{block.id}
//                             </span>
//                           </td>

//                           <td className="p-4 align-top">
//                             <span className="font-mono text-indigo-400 font-bold text-lg">
//                               {block.Name}
//                             </span>
//                           </td>

//                           <td className="p-4 align-top space-y-2">
//                             <div>
//                               <span className="text-xs text-slate-500 block mb-1">
//                                 BLOCK HASH
//                               </span>
//                               <span className="font-mono text-xs text-slate-300 bg-slate-900 px-2 py-1 rounded border border-slate-700 block w-max">
//                                 {block.hash.substring(0, 24)}...
//                               </span>
//                             </div>

//                             <div>
//                               <span className="text-xs text-slate-500 block mb-1">
//                                 PREV HASH
//                               </span>
//                               <span className="font-mono text-xs text-slate-400 block">
//                                 {block.prevHash.substring(0, 16)}...
//                               </span>
//                             </div>
//                           </td>

//                           <td className="p-4 align-top">
//                             <div className="flex items-center space-x-2 mb-2">
//                               <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white font-bold">
//                                 {block.course}
//                               </span>
//                               <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded text-xs border border-indigo-500/20">
//                                 Score: {block.rating}/20
//                               </span>
//                             </div>
//                             <div className="text-xs text-slate-500 font-mono">
//                               Student: {block.studentHash}
//                             </div>
//                           </td>

//                           <td className="p-4 align-top text-slate-400">
//                             {block.timestamp}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </>
//           )}

//           {currentView === "addStudent" && (
//             <AddStudent
//               onAdd={addStudent}
//               onCancel={() => setCurrentView("explorer")}
//             />
//           )}

//           {currentView === "addTeacher" && (
//             <AddTeacher
//               onAdd={addTeacher}
//               onCancel={() => setCurrentView("analytics")}
//             />
//           )}
//         </div>
//       </main>

//       {/* FEEDBACK MODAL WRAPPER */}
//       {selectedCourse && (
//         <FeedbackModal
//           selectedCourse={selectedCourse}
//           onClose={() => !isMining && setSelectedCourse(null)}
//           onSubmit={handleFeedbackSubmit}
//           isMining={isMining}
//           miningStep={miningStep}
//         />
//       )}
//     </div>
//   );
// }

// ....................................................... //

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////  Before Changing code for connecting smart contract and frontend       //////////////////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// // [NOTE] FOR LOCAL DEVELOPMENT:
// // Uncomment the imports below and remove the "MOCKS" section.
// import { useAccount } from "wagmi";
// import { ConnectButton } from "@rainbow-me/rainbowkit";

// import {
//   CheckCircle,
//   AlertTriangle,
//   User,
//   ChevronRight,
//   TrendingUp,
//   Database,
//   Activity,
//   Search,
//   Copy,
// } from "lucide-react";

// // Import Components
// import LoginScreen from "./components/LoginScreen";
// import Sidebar from "./components/SideBar";
// import FeedbackModal from "./components/FeedbackModal";
// import AddStudent from "./components/AddStudent";
// import AddTeacher from "./components/AddTeacher";

// // Import Data
// import { COURSES, INITIAL_BLOCKS, FACULTY_STATS } from "./data/mockData";

// // --- MOCKS FOR PREVIEW (DELETE THIS SECTION LOCALLY) ---
// // const useAccount = () => ({ address: "0x123...abc", isConnected: true }); // Simulating connected state
// // const ConnectButton = ({ showBalance, accountStatus, chainStatus }) => (
// //   <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
// //     Wallet Connected
// //   </button>
// // );
// // --- END MOCKS ---

// export default function FeedbackApp() {
//   // Get wallet address from RainbowKit/Wagmi
//   const { address, isConnected } = useAccount();

//   const [user, setUser] = useState(null);
//   const [currentView, setCurrentView] = useState("dashboard");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);

//   // Modal State
//   const [isMining, setIsMining] = useState(false);
//   const [miningStep, setMiningStep] = useState(0);
//   const [notification, setNotification] = useState(null);

//   useEffect(() => {
//     if (!isConnected) {
//       setUser(null); // This redirects to LoginScreen because of "if (!user) return <LoginScreen ... />" logic
//     }
//   }, [isConnected]);

//   const addStudent = (student) => {
//     setStudents([...students, student]);
//     setCurrentView("explorer");
//   };

//   const addTeacher = (teacher) => {
//     setTeachers([...teachers, teacher]);
//     setCurrentView("analytics");
//   };

//   const handleLogin = (role, id) => {
//     if (!isConnected) {
//       showNotification("error", "Please connect your wallet first.");
//       return;
//     }
//     // Set user with role, ID, AND the connected wallet address
//     setUser({ role, id, walletAddress: address });
//     setCurrentView("dashboard");
//     showNotification("success", "Wallet Connected Successfully");
//   };

//   const showNotification = (type, msg) => {
//     setNotification({ type, msg });
//     setTimeout(() => setNotification(null), 4000);
//   };

//   const handleFeedbackSubmit = async (ratings, comment) => {
//     if (
//       !ratings.teaching ||
//       !ratings.comms ||
//       !ratings.fairness ||
//       !ratings.engage
//     ) {
//       showNotification("error", "Please complete all rating fields.");
//       return;
//     }

//     setIsMining(true);

//     // Prepare ratings array for Smart Contract
//     const ratingsArray = [
//       ratings.teaching,
//       ratings.comms,
//       ratings.fairness,
//       ratings.engage,
//     ];

//     // Simulate Blockchain Process
//     const steps = [
//       () => setMiningStep(1), // Hashing
//       () => setMiningStep(2), // Encrypting
//       () => setMiningStep(3), // Consensus
//       () => {
//         // Finalizing
//         const newBlock = {
//           id: blocks.length + 1,
//           Name: "Anonymous Student", // Privacy feature
//           hash:
//             "0x" +
//             Array(64)
//               .fill(0)
//               .map(() => Math.floor(Math.random() * 16).toString(16))
//               .join(""),
//           prevHash: blocks[blocks.length - 1].hash,
//           studentHash: address, // USE REAL ADDRESS
//           course: selectedCourse.id,
//           rating: Object.values(ratings).reduce((a, b) => a + b, 0),
//           timestamp: new Date().toLocaleString(),
//         };
//         setBlocks([newBlock, ...blocks]);
//         setIsMining(false);
//         setMiningStep(0);
//         setSelectedCourse(null);
//         showNotification(
//           "success",
//           "Transaction Mined: Feedback Recorded Immutably."
//         );
//       },
//     ];

//     for (let i = 0; i < steps.length; i++) {
//       setTimeout(steps[i], (i + 1) * 1200);
//     }
//   };

//   if (!user) return <LoginScreen onLogin={handleLogin} />;

//   return (
//     <div className="flex h-screen bg-[#0f172a] text-slate-100 font-sans overflow-hidden">
//       <Sidebar
//         user={user}
//         currentView={currentView}
//         setCurrentView={setCurrentView}
//         onLogout={() => setUser(null)}
//       />

//       {/* MAIN CONTENT AREA */}
//       <main className="flex-1 overflow-y-auto relative bg-[#0f172a] scroll-smooth">
//         {/* Header with RainbowKit Profile */}
//         <header className="sticky top-0 z-20 bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 px-8 py-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-xl font-bold text-white tracking-tight">
//               {currentView === "dashboard"
//                 ? "Overview"
//                 : currentView === "explorer"
//                 ? "Student List"
//                 : currentView === "analytics"
//                 ? "Faculty List"
//                 : "Add Data"}
//             </h1>
//             <p className="text-xs text-slate-500 font-mono mt-0.5">
//               Connected: {address}
//             </p>
//           </div>

//           <div className="flex items-center space-x-4">
//             {/* RainbowKit Standard Connect Button for header */}
//             <ConnectButton
//               showBalance={false}
//               accountStatus="avatar"
//               chainStatus="icon"
//             />
//           </div>
//         </header>

//         {/* Content Padding */}
//         <div className="p-8 max-w-7xl mx-auto">
//           {/* Notification Toast */}
//           {notification && (
//             <div
//               className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center space-x-4 text-white transform transition-all animate-in slide-in-from-bottom duration-500 border ${
//                 notification.type === "success"
//                   ? "bg-emerald-900/90 border-emerald-500"
//                   : "bg-red-900/90 border-red-500"
//               }`}
//             >
//               <div
//                 className={`p-2 rounded-full ${
//                   notification.type === "success"
//                     ? "bg-emerald-500"
//                     : "bg-red-500"
//                 }`}
//               >
//                 {notification.type === "success" ? (
//                   <CheckCircle className="w-5 h-5 text-white" />
//                 ) : (
//                   <AlertTriangle className="w-5 h-5 text-white" />
//                 )}
//               </div>
//               <div>
//                 <p className="font-bold text-sm">
//                   {notification.type === "success" ? "Success" : "System Error"}
//                 </p>
//                 <p className="text-xs opacity-90">{notification.msg}</p>
//               </div>
//             </div>
//           )}

//           {/* DASHBOARD VIEW (STUDENT) */}
//           {user.role === "student" && currentView === "dashboard" && (
//             <>
//               <div className="mb-10 p-8 rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-900 relative overflow-hidden shadow-2xl">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-16 -mt-16"></div>
//                 <h2 className="text-3xl font-extrabold text-white mb-2 relative z-10">
//                   Hello, Student.
//                 </h2>
//                 <p className="text-indigo-200 max-w-xl relative z-10">
//                   Your feedback drives the future of education. All submissions
//                   are encrypted and stored permanently on the blockchain.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {COURSES.map((course) => (
//                   <div
//                     key={course.id}
//                     className={`group relative bg-slate-800 rounded-2xl p-6 border transition-all duration-300 ${
//                       course.active
//                         ? "border-slate-700 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
//                         : "border-slate-800 opacity-60"
//                     }`}
//                   >
//                     <div className="flex justify-between items-start mb-6">
//                       <div
//                         className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
//                           course.active
//                             ? "bg-indigo-500/20 text-indigo-400"
//                             : "bg-slate-700 text-slate-500"
//                         }`}
//                       >
//                         {course.dept}
//                       </div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-bold border ${
//                           course.active
//                             ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
//                             : "bg-slate-700 text-slate-400 border-slate-600"
//                         }`}
//                       >
//                         {course.active ? "Accepting Feedback" : "Closed"}
//                       </span>
//                     </div>

//                     <h3 className="font-bold text-xl text-white mb-2 group-hover:text-indigo-400 transition-colors">
//                       {course.name}
//                     </h3>
//                     <p className="text-slate-400 text-sm mb-6 flex items-center">
//                       <User className="w-4 h-4 mr-2" />
//                       {course.faculty}
//                     </p>

//                     <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
//                       <span className="text-xs text-slate-500 font-mono">
//                         {course.id}
//                       </span>
//                       <button
//                         onClick={() =>
//                           course.active
//                             ? setSelectedCourse(course)
//                             : showNotification(
//                                 "error",
//                                 "Feedback period closed."
//                               )
//                         }
//                         className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 transition-all ${
//                           course.active
//                             ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
//                             : "bg-slate-700 text-slate-400 cursor-not-allowed"
//                         }`}
//                       >
//                         <span>Review</span>
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* DASHBOARD VIEW (ADMIN) */}
//           {user.role === "admin" && currentView === "dashboard" && (
//             <div className="space-y-8">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
//                   <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
//                     Total Students
//                   </p>
//                   <p className="text-4xl font-extrabold text-white">
//                     {blocks.length}
//                   </p>
//                   <div className="mt-4 flex items-center text-emerald-400 text-sm font-bold">
//                     <TrendingUp className="w-4 h-4 mr-1" /> +12% this week
//                   </div>
//                 </div>
//                 <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
//                   <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
//                     Total Teachers
//                   </p>
//                   <p className="text-4xl font-extrabold text-white">3</p>
//                 </div>
//                 <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
//                   <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
//                     Total Submiited Feedbacks
//                   </p>
//                   <p className="text-4xl font-extrabold text-emerald-400">
//                     99.9%
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
//                 <div className="p-6 border-b border-slate-700 flex justify-between items-center">
//                   <h3 className="font-bold text-lg text-white">
//                     Recent Feedbacks
//                   </h3>
//                   <button className="text-indigo-400 text-sm font-bold hover:text-indigo-300">
//                     View All
//                   </button>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left">
//                     <thead className="bg-slate-900/50">
//                       <tr className="text-slate-400 text-xs uppercase tracking-wider">
//                         <th className="py-4 px-6 font-medium">Student Name</th>
//                         <th className="py-4 px-6 font-medium">Index no.</th>
//                         <th className="py-4 px-6 font-medium">Time</th>
//                         <th className="py-4 px-6 font-medium">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-700">
//                       {blocks.slice(0, 5).map((block) => (
//                         <tr
//                           key={block.id}
//                           className="hover:bg-slate-700/30 transition-colors"
//                         >
//                           <td className="py-4 px-6 font-mono text-indigo-400 text-xs">
//                             #{block.Name}
//                           </td>
//                           <td className="py-4 px-6 text-white font-mono">
//                             #{block.id}
//                           </td>
//                           <td className="py-4 px-6 text-slate-400 text-sm">
//                             {block.timestamp}
//                           </td>
//                           <td className="py-4 px-6">
//                             <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs font-bold">
//                               Confirmed
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* LEDGER EXPLORER */}
//           {currentView === "explorer" && (
//             <>
//               {/* Add Student Button */}
//               <div className="flex justify-end mb-4">
//                 <button
//                   onClick={() => setCurrentView("addStudent")}
//                   className="px-5 py-2.5 rounded-xl
//                    bg-indigo-600 hover:bg-indigo-700
//                    text-white font-semibold
//                    shadow-lg transition-all"
//                 >
//                   + Add Student
//                 </button>
//               </div>

//               {/* Student List */}
//               <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
//                 <div className="p-6 bg-slate-900 border-b border-slate-700">
//                   <h3 className="text-lg font-bold text-white flex items-center">
//                     <Database className="w-5 h-5 mr-2 text-indigo-500" />
//                     Student List
//                   </h3>
//                 </div>

//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left border-collapse">
//                     <thead className="bg-slate-900/80 text-xs uppercase text-slate-400">
//                       <tr>
//                         <th className="p-4 border-b border-slate-700">
//                           Student ID
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Student Name
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Details
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Feedback Data
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Timestamp
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-slate-700 text-sm">
//                       {blocks.map((block) => (
//                         <tr
//                           key={block.id}
//                           className="hover:bg-slate-700/30 transition-colors"
//                         >
//                           <td className="p-4 align-top">
//                             <span className="font-mono text-indigo-400 font-bold text-lg">
//                               #{block.id}
//                             </span>
//                           </td>

//                           <td className="p-4 align-top">
//                             <span className="font-mono text-indigo-400 font-bold text-lg">
//                               {block.Name}
//                             </span>
//                           </td>

//                           <td className="p-4 align-top space-y-2">
//                             <div>
//                               <span className="text-xs text-slate-500 block mb-1">
//                                 BLOCK HASH
//                               </span>
//                               <span className="font-mono text-xs text-slate-300 bg-slate-900 px-2 py-1 rounded border border-slate-700 block w-max">
//                                 {block.hash.substring(0, 24)}...
//                               </span>
//                             </div>

//                             <div>
//                               <span className="text-xs text-slate-500 block mb-1">
//                                 PREV HASH
//                               </span>
//                               <span className="font-mono text-xs text-slate-400 block">
//                                 {block.prevHash.substring(0, 16)}...
//                               </span>
//                             </div>
//                           </td>

//                           <td className="p-4 align-top">
//                             <div className="flex items-center space-x-2 mb-2">
//                               <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white font-bold">
//                                 {block.course}
//                               </span>
//                               <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded text-xs border border-indigo-500/20">
//                                 Score: {block.rating}/20
//                               </span>
//                             </div>
//                             <div className="text-xs text-slate-500 font-mono">
//                               Student: {block.studentHash}
//                             </div>
//                           </td>

//                           <td className="p-4 align-top text-slate-400">
//                             {block.timestamp}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </>
//           )}

//           {/* ANALYTICS VIEW */}
//           {currentView === "analytics" && (
//             <>
//               <div className="flex justify-end mb-4">
//                 <button
//                   onClick={() => setCurrentView("addTeacher")}
//                   className="px-5 py-2.5 rounded-xl
//                    bg-indigo-600 hover:bg-indigo-700
//                    text-white font-semibold
//                    shadow-lg transition-all"
//                 >
//                   + Add Teacher
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 gap-6">
//                 {FACULTY_STATS.map((fac, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
//                   >
//                     <div className="flex justify-between items-end mb-4">
//                       <div>
//                         <h4 className="text-lg font-bold text-white">
//                           {fac.name}
//                         </h4>
//                         <p className="text-slate-500 text-sm">
//                           {fac.feedbacks} Verified Reviews
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-2xl font-bold text-white">
//                           {fac.score}
//                         </p>
//                         <p
//                           className={`text-xs font-bold ${
//                             fac.trend.startsWith("+")
//                               ? "text-emerald-400"
//                               : "text-red-400"
//                           }`}
//                         >
//                           {fac.trend} vs last sem
//                         </p>
//                       </div>
//                     </div>
//                     <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
//                       <div
//                         className="bg-indigo-500 h-2 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
//                         style={{ width: `${(fac.score / 5) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {currentView === "addStudent" && (
//             <AddStudent
//               onAdd={addStudent}
//               onCancel={() => setCurrentView("explorer")}
//             />
//           )}

//           {currentView === "addTeacher" && (
//             <AddTeacher
//               onAdd={addTeacher}
//               onCancel={() => setCurrentView("analytics")}
//             />
//           )}
//         </div>
//       </main>

//       {/* FEEDBACK MODAL WRAPPER */}
//       {selectedCourse && (
//         <FeedbackModal
//           selectedCourse={selectedCourse}
//           onClose={() => !isMining && setSelectedCourse(null)}
//           onSubmit={handleFeedbackSubmit}
//           isMining={isMining}
//           miningStep={miningStep}
//         />
//       )}
//     </div>
//   );
// }
////////////////////////////////////////////
///////////////////////////////////////////
///// //////////////////////////////////////////////////////////           1232
///////////////////////////////////////////
///////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import {
//   useAccount,
//   useWriteContract,
//   useWaitForTransactionReceipt,
//   useReadContract,
// } from "wagmi";
// import { ConnectButton } from "@rainbow-me/rainbowkit";

// import {
//   CheckCircle,
//   AlertTriangle,
//   User,
//   ChevronRight,
//   TrendingUp,
//   Database,
//   Activity,
//   Search,
//   Copy,
// } from "lucide-react";

// // Import Components
// import LoginScreen from "./components/LoginScreen";
// import Sidebar from "./components/SideBar";
// import FeedbackModal from "./components/FeedbackModal";
// import AddStudent from "./components/AddStudent";
// import AddTeacher from "./components/AddTeacher";

// // Import Data
// import { COURSES, INITIAL_BLOCKS, FACULTY_STATS } from "./data/mockData";
// import FeedbackSystemABI from "./FeedbackSystem.json";

// // ⚠️ PASTE YOUR DEPLOYED CONTRACT ADDRESS HERE (From Remix)
// const CONTRACT_ADDRESS = "0xD80319D2Cd3d7136BA7006BEf257c4249CD66920";

// export default function FeedbackApp() {
//   // --- WAGMI HOOKS (Real Blockchain Connection) ---
//   const { address, isConnected } = useAccount();

//   // Hook to Write (Send Transactions)
//   const { data: hash, writeContract, isPending } = useWriteContract();

//   // Hook to Wait for Transaction Confirmation (Mining)
//   const { isLoading: isConfirming, isSuccess: isConfirmed } =
//     useWaitForTransactionReceipt({ hash });

//   // Hook to Read (Check if user is Admin - Optional usage example)
//   const { data: isAdmin } = useReadContract({
//     address: CONTRACT_ADDRESS,
//     abi: FeedbackSystemABI,
//     functionName: "isAdmin",
//     args: [address],
//   });

//   const [user, setUser] = useState(null);
//   const [currentView, setCurrentView] = useState("dashboard");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [blocks, setBlocks] = useState(INITIAL_BLOCKS); // In full app, fetch this from contract too
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);

//   // Modal State
//   const [notification, setNotification] = useState(null);

//   // --- EFFECT: Handle Transaction Success ---
//   useEffect(() => {
//     if (isConfirmed) {
//       showNotification(
//         "success",
//         "Transaction Successfully Mined on Blockchain!",
//       );
//       setSelectedCourse(null); // Close modal on success
//       setCurrentView("dashboard"); // Return to dashboard
//     }
//   }, [isConfirmed]);

//   useEffect(() => {
//     if (!isConnected) {
//       setUser(null);
//     }
//   }, [isConnected]);

//   // --- ACTIONS ---

//   const addStudent = (student) => {
//     // REAL BLOCKCHAIN CALL
//     writeContract({
//       address: CONTRACT_ADDRESS,
//       abi: FeedbackSystemABI,
//       functionName: "addStudent",
//       // Matches Contract: (string _name, string _studentId, address _walletAddress)
//       args: [student.name, student.id.toString(), student.wallet],
//     });
//   };

//   const addTeacher = (teacher) => {
//     // REAL BLOCKCHAIN CALL
//     writeContract({
//       address: CONTRACT_ADDRESS,
//       abi: FeedbackSystemABI,
//       functionName: "addTeacher",
//       // Matches Contract: (string _teacherId, string _name)
//       args: [teacher.teacherId, teacher.name],
//     });
//   };

//   const handleLogin = (role, id) => {
//     if (!isConnected) {
//       showNotification("error", "Please connect your wallet first.");
//       return;
//     }
//     setUser({ role, id, walletAddress: address });
//     setCurrentView("dashboard");
//     showNotification("success", "Wallet Connected Successfully");
//   };

//   const showNotification = (type, msg) => {
//     setNotification({ type, msg });
//     setTimeout(() => setNotification(null), 4000);
//   };

//   const handleFeedbackSubmit = async (ratings, comment) => {
//     if (
//       !ratings.teaching ||
//       !ratings.comms ||
//       !ratings.fairness ||
//       !ratings.engage
//     ) {
//       showNotification("error", "Please complete all rating fields.");
//       return;
//     }

//     // Prepare ratings array for Smart Contract (uint8[4])
//     const ratingsArray = [
//       ratings.teaching,
//       ratings.comms,
//       ratings.fairness,
//       ratings.engage,
//     ];

//     // REAL BLOCKCHAIN CALL
//     writeContract({
//       address: CONTRACT_ADDRESS,
//       abi: FeedbackSystemABI,
//       functionName: "submitFeedback",
//       // Matches Contract: (string _facultyId, uint8[4] _ratings, string _comments)
//       args: [selectedCourse.id, ratingsArray, comment],
//     });
//   };

//   if (!user) return <LoginScreen onLogin={handleLogin} />;

//   return (
//     <div className="flex h-screen bg-[#0f172a] text-slate-100 font-sans overflow-hidden">
//       <Sidebar
//         user={user}
//         currentView={currentView}
//         setCurrentView={setCurrentView}
//         onLogout={() => setUser(null)}
//       />

//       {/* MAIN CONTENT AREA */}
//       <main className="flex-1 overflow-y-auto relative bg-[#0f172a] scroll-smooth">
//         {/* Header with RainbowKit Profile */}
//         <header className="sticky top-0 z-20 bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 px-8 py-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-xl font-bold text-white tracking-tight">
//               {currentView === "dashboard"
//                 ? "Overview"
//                 : currentView === "explorer"
//                   ? "Student List"
//                   : currentView === "analytics"
//                     ? "Faculty List"
//                     : "Add Data"}
//             </h1>
//             <p className="text-xs text-slate-500 font-mono mt-0.5">
//               Connected: {address}
//             </p>
//           </div>

//           <div className="flex items-center space-x-4">
//             <ConnectButton
//               showBalance={false}
//               accountStatus="avatar"
//               chainStatus="icon"
//             />
//           </div>
//         </header>

//         {/* Content Padding */}
//         <div className="p-8 max-w-7xl mx-auto">
//           {/* Notification Toast */}
//           {notification && (
//             <div
//               className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center space-x-4 text-white transform transition-all animate-in slide-in-from-bottom duration-500 border ${
//                 notification.type === "success"
//                   ? "bg-emerald-900/90 border-emerald-500"
//                   : "bg-red-900/90 border-red-500"
//               }`}
//             >
//               <div
//                 className={`p-2 rounded-full ${
//                   notification.type === "success"
//                     ? "bg-emerald-500"
//                     : "bg-red-500"
//                 }`}
//               >
//                 {notification.type === "success" ? (
//                   <CheckCircle className="w-5 h-5 text-white" />
//                 ) : (
//                   <AlertTriangle className="w-5 h-5 text-white" />
//                 )}
//               </div>
//               <div>
//                 <p className="font-bold text-sm">
//                   {notification.type === "success" ? "Success" : "System Error"}
//                 </p>
//                 <p className="text-xs opacity-90">{notification.msg}</p>
//               </div>
//             </div>
//           )}

//           {/* DASHBOARD VIEW (STUDENT) */}
//           {user.role === "student" && currentView === "dashboard" && (
//             <>
//               <div className="mb-10 p-8 rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-900 relative overflow-hidden shadow-2xl">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-16 -mt-16"></div>
//                 <h2 className="text-3xl font-extrabold text-white mb-2 relative z-10">
//                   Hello, Student.
//                 </h2>
//                 <p className="text-indigo-200 max-w-xl relative z-10">
//                   Your feedback drives the future of education. All submissions
//                   are encrypted and stored permanently on the blockchain.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {COURSES.map((course) => (
//                   <div
//                     key={course.id}
//                     className={`group relative bg-slate-800 rounded-2xl p-6 border transition-all duration-300 ${
//                       course.active
//                         ? "border-slate-700 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
//                         : "border-slate-800 opacity-60"
//                     }`}
//                   >
//                     <div className="flex justify-between items-start mb-6">
//                       <div
//                         className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
//                           course.active
//                             ? "bg-indigo-500/20 text-indigo-400"
//                             : "bg-slate-700 text-slate-500"
//                         }`}
//                       >
//                         {course.dept}
//                       </div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-bold border ${
//                           course.active
//                             ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
//                             : "bg-slate-700 text-slate-400 border-slate-600"
//                         }`}
//                       >
//                         {course.active ? "Accepting Feedback" : "Closed"}
//                       </span>
//                     </div>

//                     <h3 className="font-bold text-xl text-white mb-2 group-hover:text-indigo-400 transition-colors">
//                       {course.name}
//                     </h3>
//                     <p className="text-slate-400 text-sm mb-6 flex items-center">
//                       <User className="w-4 h-4 mr-2" />
//                       {course.faculty}
//                     </p>

//                     <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
//                       <span className="text-xs text-slate-500 font-mono">
//                         {course.id}
//                       </span>
//                       <button
//                         onClick={() =>
//                           course.active
//                             ? setSelectedCourse(course)
//                             : showNotification(
//                                 "error",
//                                 "Feedback period closed.",
//                               )
//                         }
//                         className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 transition-all ${
//                           course.active
//                             ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
//                             : "bg-slate-700 text-slate-400 cursor-not-allowed"
//                         }`}
//                       >
//                         <span>Review</span>
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* DASHBOARD VIEW (ADMIN) */}
//           {user.role === "admin" && currentView === "dashboard" && (
//             <div className="space-y-8">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
//                   <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
//                     Total Students
//                   </p>
//                   <p className="text-4xl font-extrabold text-white">
//                     {blocks.length}
//                   </p>
//                   <div className="mt-4 flex items-center text-emerald-400 text-sm font-bold">
//                     <TrendingUp className="w-4 h-4 mr-1" /> +12% this week
//                   </div>
//                 </div>
//                 <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
//                   <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
//                     Total Teachers
//                   </p>
//                   <p className="text-4xl font-extrabold text-white">3</p>
//                 </div>
//                 <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
//                   <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
//                     Total Submiited Feedbacks
//                   </p>
//                   <p className="text-4xl font-extrabold text-emerald-400">
//                     99.9%
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
//                 <div className="p-6 border-b border-slate-700 flex justify-between items-center">
//                   <h3 className="font-bold text-lg text-white">
//                     Recent Feedbacks
//                   </h3>
//                   <button className="text-indigo-400 text-sm font-bold hover:text-indigo-300">
//                     View All
//                   </button>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left">
//                     <thead className="bg-slate-900/50">
//                       <tr className="text-slate-400 text-xs uppercase tracking-wider">
//                         <th className="py-4 px-6 font-medium">Student Name</th>
//                         <th className="py-4 px-6 font-medium">Index no.</th>
//                         <th className="py-4 px-6 font-medium">Time</th>
//                         <th className="py-4 px-6 font-medium">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-700">
//                       {blocks.slice(0, 5).map((block) => (
//                         <tr
//                           key={block.id}
//                           className="hover:bg-slate-700/30 transition-colors"
//                         >
//                           <td className="py-4 px-6 font-mono text-indigo-400 text-xs">
//                             #{block.Name}
//                           </td>
//                           <td className="py-4 px-6 text-white font-mono">
//                             #{block.id}
//                           </td>
//                           <td className="py-4 px-6 text-slate-400 text-sm">
//                             {block.timestamp}
//                           </td>
//                           <td className="py-4 px-6">
//                             <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs font-bold">
//                               Confirmed
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* LEDGER EXPLORER */}
//           {currentView === "explorer" && (
//             <>
//               {/* Add Student Button */}
//               <div className="flex justify-end mb-4">
//                 <button
//                   onClick={() => setCurrentView("addStudent")}
//                   className="px-5 py-2.5 rounded-xl
//                     bg-indigo-600 hover:bg-indigo-700
//                     text-white font-semibold
//                     shadow-lg transition-all"
//                 >
//                   + Add Student
//                 </button>
//               </div>

//               {/* Student List */}
//               <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
//                 <div className="p-6 bg-slate-900 border-b border-slate-700">
//                   <h3 className="text-lg font-bold text-white flex items-center">
//                     <Database className="w-5 h-5 mr-2 text-indigo-500" />
//                     Student List
//                   </h3>
//                 </div>

//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left border-collapse">
//                     <thead className="bg-slate-900/80 text-xs uppercase text-slate-400">
//                       <tr>
//                         <th className="p-4 border-b border-slate-700">
//                           Student ID
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Student Name
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Details
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Feedback Data
//                         </th>
//                         <th className="p-4 border-b border-slate-700">
//                           Timestamp
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-slate-700 text-sm">
//                       {blocks.map((block) => (
//                         <tr
//                           key={block.id}
//                           className="hover:bg-slate-700/30 transition-colors"
//                         >
//                           <td className="p-4 align-top">
//                             <span className="font-mono text-indigo-400 font-bold text-lg">
//                               #{block.id}
//                             </span>
//                           </td>

//                           <td className="p-4 align-top">
//                             <span className="font-mono text-indigo-400 font-bold text-lg">
//                               {block.Name}
//                             </span>
//                           </td>

//                           <td className="p-4 align-top space-y-2">
//                             <div>
//                               <span className="text-xs text-slate-500 block mb-1">
//                                 BLOCK HASH
//                               </span>
//                               <span className="font-mono text-xs text-slate-300 bg-slate-900 px-2 py-1 rounded border border-slate-700 block w-max">
//                                 {block.hash.substring(0, 24)}...
//                               </span>
//                             </div>

//                             <div>
//                               <span className="text-xs text-slate-500 block mb-1">
//                                 PREV HASH
//                               </span>
//                               <span className="font-mono text-xs text-slate-400 block">
//                                 {block.prevHash.substring(0, 16)}...
//                               </span>
//                             </div>
//                           </td>

//                           <td className="p-4 align-top">
//                             <div className="flex items-center space-x-2 mb-2">
//                               <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white font-bold">
//                                 {block.course}
//                               </span>
//                               <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded text-xs border border-indigo-500/20">
//                                 Score: {block.rating}/20
//                               </span>
//                             </div>
//                             <div className="text-xs text-slate-500 font-mono">
//                               Student: {block.studentHash}
//                             </div>
//                           </td>

//                           <td className="p-4 align-top text-slate-400">
//                             {block.timestamp}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </>
//           )}

//           {/* ANALYTICS VIEW */}
//           {currentView === "analytics" && (
//             <>
//               <div className="flex justify-end mb-4">
//                 <button
//                   onClick={() => setCurrentView("addTeacher")}
//                   className="px-5 py-2.5 rounded-xl
//                     bg-indigo-600 hover:bg-indigo-700
//                     text-white font-semibold
//                     shadow-lg transition-all"
//                 >
//                   + Add Teacher
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 gap-6">
//                 {FACULTY_STATS.map((fac, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
//                   >
//                     <div className="flex justify-between items-end mb-4">
//                       <div>
//                         <h4 className="text-lg font-bold text-white">
//                           {fac.name}
//                         </h4>
//                         <p className="text-slate-500 text-sm">
//                           {fac.feedbacks} Verified Reviews
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-2xl font-bold text-white">
//                           {fac.score}
//                         </p>
//                         <p
//                           className={`text-xs font-bold ${
//                             fac.trend.startsWith("+")
//                               ? "text-emerald-400"
//                               : "text-red-400"
//                           }`}
//                         >
//                           {fac.trend} vs last sem
//                         </p>
//                       </div>
//                     </div>
//                     <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
//                       <div
//                         className="bg-indigo-500 h-2 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
//                         style={{ width: `${(fac.score / 5) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {currentView === "addStudent" && (
//             <AddStudent
//               onAdd={addStudent}
//               onCancel={() => setCurrentView("explorer")}
//             />
//           )}

//           {currentView === "addTeacher" && (
//             <AddTeacher
//               onAdd={addTeacher}
//               onCancel={() => setCurrentView("analytics")}
//             />
//           )}
//         </div>
//       </main>

//       {/* FEEDBACK MODAL WRAPPER */}
//       {selectedCourse && (
//         <FeedbackModal
//           selectedCourse={selectedCourse}
//           onClose={() => !isPending && !isConfirming && setSelectedCourse(null)}
//           onSubmit={handleFeedbackSubmit}
//           isMining={isPending || isConfirming}
//           miningStep={isConfirming ? 2 : isPending ? 1 : 0} // 1 = Wallet, 2 = Mining
//         />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useReadContracts,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  CheckCircle,
  AlertTriangle,
  User,
  ChevronRight,
  TrendingUp,
  Database,
  Activity,
  Search,
  Copy,
} from "lucide-react";

// Import Components
import LoginScreen from "./components/LoginScreen";
import Sidebar from "./components/SideBar";
import FeedbackModal from "./components/FeedbackModal";
import AddStudent from "./components/AddStudent";
import AddTeacher from "./components/AddTeacher";

// Import Data & ABI
// ⚠️ ONLY IMPORT COURSES. No fake stats/blocks.
import { COURSES } from "./data/mockData";
import FeedbackSystemABI from "./FeedbackSystem.json";

// ⚠️ PASTE YOUR DEPLOYED CONTRACT ADDRESS HERE
const CONTRACT_ADDRESS = "0x2C86fAB9B9DE6EE51E36099775BdF444376E0978";

export default function FeedbackApp() {
  const { address, isConnected } = useAccount();
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // --- READ FROM BLOCKCHAIN ---

  // 1. Fetch Feedback History
  const { data: rawFeedbacks, refetch: refetchFeedbacks } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: FeedbackSystemABI,
    functionName: "getAllFeedbacks",
  });

  // 2. CHECK ACTIVE COURSES
  // We check each course in mockData against the blockchain registry
  const { data: courseStatuses, refetch: refetchCourses } = useReadContracts({
    contracts: COURSES.map((course) => ({
      address: CONTRACT_ADDRESS,
      abi: FeedbackSystemABI,
      functionName: "teachers", // Mapping: teachers(id)
      args: [course.id],
    })),
  });

  // 3. Check Admin (Optional)
  const { data: isAdmin } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: FeedbackSystemABI,
    functionName: "isAdmin",
    args: [address],
  });

  // Check if connected wallet is student
  const { data: studentStatus } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: FeedbackSystemABI,
    functionName: "isStudent",
    args: [address],
    query: { enabled: !!address },
  });

  // Get actual admin address from contract
  const { data: contractAdmin } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: FeedbackSystemABI,
    functionName: "admin",
  });

  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [notification, setNotification] = useState(null);

  // --- REAL DATA STATE ---
  const [blocks, setBlocks] = useState([]); // Blockchain Feedbacks
  const [activeCourses, setActiveCourses] = useState([]); // Only Registered Teachers
  const [students, setStudents] = useState([]); // Local state for demo
  const [teachers, setTeachers] = useState([]); // Local state for demo

  // --- CALCULATE DYNAMIC STATS ---
  // Since we removed FACULTY_STATS, we generate stats from real data
  const dynamicStats = activeCourses.map((course) => {
    const courseFeedbacks = blocks.filter((b) => b.course === course.id);
    const count = courseFeedbacks.length;
    let score = 0;
    if (count > 0) {
      const total = courseFeedbacks.reduce(
        (acc, curr) => acc + Number(curr.rating),
        0,
      );
      score = total / count / 4; // Normalize to 5.0 scale
    }
    return {
      ...course,
      feedbacks: count,
      score: score.toFixed(1),
      trend: count > 0 ? "Active" : "No Data",
    };
  });

  // --- EFFECTS ---

  // 1. Filter Courses based on Blockchain Status
  useEffect(() => {
    if (courseStatuses) {
      const liveCourses = COURSES.filter((course, index) => {
        const item = courseStatuses[index];
        // Result is [teacherId, name, isRegistered]
        // We check if isRegistered (index 2) is true
        return item.result && item.result[2] === true;
      });
      setActiveCourses(liveCourses);
    }
  }, [courseStatuses]);

  // 2. Format Feedbacks
  useEffect(() => {
    if (rawFeedbacks) {
      const formatted = rawFeedbacks.map((item) => ({
        id: item.id.toString(),
        Name: "Anonymous",
        hash: "Verified On-Chain",
        course: item.facultyId,
        rating: item.finalScore.toString(),
        timestamp: new Date(Number(item.timestamp) * 1000).toLocaleString(),
      }));
      setBlocks([...formatted].reverse());
    }
  }, [rawFeedbacks]);

  // 3. Transaction Success
  useEffect(() => {
    if (isConfirmed) {
      showNotification("success", "Transaction Successfully Mined!");
      setSelectedCourse(null);
      refetchFeedbacks();
      refetchCourses();
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (!isConnected) setUser(null);
  }, [isConnected]);

  // --- ACTIONS ---

  const addStudent = (studentData) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: FeedbackSystemABI,
      functionName: "addStudent",
      args: [studentData.name, "S-" + studentData.id, studentData.wallet],
    });
    setStudents([...students, studentData]);
    setCurrentView("explorer");
  };

  const addTeacher = (teacherData) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: FeedbackSystemABI,
      functionName: "addTeacher",
      args: [teacherData.teacherId, teacherData.name],
    });
    setTeachers([...teachers, teacherData]);
    setCurrentView("dashboard"); // Redirect to dashboard to see update
  };

  const handleFeedbackSubmit = async (ratings, comment) => {
    if (!ratings.teaching) return showNotification("error", "Rate all fields");
    const ratingsArray = [
      ratings.teaching,
      ratings.comms,
      ratings.fairness,
      ratings.engage,
    ];
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: FeedbackSystemABI,
      functionName: "submitFeedback",
      args: [selectedCourse.id, ratingsArray, comment],
    });
  };

  // const handleLogin = (role, id) => {
  //   if (!isConnected) return showNotification("error", "Connect Wallet first");
  //   setUser({ role, id, walletAddress: address });
  //   setCurrentView("dashboard");
  // };

  const handleLogin = async (role, id) => {
    if (!isConnected) return showNotification("error", "Connect Wallet first");

    // --- ADMIN LOGIN ---
    if (role === "admin") {
      if (address?.toLowerCase() !== contractAdmin?.toLowerCase()) {
        return showNotification(
          "error",
          "This wallet is not authorized as Admin",
        );
      }
    }

    // --- STUDENT LOGIN ---
    if (role === "student") {
      if (!studentStatus) {
        return showNotification(
          "error",
          "This wallet is not registered as Student",
        );
      }
    }

    // If verification passed
    setUser({ role, id, walletAddress: address });
    setCurrentView("dashboard");
  };

  const showNotification = (type, msg) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4000);
  };

  if (!user) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-100 font-sans overflow-hidden">
      <Sidebar
        user={user}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLogout={() => setUser(null)}
      />

      <main className="flex-1 overflow-y-auto relative bg-[#0f172a] scroll-smooth">
        <header className="sticky top-0 z-20 bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {currentView === "dashboard" ? "Overview" : currentView}
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Connected: {address?.substring(0, 6)}...
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <ConnectButton
              showBalance={false}
              accountStatus="avatar"
              chainStatus="icon"
            />
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {notification && (
            <div
              className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center space-x-4 text-white border ${notification.type === "success" ? "bg-emerald-900/90 border-emerald-500" : "bg-red-900/90 border-red-500"}`}
            >
              <div>
                <p className="font-bold text-sm">
                  {notification.type === "success" ? "Success" : "Error"}
                </p>
                <p className="text-xs opacity-90">{notification.msg}</p>
              </div>
            </div>
          )}

          {currentView === "dashboard" && (
            <>
              {user.role === "student" && (
                <>
                  <div className="mb-10 p-8 rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-900 shadow-2xl">
                    <h2 className="text-3xl font-extrabold text-white mb-2">
                      Hello, Student.
                    </h2>
                    <p className="text-indigo-200">
                      Your feedback drives the future of education.
                    </p>
                  </div>

                  {activeCourses.length === 0 ? (
                    <div className="text-center py-20 bg-slate-800 rounded-3xl border border-slate-700">
                      <h3 className="text-xl font-bold text-slate-400">
                        No Active Courses
                      </h3>
                      <p className="text-slate-500 mt-2">
                        Courses will appear here once the Admin activates them
                        on the Blockchain.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {activeCourses.map((course) => (
                        <div
                          key={course.id}
                          className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-indigo-500 transition-all"
                        >
                          <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold bg-indigo-500/20 text-indigo-400">
                              {course.dept}
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                              Active
                            </span>
                          </div>
                          <h3 className="font-bold text-xl text-white mb-2">
                            {course.name}
                          </h3>
                          <p className="text-slate-400 text-sm mb-4">
                            {course.faculty}
                          </p>
                          <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-mono">
                              {course.id}
                            </span>
                            <button
                              onClick={() => setSelectedCourse(course)}
                              className="px-4 py-2 rounded-lg text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
                            >
                              Give Feedback
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {user.role === "admin" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                      <p className="text-slate-400 text-sm font-medium uppercase mb-1">
                        Total Feedbacks
                      </p>
                      <p className="text-4xl font-extrabold text-white">
                        {blocks.length}
                      </p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                      <p className="text-slate-400 text-sm font-medium uppercase mb-1">
                        Active Teachers
                      </p>
                      <p className="text-4xl font-extrabold text-white">
                        {activeCourses.length}
                      </p>
                    </div>
                  </div>

                  {/* Ledger Table */}
                  <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-700">
                      <h3 className="font-bold text-lg text-white">
                        Blockchain Ledger
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-900/50">
                          <tr className="text-slate-400 text-xs uppercase">
                            <th className="py-4 px-6">ID</th>
                            <th className="py-4 px-6">Course</th>
                            <th className="py-4 px-6">Score</th>
                            <th className="py-4 px-6">Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                          {blocks.length === 0 ? (
                            <tr>
                              <td
                                colSpan="4"
                                className="p-6 text-center text-slate-500"
                              >
                                No data found on blockchain yet.
                              </td>
                            </tr>
                          ) : (
                            blocks.map((block) => (
                              <tr
                                key={block.id}
                                className="hover:bg-slate-700/30"
                              >
                                <td className="py-4 px-6 font-mono text-indigo-400 text-xs">
                                  #{block.id}
                                </td>
                                <td className="py-4 px-6 text-white">
                                  {block.course}
                                </td>
                                <td className="py-4 px-6 text-white font-bold">
                                  {block.rating}/20
                                </td>
                                <td className="py-4 px-6 text-slate-400 text-sm">
                                  {block.timestamp}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {currentView === "explorer" && (
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Student Registry
              </h3>
              {user.role === "admin" && (
                <button
                  onClick={() => setCurrentView("addStudent")}
                  className="mb-4 px-4 py-2 bg-indigo-600 rounded text-white text-sm font-bold"
                >
                  + Add Student
                </button>
              )}
              {students.map((s, i) => (
                <div
                  key={i}
                  className="p-2 border-b border-slate-700 text-slate-300"
                >
                  {s.name} ({s.wallet})
                </div>
              ))}
            </div>
          )}

          {currentView === "analytics" && (
            <div className="space-y-6">
              {user.role === "admin" && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentView("addTeacher")}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg"
                  >
                    + Add Teacher
                  </button>
                </div>
              )}

              <h3 className="text-lg font-bold text-white">
                Faculty Analytics (Live)
              </h3>

              {dynamicStats.length === 0 ? (
                <p className="text-slate-500">No active teachers to analyze.</p>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {dynamicStats.map((fac) => (
                    <div
                      key={fac.id}
                      className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
                    >
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-white">
                            {fac.name}
                          </h4>
                          <p className="text-slate-500 text-sm">
                            {fac.feedbacks} Verified Reviews
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">
                            {fac.score} / 5.0
                          </p>
                          <p className="text-xs font-bold text-emerald-400">
                            {fac.trend}
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-indigo-500 h-2 rounded-full"
                          style={{ width: `${(fac.score / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentView === "addStudent" && (
            <AddStudent
              onAdd={addStudent}
              onCancel={() => setCurrentView("explorer")}
            />
          )}
          {currentView === "addTeacher" && (
            <AddTeacher
              onAdd={addTeacher}
              onCancel={() => setCurrentView("analytics")}
            />
          )}
        </div>
      </main>

      {selectedCourse && (
        <FeedbackModal
          selectedCourse={selectedCourse}
          onClose={() => !isPending && !isConfirming && setSelectedCourse(null)}
          onSubmit={handleFeedbackSubmit}
          isMining={isPending || isConfirming}
          miningStep={isConfirming ? 2 : isPending ? 1 : 0}
        />
      )}
    </div>
  );
}
