const { getLatestTransaction } = require('./fetchTransaction');
const announceTransaction = require('./tts'); // Đảm bảo import đúng

let lastTransactionId = null; // Biến lưu ID giao dịch đã xử lý

async function main() {
  console.log('📡 Đang kiểm tra giao dịch mới...');

  const transaction = await getLatestTransaction();
  console.log('Dữ liệu giao dịch:', transaction);

  if (transaction) {
    // Kiểm tra nếu giao dịch đã được xử lý trước đó
    if (transaction.id === lastTransactionId) {
      console.log('🔄 Giao dịch đã được xử lý, bỏ qua...');
      return;
    }

    // Cập nhật giao dịch đã xử lý
    lastTransactionId = transaction.id;

    console.log(`💰 Giao dịch mới: Nhận được ${transaction.amount_in} đồng.`);
    announceTransaction(transaction.amount_in);
  } else {
    console.log('🚫 Không có giao dịch mới.');
  }
}

// Chạy script mỗi 10 giây để kiểm tra giao dịch mới
setInterval(main, 10000);
