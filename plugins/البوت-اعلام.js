const handler = async (m, { conn, text }) => {

const contactInfo = {
    key: {
      participants: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'Halo'
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: '0@s.whatsapp.net'
  };
  
  const pesan = m.quoted && m.quoted.text ? m.quoted.text : text;
  
  if (!pesan) return conn.sendMessage(m.chat, {text: 'ادخل نص الرساله اولا'}, { quoted: contactInfo });
  
  let formattedPesan = pesan.replace(/\n/g, '*\n*│');
  
  const readMore = String.fromCharCode(8206).repeat(850);
  
  const d = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Cairo"}));
  
  const locale = 'ar';
  const week = d.toLocaleDateString(locale, { weekday: 'long' });
  const day = d.toLocaleDateString('en', { day: '2-digit' });
  const month = d.toLocaleDateString(locale, { month: 'long' });
  const year = d.toLocaleDateString('en', { year: 'numeric' });
  
  const time = d.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  const uptime = clockString(process.uptime() * 1000); 
  
  const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
  
  const totalGroups = groups.length;
  
  let counter;
  
  for (let i = 0; i < groups.length; i++) {
  
    const [jid, chat] = groups[i];
    
    const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
    
    const participants = groupMetadata.participants || [];
  
  let name = await conn.getName(jid);
  
  const list = `
*≡      ◈─┄┄┄┄〘 إعلام من المطور 〙┄┄┄┄─◈*
*╭────┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄────╮*
*├───┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄───┤*
*│✑ المجموعة 「 ${name} 」*
*│✑ اسمي 「 ${wm} 」*
*│✑ المطور 「 @${m.sender.split('@')[0]} 」*
*│✑ التاريخ 「 ${week} ${day}/${month}/${year} 」*
*│✑ الوقت 「 ${time} 」*
*│✑ التشغيل 「 ${uptime} 」*
*┤┄┄⋗  لا تنسي اضافه . قبل الأمر  ┄┄─◈*
*├───┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄───┤*
*╰────┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄────╯*
${readMore}

*≡     ◈─┄┄┄┄┄┄┄〘 الإعلام 〙┄┄┄┄┄┄┄─◈*
*╭────┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄────╮*
*├───┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄───┤*
*│${formattedPesan}*
*├───┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄───┤*
*╰────┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄───╯*
`.trim();

      conn.sendMessage(jid, { text: list, mentions: [m.sender] }, { quoted: contactInfo });
      
      counter = i;
      }
      
      let txt = `*تم ارسال الرسالة الي ${counter} مجموعة 🧞*`;
  
  conn.sendMessage(m.chat, { text: txt }, { quoted: contactInfo });
};

handler.help = ['database', 'user'];
handler.tags = ['info'];
handler.command = /^(bc-g|اعلام)$/i;
handler.owner = true;

export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
