// import { useEffect, useState } from "react";

// function Generator() {

//   const [sections, setSections] = useState([
//     { title: "Personal Info", content: "" },
//     { title: "Skills", content: "" },
//     { title: "Projects", content: "" },
//     { title: "Experience", content: "" },
//     { title: "Education", content: "" }
//   ]);

//   const [chatInput, setChatInput] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [link, setLink] = useState("");
//   const [isFirstSaveDone, setIsFirstSaveDone] = useState(false);

//   // ==============================
//   // HANDLE INPUT CHANGE
//   // ==============================
//   const handleTitleChange = (index, value) => {
//     setSections(prev => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], title: value };
//       return updated;
//     });
//   };

//   const handleContentChange = (index, value) => {
//     setSections(prev => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], content: value };
//       return updated;
//     });
//   };

//   const addSection = () => {
//     setSections(prev => [...prev, { title: "New Section", content: "" }]);
//   };

//   // ==============================
//   // SAVE FUNCTION (COMMON)
//   // ==============================
//   const savePortfolio = async (auto = false) => {

//     try {

//       const userId = localStorage.getItem("userId");

//       if (!userId) return;

//       const filteredSections = sections.filter(
//         (sec) =>
//           sec.title.trim() !== "" ||
//           sec.content.trim() !== ""
//       );

//       const response = await fetch("http://localhost:5000/api/save-portfolio", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           user_id: userId,
//           sections: filteredSections
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {

//         const generatedLink = `http://localhost:3000/portfolio/${data.portfolioId}`;
//         setLink(generatedLink);

//         if (!auto) {
//           alert("Portfolio saved ✅");
//         }

//       }

//     } catch (error) {
//       console.log("Auto-save error:", error);
//     }

//   };

//   // ==============================
//   // MANUAL GENERATE BUTTON
//   // ==============================
//   const generatePortfolio = async () => {
//     await savePortfolio(false);
//     setIsFirstSaveDone(true);
//   };

//   // ==============================
//   // 🔥 AUTO SAVE (KEY FEATURE)
//   // ==============================
//   useEffect(() => {

//     if (!isFirstSaveDone) return;

//     const delay = setTimeout(() => {
//       savePortfolio(true); // auto save silently
//     }, 1000); // wait 1 sec after typing

//     return () => clearTimeout(delay);

//   }, [sections]);

//   // ==============================
//   // AI CHAT
//   // ==============================
//   const sendMessage = async () => {

//     if (!chatInput.trim()) return;

//     const newMessages = [
//       ...chatMessages,
//       { sender: "user", text: chatInput }
//     ];

//     setChatMessages(newMessages);
//     setChatInput("");

//     try {

//       const res = await fetch("http://localhost:5000/api/ai", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ prompt: chatInput })
//       });

//       const data = await res.json();

//       setChatMessages([
//         ...newMessages,
//         { sender: "ai", text: data.reply }
//       ]);

//     } catch (error) {

//       setChatMessages([
//         ...newMessages,
//         { sender: "ai", text: "AI service error" }
//       ]);

//     }

//   };

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-purple-400 via-fuchsia-500 to-indigo-500 flex p-6">

//       {/* LEFT SIDE */}
//       <div className="w-2/3 bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mr-6 overflow-y-auto">

//         <h1 className="text-3xl font-bold text-white mb-6">
//           AI Smart Portfolio Builder
//         </h1>

//         {sections.map((section, index) => (

//           <div key={index} className="mb-6">

//             <input
//               className="w-full p-2 rounded-lg mb-2"
//               value={section.title}
//               onChange={(e) =>
//                 handleTitleChange(index, e.target.value)
//               }
//             />

//             <textarea
//               placeholder="Enter details..."
//               className="w-full p-3 rounded-lg h-24"
//               value={section.content}
//               onChange={(e) =>
//                 handleContentChange(index, e.target.value)
//               }
//             />

//           </div>

//         ))}

//         <button
//           onClick={addSection}
//           className="bg-white text-purple-600 font-bold px-4 py-2 rounded-xl mt-2"
//         >
//           + Add Section
//         </button>

//         <button
//           onClick={generatePortfolio}
//           className="bg-pink-400 text-white font-bold px-6 py-3 rounded-xl mt-6 hover:bg-pink-500"
//         >
//           Generate Live shareable Portfolio link🔗
//         </button>

//         {/* LINK UI */}
//         {link && (

//           <div className="mt-6 text-center text-white">

//             <p className="font-semibold mb-2">Your Portfolio Link:</p>

//             <a
//               href={link}
//               target="_blank"
//               rel="noreferrer"
//               className="underline text-yellow-200 break-all"
//             >
//               {link}
//             </a>

//             <div className="flex justify-center gap-4 mt-4">

//               <button
//                 onClick={() => window.open(link, "_blank")}
//                 className="bg-green-400 text-black px-4 py-2 rounded-lg font-semibold"
//               >
//                 Open 🔗
//               </button>

//               <button
//                 onClick={() => {
//                   navigator.clipboard.writeText(link);
//                   alert("Link copied!");
//                 }}
//                 className="bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold"
//               >
//                 Copy 📋
//               </button>

//             </div>

//           </div>

//         )}

//       </div>

//       {/* RIGHT SIDE AI */}
//       <div className="w-1/3 bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl flex flex-col">

//         <h2 className="text-xl font-bold text-white mb-4">
//           AI Assistant
//         </h2>

//         <div className="flex-1 overflow-y-auto mb-4 bg-white/10 p-3 rounded-lg">

//           {chatMessages.map((msg, index) => (

//             <div
//               key={index}
//               className={`mb-2 ${
//                 msg.sender === "user"
//                   ? "text-right text-white"
//                   : "text-left text-yellow-200"
//               }`}
//             >
//               {msg.text}
//             </div>

//           ))}

//         </div>

//         <div className="flex">

//           <input
//             value={chatInput}
//             onChange={(e) => setChatInput(e.target.value)}
//             placeholder="Ask AI for suggestions..."
//             className="flex-1 p-2 rounded-l-lg"
//           />

//           <button
//             onClick={sendMessage}
//             className="bg-purple-700 text-white px-4 rounded-r-lg"
//           >
//             Send
//           </button>

//         </div>

//       </div>

//     </div>

//   );

// }

// export default Generator;
// import { useEffect, useState } from "react";

// function Generator() {

//   const [sections, setSections] = useState([
//     { title: "Personal Info", content: "" },
//     { title: "Skills", content: "" },
//     { title: "Projects", content: "" },
//     { title: "Experience", content: "" },
//     { title: "Education", content: "" }
//   ]);

//   const [chatInput, setChatInput] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [link, setLink] = useState("");
//   const [isFirstSaveDone, setIsFirstSaveDone] = useState(false);

//   // ==============================
//   // HANDLE INPUT CHANGE
//   // ==============================
//   const handleTitleChange = (index, value) => {
//     setSections(prev => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], title: value };
//       return updated;
//     });
//   };

//   const handleContentChange = (index, value) => {
//     setSections(prev => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], content: value };
//       return updated;
//     });
//   };

//   const addSection = () => {
//     setSections(prev => [...prev, { title: "New Section", content: "" }]);
//   };

//   // ==============================
//   // SAVE FUNCTION
//   // ==============================
//   const savePortfolio = async (auto = false) => {

//     try {

//       // 🔥 FIX: ensure number
//       const userId = Number(localStorage.getItem("userId"));

//       if (!userId) {
//         console.log("User not logged in");
//         return;
//       }

//       const filteredSections = sections.filter(
//         (sec) =>
//           sec.title.trim() !== "" ||
//           sec.content.trim() !== ""
//       );

//       console.log("SAVING USER:", userId);
//       console.log("SECTIONS:", filteredSections);

//       const response = await fetch("http://localhost:5000/api/save-portfolio", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           user_id: userId,
//           sections: filteredSections
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {

//         const generatedLink = `http://localhost:3000/portfolio/${data.portfolioId}`;
//         setLink(generatedLink);

//         if (!auto) {
//           alert("Portfolio saved ✅");
//         }

//       } else {
//         console.log("Save failed:", data);
//       }

//     } catch (error) {
//       console.log("Save error:", error);
//     }

//   };

//   // ==============================
//   // MANUAL GENERATE
//   // ==============================
//   const generatePortfolio = async () => {
//     await savePortfolio(false);
//     setIsFirstSaveDone(true);
//   };

//   // ==============================
//   // AUTO SAVE
//   // ==============================
//   useEffect(() => {

//     if (!isFirstSaveDone) return;

//     const delay = setTimeout(() => {
//       savePortfolio(true);
//     }, 1000);

//     return () => clearTimeout(delay);

//   }, [sections]);

//   // ==============================
//   // AI CHAT
//   // ==============================
//   const sendMessage = async () => {

//     if (!chatInput.trim()) return;

//     const newMessages = [
//       ...chatMessages,
//       { sender: "user", text: chatInput }
//     ];

//     setChatMessages(newMessages);
//     setChatInput("");

//     try {

//       const res = await fetch("http://localhost:5000/api/ai", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ prompt: chatInput })
//       });

//       const data = await res.json();

//       setChatMessages([
//         ...newMessages,
//         { sender: "ai", text: data.reply }
//       ]);

//     } catch (error) {

//       setChatMessages([
//         ...newMessages,
//         { sender: "ai", text: "AI service error" }
//       ]);

//     }

//   };

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-purple-400 via-fuchsia-500 to-indigo-500 flex p-6">

//       {/* LEFT */}
//       <div className="w-2/3 bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mr-6 overflow-y-auto">

//         <h1 className="text-3xl font-bold text-white mb-6">
//           AI Smart Portfolio Builder
//         </h1>

//         {sections.map((section, index) => (

//           <div key={index} className="mb-6">

//             <input
//               className="w-full p-2 rounded-lg mb-2"
//               value={section.title}
//               onChange={(e) =>
//                 handleTitleChange(index, e.target.value)
//               }
//             />

//             <textarea
//               placeholder="Enter details..."
//               className="w-full p-3 rounded-lg h-24"
//               value={section.content}
//               onChange={(e) =>
//                 handleContentChange(index, e.target.value)
//               }
//             />

//           </div>

//         ))}

//         <button
//           onClick={addSection}
//           className="bg-white text-purple-600 font-bold px-4 py-2 rounded-xl mt-2"
//         >
//           + Add Section
//         </button>

//         <button
//           onClick={generatePortfolio}
//           className="bg-pink-400 text-white font-bold px-6 py-3 rounded-xl mt-6 hover:bg-pink-500"
//         >
//           Generate Live Shareable Portfolio Link 🔗
//         </button>

//         {link && (

//           <div className="mt-6 text-center text-white">

//             <p className="font-semibold mb-2">Your Portfolio Link:</p>

//             <a
//               href={link}
//               target="_blank"
//               rel="noreferrer"
//               className="underline text-yellow-200 break-all"
//             >
//               {link}
//             </a>

//             <div className="flex justify-center gap-4 mt-4">

//               <button
//                 onClick={() => window.open(link, "_blank")}
//                 className="bg-green-400 text-black px-4 py-2 rounded-lg font-semibold"
//               >
//                 Open 🔗
//               </button>

//               <button
//                 onClick={() => {
//                   navigator.clipboard.writeText(link);
//                   alert("Link copied!");
//                 }}
//                 className="bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold"
//               >
//                 Copy 📋
//               </button>

//             </div>

//           </div>

//         )}

//       </div>

//       {/* RIGHT AI */}
//       <div className="w-1/3 bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl flex flex-col">

//         <h2 className="text-xl font-bold text-white mb-4">
//           AI Assistant
//         </h2>

//         <div className="flex-1 overflow-y-auto mb-4 bg-white/10 p-3 rounded-lg">

//           {chatMessages.map((msg, index) => (

//             <div
//               key={index}
//               className={`mb-2 ${
//                 msg.sender === "user"
//                   ? "text-right text-white"
//                   : "text-left text-yellow-200"
//               }`}
//             >
//               {msg.text}
//             </div>

//           ))}

//         </div>

//         <div className="flex">

//           <input
//             value={chatInput}
//             onChange={(e) => setChatInput(e.target.value)}
//             placeholder="Ask AI for suggestions..."
//             className="flex-1 p-2 rounded-l-lg"
//           />

//           <button
//             onClick={sendMessage}
//             className="bg-purple-700 text-white px-4 rounded-r-lg"
//           >
//             Send
//           </button>

//         </div>

//       </div>

//     </div>

//   );

// }

// export default Generator;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Generator() {

  const { id } = useParams(); // 🔥 portfolioId from URL

  const [sections, setSections] = useState([
    { title: "Personal Info", content: "" },
    { title: "Skills", content: "" },
    { title: "Projects", content: "" },
    { title: "Experience", content: "" },
    { title: "Education", content: "" }
  ]);

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [link, setLink] = useState("");
  const [isFirstSaveDone, setIsFirstSaveDone] = useState(false);

  // ==============================
  // 🔥 LOAD EXISTING PORTFOLIO (UPDATE MODE)
  // ==============================
  useEffect(() => {

    if (!id) return;

    fetch(`http://localhost:5000/api/portfolio/${id}`)
      .then(res => res.json())
      .then(data => {

        if (data.sections && data.sections.length > 0) {
          setSections(data.sections);
        }

        // 🔥 set existing link
        setLink(`http://localhost:3000/portfolio/${id}`);

        // 🔥 allow auto-save immediately in update mode
        setIsFirstSaveDone(true);

      })
      .catch(err => console.log(err));

  }, [id]);

  // ==============================
  // HANDLE INPUT
  // ==============================
  const handleTitleChange = (index, value) => {
    setSections(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], title: value };
      return updated;
    });
  };

  const handleContentChange = (index, value) => {
    setSections(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], content: value };
      return updated;
    });
  };

  const addSection = () => {
    setSections(prev => [...prev, { title: "New Section", content: "" }]);
  };

  // ==============================
  // SAVE / UPDATE
  // ==============================
  const savePortfolio = async (auto = false) => {

    try {

      const userId = Number(localStorage.getItem("userId"));

      if (!userId) {
        console.log("User not logged in");
        return;
      }

      const filteredSections = sections.filter(
        (sec) =>
          sec.title.trim() !== "" ||
          sec.content.trim() !== ""
      );

      const response = await fetch("http://localhost:5000/api/save-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId,
          sections: filteredSections,
          portfolioId: id   // 🔥 KEY CHANGE
        })
      });

      const data = await response.json();

      if (response.ok) {

        const finalId = id || data.portfolioId;

        const generatedLink = `http://localhost:3000/portfolio/${finalId}`;
        setLink(generatedLink);

        if (!auto) {
          alert(id ? "Portfolio updated ✅" : "Portfolio created ✅");
        }

      } else {
        console.log("Save failed:", data);
      }

    } catch (error) {
      console.log("Save error:", error);
    }

  };

  // ==============================
  // MANUAL GENERATE
  // ==============================
  const generatePortfolio = async () => {
    await savePortfolio(false);
    setIsFirstSaveDone(true);
  };

  // ==============================
  // AUTO SAVE
  // ==============================
  useEffect(() => {

    if (!isFirstSaveDone) return;

    const delay = setTimeout(() => {
      savePortfolio(true);
    }, 1000);

    return () => clearTimeout(delay);

  }, [sections]);

  // ==============================
  // AI CHAT
  // ==============================
  const sendMessage = async () => {

    if (!chatInput.trim()) return;

    const newMessages = [
      ...chatMessages,
      { sender: "user", text: chatInput }
    ];

    setChatMessages(newMessages);
    setChatInput("");

    try {

      const res = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: chatInput })
      });

      const data = await res.json();

      setChatMessages([
        ...newMessages,
        { sender: "ai", text: data.reply }
      ]);

    } catch (error) {

      setChatMessages([
        ...newMessages,
        { sender: "ai", text: "AI service error" }
      ]);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-fuchsia-500 to-indigo-500 flex p-6">

      {/* LEFT */}
      <div className="w-2/3 bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mr-6 overflow-y-auto">

        <h1 className="text-3xl font-bold text-white mb-6">
          {id ? "Update Your Portfolio ✏️" : "AI Smart Portfolio Builder"}
        </h1>

        {sections.map((section, index) => (

          <div key={index} className="mb-6">

            <input
              className="w-full p-2 rounded-lg mb-2"
              value={section.title}
              onChange={(e) =>
                handleTitleChange(index, e.target.value)
              }
            />

            <textarea
              placeholder="Enter details..."
              className="w-full p-3 rounded-lg h-24"
              value={section.content}
              onChange={(e) =>
                handleContentChange(index, e.target.value)
              }
            />

          </div>

        ))}

        <button
          onClick={addSection}
          className="bg-white text-purple-600 font-bold px-4 py-2 rounded-xl mt-2"
        >
          + Add Section
        </button>

        <button
          onClick={generatePortfolio}
          className="bg-pink-400 text-white font-bold px-6 py-3 rounded-xl mt-6 hover:bg-pink-500"
        >
          {id ? "Update Portfolio 🔄" : "Generate Live Shareable Portfolio Link 🔗"}
        </button>

        {link && (

          <div className="mt-6 text-center text-white">

            <p className="font-semibold mb-2">Your Portfolio Link:</p>

            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="underline text-yellow-200 break-all"
            >
              {link}
            </a>

            <div className="flex justify-center gap-4 mt-4">

              <button
                onClick={() => window.open(link, "_blank")}
                className="bg-green-400 text-black px-4 py-2 rounded-lg font-semibold"
              >
                Open 🔗
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(link);
                  alert("Link copied!");
                }}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Copy 📋
              </button>

            </div>

          </div>

        )}

      </div>

      {/* RIGHT AI */}
      <div className="w-1/3 bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl flex flex-col">

        <h2 className="text-xl font-bold text-white mb-4">
          AI Assistant
        </h2>

        <div className="flex-1 overflow-y-auto mb-4 bg-white/10 p-3 rounded-lg">

          {chatMessages.map((msg, index) => (

            <div
              key={index}
              className={`mb-2 ${
                msg.sender === "user"
                  ? "text-right text-white"
                  : "text-left text-yellow-200"
              }`}
            >
              {msg.text}
            </div>

          ))}

        </div>

        <div className="flex">

          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask AI for suggestions..."
            className="flex-1 p-2 rounded-l-lg"
          />

          <button
            onClick={sendMessage}
            className="bg-purple-700 text-white px-4 rounded-r-lg"
          >
            Send
          </button>

        </div>

      </div>

    </div>

  );

}

export default Generator;