require('dotenv').config();

module.exports = {
  SEPAY_API_URL: 'https://my.sepay.vn/userapi/transactions/list',
  SEPAY_API_TOKEN: process.env.SEPAY_API_TOKEN, // API Token từ biến môi trường
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY // API Key của Google Cloud từ biến môi trường
};
