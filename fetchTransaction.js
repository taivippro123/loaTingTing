const axios = require('axios');
const { SEPAY_API_URL, SEPAY_API_TOKEN } = require('./config');

async function getLatestTransaction() {
  try {
    const response = await axios.get(SEPAY_API_URL, {
      headers: {
        Authorization: `Bearer ${SEPAY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      params: {
        limit: 1, // Chỉ lấy giao dịch mới nhất
      },
    });

    const transactions = response.data.transactions;
    if (transactions.length > 0) {
      return transactions[0]; // Lấy giao dịch mới nhất
    } else {
      console.log('Không có giao dịch mới.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi lấy giao dịch từ SePay:', error.message);
    return null;
  }
}

module.exports = { getLatestTransaction };
