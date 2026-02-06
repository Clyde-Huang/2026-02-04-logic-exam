import { myData } from "./db.js";
//======================================
console.log("a()");
function a() {
  let aa = myData.filter((f) => f.education === "大專院校畢業").length;
  let bb = myData.filter((f) => f.education === "碩士畢業").length;
  let cc = myData.filter((f) => f.education === "博士畢業").length;
  // 估計要先遍歷所有學歷
  let result = {
    大專院校畢業: aa,
    碩士畢業: bb,
    博士畢業: cc,
  };
  console.log(result);
}
a();
//======================================
console.log("================================================");
console.log("b()");
function b() {
  let count = [];

  myData.reduce((acc, acc1) => {
    let currentArea = acc1.company.area;
    // console.log(currentArea); // 全部列出來

    if (!count.includes(currentArea)) {
      count.push(currentArea);
    }

    return acc1;
  }, {});
  // console.log("不重複區域：", count); // 檢查用

  let result = [];

  count.forEach((area) => {
    let num = myData.filter((f) => f.company.area === area).length;

    result.push({ [area]: num });
  });
  console.log(result);
}
b();
//======================================
console.log("================================================");
console.log("c()");
function c() {
  let ageRange = myData.filter((f) => f.age === "26~30 歲");
  // console.log(ageRange); // 檢查用

  let total = ageRange.reduce((acc, acc1) => {
    return acc + Number(acc1.company.salary_score);
  }, 0);

  console.log("average: " + total / ageRange.length);
}
c();
//======================================
console.log("================================================");
console.log("aa()");

let count = [];
function aa() {
  myData.reduce((acc, acc1) => {
    let edu = acc1.education;
    // console.log(edu); // 全部列出來

    if (!count.includes(edu)) {
      count.push(edu);
    }

    return acc1;
  }, {});
  // console.log("不重複區域：", count); // 檢查用

  let result = [];

  count.forEach((edu) => {
    let num = myData.filter((f) => f.education === edu).length;

    result.push({ [edu]: num });
  });
  console.log(result);
}
aa(); // 遍歷版本 a()
