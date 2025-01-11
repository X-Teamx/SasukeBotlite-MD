import {webp2png} from '../lib/webp2mp4.js';


const handler = async (m, {conn, usedPrefix, command}) => {
  
  const notStickerMessage = `*فين الاستيكر اللي عاوز تحولو ي حوب 🧞‍♂️*`;
  if (!m.quoted) throw notStickerMessage;
  const q = m.quoted || m;
  const mime = q.mediaType || '';
  if (!/sticker/.test(mime)) throw `*دا مش استيكر ي حوب 🧞‍♂️*`;
  const media = await q.download();
  const out = await webp2png(media).catch((_) => null) || Buffer.alloc(0);
  await conn.sendFile(m.chat, out, 'error.png', null, m);
};
handler.help = ['toimg (reply)'];
handler.tags = ['sticker'];
handler.command = ['toimg', 'لصورة'];
export default handler;
