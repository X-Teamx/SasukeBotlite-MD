
const handler = async (m, {conn, args, usedPrefix, command}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.gc_config

  const isClose = { // Switch Case Like :v
    'open': 'not_announcement',
    'close': 'announcement',
    'abierto': 'not_announcement',
    'cerrado': 'announcement',
    'فتح': 'not_announcement',
    'غلق': 'announcement',
  }[(args[0] || '')];
  if (isClose === undefined) {
    throw `
${tradutor.texto1[0]}

${tradutor.texto1[1]}
*┠┉↯ ${usedPrefix + command} فتح*
*┠┉↯ ${usedPrefix + command} غلق*
`.trim();
  }
  await conn.groupSettingUpdate(m.chat, isClose);
  {m.reply(`${tradutor.texto1[0]}`);}
};
handler.help = ['group open / close', 'grupo فتح / غلق'];
handler.tags = ['group'];
handler.command = /^(group|جروب)$/i;
handler.admin = true;
handler.botAdmin = true;
export default handler;
