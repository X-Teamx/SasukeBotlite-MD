/*
`كود التحويل لصوت :`
بواسطة :
- زيزو
- شعوذة
*/


import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw '*اعمل ريبلي للفيديو او الريك اللي عاوز تحولو لصوت ي حوب 🧞‍♂️*'
    
    let media = await q.download()
    let isAudio = /audio/.test(mime) // تحقق من نوع الصوت
    let isVideo = /video/.test(mime) // تحقق من نوع الفيديو
    let link = await (isAudio ? uploadFile : uploadImage)(media)
    
    // إرسال الرد بصيغة MP3 كرسالة نصية
    conn.sendMessage(m.chat, {audio: {url: link}, mimetype: 'audio/mpeg', fileName: `shawaza_zizo_2024.mp3`}, {quoted: m});
}

handler.help = ['sendmp3 <reply video>', 'sendmp3 <reply audio>']
handler.tags = ['convert'] 
handler.command = /^(لصوتي)$/i

export default handler
