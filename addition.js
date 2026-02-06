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

// 1.宣告函式 再把陣列操作"丟進來"
// function e() {丟進來};
// e();

// 2.陣列操作邏輯 (依題目需求)
// 2.1.創空 array
// 2.2.可先得到所有不重複產業 
let list = []; 

users.forEach((item) => {
  let ind = item.company?.industry; // 取得產業名稱
  
  // 核心邏輯：如果 ind 有值，且(list)裡還沒有這個名稱
  if (ind && !list.includes(ind)) {
    list.push(ind); 
  }
});
console.log(list);

// 3. 統計各產業 辦公狀況
