import fetch from "node-fetch";

const handler = async (message, { conn, command, text, isAdmin }) => {

  if (command === "ميوت") {

    if (!isAdmin) {

      throw "> *◞👮🏻‍♂️◜ يـمـكـن لـلـمـشـرف فـقـط اسـتـخـدام الـامـر*";

    }

    const botOwnerJid = global.owner[0][0] + "@s.whatsapp.net";

    if (message.mentionedJid[0] === botOwnerJid) {

      throw "> *◞❎◜ لـا يـمـكـن وضـع مـيـوت لـمـنـشـئ الـروبـوت*";

    }

    let targetJid = message.mentionedJid[0] || message.quoted?.sender || text;

    if (targetJid === conn.user.jid) {

      throw "> *◞❎◜ لا يـمـكـنـك تـكـلـم الـروبـوت*";

    }

    const groupMetadata = await conn.groupMetadata(message.chat);

    const groupOwnerJid = groupMetadata.owner || message.chat.split`-`[0] + "@s.whatsapp.net";

    if (message.mentionedJid[0] === groupOwnerJid) {

      throw "> *◞❕◜ لـا يـمـكـنـك عـمـل مـيـوت لـي مـنـشـئ الـمـجـمـوعـة*";

    }

    let userDb = global.db.data.users[targetJid];

    let responseMessage = {

      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },

      message: {

        locationMessage: {

          name: "𝗨𝘀𝘂𝗮𝗿𝗶𝗼 𝗺𝘂𝘁𝗮𝗱𝗼",

          jpegThumbnail: await (await fetch("https://telegra.ph/file/f8324d9798fa2ed2317bc.png")).buffer(),

          vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"

        }

      },

      participant: "0@s.whatsapp.net"

    };

    let promptMessage = "> *◞❕◜ مـنـشـن الـشـخـص الـذي تـريـد ان تـفـعـل لـه الـمـيـوت*";

    if (!message.mentionedJid[0] && !message.quoted) {

      return conn.reply(message.chat, promptMessage, message);

    }

    if (userDb.muto === true) {

      throw "> *◞☑️◜ لـقـد تـم تـفـعـيـل الـمـيـوت لـي هـذا الـمـسـتـخـدم بـالـفـعـل*";

    }

    conn.reply(message.chat, "> *☑️¦ سـيـتـم حـذف رسـائـلـك ¦☑️*", responseMessage, null, { mentions: [targetJid] });

    global.db.data.users[targetJid].muto = true;

  } else if (command === "الغاء-ميوت") {

    if (!isAdmin) {

      throw message.reply("> *◞👮🏻‍♂️◜ يـمـكـن الـمـشرفـيـن فـقـط تـشـغـيـل هـذا الـأمـر*");

    }

    let targetJid = message.mentionedJid[0] || message.quoted?.sender || text;

    let userDb = global.db.data.users[targetJid];

    let responseMessage = {

      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },

      message: {

        locationMessage: {

          name: "◜ᴰˣ↵◞ 𝚃𝙴𝙰𝙼🔰",

          jpegThumbnail: await (await fetch("https://telegra.ph/file/aea704d0b242b8c41bf15.png")).buffer(),

          vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"

        }

      },

      participant: "0@s.whatsapp.net"

    };

    let promptMessage = "🚩 **";

    if (targetJid === message.sender) {

      throw "🚩 *Sólo otro administrador puede desmutarte*";

    }

    if (!message.mentionedJid[0] && !message.quoted) {

      return conn.reply(message.chat, promptMessage, message);

    }

    if (userDb.muto === false) {

      throw "🚩 *Este usuario no ha sido mutado*";

    }

    global.db.data.users[targetJid].muto = false;

    conn.reply(message.chat, "> *☑️¦ لـقـد تـم تـحـريـرك بـنـجـاح ¦☑️*", responseMessage, null, { mentions: [targetJid] });

  }

};

handler.command = ["ميوت", "الغاء-ميوت"];

handler.group = true;

handler.admin = true;

handler.botAdmin = true;

export default handler