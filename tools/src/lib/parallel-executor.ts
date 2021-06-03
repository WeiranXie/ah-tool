export class ParallelExecutor<T> {
  private promises: Promise<void>[]
  private index: number = 0

  private results: Promise<T>[] = []

  constructor(concurrency: number) {
    this.promises = new Array<Promise<void>>(concurrency)
    for (let i = 0; i < concurrency; i ++) this.promises[i] = Promise.resolve()
  }

  get parallelism() {
    return this.promises.length
  }

  enqueue(task: () => T | Promise<T>) {
    let resolve: (result: T) => void
    let reject: (error: any) => void

    this.results.push(new Promise<T>((resolver, rejector) => {
      resolve = resolver
      reject = rejector
    }))

    this.index = (this.index + 1) % this.promises.length
    this.promises[this.index] = this.promises[this.index].then(() => {
      return Promise.resolve().then(() => task()).then(resolve, reject)
    })
  }

  await(): Promise<T[]> {
    return Promise.all(this.results.splice(0))
  }
}
