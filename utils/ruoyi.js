/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */
/**
 * 日期解析
 * 将字符串转换成日期时间
 */
export function dateParse(string, format) {
  //
  if (format == null) format = "yyyy-MM-dd HH:mm:ss";
  var compare = {
    "y+": "y",
    "M+": "M",
    "d+": "d",
    "H+": "H",
    "m+": "m",
    "s+": "s",
  };
  var result = { y: "", M: "", d: "", H: "00", m: "00", s: "00" };
  var tmp = format;
  for (var k in compare) {
    if (new RegExp("(" + k + ")").test(format))
      result[compare[k]] = string.substring(
        tmp.indexOf(RegExp.$1),
        tmp.indexOf(RegExp.$1) + RegExp.$1.length
      );
  }
  return new Date(
    result["y"],
    result["M"] - 1,
    result["d"],
    result["H"],
    result["m"],
    result["s"]
  );
}
/**
 * 日期格式化
 * 将日期转换为字符串
 */
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === "string") {
      time = time
        .replace(new RegExp(/-/gm), "/")
        .replace("T", " ")
        .replace(new RegExp(/\.[\d]{3}/gm), "");
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}
/**
	获取当前日期时间星期
	格式
	YYYY/yyyy/YY/yy 表示年份
	MM/M 月份
	W/w 星期
	dd/DD/d/D 日期
	hh/HH/h/H 时间
	mm/m 分钟
	ss/SS/s/S 秒
	**/
export function formatDate(strFormat, date, isHour24) {
  var dDate = date ? date : new Date();
  var str = strFormat;
  var Week = ["日", "一", "二", "三", "四", "五", "六"];

  str = str.replace(/yyyy|YYYY/, dDate.getFullYear());
  str = str.replace(
    /yy|YY/,
    dDate.getYear() % 100 > 9
      ? (dDate.getYear() % 100).toString()
      : "0" + (dDate.getYear() % 100)
  );

  str = str.replace(
    /MM/,
    dDate.getMonth() > 8 ? dDate.getMonth() + 1 : "0" + (dDate.getMonth() + 1)
  );
  str = str.replace(/M/g, dDate.getMonth() + 1);

  str = str.replace(/w|W/g, Week[dDate.getDay()]);

  str = str.replace(
    /dd|DD/,
    dDate.getDate() > 9 ? dDate.getDate().toString() : "0" + dDate.getDate()
  );
  str = str.replace(/d|D/g, dDate.getDate());

  let amOrPm = "";
  let hours = dDate.getHours();
  if (!isHour24) {
    if (dDate.getHours() > 12) {
      hours = dDate.getHours() - 12;
      amOrPm = "下午";
    } else {
      amOrPm = "上午";
    }
  }
  str = str.replace(
    /hh|HH/,
    dDate.getHours() > 9 ? hours.toString() : "0" + hours
  );
  str = str.replace(/h|H/g, dDate.getHours());
  str = str.replace(
    /mm/,
    dDate.getMinutes() > 9
      ? dDate.getMinutes().toString()
      : "0" + dDate.getMinutes()
  );
  str = str.replace(/m/g, dDate.getMinutes());

  str = str.replace(
    /ss|SS/,
    dDate.getSeconds() > 9
      ? dDate.getSeconds().toString()
      : "0" + dDate.getSeconds()
  );
  str = str.replace(/s|S/g, dDate.getSeconds());

  str += " " + amOrPm;
  return str;
}
// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  let search = params;
  search.params =
    typeof search.params === "object" &&
    search.params !== null &&
    !Array.isArray(search.params)
      ? search.params
      : {};
  dateRange = Array.isArray(dateRange) ? dateRange : [];
  if (typeof propName === "undefined") {
    search.params["beginTime"] = dateRange[0];
    search.params["endTime"] = dateRange[1];
  } else {
    search.params["begin" + propName] = dateRange[0];
    search.params["end" + propName] = dateRange[1];
  }
  return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  if (value === undefined) {
    return "";
  }
  var actions = [];
  Object.keys(datas).some((key) => {
    if (datas[key].value == "" + value) {
      actions.push(datas[key].label);
      return true;
    }
  });
  if (actions.length === 0) {
    actions.push(value);
  }
  return actions.join("");
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  if (value === undefined) {
    return "";
  }
  var actions = [];
  var currentSeparator = undefined === separator ? "," : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val) => {
    var match = false;
    Object.keys(datas).some((key) => {
      if (datas[key].value == "" + temp[val]) {
        actions.push(datas[key].label + currentSeparator);
        match = true;
      }
    });
    if (!match) {
      actions.push(temp[val] + currentSeparator);
    }
  });
  return actions.join("").substring(0, actions.join("").length - 1);
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1;
  str = str.replace(/%s/g, function () {
    var arg = args[i++];
    if (typeof arg === "undefined") {
      flag = false;
      return "";
    }
    return arg;
  });
  return flag ? str : "";
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str) {
  if (!str || str == "undefined" || str == "null") {
    return "";
  }
  return str;
}

// 数据合并
export function mergeRecursive(source, target) {
  for (var p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p]);
      } else {
        source[p] = target[p];
      }
    } catch (e) {
      source[p] = target[p];
    }
  }
  return source;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || "id",
    parentId: parentId || "parentId",
    childrenList: children || "children",
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== "undefined") {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}

// 验证是否为blob格式
export async function blobValidate(data) {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  } catch (error) {
    return true;
  }
}

/**
 * 单位进阶时的倍数
 */
const SIZE_BASE = 1024;

/**
 * 将文件大小按照常规方式显示
 */
export function fileBytesToSize(size) {
  if (size < 0.1 * SIZE_BASE) {
    //小于0.1KB，则转化成B
    size = size.toFixed(2) + "B";
  } else if (size < 0.1 * SIZE_BASE * SIZE_BASE) {
    // 小于0.1MB，则转化成KB
    size = (size / SIZE_BASE).toFixed(2) + "KB";
  } else if (size < 0.1 * SIZE_BASE * SIZE_BASE * SIZE_BASE) {
    // 小于0.1GB，则转化成MB
    size = (size / (SIZE_BASE * SIZE_BASE)).toFixed(2) + "MB";
  } else {
    // 其他转化成GB
    size = (size / (SIZE_BASE * SIZE_BASE * SIZE_BASE)).toFixed(2) + "GB";
  }

  // 转成字符串
  let sizeStr = size + "",
    // 获取小数点处的索引
    index = sizeStr.indexOf("."),
    // 获取小数点后两位的值
    dou = sizeStr.substr(index + 1, 2);

  // 判断后两位是否为00，如果是则删除00
  if (dou == "00")
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);

  return size;
}
