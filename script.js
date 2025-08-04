import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Firebase設定（あなたのものに置き換えてください）
const firebaseConfig = {
  apiKey: "AIzaSyBMhTeuoHLqZ1E0IRu7jfJcE9fvrZfAFgM",
  authDomain: "otsuki-mart.firebaseapp.com",
  databaseURL: "https://otsuki-mart-default-rtdb.firebaseio.com",
  projectId: "otsuki-mart",
  storageBucket: "otsuki-mart.firebasestorage.app",
  messagingSenderId: "970391222743",
  appId: "1:970391222743:web:81d6a31285c92da4a2f392",
  measurementId: "G-N7577RSBW6"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Firebaseからデータ取得
async function loadData() {
  try {
    const snapshot = await get(ref(db));
    return snapshot.exists() ? snapshot.val() : {};
  } catch(e) {
    console.error("データ取得エラー", e);
    return {};
  }
}

// 管理画面用データ読み込み
export async function loadDataForAdmin() {
  const data = await loadData();
  if (data.news) {
    document.getElementById("news-input").value = data.news.join("\n");
  }
  if (data.storeInfo) {
    document.getElementById("store-input").value = data.storeInfo;
  }
  if (data.staff) {
    const csv = data.staff.map(s => `${s.name},${s.position},${s.store}`).join("\n");
    document.getElementById("staff-input").value = csv;
  }
}

// お知らせ保存
export async function saveNews(text) {
  const newsArray = text.split(/\r?\n/).filter(l => l.trim() !== "");
  try {
    await set(ref(db, "news"), newsArray);
    showSaveMessage("お知らせを保存しました。");
  } catch(e) {
    alert("保存に失敗しました: " + e.message);
  }
}

// 店舗情報保存
export async function saveStore(text) {
  try {
    await set(ref(db, "storeInfo"), text);
    showSaveMessage("店舗情報を保存しました。");
  } catch(e) {
    alert("保存に失敗しました: " + e.message);
  }
}

// 社員情報保存
export async function saveStaff(text) {
  const staffArray = text.split(/\r?\n/).map(line => {
    const parts = line.split(",");
    return parts.length >= 3 ? { name: parts[0].trim(), position: parts[1].trim(), store: parts[2].trim() } : null;
  }).filter(Boolean);
  try {
    await set(ref(db, "staff"), staffArray);
    showSaveMessage("社員情報を保存しました。");
  } catch(e) {
    alert("保存に失敗しました: " + e.message);
  }
}

function showSaveMessage(msg) {
  const p = document.getElementById("save-message");
  if (!p) return;
  p.textContent = msg;
  setTimeout(() => { p.textContent = ""; }, 3000);
}
