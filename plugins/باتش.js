import cp, {exec as _exec} from 'child_process';

import {promisify} from 'util';

import fs from 'fs';

import axios from 'axios';

import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const exec = promisify(_exec).bind(cp);

const handler = async (m, {conn, isROwner, usedPrefix, command, text}) => {

  

  const ar = Object.keys(plugins);

  const ar1 = ar.map((v) => v.replace('.js', ''));

  

  const images = ['https://qu.ax/zxhiQ.jpg', 'https://qu.ax/zxhiQ.jpg','https://qu.ax/zxhiQ.jpg', 'https://qu.ax/zxhiQ.jpg'];

  

  const randomImage = images[Math.floor(Math.random() * images.length)];

  

  const mediaMessage = await prepareWAMessageMedia({ image: { url: randomImage } }, { upload: conn.waUploadToServer });

  

  if (!text) {

    const rows = ar1.map((v, index) => (

    

    { 

    header: `الملــف رقـم : [${index + 1}]`, 

    title: `${v}`, 

    description: '', 

    id: `${usedPrefix + command} ${v}` 

    }

    

    ));

    const caption = `╭─────────────────────────╮\n\n│ قائــمة ملفــات plugins.\n\n│ عدد الملفات المتاحة: ${ar1.length}\n\n╰─────────────────────────╯`;

    

    const msg = generateWAMessageFromContent(m.chat, {

    viewOnceMessage: {

      message: {

        interactiveMessage: {

          body: { text: caption },

          footer: { text: wm },

          header: {

            hasMediaAttachment: true,

            imageMessage: mediaMessage.imageMessage

          },

          nativeFlowMessage: {

            buttons: [

              {

                name: 'single_select',

                buttonParamsJson: JSON.stringify({

                  title: '「 قــائــمــة الملفــات 」',

                  sections: [

                    {

                  title: '「 قائــمة ملفــات plugins 」',

                  highlight_label: wm,

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

    

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    return;

  }

  let o;

  try {

    o = await exec(`cat plugins/${text}.js`);

  } catch (e) {

    o = e;

  }

  const {stdout, stderr} = o;

  if (stdout.trim()) {

    const aa = await conn.sendMessage(m.chat, {text: stdout}, {quoted: m});

    await conn.sendMessage(m.chat, {

      document: fs.readFileSync(`./plugins/${text}.js`), 

      mimetype: 'application/javascript', 

      fileName: `${text}.js`

    }, {quoted: aa});

  }

  

  if (stderr.trim()) {

    const aa2 = await conn.sendMessage(m.chat, {text: stderr}, {quoted: m});

    await conn.sendMessage(m.chat, {

      document: fs.readFileSync(`./plugins/${text}.js`), 

      mimetype: 'application/javascript', 

      fileName: `${text}.js`

    }, {quoted: aa2});

  }

};

handler.help = ['getplugin'].map((v) => v + ' *<nombre>*');

handler.tags = ['owner'];

handler.command = /^(باتش|gp)$/i;

handler.rowner = true;

export default handler;