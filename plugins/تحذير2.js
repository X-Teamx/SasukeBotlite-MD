let handler = async (m, { conn, text, command, usedPrefix }) => {
let pp = './src/warn.jpg'
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
let user = global.db.data.users[who]
let bot = global.db.data.settings[conn.user.jid] || {}
let warntext = `*[❗] اعمل منشن للشخص ال انت تشتي تلغي من عليه انذار*\n\n*—◉ مثال:*\n*${usedPrefix + command} @${global.suittag}*`
if (!who) throw m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext)}) 
user.warn -= 1
await conn.sendButton(m.chat,`${user.warn == 1 ? `*@${who.split`@`[0]}*` : `♻️ *@${who.split`@`[0]}*`} تم الغاء الانذار ✨💜 `, `*الانذارات:*\n⚠️ *قبل: ${user.warn + 1}/3*\n⚠️ *الآن: ${user.warn}/3*\n\n${wm}`, pp, [['📋 قائمة التحذيرات 📋', '#listwarn']], m, { mentions: [who] })}
handler.command = /^(unwarn|الغاء-الانذار|الغاء الانذار|حذف-الانذار|حذف-التحذير|الغاء-التحذير)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
