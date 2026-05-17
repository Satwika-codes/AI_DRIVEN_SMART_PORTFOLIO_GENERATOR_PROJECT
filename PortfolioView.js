// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function PortfolioView() {

//   const { id } = useParams();
//   const [portfolio, setPortfolio] = useState(null);

//   useEffect(() => {

//     fetch(`http://localhost:5000/api/portfolio/${id}`)
//       .then((res) => res.json())
//       .then((data) => {

//         console.log("API DATA:", data); // 🔍 DEBUG

//         // 🔥 SAFE PARSE (VERY IMPORTANT)
//         if (data.sections) {
//           try {
//             data.sections = JSON.parse(data.sections);
//           } catch (err) {
//             console.log("JSON parse error:", err);
//             data.sections = [];
//           }
//         } else {
//           data.sections = [];
//         }

//         setPortfolio(data);
//       })
//       .catch((err) => {
//         console.log("Error fetching portfolio:", err);
//       });

//   }, [id]);

//   if (!portfolio) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl">
//         Loading portfolio...
//       </div>
//     );
//   }

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-purple-400 via-fuchsia-500 to-indigo-500 flex items-center justify-center p-10">

//       <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-3xl w-full">

//         {/* 🔥 EMPTY STATE */}
//         {portfolio.sections.length === 0 && (
//           <p className="text-center text-gray-500">
//             No portfolio data found ⚠️
//           </p>
//         )}

//         {/* 🔥 LOOP THROUGH SECTIONS */}
//         {portfolio.sections.map((section, index) => (

//           <div key={index} className="mb-6">

//             <h2 className="text-xl font-bold text-purple-700 mb-2">
//               {section.title || "Untitled Section"}
//             </h2>

//             <p className="text-gray-700 whitespace-pre-line">
//               {section.content || "No content"}
//             </p>

//           </div>

//         ))}

//       </div>

//     </div>

//   );

// }

// export default PortfolioView;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PortfolioView() {

  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:5000/api/portfolio/${id}`)
      .then((res) => res.json())
      .then((data) => {

        console.log("API DATA:", data); // 🔍 DEBUG

        // ✅ NO PARSE NEEDED (already parsed from backend)
        const safeData = {
          ...data,
          sections: Array.isArray(data.sections) ? data.sections : []
        };

        setPortfolio(safeData);

      })
      .catch((err) => {
        console.log("Error fetching portfolio:", err);
      });

  }, [id]);

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading portfolio...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-fuchsia-500 to-indigo-500 flex items-center justify-center p-10">

      <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-3xl w-full">

        {/* EMPTY STATE */}
        {portfolio.sections.length === 0 && (
          <p className="text-center text-gray-500">
            No portfolio data found ⚠️
          </p>
        )}

        {/* SECTIONS */}
        {portfolio.sections.map((section, index) => (

          <div key={index} className="mb-6">

            <h2 className="text-xl font-bold text-purple-700 mb-2">
              {section.title || "Untitled Section"}
            </h2>

            <p className="text-gray-700 whitespace-pre-line">
              {section.content || "No content"}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default PortfolioView;