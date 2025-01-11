import 'node-fetch'; 

let handler = async (message, { conn, text }) => {

    if (!text) {

        return message.reply("> *أخـــــبـــرنـــي الــكـلــمــات الــــــتــي تـــريــد مـنـــي أن أنــطــــقـــــهــا..... 🌿* ");

    }

    conn.sendMessage(message.chat, {

        'audio': {

            'url': `https://zoro-foryou.vercel.app/api/text2speech/male?text=${encodeURIComponent(text)}`

        },

        'mimetype': "audio/mpeg",

        'ptt': true

    }, {

        'quoted': message

    });

};

handler.command = ["انطق"];

export default handler;