let handler = async (m, { conn, args }) => {
let group = m.chat
let link = 'لينك الجروب: https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
conn.reply(m.chat, link, m, {detectLink: true})
//conn.sendMessage(m.chat, { text: link }, { quoted: m, detectLink: true })
}
handler.command = /^لينك?$/i
handler.group = true
handler.botAdmin = true
export default handler
