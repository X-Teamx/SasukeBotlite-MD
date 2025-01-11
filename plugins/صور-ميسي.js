import{ prepareWAMessageMedia } from '@whiskeysockets/baileys';
import pkg from '@whiskeysockets/baileys';
import axios from 'axios';
const { generateWAMessageFromContent, proto } = pkg
const handler = async (m, { conn, usedPrefix, command }) => {
    // جلب بيانات كريستيانو رونالدو من الملف JSON
    const messi = (await axios.get('https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/Messi.json')).data;
    const goat = messi[Math.floor(messi.length * Math.random())];

    // إرسال رد فعل الرموز التعبيرية
    await conn.sendMessage(m.chat, { react: { text: '🐐', key: m.key } });

    // إعداد رسالة الوسائط
    const mediaMessage = await prepareWAMessageMedia({ image: { url: goat } }, { upload: conn.waUploadToServer });

    let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: "*ميسي عمك 🤙🏻♥*"
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: ""
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "*〘 THE GOAT 〙*",
            subtitle: "",
            hasMediaAttachment: true, 
            imageMessage: mediaMessage.imageMessage,  
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
                {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"الـمـ🤾‍♀️ــزيـد\",\"id\":\".ليو\"}"
             }, 
                {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"قــ🪧ــنـاة الـبـوت\",\"id\":\".مطور\"}"
              }
           ],
          }) 
        }) 
       } 
     } 
   },{}) 
    // إرسال الرسالة
    await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
    } 
handler.help = ['ميسي', 'ليو'];
handler.tags = ['صور'];
handler.command = /^(ميسي|ليو|جوت|goat)$/i;

export default handler;