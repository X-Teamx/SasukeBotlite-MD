let handler = async (m, { conn, text, command, usedPrefix }) => {
let pp = './src/warn.jpg'
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
let user = global.db.data.users[who]
let bot = global.db.data.settings[conn.user.jid] || {}
let warntext = `*[❗] يرجي وضع منشن للشخص او الرد علي رساله له @منشن*\n\n*—◉ مثال:*\n*${usedPrefix + command} @${global.suittag}*`
if (!who) throw m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext)}) 
user.warn += 1
await conn.sendButton(m.chat,`${user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`} 𝚁حصلت على تحذير في هذه المجموعة!`, `*تحذيرات ${user.warn}/3*\n\n${wm}`, pp, [['📋 قائمة التحذيرات 📋', '#listwarn']], m, { mentions: [who] })
	
if (user.warn >= 3) {
if (!bot.restrict) return m.reply('*[❗] لم يتم تمكين القيود على مالك الروبوت (#تعفيل) استخدم هذا الامر لتمكين التحذيرات*')        
user.warn = 0
await m.reply(`لقد حذرتك عدة مرات!!\n*@${who.split`@`[0]}* حتي اصبحوا *3* تحذيرات سوف يتم طردك بعد 0 ثانية 👽`, null, { mentions: [who]})
//user.banned = true
await conn.groupParticipantsUpdate(m.chat, [who], 'remove') 
} 
return !1
}
handler.command = /^(advertir|انذار|warn|تحذير)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
