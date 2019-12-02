import { useState, useCallback } from "react"

/**
 * 最终会死的鸭子
 * delayMs之后会死
 * 死了可以执行awake救活(如果允许续命的话, 活着也可以续命)
 * 但是活了delayMs之后又会死
 * @param delayMs 延迟ms之后会死
 * @param xuMing 如果允许续命, 则awake后能更新计时器, 再活一个delayMs
 */
export function useDyingDuck(delayMs: number, xuMing = true): [boolean, () => void] {
  const [isDying, setIsDying] = useState(true)
  const [timer, setTimer] = useState(-1)

  const resetTimer = useCallback(() => {
    if (xuMing) {
      if (timer !== -1) { // 存在timer则清空
        clearTimeout(timer)
      }
      console.log("setTimeout")
      const tempTimer = window.setTimeout(() => {
        setIsDying(true)
        setTimer(-1)
      }, delayMs)
      setTimer(tempTimer)
    } else if (timer === -1) {
      console.log("setTimeout")
      const tempTimer = window.setTimeout(() => {
        setIsDying(true)
        setTimer(-1)
      }, delayMs)
      setTimer(tempTimer)
    }
  }, [timer, delayMs, xuMing])

  const awake = useCallback(() => {
    resetTimer()
    if (isDying) {
      setIsDying(false)
    }
  }, [isDying, resetTimer])

  return [isDying, awake]
}

/**
 * 坚强的鸭子
 * 被kill之后, 能苟活delayMs才会死
 * 如果非常坚强(isVeryTenacious), 则苟活期间再次被kill, 还能刷新苟活时间
 * 但是awake之后就可以保持不死
 * 直到再次被残忍地kill
 * @param delayMs
 */
export function useTenaciousDuck(delayMs: number, isVeryTenacious = true): [boolean, () => void, () => void] {
  const [isDying, setIsDying] = useState(false)
  const [keepAlived, setKeepAlived] = useState(false)
  const [timer, setTimer] = useState(-1)

  const awake = useCallback(() => {
    if (timer !== -1) {
      clearTimeout(timer)
      setTimer(-1)
    }
    if (!keepAlived) {
      setKeepAlived(true)
    }
    if (isDying) {
      setIsDying(false)
    }
  }, [isDying, keepAlived, timer])

  const kill = useCallback(() => {
    if (keepAlived) {
      setKeepAlived(false)
    }
    if (!isDying) {
      if (isVeryTenacious) {
        clearTimeout(timer)
        const tempTimer = window.setTimeout(() => {
          setIsDying(true)
        }, delayMs)
        setTimer(tempTimer)
      } else if (timer === -1) {
        const tempTimer = window.setTimeout(() => {
          setIsDying(true)
        }, delayMs)
        setTimer(tempTimer)
      }
    }
  }, [isDying, keepAlived, timer, delayMs, isVeryTenacious])

  return [isDying, awake, kill]
}
