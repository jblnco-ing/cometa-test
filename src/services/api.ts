import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers:{hash: process.env.NEXT_PUBLIC_API_HASH || ''}
});
