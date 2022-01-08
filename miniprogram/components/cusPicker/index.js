Component({
  properties: {
    mode: {
      type: String,
      value: 'selector' // selector-普通选择器 multiSelector-多列， time-时间， date-日期， cascadeSelector-级联
    },
    list: {
      type: Array,
      value: [] //  selector-普通选择器 multiSelector-多列， cascadeSelector-级联 对应 list
    },
    cusPickerFlag: {
      type: Boolean,
      value: false // 控制显隐
    },
    defaultValue: {
      type: Array,
      value: [] // 默认展示的数据，selector-普通选择器 multiSelector-多列， cascadeSelector-级联 这三种直接对应下标，不对应内容，date-对应年月日，time对应 时 分 
    },
    yearBefore: {
      type: Number,
      value: 60 // date 用来控制往前展示
    },
    yearAfter: {
      type: Number,
      value: 60 // date 用来控制往前展示
    },
    nowFlag:{ // 是否截止今天
      type:Boolean,
      value:true
    },
    fields:{ // 粒度， day - 年月日， month - 年月， year - 年
      type:String,
      value:'day'
    },
    step: {
      type: Number,
      value: 1 // time 用来控制 分钟 间隔，默认间隔 1 分钟
    },
    maxHour: {
      type: Number,
      value: 24 // time 用来控制最大小时
    },
    minHour: {
      type: Number,
      value: 0 // time 用来控制最小小时
    },
    startTime:{
      type:Array,
      value:[]
    },
    endTime:{
      type:Array,
      value:[]
    },
    noText:{
      type:String,
      value:'Cancel' // 取消按钮文字
    },
    noTextColor:{
      type:String,
      value:'#F5F5F5' // 取消按钮文字颜色
    },
    noTextBgColor:{
      type:String,
      value:'#2C2C2C' // 取消按钮背景颜色
    },
    okText:{
      type:String,
      value:'OK' // 确认按钮文字
    },
    okTextColor:{
      type:String,
      value:'#F5F5F5' // 确认按钮文字颜色
    },
    okTextBgColor:{
      type:String,
      value:'#05C160' // 确认按钮背景颜色
    }
  },
  data: {
    pickerValue: [], // 用于展示默认值
    years: [], // date 类型 年
    months: [], // date 类型 月，从1-12
    days: [], // date 类型 日
    ymd: [], // date 类型 将传递过来的date类型默认值重新获取一下
    cascadeNums: [], // multi 类型 根据传递过来的 list 计算层级，4 级的时候小程序展示能力有限，生成的 4 级数据没展示出来，暂时限制 3 级
    hours: [], // time 类型 小时
    minutes: [] // time 类型 分钟
  },
  lifetimes: {
    attached: function () {
      let defaultValue = this.data.defaultValue;
      this.attachedHandler(defaultValue); // 加载成功之后先初始化数据
    },
    detached: function () {}
  },
  attached: function () {
    let defaultValue = this.data.defaultValue;
    this.attachedHandler(defaultValue); // 加载成功之后先初始化数据
  },
  detached: function () {},
  methods: {
    // 加载成功之后执行
    attachedHandler: function (defaultValue) {
      let pickerValue = [];
      let mode = this.data.mode;
      if (mode === 'selector') {
        pickerValue.push(defaultValue[0])
      } else if (mode === 'multiSelector') {
        pickerValue = defaultValue
      } else if (mode === 'cascadeSelector') {
        pickerValue = defaultValue
        this.handlerCascade(defaultValue)
      } else if (mode === 'time') {
        this.initTime(defaultValue)
      } else if (mode === 'date') {
        if (defaultValue.length <= 0) {
          defaultValue = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]
        }
        this.setData({
          ymd: defaultValue
        })
        this.initYears()
        return
      } else {
        wx.showToast({
          title: 'cusPicker 暂不支持该类型'
        })
      }
      this.setData({
        pickerValue
      })
    },
    initTime: function (defaultValue) {
      let minHour = this.data.minHour,
        maxHour = this.data.maxHour;
      if (minHour > maxHour) {
        minHour = maxHour - 1;
      }
      if (minHour <= 0) {
        minHour = 0;
      }
      if (minHour >= 23) {
        minHour = 23;
      }
      if (maxHour >= 24) {
        maxHour = 24;
      }
      if (maxHour <= 1) {
        maxHour = 1
      }
      let step = Math.abs(this.data.step);
      if (step >= 30) {
        step = 30
      }
      let hours = [],
        minutes = [];
      for (let h = minHour; h < maxHour; h++) {
        hours.push(this.fillZero(h))
      }
      for (let m = 0; m < 60; m += step) {
        minutes.push(this.fillZero(m))
      }
      let hour,minute,hourIndex,minuteIndex;
      if(defaultValue.length>0){
        hour = this.fillZero(defaultValue[0])
        minute = this.fillZero(defaultValue[1])
        hourIndex = hours.indexOf(hour)
        if(hourIndex === -1){
          hourIndex = 0;
        }
        minuteIndex = hours.indexOf(minute)
        if(minuteIndex === -1){
          minuteIndex = 0;
        }
      }else{
        hourIndex = 0;
        minuteIndex = 0;
      }
      let pickerValue = [hourIndex,minuteIndex]
      this.setData({
        hours,
        minutes,
      })
      // 这儿，不用 setTimeout 执行的话默认选中一直不管用，暂时没有好的解决办法
      setTimeout(()=>{
        this.setData({pickerValue})
      })
    },
    // 多级联动
    handlerCascade: function (defaultValue) {
      let list = this.data.list;
      let cascadeNums = [],
        num = 0;
      recursive(list)
      if (cascadeNums.length <= 3) {
        let pickerValue;
        if (defaultValue.length < cascadeNums.length) {
          for (let i = 0; i < cascadeNums.length; i++) {
            if (defaultValue[i] === undefined) {
              defaultValue[i] = 0;
            }
          }
        }
        pickerValue = defaultValue.slice(0, cascadeNums.length)
        this.setData({
          cascadeNums,
          pickerValue
        })
      } else {
        wx.showToast({
          title: '最多支持3级联动',
        })
      }
      //递归查看级联层级
      function recursive(arr) {
        cascadeNums.push(num)
        num += 1;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children && arr[i].children.length > 0) {
            recursive(arr[i].children)
            break;
          }
        }
      }
    },
    //初始化年份列表
    initYears: function () {
      let fields = this.data.fields;
      let y = this.data.ymd[0];
      let pickerValue = this.data.pickerValue;
      let years = [];
      let yearObj = this.checkYears();
      for (let i = yearObj.start ; i >= yearObj.end; i--) {
        years.unshift(i)
      }
      let yearIndex = years.indexOf(y)
      if (yearIndex === -1) {
        yearIndex = years.length - 1
      }
      pickerValue[0] = yearIndex;
      this.setData({
        years,
        pickerValue
      })
      if(fields !== 'year'){
        this.initMonths(1)
      }
    },
    //初始化月份列表
    initMonths: function (type) {
      let fields = this.data.fields;
      let m = this.fillZero(this.data.ymd[1])
      let pickerValue = this.data.pickerValue;
      let months = [];
      let monthObj = this.checkMonths()
      for (let i = monthObj.start; i <= monthObj.end; i++) {
        let month = this.fillZero(i);
        months.push(month)
      }
      let monthIndex;
      if(type === 1){
        monthIndex = months.indexOf(m)
        if (monthIndex === -1) {
          monthIndex = 0
        }
      }else{
        monthIndex = pickerValue[1]
        if(monthIndex>=months.length){
          monthIndex = months.length - 1
        }
      }
      pickerValue[1] = monthIndex
      this.setData({
        months,
        pickerValue
      })
      if(fields === 'day'){
        this.initDays(type);
      }
    },
    //初始化天数列表 type: 1-初始化， 2-检查
    initDays: function (type) {
      let d = this.fillZero(this.data.ymd[2])
      let pickerValue = this.data.pickerValue;
      let years = this.data.years;
      let months = this.data.months;
      let days = [];
      let yearIndex = pickerValue[0]
      let monthIndex = pickerValue[1]
      let year, month, dayObj;
      year = years[yearIndex]
      month = months[monthIndex]
      dayObj = this.checkDays(year, month)
      console.log(dayObj)
      for (let i = dayObj.start; i <= dayObj.end; i++) {
        days.push(this.fillZero(i))
      }
      let dayIndex;
      if (type === 1) { // 初始化的时候走这儿
        dayIndex = days.indexOf(d)
        if (dayIndex === -1) {
          dayIndex = 0
        }
      } else { // 后期检查的时候走这儿
        dayIndex = pickerValue[2]
        if (dayIndex >= days.length) {
          dayIndex = days.length - 1;
        }
      }
      pickerValue[2] = dayIndex;
      this.setData({
        days,
        pickerValue
      })
    },
    // 检查年份
    checkYears:function(){
      let nowFlag = this.data.nowFlag;
      let yearBefore = this.data.yearBefore;
      let yearAfter = this.data.yearAfter
      let startTime = this.data.startTime;
      let endTime = this.data.endTime;
      let now = new Date().getFullYear()
      let start,end;
      if(nowFlag){ // 截止当前日期
        start = now
        if(startTime[0]){
          end = startTime[0]
        }else{
          end = start - yearBefore
        }
      }else{ // 不限制日期
        if(startTime[0]){ // 如果指定开始日期
          end = startTime[0]
        }else{ // 未指定开始日期
          end = now - yearBefore
        }
        if(endTime[0]){ // 如果指定结束日期
          start = endTime[0]
        }else{ // 未指定结束日期
          start = now + yearAfter
        }
      }
      return {start,end}
    },
    // 检查月份
    checkMonths:function(){
      let startTime = this.data.startTime;
      let endTime = this.data.endTime;
      let nowFlag = this.data.nowFlag;
      let year = this.data.years[this.data.pickerValue[0]]
      let start = 1,end = 12;
      if(nowFlag){ // 截止当前日期
        if(year == new Date().getFullYear()){ // 如果是当前年份，月份截止当前月
          end = new Date().getMonth() + 1
        }
        if(year == startTime[0]){
          if(startTime[1]){
            start = startTime[1]
          }
        }
      }else{ // 不限制日期
        if(startTime.length > 0){ // 设置了开始时间
          if(year == startTime[0]){
            start = startTime[1]
          }
        }
        if(endTime.length > 0){
          if(year == endTime[0]){
            end = endTime[1]
          }
        }
      }
      return {start,end}
    },
    // 检查日期：主要检查天，年月不管
    checkDays: function (year, month) {
      let startTime = this.data.startTime;
      let endTime = this.data.endTime;
      let nowFlag = this.data.nowFlag;
      let dayNum;
      switch (Number(month)) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          dayNum = 31;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          dayNum = 30;
          break;
        case 2:
          dayNum = 28;
          if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
            dayNum = 29;
          }
          break;
        default:
          break;
      }
      let start = 1,end = dayNum;
      let startFlag = year == startTime[0] && month == startTime[1];
      let endFlag = year == endTime[0] && month == endTime[1];
      if(nowFlag){ // 如果限制截止当前日期
        if(new Date().getFullYear() == year && new Date().getMonth() + 1 == month){ // 如果是当前年份和月份
          end = new Date().getDate()
        }
        if(startTime[2]){
          if(startFlag){
            start = startTime[2]
          }
        }
      }else{ // 不限制当前日期
        if(startTime[2]){
          if(startFlag){
            start = startTime[2]
          }
        }
        if(endTime[2]){
          if(endFlag){
            end = endTime[2]
          }
        }
      }
      return {start,end};
    },

    // 补零
    fillZero: function (num) {
      if (num < 10) {
        return '0' + num;
      } else {
        return '' + num;
      }
    },
    // 空的  不能删除，阻止冒泡使用
    handlerStop: function () {},
    handlerNo: function () {
      this.triggerEvent('no')
    },
    handlerOk: function () {
      let mode = this.data.mode;
      let list = this.data.list;
      let pickerValue = this.data.pickerValue;
      let len = pickerValue.length;
      let obj = {};
      obj.pickerValue = pickerValue;
      if (mode === 'selector') {
        obj.el = list[pickerValue[0]]
      } else if (mode === 'multiSelector') {
        let tmpArr = [];
        for (let i = 0; i < len; i++) {
          tmpArr.push(list[i][pickerValue[i]])
        }
        obj.els = tmpArr;
      } else if (mode === 'cascadeSelector') {
        let tmpObj = {};
        for (let i = 0; i < len; i++) {
          if (i === 0) {
            let el = list[pickerValue[0]]
            tmpObj['level' + (i + 1)] = el
          }
          if (i === 1) {
            let el = list[pickerValue[0]].children[pickerValue[1]]
            tmpObj['level' + (i + 1)] = el
          }
          if (i === 2) {
            let el = list[pickerValue[0]].children[pickerValue[1]].children[pickerValue[2]]
            tmpObj['level' + (i + 1)] = el
          }
        }
        obj.els = tmpObj;
      } else if (mode === 'time') {
        let tmpObj = {};
        tmpObj.hour = Number(this.data.hours[pickerValue[0]])
        tmpObj.minute = Number(this.data.minutes[pickerValue[1]])
        obj.els = tmpObj;
      } else if (mode === 'date') {
        let fields = this.data.fields;
        let tmpObj = {};
        tmpObj.year = this.data.years[pickerValue[0]]
        if(fields !== 'year'){
          tmpObj.month = Number(this.data.months[pickerValue[1]])
        }
        if(fields === 'day'){
          tmpObj.day = Number(this.data.days[pickerValue[2]])
        }
        obj.els = tmpObj;
      } else {
        wx.showToast({
          title: '暂不支持该类型',
        })
      }

      this.triggerEvent('ok', obj)
    },
    handlerChange: function (e) {
      let value = e.detail.value;
      let fields = this.data.fields;
      this.setData({
        pickerValue: value
      })
      if (this.data.mode === 'date') {
        if(fields !== 'year'){
          this.initMonths(2);
        }
        if(fields === 'day'){
          this.initDays(2);
        }
      }
    }
  }
})