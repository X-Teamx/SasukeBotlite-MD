import { download } from 'aptoide-scraper';

let handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  try {
    if (command === 'تطبيق') {
      if (!text) throw `*هات اسم التطبيق 🐦❤*`;

      await conn.reply(m.chat, global.wait, m);
      let data = await download(text);

      if (data.size.replace(' MB', '') > 200) {
        return await conn.sendMessage(m.chat, { text: '*انا اسف يا حب بس مساحه الملف كبيره 🤝🏻🐦*' }, { quoted: m });
      }

      if (data.size.includes('GB')) {
        return await conn.sendMessage(m.chat, { text: '*أنا اسف يا حب بس مساحه الملف كبيره 🤝🏻🐦*' }, { quoted: m });
      }

      await conn.sendMessage(
        m.chat,
        { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name + '.تطبيق', caption: null },
        { quoted: m }
      );
    }
  } catch {
    throw `*هات اسم التطبيق ❤️🐦*`;
  }
};

handler.command = /^تطبيق$/i;
export default handler;
