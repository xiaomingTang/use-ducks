import React from "react"
import ReactDom from "react-dom"
import { useDyingDuck, useTenaciousDuck } from "../index/index"

const app = document.querySelector("#app") as HTMLDivElement

function DuckState(isDying: boolean) {
  return isDying
    ? <span style={{ color: "red" }}>死</span>
    : <span style={{ color: "green" }}>活</span>
}

const delayMs = 2000

function DyingDuckTest() {
  const [isDying, awake] = useDyingDuck(delayMs)
  return <>
    <h2>useDyingDuck test</h2>
    <pre>{`delayMs = ${delayMs}
/**
 * 最终会死的鸭子
 * delayMs之后会死
 * 死了可以执行awake救活(如果允许续命的话, 活着也可以续命)
 * 但是活了delayMs之后又会死
 * @param delayMs 延迟ms之后会死
 * @param xuMing 如果允许续命, 则awake后能更新计时器, 再活一个delayMs
 */`}</pre>
    <button onClick={() => {
      awake()
    }}>救活鸭子</button>
    鸭子现在是【{DuckState(isDying)}】的
  </>
}

function TenaciousDuckTest() {
  const [isDying, awake, kill] = useTenaciousDuck(delayMs)
  return <>
    <h2>useTenaciousDuck test</h2>
    <pre>{`delayMs = ${delayMs}
/**
 * 坚强的鸭子
 * 被kill之后, 能苟活delayMs才会死
 * 如果非常坚强(isVeryTenacious), 则苟活期间再次被kill, 还能刷新苟活时间
 * 但是awake之后就可以保持不死
 * 直到再次被残忍地kill
 * @param delayMs
 */`}</pre>
    <button onClick={() => {
      awake()
    }}>救活鸭子</button>
    鸭子现在是【{DuckState(isDying)}】的
    <button onClick={() => {
      kill()
    }}>杀了鸭子</button>
  </>
}

function App() {
  return <>
    <DyingDuckTest />
    <hr />
    <TenaciousDuckTest />
  </>
}

ReactDom.render(
  <App />,
  app,
)
