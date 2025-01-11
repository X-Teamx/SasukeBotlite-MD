import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync, readFileSync } from 'fs';
import path from 'path';

const handler = async (m, { conn, usedPrefix }) => {
  

  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, {text: "عذراً، لا يمكنك استخدام هذا الأمر من هذا الجهاز."}, {quoted: m});
  }
  const chatId = m.isGroup ? [m.chat, m.sender] : [m.sender];
  const sessionPath = './GataBotSession/';
  try {
    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;
    for (const file of files) {
      for (const id of chatId) {
        if (file.includes(id.split('@')[0])) {
          await fs.unlink(path.join(sessionPath, file));
          filesDeleted++;
          break;
        }
      }
    }
    if (filesDeleted === 0) {
      await conn.sendMessage(m.chat, {text: "> *◞❕◜ لـم يـتـم الـعـثـور عـلـى أي مـلـفـات لـحـذفـهـا.*"}, {quoted: m});
    } else {
      await conn.sendMessage(m.chat, {text: `𝐘𝐔𝐌𝐈𝐊𝐎-𝐁𝐎𝐓-𝐌𝐃\n\n> *◞☑️◜تم حذف ${filesDeleted} ملف بنجاح.*\n\n╮⭒⭒ ─── ┈ ★ ★ ★ ┈ ── ⭒⭒╭\nان لـم يـعـمـل جـرب\nاسـتـعـمـال امـر بـشـكـل مـتـكـرر\n╯⭒⭒ ─── ┈ ★ ★ ★ ┈ ── ⭒⭒╰`}, {quoted: m});
    }
  } catch (err) {
    console.error("> *◞❎◜ حـدث خـطـأ أثـنـاء مـحـاولـة حـذف الـمـلـفـات:*", err);
    await conn.sendMessage(m.chat, {text: "> *◞❌◜ حـدث خـطـأ أثـنـاء حـذف الـمـلـفـات*"}, {quoted: m});
  }
  await conn.sendMessage(m.chat, {text: `> *◞☑️◜تـمـت الـعـملـيـة بنجاح◞☑️◜*`}, {quoted: m});
};
handler.help = ['تصليح'];
handler.tags = ['مطور'];
handler.command = /^(تصليح|cs)$/i;
handler.rowner = false;
export default handler;