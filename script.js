const STORAGE_KEY = "otsukiMartData";

// デフォルトデータ
const defaultData = {
  news: ["2025年8月、新商品が入荷しました！"],
  storeInfo: "所在地：大阪府ストリート区5-3-1\n営業時間：8:00〜23:00（年中無休）",
  staff: [
    { name: "207系", position: "代表", store: "本社" },
    { name: "Coming soon", position: "エリアマネージャー", store: "東ブロック" },
    { name: "Coming soon", position: "店長", store: "篠山空港店" }
  ]
};

// データ取得
function loadData() {
  const json = localStorage.getItem(STORAGE_KEY);
  if (json) {
    try {
      return JSON.parse(json);
    } catch {
      return defaultData;
    }
  }
  return defaultData;
}

// データ保存
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// index.html用の表示処理
function displayData() {
  const data = loadData();

  // お知らせ
  const newsList = document.getElementById("news-list");
  newsList.innerHTML = "";
  data.news.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    newsList.appendChild(li);
  });

  // 店舗情報
  const storeInfo = document.getElementById("store-info");
  storeInfo.textContent = data.storeInfo;

  // 社員情報
  const staffList = document.getElementById("staff-list");
  staffList.innerHTML = "";
  data.staff.forEach(({ name, position, store }) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${name}</td><td>${position}</td><td>${store}</td>`;
    staffList.appendChild(tr);
  });
}

// 管理画面用にデータ読み込み
function loadDataForAdmin() {
  const data = loadData();

  document.getElementById("news-input").value = data.news.join("\n");
  document.getElementById("store-input").value = data.storeInfo;

  // CSV形式に変換
  const csv = data.staff
    .map(({ name, position, store }) => `${name},${position},${store}`)
    .join("\n");
  document.getElementById("staff-input").value = csv;
}

// 保存処理
function saveNews(text) {
  const data = loadData();
  data.news = text.split(/\r?\n/).filter((line) => line.trim() !== "");
  saveData(data);
  showSaveMessage("お知らせを保存しました。");
  displayData();
}

function saveStore(text) {
  const data = loadData();
  data.storeInfo = text;
  saveData(data);
  showSaveMessage("店舗情報を保存しました。");
  displayData();
}

function saveStaff(text) {
  const data = loadData();
  const lines = text.split(/\r?\n/);
  const staffArray = [];
  lines.forEach((line) => {
    const parts = line.split(",");
    if (parts.length >= 3) {
      staffArray.push({
        name: parts[0].trim(),
        position: parts[1].trim(),
        store: parts[2].trim(),
      });
    }
  });
  data.staff = staffArray;
  saveData(data);
  showSaveMessage("社員情報を保存しました。");
  displayData();
}

function showSaveMessage(msg) {
  const p = document.getElementById("save-message");
  if (!p) return;
  p.textContent = msg;
  setTimeout(() => {
    p.textContent = "";
  }, 3000);
}

// ページ読み込み時にindex.htmlなら表示更新
if (document.getElementById("news-list")) {
  window.onload = displayData;
}
