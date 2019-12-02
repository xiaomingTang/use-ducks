# [use-ducks](https://github.com/xiaomingTang/use-ducks)

### start
```
yarn add use-ducks
```

### exports
```typescript
import { useDyingDuck, useTenaciousDuck } from "use-ducks"
/**
 * 最终会死的鸭子
 * delayMs之后会死
 * 死了可以执行awake救活(如果允许续命的话, 活着也可以续命)
 * 但是活了delayMs之后又会死
 * @param delayMs 延迟ms之后会死
 * @param xuMing 如果允许续命, 则awake后能更新计时器, 再活一个delayMs
 */
export declare function useDyingDuck(delayMs: number, xuMing?: boolean): [boolean, () => void];

function FunctionalComps() {
  const [isDying, awake] = useDyingDuck(2000)
  return <button onClick={awake}>
    {
      isDying
        ? "死了"
        : "还活的"
    }
  </button>
}

/**
 * 坚强的鸭子
 * 被kill之后, 能苟活delayMs才会死
 * 如果非常坚强(isVeryTenacious), 则苟活期间再次被kill, 还能刷新苟活时间
 * 但是awake之后就可以保持不死
 * 直到再次被残忍地kill
 * @param delayMs
 * @param isVeryTenacious
 */
export declare function useTenaciousDuck(delayMs: number, isVeryTenacious?: boolean): [boolean, () => void, () => void];

function FunctionalComps() {
  const [isDying, awake, kill] = useTenaciousDuck(2000)
  return <>
    <button onClick={awake}>救活</button>
    { isDying ? "死了" : "还活着" }
    <button onClick={kill}>杀掉</button>
  </>
}
```

### 项目特点
- typescript + react
- eslint
- autoprefixer全家桶
- scss module (利用了typings-for-css-modules-loader)
- dev模式下代码不经过eslint-loader, 以加速开发时的编译(该阶段配合编辑器进行eslint)
- prod模式下启用eslint-loader, 以使代码更加严谨
- 集成`webpack-bundle-analyzer`, 一键(`yarn run bundle`)分析打包状况

### warning
由于该项目主要个人独自使用, 因此将`.vscode`配置也上传到了git, 如其他人使用, 则你需要自主考虑将`.vscode`上传到git是否合适(可能会影响到同时使用该项目的其他人)
