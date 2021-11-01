class Snake{
  // 蛇容器
  element: HTMLElement
  // 蛇头元素
  head: HTMLElement
  // 身体包括蛇头
  bodies: HTMLCollection
  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div')!
    this.bodies = this.element.getElementsByTagName('div')

  }
  // 蛇头的坐标
  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  set X(value) {
    // 值没有改变，直接返回
    if(this.X === value) {
      return
    }
    // 判断蛇是否掉头
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if(value > this.X) {
        // 说明本来向左走然后向右掉头，让蛇继续向左走
        value = this.X - 10
      }else {
        value = this.X + 10
      }
    }
    // 判断蛇是否撞墙
    if(value < 0 || value > 290) {
      throw new Error('蛇撞墙了!')
    }
    // 移动身体
    this.moveBody()
    this.head.style.left = value + 'px'
    // 检查是否撞到自己
    this.checkHeadBody()
  }

  set Y(value) {
    if(this.Y === value) {
      return
    }
    // 判断蛇是否掉头
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if(value > this.Y) {
        // 说明本来向上走然后向下掉头，让蛇继续向上走
        value = this.Y - 10
      }else {
        value = this.Y + 10
      }
    }
    if(value < 0 || value > 290) {
      throw new Error('蛇撞墙了!')
    }
    this.moveBody()
    this.head.style.top = value + 'px'
    // 检查是否撞到自己
    this.checkHeadBody()
  }
  // 增加身体
  addBody() {
    this.element.insertAdjacentHTML('beforeend','<div></div>')
  }
  // 身体移动
  moveBody() {
    for(let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前一个元素的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      // 设置到当前元素
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';

    }
  }
  // 检查是否撞到自己
  checkHeadBody() {
    // 获取所有的身体，判断是否与蛇头坐标重叠
    for(let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if(this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error('撞到自己了~~')
      }
    }
  }
}

export default Snake