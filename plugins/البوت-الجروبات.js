import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';


const createGroupRows = async (conn, jid, isBotAdmin, totalParticipants, usedPrefix, command) => {
    const groupName = await conn.getName(jid);
    return {
        header: `مجموعة: ${groupName}`,
        title: `البوت ادمن: ${isBotAdmin ? 'نعم' : 'لا'} - المشاركين: ${totalParticipants}`,
        description: '🚪 خروج',
        id: `${usedPrefix + command} ${jid}`
    };
};


const createInteractiveMessage = async (m, conn, totalGroups, rows, imgUrl) => {
    const mediaMessage = await prepareWAMessageMedia({ image: { url: imgUrl } }, { upload: conn.waUploadToServer });

    const caption = `قائمة المجموعات المشارك بها البوت\nالعدد: ${totalGroups}`;
    
    return generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: { text: caption },
                    footer: { text: '𝑍𝛩𝐹𝐴𝑁-𝐵𝛩𝑇' },
                    header: {
                        hasMediaAttachment: true,
                        imageMessage: mediaMessage.imageMessage
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'single_select',
                                buttonParamsJson: JSON.stringify({
                                    title: 'قــائــمــة المجـموعـات',
                                    sections: [
                                        {
                                            title: '「 المجـموعـات 」',
                                            highlight_label: '🚪',
                                            rows: rows
                                        }
                                    ]
                                })
                            }
                        ]
                    }
                }
            }
        }
    }, { userJid: conn.user.jid, quoted: m });
};

const handler = async (m, { text, conn, usedPrefix, command }) => {
    if (!text) {
        const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
        const totalGroups = groups.length;

        
        const rows = await Promise.all(groups.map(async ([jid]) => {
            const groupMetadata = (conn.chats[jid]?.metadata || await conn.groupMetadata(jid).catch(() => ({}))) || {};
            const participants = groupMetadata.participants || [];
            const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
            const isBotAdmin = bot?.admin || false;
            const totalParticipants = participants.length;

            return createGroupRows(conn, jid, isBotAdmin, totalParticipants, usedPrefix, command);
        }));

        
        const msg = await createInteractiveMessage(m, conn, totalGroups, rows, img1); 
        
        
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
        
    } else {
    
  const id = text;
  
  const cap2 = `تسجيل خروجي بواسطه مطورى 😪👊🏻\nمطورى : @${m.sender.split('@')[0]} 💡❤️\nشكرا لاستضافتكم لي 🍿❤️\n\n> اطلب من مطورى اضافتي مجددا اذا كنت تريد 😉❤️.`;
  
  await conn.sendMessage(id, {text: cap2, mentions: [m.sender]}, { quoted: m });
  
  await conn.groupLeave(id);
  
  await conn.sendMessage(m.chat, {text: '*تمت العملية بنجاح ي مطورى 😉❤️*', mentions: [m.sender]}, { quoted: m });

    }
};

handler.help = ['groups', 'grouplist'];
handler.tags = ['info'];
handler.command = ['المجموعات', 'مجموعات'];
handler.rowner = true;

export default handler;