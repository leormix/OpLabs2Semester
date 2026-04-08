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

    _getSelectedIndex(type) {
        if (this.queue.length === 0) return -1;

        let selectedIndex = 0;

        for (let i = 1; i < this.queue.length; i++) {
            const current = this.queue[i];
            const selected = this.queue[selectedIndex];

            switch (type) {
                case 'highest':
                    if (current.priority > selected.priority) selectedIndex = i;
                    break;
                case 'lowest':
                    if (current.priority < selected.priority) selectedIndex = i;
                    break;
                case 'oldest':
                    if (current.order < selected.order) selectedIndex = i;
                    break;
                case 'newest':
                    if (current.order > selected.order) selectedIndex = i;
                    break;
            }
        }

        return selectedIndex;
    }

    peek(type) {
        const index = this._getSelectedIndex(type);
        return index !== -1 ? this.queue[index].item : null;
    }

    dequeue(type) {
        const index = this._getSelectedIndex(type);
        if (index === -1) return null;

        const [removed] = this.queue.splice(index, 1);
        return removed.item;
    }
}

const bdpq = new BiDirectionalPriorityQueue();

bdpq.enqueue("Task A", 10);
bdpq.enqueue("Task B", 50);
bdpq.enqueue("Task C", 5);
bdpq.enqueue("Task D", 20);


console.log(bdpq.peek("highest"));
console.log(bdpq.peek("lowest"));
console.log(bdpq.peek("oldest"));
console.log(bdpq.peek("newest"));


console.log(bdpq.dequeue("highest"));
console.log(bdpq.dequeue("lowest"));
console.log(bdpq.queue.length);


console.log(bdpq.peek("highest"));
console.log(bdpq.peek("oldest"));