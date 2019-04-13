import { create } from 'apisauce';

const api = create({
  baseUrl: 'https://jsonplaceholder.typicode.com',
});
api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default api;
