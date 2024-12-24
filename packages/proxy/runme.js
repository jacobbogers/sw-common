"use strict";
class TargetClass {
    #value;
    constructor(x) {
        this.#value = x;
    }
    showValue() {
        return this.#value;
    }
}
const handler = {
    construct(target2, args, newTarget) {
        console.log(`Creating new instance with args: ${args}`);
        console.log('wrapped class object [%o]', target2);
        return newTarget;
    },
    get(target, p, receiver) {
        console.log('get/receiver: [%o]', receiver);
        return 4;
    }
};
const proxy = new Proxy(TargetClass, handler);
const instance = new proxy(10); // Logs: Creating new instance withfunction (x: number) { this.value = x; } args: 10
//console.log(instance.showValue()); // 10
console.log(instance.hello);
