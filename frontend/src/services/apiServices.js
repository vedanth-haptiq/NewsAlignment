const API_BASE_URL = "http://localhost:5000/api/news";

export const fetchNews = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}?category=${category}`);
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
