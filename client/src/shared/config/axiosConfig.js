import axios from 'axios';
export default axios.create({
  baseURL: 'https://h8irkcei9k.execute-api.ap-south-1.amazonaws.com/dev/',
  timeout: 2000,
  headers: { 'Content-Type': 'application/json' },
});
