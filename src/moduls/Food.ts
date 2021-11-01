// 定义食物类
class Food{
  // 定义属性
  element: HTMLElement

  constructor() {
    // 获取页面中的food元素
    this.element = document.getElementById('food')!
  }

  // 定义获取食物x轴坐标
  get X() {
    return this.element.offsetLeft
  }

  get Y() {
    return this.element.offsetTop
  }

  // 修改食物的位置
  change(bodies: HTMLCollection) {
    // 生成位置随机 最小0 最大290 必须是10的倍数
    let top = Math.round(Math.random() * 29) * 10
    let left = Math.round(Math.random() * 29) * 10
    // 判断生成的食物是否在蛇的身体上
    for(let i = 1; i < bodies.length; i++) {
      let bd = bodies[i] as HTMLElement
      if(top === bd.offsetTop && left === bd.offsetLeft) {
        // 如果是就再次调用方法重新生成
        this.change(bodies)
        return
      }
    }
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }
}

export default Food