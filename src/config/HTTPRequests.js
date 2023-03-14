const APP_ENV = 'development'
const BASE_URL = 'http://localhost:5000'
const PRODUCTION_URL = "https://raha-api.onrender.com";

const URL = APP_ENV === "development" ? BASE_URL : PRODUCTION_URL

export { URL }
