export function isPhone(val) {
    // let Pattern = /^1[34578]\d{9}$/;
    let Pattern = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
    return Pattern.test(val)
}


// 是否都是中文
export function isChinaName(val) {
    var reg = /^[\u4e00-\u9fa5]+$/;
    var len = val.length;
    var flag = true;
    if (len < 1 || len > 4 || !reg.test(val)) {
      flag = false;
    }
      return flag;
}


export function isSnCode(val){
  var reg = /^[\d]+$/;
  return reg.test(val);
}