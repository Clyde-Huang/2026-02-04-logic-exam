console.log("================================================");
console.log("d()~g(): ");
// 將 URL 抽成一個「常數」變數：
const API_URL =
  "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json";
const getData = async function () {
  // 1.async/await 搭配 try/catch 所以先打好 try/catch
  // 2.try 內 fetch(API)，該變數會是資料流，所以再透過.json()轉乘JSON
  // 3.簡單處理 catch 域內容
  try {
    const response = await fetch(API_URL);
    return await response.json(getData);
  } catch (error) {
    console.log(error);
    return "請求失敗";
  }
};
// 4.設變數取得 getData 函式 (用法限定 top-level await 的環境)
const users = await getData();
console.log(users);

//======================================
console.log("d()");

// 1.宣告函式 再把陣列操作"丟進來"
// function d() {丟進來};
// d();

// 2.陣列操作邏輯 (依題目需求)
// 2.1.先 map 所有空字串 返回全部匹配的
// 2.2.在算長度(幾個) 返回數字(幾個)
let msgEmpty = users.filter((f) => f.company.industry_message === "").length;
// console.log("msgEmpty: " + msgEmpty); // 362
// console.log(users.length); // 481 (全部筆數)
// 3.照題目 console 所需格式 (應該 industry_message 非空即有字)
console.log(`[
  ["有寫${msgEmpty}人",{ 
     no:"沒寫${users.length - msgEmpty}人" 
    }]
]`);

//======================================
console.log("e()");

// 宣告函式 再把陣列操作"丟進來"
// function e() {丟進來};
// e();

// 0. 準備一個空物件 result，最後放整個統計結果
let resulte = {};

// 1. 一筆一筆檢查 users
users.forEach((user) => {
  // 1.1 先取得這筆資料的產業名稱
  let industry = user.company?.industry;

  // 1.2 取得這筆資料的辦公方式
  let workType = user.company?.work;

  // 1.3 如果這筆資料沒有產業或辦公方式，就跳過
  if (!industry || !workType) return;

  // 2. 產業分類初始化
  // 2.1 如果 result 裡面還沒有這個產業，先建立一個空物件
  if (!resulte[industry]) {
    resulte[industry] = {};
  }

  // 3. 辦公方式初始化
  // 3.1 如果這個產業底下，還沒有這個辦公方式，先設 0
  if (!resulte[industry][workType]) {
    resulte[industry][workType] = 0;
  }

  // 4. 核心邏輯：累加數量
  resulte[industry][workType]++;
});

// 5. 格式化數字
// 5.1 把每個產業每個辦公方式的數字，加上 "間"
for (let industry in resulte) {
  // 外層：每個產業
  for (let workType in resulte[industry]) {
    // 內層：每個辦公方式
    resulte[industry][workType] = resulte[industry][workType] + "間";
  }
}

// 6. 印出結果
console.log(resulte);
// 新用到 巢狀物件 / for in / ?.

//======================================
console.log("f()");

// 宣告函式 再把陣列操作"丟進來"
// function f() {丟進來};
// f();

// 1. 準備一個空物件 result，最後放整個統計結果
let resultf = {}; // 包進 function 就不用取怪名子

// 2. 遍歷每個使用者
users.forEach((user) => {
  let industry = user.company?.industry; // 取得產業
  let gender = user.gender; // 取得性別
  let score = Number(user.company?.score); // 取得滿意度，轉成數字

  if (!industry || !gender || isNaN(score)) return; // 資料不完整就跳過

  // 2.1 如果這個產業還沒在結果裡，先建立物件
  if (!resultf[industry]) {
    resultf[industry] = {
      男性: 0,
      女性: 0,
      男性滿意度總和: 0,
      女性滿意度總和: 0,
    };
  }

  // 2.2 累加人數與滿意度
  if (gender === "男性") {
    resultf[industry].男性 += 1;
    resultf[industry].男性滿意度總和 += score;
  } else if (gender === "女性") {
    resultf[industry].女性 += 1;
    resultf[industry].女性滿意度總和 += score;
  }
});

// 3. 計算比例與平均滿意度
for (let industry in resultf) {
  // <-- 用 for…in 遍歷物件
  let data = resultf[industry];
  let total = data.男性 + data.女性;

  // 3.1 計算男女比例，保留1位小數(toFixed(1))
  let maleRatio = total ? ((data.男性 / total) * 100).toFixed(1) + "%" : "0%";
  let femaleRatio = total ? ((data.女性 / total) * 100).toFixed(1) + "%" : "0%";

  // 3.2 計算平均滿意度，保留1位小數
  let maleScore = data.男性
    ? (data.男性滿意度總和 / data.男性).toFixed(1) + "分"
    : "0分";
  let femaleScore = data.女性
    ? (data.女性滿意度總和 / data.女性).toFixed(1) + "分"
    : "0分";

  // 3.3 重寫結果物件格式
  resultf[industry] = {
    男性比例: maleRatio,
    女性比例: femaleRatio,
    男性產業滿意度: maleScore,
    女性產業滿意度: femaleScore,
  };
}

// 4. 輸出結果
console.log(resultf);

//======================================
console.log("g()");

// 純根據題目找指定內容 若要全部不重複就跟 e/f 題一樣
// 1.算各別分子分母
// 1.1.用 filter 找出指定條件有幾組，再用 length 得幾組(數字)
// 2.2.也抽離成函式

let rangeUnder1yearNum = users.filter(
  (f) =>
    f.company?.job_tenure === "1 年以下" && f.company?.work === "實體辦公室",
).length;
console.log(rangeUnder1yearNum); // 119

// 2.算各別分子總和
let rangeUnder1yearTotalScore = users.reduce((acc, item) => {
  if (
    item.company?.job_tenure === "1 年以下" &&
    item.company?.work === "實體辦公室"
  ) {
    return acc + Number(item.company?.salary_score || 0);
  }
  return acc;
}, 0);
// console.log(rangeUnder1yearTotalScore); // 687

// 2.1.抽離成 function (可不要，就上面重複4次)
// 2.3.分子分母放都在同個函式
function salaryScore(users, job_tenure, work) {
  let rangeNum = users.filter(
    (f) => f.company?.job_tenure === job_tenure && f.company?.work === work,
  ).length;
  // console.log("分母(該筆數): " + rangeNum); // 119

  let totalScore = users.reduce((acc, item) => {
    if (
      item.company?.job_tenure === job_tenure &&
      item.company?.work === work
    ) {
      return acc + Number(item.company?.salary_score || 0);
    }
    return acc;
  }, 0);
  return (totalScore / rangeNum).toFixed(2);
}

let rangeUnder1yearEntityTotalScore = salaryScore(
  users,
  "1 年以下",
  "實體辦公室",
);
// console.log(rangeUnder1yearEntityTotalScore); // 687

let rangeUnder1yearRemoteTotalScore = salaryScore(
  users,
  "1 年以下",
  "遠端工作",
);
// console.log(rangeUnder1yearRemoteTotalScore); // 40

let range2To3yearEntityTotalScore = salaryScore(users, "2~3 年", "實體辦公室");
// console.log(range2To3yearEntityTotalScore); // 245

let range2To3yearRemoteTotalScore = salaryScore(users, "2~3 年", "遠端工作");
// console.log(range2To3yearRemoteTotalScore); // 74

// 3.照需求 console
// 3.1.把檢查用的 console 註解掉
// 3.2.要更精簡就把函式寫進 console
console.log(
  `
  [
    {
    "工作經驗1年以下":{
       "實體辦公室的平均薪水滿意度" : "${rangeUnder1yearEntityTotalScore}分",
      "遠端工作的平均薪水滿意度": "${rangeUnder1yearRemoteTotalScore}分"
     }
    },
    {
    "工作經驗2~3年以下":{
       "實體辦公室的平均薪水滿意度" : "${range2To3yearEntityTotalScore}分",
      "遠端工作的平均薪水滿意度": "${range2To3yearRemoteTotalScore}分"
     }
    }
]
  `,
);

////////
// 小結論(或許不同寫法 結論不同)
console.table([
  {
    題目: "a",
    操作核心: "陣列",
    是否寫死: "是",
    說明: "指定學歷，filter + length",
  },
  {
    題目: "b",
    操作核心: "陣列",
    是否寫死: "否",
    說明: "動態 area 分類後計數",
  },
  {
    題目: "c",
    操作核心: "陣列",
    是否寫死: "是",
    說明: "指定年齡區間算平均",
  },
  {
    題目: "d",
    操作核心: "陣列",
    是否寫死: "是",
    說明: "判斷是否填寫 industry_message",
  },
  {
    題目: "g",
    操作核心: "陣列",
    是否寫死: "是",
    說明: "指定年資與辦公方式算平均",
  },
  {
    題目: "aa",
    操作核心: "物件",
    是否寫死: "否",
    說明: "動態學歷分類（a 的遍歷版）",
  },
  {
    題目: "e",
    操作核心: "物件（巢狀）",
    是否寫死: "否",
    說明: "產業 → 辦公方式 數量統計",
  },
  {
    題目: "f",
    操作核心: "物件（巢狀）",
    是否寫死: "半寫死",
    說明: "產業動態，男女欄位固定",
  },
]);
