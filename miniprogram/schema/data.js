const selectorList = generateList('No') // 普通选择器数据
const selectorData = [0] // 普通选择器默认值格式,对应数据的下标

let multiList1 = generateList('多列1-')
let multiList2 = generateList('多列2-')
let multiList3 = generateList('多列3-')
const cusMultiList = [multiList1,multiList2,multiList3] // 多列选择器数据
const cusMultiData = [1,1,1] // 多列选择器默认值格式，对应数据的下标

let cascade1 = generateList('父级1-')
for(let i=0;i<cascade1.length;i++){
  let cascade2 = generateList('子级1-')
  for(let k=0;k<cascade2.length;k++){
    let cascade3 = generateList('孙级1-')
    for(let j=0;j<cascade3.length;j++){
      cascade3[j].children = []
    }
    cascade2[k].children = cascade3
  }
  cascade1[i].children = cascade2
}
const cusCascadeList = cascade1 // 级联选择器数据
const cusCascadeData = [1,2,1,2] // 多列选择器默认值格式，对应数据的下标
function generateList(tag,min=10,max=30){
  let list = [];
  for(let i=1;i<5;i++){
    let obj = {
      id:i,
      label:'' + i + tag 
    }
    list.push(obj)
  }
  return list;
}
function randNum(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}
module.exports = {
  selectorList,
  selectorData,
  cusMultiList,
  cusMultiData,
  cusCascadeList,
  cusCascadeData
}