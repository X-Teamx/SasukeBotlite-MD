import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (m, { conn, text }) => {
  try {
    // مسار مجلد node_modules
    const nodeModulesPath = path.join(__dirname, '../node_modules');

    // قراءة كل من الملفات والمجلدات في node_modules
    const items = fs.readdirSync(nodeModulesPath).map((item) => {
      const itemPath = path.join(nodeModulesPath, item);
      return {
        name: item,
        isDirectory: fs.statSync(itemPath).isDirectory(),
        path: itemPath,
      };
    });

    // إذا لم يتم توفير نص، عرض قائمة الملفات والمجلدات
    if (!text) {
      throw `╭──────────────────╮\n│ قائمة الملفات والمجلدات المتاحة.\n│ عدد العناصر المتاحة: ${items.length}\n╰──────────────────╯\n\n╭──────────────────╮\n${items.map((v, index) => `│ [${index + 1}] ${v.name} ${v.isDirectory ? '(مجلد)' : '(ملف)'}`).join('\n')}\n╰──────────────────╯`;
    }

    // التحقق إذا كان العنصر المطلوب موجودًا
    const selectedItem = items.find((item) => item.name === text);
    if (!selectedItem) {
      return m.reply(`╭──────────────────╮\n│ ادخل اسم ملف أو مجلد صحيح .\n│ عدد العناصر المتاحة: ${items.length}\n╰──────────────────╯\n\n╭──────────────────╮\n${items.map((v, index) => `│ [${index + 1}] ${v.name} ${v.isDirectory ? '(مجلد)' : '(ملف)'}`).join('\n')}\n╰──────────────────╯`);
    }

    // تحديد مسار العنصر المحدد
    const itemPath = selectedItem.path;

    // التحقق من وجود العنصر
    if (!fs.existsSync(itemPath)) {
      return m.reply(`❌ العنصر ${text} غير موجود.`);
    }

    // تحديد مسار الملف المضغوط
    const zipPath = path.join(__dirname, `${text}.zip`);

    // ضغط العنصر المحدد فقط
    if (selectedItem.isDirectory) {
      // إذا كان مجلدًا، قم بضغطه مع الحفاظ على اسمه
      await zipFolderWithName(itemPath, zipPath);
    } else {
      // إذا كان ملفًا، قم بضغطه فقط
      await zipFile(itemPath, zipPath);
    }

    // إرسال الملف المضغوط
    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(zipPath),
      mimetype: 'application/zip',
      fileName: `${text}.zip`
    }, { quoted: m });

    // حذف الملف المضغوط بعد الإرسال
    fs.unlinkSync(zipPath);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    await conn.sendMessage(m.chat, { text: `❌ حدث خطأ: ${err.message}` }, { quoted: m });
  }
};

// دالة لضغط المجلد مع الاحتفاظ باسمه
const zipFolderWithName = (folderPath, zipPath) => {
  return new Promise((resolve, reject) => {
    const folderName = path.basename(folderPath); // اسم المجلد فقط
    const parentPath = path.dirname(folderPath); // المسار الأب للمجلد

    const zipCommand = `cd "${parentPath}" && zip -r "${zipPath}" "${folderName}"`;
    exec(zipCommand, (error, stdout, stderr) => {
      if (error) {
        reject(`Error creating zip: ${error.message}`);
        return;
      }
      resolve(stdout);
    });
  });
};

// دالة لضغط الملف فقط
const zipFile = (filePath, zipPath) => {
  return new Promise((resolve, reject) => {
    const zipCommand = `zip -j "${zipPath}" "${filePath}"`; // -j لإزالة المسارات
    exec(zipCommand, (error, stdout, stderr) => {
      if (error) {
        reject(`Error creating zip: ${error.message}`);
        return;
      }
      resolve(stdout);
    });
  });
};

handler.help = ['getplugin'].map((v) => v + ' *<name>*');
handler.tags = ['owner'];
handler.command = /^(موديل)$/i;
handler.owner = true;

export default handler;