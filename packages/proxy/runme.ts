class TargetClass {
    #value
    constructor(x: number) {
        this.#value = x;
    }

    showValue() {
        return this.#value;
    }
}

interface ExtendedProxy extends TargetClass {
    new(a: number): ExtendedProxy;
    hello: string;   // Additional method
    extraValue: number;   // Additional property
}

const handler: ProxyHandler<typeof TargetClass> = {
    construct(target2, args: [number], newTarget) {
        console.log(`Creating new instance with args: ${args}`);
        console.log('wrapped class object [%o]', target2);
        return new target2(...args);
    },
    get(target, p, receiver) {
        console.log('get/receiver: [%o]', receiver);
        return 4;
    }
};


const proxy = new Proxy(TargetClass, handler) as unknown as ExtendedProxy;
const instance = new proxy(10); // Logs: Creating new instance withfunction (x: number) { this.value = x; } args: 10
console.log(instance.showValue());   // 10
console.log(instance.hello);
