import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
import { en, es, id, ar, pt, de, it } from './lib/idiomas/total-idiomas.js'

global.owner = [
['201210294771', '𝐒𝐔𝐍𝐆 𝐃𝐄𝐕', true],
['201153573240', '𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐃𝐄𝐕', true]]

global.mods = [] 
global.prems = []

global.isBaileysFail = true

global.botNumberCode = "" 
global.confirmCode = "" 
global.lenguajeGB = ae  
global.openai_key = 'sk-0'

global.openai_org_id = 'org-3'

global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = 'GataDiosV3'
global.itsrose = ['4b146102c4d500809da9d1ff']
global.baileys = '@whiskeysockets/baileys'
global.apis = 'https://delirius-apiofc.vercel.app'

global.APIs = { 
lolhuman: { url: 'https://api.lolhuman.xyz/api/', key: lolkeysapi },
neoxr: { url: 'https://api.neoxr.eu/api/', key: null },
skizo: { url: 'https://skizo.tech/api/', key: 'GataDios' },
aemt: { url: 'https://widipe.com/', key: null },
alyachan: { url: 'https://api.alyachan.dev/api/', key: 'syah11' }, //muzan23 DitzOfc
zahwazein: { url: 'https://api.zahwazein.xyz', key: null },
akuari: { url: 'https://apimu.my.id', key: null },
apimu: { url: 'https://api.xteam.xyz', key: null },
fgmods: { url: 'https://api-fgmods.ddns.net', key: null },
botcahx: { url: 'https://api.botcahx.biz.id', key: null },
ibeng: { url: 'https://api.ibeng.tech/docs', key: null },
itsrose: { url: 'https://api.itsrose.site', key: null },
popcat: { url: 'https://api.popcat.xyz', key: null },
xcoders: { url: 'https://api-xcoders.site', key: 'Frieren' }
}

global.APIKeys = { 
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': `${lolkeysapi}`,
  'https://api.neoxr.my.id': `${keysneoxr}`,	
  'https://violetics.pw': 'beta',
  'https://api.zahwazein.xyz': `${keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren'
}

global.mods = [] 
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment	

global.packname = '𝐒𝐀𝐒𝐔𝐊𝐄𝐁𝐎𝐓𝐋𝐈𝐓𝐄-𝐌𝐃'
global.author = '𝐗 𝐓𝐄𝐀𝐌'
global.policyGB = 'github.com/X-Teamx/SasukeBotLite-MD/blob/master/terms.md'

global.official = [ 
['201210294771','𝐒𝐔𝐍𝐆 𝐃𝐄𝐕', 1], 
['201153573240', '𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐃𝐄𝐕', 1]] 

global.mail = '' 
global.desc = '' 
global.desc2 = ''
global.country = '🇪🇬' 
global.vs = '1.0'
global.vsJB = '5.0'
global.gt = '𝐒𝐀𝐒𝐔𝐊𝐄𝐁𝐎𝐓𝐋𝐈𝐓𝐄-𝐌𝐃'

global.wm = '𝐒𝐀𝐒𝐔𝐊𝐄𝐁𝐎𝐓𝐋𝐈𝐓𝐄-𝐌𝐃 - 𝐗 𝐓𝐄𝐀𝐌'
global.igfg = '𝐒𝐀𝐒𝐔𝐊𝐄𝐁𝐎𝐓𝐋𝐈𝐓𝐄-𝐌𝐃'
global.nomorown = owner[0][0]

global.htki = '*⭑•̩̩͙⊱•••• ☪*'
global.htka = '*☪ ••••̩̩͙⊰•⭑*'
global.htjava = '⫹⫺'
global.correct = '✅'
global.fault = '💔'
global.alert = '⚠️'
global.sending = '📋'
global.sent = '❇️'
global.notsent = '❗'
global.waitemot = '⌛'
global.waitemot2 = '⏳'

global.multiplier = 60 
global.ch = {
ch1: '120363369835823519@newsletter',
ch2: '120363369835823519@newsletter',
ch3: '120363369835823519@newsletter',
ch4: '120363369835823519@newsletter',
ch5: '120363369835823519@newsletter',
ch6: '120363369835823519@newsletter',
ch7: '120363369835823519@newsletter',
ch8: '120363369835823519@newsletter', 
ch9: '120363369835823519@newsletter',
ch10: '120363369835823519@newsletter',
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.bold.greenBright(lenguajeGB['smsConfigBot']().trim()))
import(`${file}?update=${Date.now()}`)
})
