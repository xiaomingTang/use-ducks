/**
 * 最终会死的鸭子
 * delayMs之后会死
 * 死了可以执行awake救活(如果允许续命的话, 活着也可以续命)
 * 但是活了delayMs之后又会死
 * @param delayMs 延迟ms之后会死
 * @param xuMing 如果允许续命, 则awake后能更新计时器, 再活一个delayMs
 */
export declare function useDyingDuck(delayMs: number, xuMing?: boolean): [boolean, () => void];
/**
 * 坚强的鸭子
 * 被kill之后, 能苟活delayMs才会死
 * 如果非常坚强(isVeryTenacious), 则苟活期间再次被kill, 还能刷新苟活时间
 * 但是awake之后就可以保持不死
 * 直到再次被残忍地kill
 * @param delayMs
 */
export declare function useTenaciousDuck(delayMs: number, isVeryTenacious?: boolean): [boolean, () => void, () => void];
