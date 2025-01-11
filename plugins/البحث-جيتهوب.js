import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `[❗] يرجي إدخال إسم المشروع للبحث.\n> مثال: ${usedPrefix + command} TheMystic-Bot-MD`;

  const res = await fetch(global.API('https://api.github.com', '/search/repositories', {
    q: text,
  }));

  const json = await res.json();
  
  if (res.status !== 200) throw json;
  
  const imagen = await conn.getFile(json.items[0].owner.avatar_url).data;
  let str = `╭──────────────────────╮\n│ قائمة نتائج البحث عن : ${text}\n╰──────────────────────╯\n\n╭──────────────────────╮\n`;

  for (let index = 0; index < json.items.length; index++) {
    const repo = json.items[index];
    str += `
│ النتيجة : [${1 + index}]
│ الاسم : ${repo.full_name}
│ الحساب : ${repo.owner.login}
│ رابط الحساب : ${repo.owner.html_url}
│ رابط المشروع : ${repo.html_url}
│ رابط التحميل : ${repo.clone_url}
│ آخر تحديث : ${formatDate(repo.updated_at)}
│ عدد المشاهدات : ${repo.watchers}
│ عدد المشاركات : ${repo.forks}
│ التقييم : ${repo.stargazers_count}
│ الوصف : ${repo.description ? `${repo.description}` : ''}
`.trim();
    if (index < json.items.length - 1) {
      str += '\n│ ╾─────────────────────╼\n';
    }
  }
  
  str += `\n╰──────────────────────╯`;

  conn.sendMessage(m.chat, { text: str.trim(), contextInfo: { forwardingScore: 9999999, isForwarded: true, mentionedJid: [m.sender], "externalAdReply": {
    "showAdAttribution": true, 
    "containsAutoReply": true, 
    "renderLargerThumbnail": true, 
    "title": global.titulowm2, 
    "containsAutoReply": true, 
    "mediaType": 1, 
    "thumbnail": imagen, 
    "mediaUrl": `https://www.atom.bio/shawaza-2000/`, 
    "sourceUrl": `https://www.atom.bio/shawaza-2000/`
  }}}, { quoted: m });
};

handler.help = ['githubs'];
handler.tags = ['buscadores'];
handler.command = /^(جيتهوب|github)$/i;
export default handler;

function formatDate(n, locale = 'ar') {
  const d = new Date(n);
  return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
}
