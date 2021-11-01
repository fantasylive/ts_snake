import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

class GameControl{
  // 蛇
  snake: Snake
  // 食物
  food: Food
  // 记分牌
  scorePanel: ScorePanel
  // 存储按键方向
  direction: string = ''
  // 游戏是否结束
  isLive: Boolean = true
  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()
    this.init()
  }
  // 游戏初始化方法
  init() {
    // 绑定键盘事件
    document.addEventListener('keydown',this.keyDownHandler.bind(this))
    this.run()
  }
  keyDownHandler(event: KeyboardEvent) {
    // 注意此函数执行时的this并不是GameControl对象而是document,使用bind进行绑定
    const keys = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight']
    if(keys.includes(event.key)) {
      this.direction = event.key
    }
  }

  // 蛇移动方法
  run() {
    let X = this.snake.X
    let Y = this.snake.Y
    switch(this.direction) {
      case 'ArrowUp':
        Y -= 10
        break
      case 'ArrowDown':
        Y += 10
        break
      case 'ArrowLeft':
        X -= 10
        break
      case 'ArrowRight':
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
}

export default GameControl