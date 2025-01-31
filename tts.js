const axios = require("axios");
const fs = require("fs"); // Để ghi file âm thanh tạm thời
const player = require("play-sound")(); // Thư viện để phát âm thanh
const { GOOGLE_API_KEY } = require("./config"); // API Key Google TTS

const GOOGLE_TTS_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`;

async function announceTransaction(amount) {
  try {
    // Định dạng số tiền đúng chuẩn (thêm dấu chấm phân tách)
    const amountFormatted = new Intl.NumberFormat("vi-VN").format(amount);

    // Văn bản cần đọc
    const text = `Đã nhận. ${amountFormatted}. đồng!`;

    console.log("📜 Nội dung gửi lên Google TTS API:", text);

    // Gửi yêu cầu đến API Google TTS
    const response = await axios.post(
      GOOGLE_TTS_URL,
      {
        input: {
          text: text,
        },
        voice: {
          languageCode: "vi-VN", // Tiếng Việt
          name: "vi-VN-Standard-A", // Giọng nói tiêu chuẩn
          ssmlGender: "FEMALE", // Giọng nữ
        },
        audioConfig: {
          audioEncoding: "MP3", // Định dạng âm thanh
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Nhận dữ liệu âm thanh từ API (Base64-encoded)
    const audioContent = response.data.audioContent;

    if (!audioContent) {
      console.error("⚠️ Lỗi: Không nhận được dữ liệu âm thanh từ API.");
      return;
    }

    // Ghi âm thanh ra file tạm
    const audioFilePath = "./output.mp3";
    fs.writeFileSync(audioFilePath, audioContent, "base64");

    console.log("🔊 Đang phát âm thanh từ file:", audioFilePath);

    // Phát âm thanh từ file MP3
    player.play(audioFilePath, function (err) {
      if (err) {
        console.error("⚠️ Lỗi phát âm thanh:", err);
      } else {
        console.log("✅ Phát âm thanh thành công!");
      }
    });
  } catch (error) {
    console.error(
      "❌ Lỗi gọi API Google TTS:",
      error.response ? error.response.data : error.message
    );
  }
}

module.exports = announceTransaction;
