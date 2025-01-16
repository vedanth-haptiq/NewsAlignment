// // TwitterService.js
// const getTwitterShares = async (articleTitle) => {
//     try {
//       const response = await fetch(
//         `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(articleTitle)}&max_results=100`,
//         {
//           headers: {
//             Authorization: `AAAAAAAAAAAAAAAAAAAAADHRxgEAAAAAxor5gv9DDfIPceKaHWgkgw%2FDEqI%3DCy7flu37Gn4om9KsPBu9jHiKvYZaOS6zhkDJg3lmZ6eXdzLZjD   `, // Replace with your Twitter API bearer token
//           },
//         }
//       );
  
//       if (!response.ok) {
//         throw new Error(`Twitter API error: ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       return data.meta.result_count || 0; // Return the number of tweets mentioning the article
//     } catch (error) {
//       console.error("Error fetching Twitter shares:", error);
//       return 0; // Return 0 if there's an error
//     }
//   };
  
//   export default getTwitterShares;



// TwitterService.js
const getTwitterShares = async (articleTitle) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/twitter-shares?query=${encodeURIComponent(articleTitle)}`
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch Twitter shares: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.meta.result_count || 0; // Return the number of tweets mentioning the article
    } catch (error) {
      console.error("Error fetching Twitter shares:", error);
      return 0; // Return 0 if there's an error
    }
  };
  
  export default getTwitterShares;