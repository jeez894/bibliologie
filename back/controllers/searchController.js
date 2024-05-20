const axios = require('axios');
require('dotenv').config();

const searchBooks = async (req, res) => {
  const query = req.query.q;
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;

  try {
    const response = await axios.get(`https://comicvine.gamespot.com/api/search/?api_key=${process.env.COMICVINE_API_KEY}&format=json&query=${query}&resources=volume&page=${page}&limit=${limit}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    res.status(500).send({ message: "Erreur lors de l'interrogation de Comic Vine" });
  }
};


const getVolumeDetails = async (req, res) => {
  const volumeId = req.params.id;
  try {
    const response = await axios.get(`https://comicvine.gamespot.com/api/issues/?api_key=${process.env.COMICVINE_API_KEY}&format=json&filter=volume:${volumeId}&field_list=name,issue_number,image,id,description,volume`);
    res.json(response.data.results);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du volume :', error);
    res.status(500).send('Erreur lors de la récupération des détails du volume');
  }
};

const getNews = async (req, res) => {
  const startYear = req.query.startYear || '2023';
  const publisherId = req.query.publisherId || '2923';
  const limit = req.query.limit || 10;

  try {
    const url = `https://comicvine.gamespot.com/api/volumes/?api_key=${process.env.COMICVINE_API_KEY}&format=json&filter=start_year:${startYear}&sort=date_added:desc&field_list=name,date_added,image,publisher,description,id`;
    const response = await axios.get(url);
    const validData = response.data.results.filter(item => item.publisher && String(item.publisher.id) === publisherId);
    const finalData = validData.slice(0, limit);
    res.json(finalData);

  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).send({ message: "Erreur lors de la récupération des données" });
  }
};

module.exports = {
  searchBooks,
  getVolumeDetails,
  getNews,
};
