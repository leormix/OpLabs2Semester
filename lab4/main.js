class BiDirectionalPriorityQueue {
    constructor() {
        this.queue = [];
        this.insertCounter = 0;
    }

    enqueue(item, priority) {
        this.queue.push({
            item,
            priority,
            order: this.insertCounter++
        });
    }
}