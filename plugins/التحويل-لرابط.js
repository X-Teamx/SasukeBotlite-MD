import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

var handler = async (m) => {

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
let name = await conn.getName(who)
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw '*⚠️ الرد على الصورة*'
// إزالة m.react(done) لأن `done` غير معرف
let media = await q.download()
let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
let link = await (isTele ? uploadImage : uploadFile)(media)
let info = ` *🗂️ الرابط:*\n${link}\n
*⚖️ الحجم:*\n${media.length} bytes\n
*🚀 انتهاء الصلاحيه:*\n ${isTele ? '✅ لا تنتهي صلاحيتها' : '⚠️ غريب'}\n
*🔰 الاختصار:*\n${await shortUrl(link)}`

conn.reply(m.chat, info, m, { contextInfo: { externalAdReply :{ mediaUrl: link, mediaType: 2, title: 'عنوان افتراضي', body: 'نص افتراضي', thumbnail: await(await fetch(link)).buffer(), sourceUrl: link}}})

}
handler.help = ['tourl']
handler.tags = ['transformador']
handler.command = /^(لرابط|تليجراف)$/i

handler.limit = true

export default handler

async function shortUrl(url) {
try {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    if (!res.ok) throw new Error('Failed to shorten URL')
    return await res.text()
} catch (e) {
    console.error(e)
    return url // إرجاع الرابط الأصلي في حالة الفشل
}
}