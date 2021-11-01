import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

class GameControlM{
  // 蛇
  snake: Snake
  // 食物
  food: Food
  // 记分牌
  scorePanel: ScorePanel
  // 控制器
  control: HTMLElement
  // 存储按键方向
  direction: string = ''
  // 游戏是否结束
  isLive: Boolean = true
  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()
    this.control = document.getElementById('control')!
    this.init()
  }
  // 游戏初始化方法
  init() {
    // 创建控制器
    this.createControl()
    this.run()
  }
  keyClickHandler(event: Event) {
    // 注意此函数执行时的this并不是GameControl对象而是document,使用bind进行绑定
    this.direction = (event.target as HTMLElement).id
  }

  // 蛇移动方法
  run() {
    let X = this.snake.X
    let Y = this.snake.Y
    switch(this.direction) {
      case 'up':
        Y -= 10
        break
      case 'down':
        Y += 10
        break
      case 'left':
        X -= 10
        break
      case 'right':
        X += 10
        break
    }
    // 调用方法检测是否吃到食物
    this.checkEat(X,Y)
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (error) {
      // 游戏结束
      alert((error as Error).message + 'GAME OVER!');
      this.isLive = false
    }
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  // 检测蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if(X === this.food.X && Y === this.food.Y) {
      // 食物位置重置
      this.food.change(this.snake.bodies)
      // 分数增加
      this.scorePanel.addScore()
      // 蛇增加一节
      this.snake.addBody()
    }
  }
  // 创建控制器
  createControl() {
    // 生成控制器元素
    this.control.insertAdjacentHTML('beforeend','<button id="up" style="height:50px;width:100px;">上</botton>')
    this.control.insertAdjacentHTML('beforeend','<button id="down" style="height:50px;width:100px;">下</botton>')
    this.control.insertAdjacentHTML('beforeend','<button id="left" style="height:50px;width:100px;">左</botton>')
    this.control.insertAdjacentHTML('beforeend','<button id="right" style="height:50px;width:100px;">右</botton>')
    this.control.style.width = '200px'
    this.control.style.margin = '-48px auto'
    this.control.style.position = 'relative'
    const up = document.getElementById('up')!
    const down = document.getElementById('down')!
    const left = document.getElementById('left')!
    const right = document.getElementById('right')!
    up.style.position = 'absolute'
    down.style.position = 'absolute'
    left.style.position = 'absolute'
    right.style.position = 'absolute'
    up.style.top = '0'
    up.style.left = '50px'
    left.style.top = '50px'
    left.style.left = '0'
    down.style.top = '100px'
    down.style.left = '50px'
    right.style.top = '50px'
    right.style.left = '100px'
    up.addEventListener('click',this.keyClickHandler.bind(this))
    down.addEventListener('click',this.keyClickHandler.bind(this))
    left.addEventListener('click',this.keyClickHandler.bind(this))
    right.addEventListener('click',this.keyClickHandler.bind(this))
  }
}

export default GameControlM