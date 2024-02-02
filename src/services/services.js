import axios from 'axios'

const myAPI = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})


const apiUrl = 'https://restapi.nemesisweb.dev/wp-json/wp/v2';




export default {
  // getPhotos() {
  //   return myAPI.get('/photos?_limit=10');
  // },

  // getSinglePhoto( id ) {
  //   return myAPI.get(`/photos/${id}`);
  // },

  async fetchData(endpoint) {
    try {
      const response = await axios({
        method: 'get',
        url: `${apiUrl}/${endpoint}`,
        withCredentials: false,
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos', error);
      return null;
    }
  },
  
  async fetchFeaturedImage(mediaID) {
    try {
      const response = await axios.get(`${apiUrl}/media/${mediaID}`);
      return response.data.media_details?.sizes?.full?.source_url;
    } catch (error) {
      console.error('Error al obtener la imagen destacada', error);
      return null;
    }
  },

  async fetchRaza(razaID) {
    try {
      const response = await axios.get(`${apiUrl}/raza/${razaID}`);
      return response.data.name;
    } catch (error) {
      console.error('Error al obtener la imagen destacada', error);
      return null;
    }
  }
}


