import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'

const LimitAud = 725 * 1024 * 1024 //700MB
const LimitVid = 425 * 1024 * 1024 //425MB
let tempStorage = {};

const handler = async (m, {conn, command, args, text, usedPrefix}) => {
    if (!text) return conn.reply(m.chat, `مـثـال: ${usedPrefix + command}  المنشاوي.`, m);
  
    const yt_play = await search(args.join(' '))
    const ytplay2 = await yts(text)
    const texto1 = `
    ╮⋄━─━─═◞⬪يـوتـيـوب⬪◟═─━─━⋄╭ـ
    ★ الاسـم: ${yt_play[0].title}
    ★ الـمـدة: ${yt_play[0].ago}
    ★ الـوصـف: ${secondString(yt_play[0].duration.seconds)}
    ★ عـدد الـمـشـاهـدات: ${MilesNumber(yt_play[0].views)}
    ★ الـصـانـع: ${yt_play[0].author.name}
    ★ الـرابـط: ${yt_play[0].url.replace(/^https?:\/\//, '')}
    ╯⋄━─━─━─═◞⬪※⬪◟═─━─━─━⋄╰ـ
    `.trim()

    tempStorage[m.sender] = { url: yt_play[0].url, title: yt_play[0].title };
  
    await conn.sendMessage(m.chat, { 
        image: { url: yt_play[0].thumbnail }, 
        caption: texto1,
        buttons: [
            {
                buttonId: `.ytmp3 ${yt_play[0].url}`,
                buttonText: { displayText: "Audio" },
                type: 1,
            },
            {
                buttonId: `.ytmp4 ${yt_play[0].url}`,
                buttonText: { displayText: "Video" },
                type: 1,
            },
        ],
        viewOnce: true,
        headerType: 4,
    }, { quoted: m });
}

handler.before = async (m, { conn }) => {
    const text = m.text.trim().toLowerCase();
    if (!['🎶', 'audio', '📽', 'video'].includes(text)) return;
    
    const userVideoData = tempStorage[m.sender];
    if (!userVideoData || !userVideoData.url) return conn.reply(m.chat, '❌ No hay resultado, intenta nuevamente', m);
  
    try {
        if (text === '🎶' || text === 'audio') {
            await conn.reply(m.chat, 'Descargando en audio...', m);
            const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${userVideoData.url}`);
            let { data } = await res.json();
            await conn.sendMessage(m.chat, { audio: { url: data.dl }, mimetype: 'audio/mpeg' }, { quoted: m });
        } else if (text === '📽' || text === 'video') {
            await conn.reply(m.chat, 'Descargando en video...', m);
            const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${userVideoData.url}`);
            let { data } = await res.json();
            await conn.sendMessage(m.chat, { 
                video: { url: data.dl },
                fileName: 'video.mp4',
                mimetype: 'video/mp4',
                caption: `${userVideoData.title}`,
            }, { quoted: m });
        }
    } catch (error) {
        console.error(error);
    } finally {
        delete tempStorage[m.sender];
    }
}

handler.command = /^(يوتيوب|play2)$/i

export default handler

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return search.videos;
}

function MilesNumber(number) {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    const arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp, rep);
    return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
    const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
  
const getBuffer = async (url) => {
    try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        return Buffer.from(buffer);
    } catch (error) {
        console.error("Error al obtener el buffer", error);
        throw new Error("Error al obtener el buffer");
    }
}

async function getFileSize(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentLength = response.headers.get('content-length');
        return contentLength ? parseInt(contentLength, 10) : 0;
    } catch (error) {
        console.error("Error al obtener el tamaño del archivo", error);
        return 0;
    }
}

async function fetchInvidious(url) {
    const apiUrl = `https://invidious.io/api/v1/get_video_info`;
    const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    if (data && data.video) {
        return data.video;
    } else {
        throw new Error("No se pudo obtener información del video desde Invidious");
    }
}

function getBestVideoQuality(videoData) {
    const preferredQualities = ['720p', '360p', 'auto'];
    const availableQualities = Object.keys(videoData.video);
    for (let quality of preferredQualities) {
        if (availableQualities.includes(quality)) {
            return videoData.video[quality].quality;
        }
    }
    return '360p';
}

async function ytMp3(url) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(url).then(async (getUrl) => {
            let result = [];
            for (let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.mimeType == 'audio/webm; codecs="opus"') {
                    let { contentLength } = item;
                    let bytes = await bytesToSize(contentLength);
                    result[i] = { audio: item.url, size: bytes };
                }
            };
            let resultFix = result.filter(x => x.audio != undefined && x.size != undefined);
            let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`);
            let tinyUrl = tiny.data;
            let title = getUrl.videoDetails.title;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            resolve({ title, result: tinyUrl, result2: resultFix, thumb });
        }).catch(reject);
    });
}

async function ytMp4(url) {
    return new Promise(async (resolve, reject) => {
        ytdl.getInfo(url).then(async (getUrl) => {
            let result = [];
            for (let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
                    let { qualityLabel, contentLength } = item;
                    let bytes = await bytesToSize(contentLength);
                    result[i] = { video: item.url, quality: qualityLabel, size: bytes };
                }
            };
            let resultFix = result.filter(x => x.video != undefined && x.size != undefined && x.quality != undefined);
            let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
            let tinyUrl = tiny.data;
            let title = getUrl.videoDetails.title;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            resolve({ title, result: tinyUrl, result2: resultFix[0].video, thumb });
        }).catch(reject);
    });
}