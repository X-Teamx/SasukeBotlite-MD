import fetch from 'node-fetch';
import { webp2png } from '../lib/webp2mp4.js';
import fs from 'fs';

const handler = async (m, { conn }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
  const tradutor = _translate.plugins.herramientas_ocr;

  const q = m.quoted ? m.quoted : m;
  const mime = (q || q.msg).mimetype || q.mediaType || '';

  if (/image/.test(mime)) {
    try {
      const url = await webp2png(await q.download());
      const res = await fetch(API('https://api.ocr.space', '/parse/imageurl', {
        apikey: '8e65f273cd88957',
        url,
        language: 'ara' // تحديد اللغة العربية
      }));
      if (res.status !== 200) throw res.statusText;
      const json = await res.json();
      const extractedText = json?.ParsedResults?.[0]?.ParsedText || 'لم يتم العثور على نص';
      
      // تنسيق النص المستخرج
      const formattedText = `النص المستخرج:\n\n${extractedText}`;
      m.reply(formattedText);
    } catch (error) {
      m.reply(`خطأ: ${error.message}`);
    }
  } else if (!/image/.test(mime) && (q.isMedia || q.msg)) {
    m.reply('يرجى إرسال صورة لتحليل النص');
  } else {
    m.reply('لم يتم تحديد أي صورة');
  }
};

handler.command = /^(لنص)$/i;
export default handler;
