const handler = async (m, { conn, usedPrefix, text }) => {
  let number;

  // استخراج الرقم أو المستخدم بناءً على الإدخال
  if (text) {
    number = isNaN(text) && text.includes('@') ? text.split('@')[1] : text;
  } else if (m.quoted) {
    number = m.quoted.sender.split('@')[0];
  } else if (m.mentionedJid && m.mentionedJid.length > 0) {
    number = m.mentionedJid[0].split('@')[0];
  }

  // التحقق من وجود الرقم وصحته
  if (!number) {
    return conn.reply(m.chat, `*[❗]  الـــأمـࢪ بـشـــكـل صــــحــيــح\n\n*┯┷*\n*┠≽ ${usedPrefix} تــــࢪقـــيــــه @منشن*\n*┠≽ ${usedPrefix}رفع مشرف -> الرد على الرسالة*\n*┷┯*`, m);
  }

  if (number.length > 13 || number.length < 11) {
    return conn.reply(m.chat, `*[ ⚠️ ] الرقم الذي تم إدخاله غير صحيح، الرجاء إدخال الرقم الـصـحـيح*`, m);
  }

  const user = `${number}@s.whatsapp.net`;

  // التحقق مما إذا كان الشخص بالفعل مشرف
  const groupMetadata = await conn.groupMetadata(m.chat);
  const participant = groupMetadata.participants.find(participant => participant.id === user);

  if (participant && (participant.admin === 'admin' || participant.admin === 'superadmin')) {
    return conn.reply(m.chat, `*الـــعـــضـو مــــشـــࢪف يـ بــاكـــا🗿*`, m);
  }

  try {
    // ترقية الشخص إلى مشرف
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    await conn.sendMessage(m.chat, {
  text: `*إعـــلـان تــࢪقـــيــه عــضــو*\nاالـــــمــتـࢪقـي @${number}\n*مـــن قـــــام بـالــأمـࢪ*: @${m.sender.split('@')[0]}\n*مــن قـــام بالـتــࢪقـــــيه*   : @${conn.user.jid.split('@')[0]}`,
  mentions: [user, m.sender, conn.user.jid]
}, { quoted: m });

  } catch (e) {
    console.error(e);
  }
};

handler.help = ['*201153573240*', '*@اسم المستخدم*', '*محادثة المستجيب*'].map(v => 'promote ' + v);
handler.tags = ['group'];
handler.command = /^(ترقية|ترقيه|رفع|ارفعو|رول)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;
