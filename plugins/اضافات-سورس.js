import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return m.reply(`يرجى توفير عنوان URL لجلب الملف.`);
  const url = text.trim();
  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const json = await response.json();
      m.reply(`محتويات JSON:\n${JSON.stringify(json, null, 2)}`);
    } else if (contentType && contentType.includes('text/')) {
      const content = await response.text();
      m.reply(`محتويات النص:\n${content}`);
    } else {
      const buffer = await response.buffer();
      const fileName = url.split('/').pop();
      await conn.sendMessage(m.chat, buffer, 'documentMessage', { filename: fileName });
      m.reply(`تم تنزيل الملف: ${fileName}\nالحجم: ${buffer.length} بايت`);
    }
  } catch (error) {
    m.reply(`خطأ في جلب الملف: ${error.message}`);
  }
};

handler.command = ['سورس','html','كروم'];
handler.help = ['تحميل'];
handler.tags = ['أدوات'];

export default handler;
