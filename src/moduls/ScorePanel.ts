// 定义记分牌类
class ScorePanel{
  score = 0
  level = 1
  // 分数和等级所在元素
  scoreEle: HTMLElement
  levelEle: HTMLElement

  // 限制等级
  maxLevel: number
  // 几分升一级
  upScore: number

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  // 加分
  addScore() {
    this.scoreEle.innerHTML = ++this.score + ''
    // 每10分升一级
    if(this.score % this.upScore === 0) {
      this.levelUp()
    }
  }
  // 提升等级
  levelUp() {
    if(this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
}

export default ScorePanel