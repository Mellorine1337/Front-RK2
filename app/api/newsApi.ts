import axios from 'axios';

const API_KEY = 'dccd569681b64f32b3ba94cd1294e03f';
const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=us';

export const fetchNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}&apiKey=${API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    return [];
  }
};