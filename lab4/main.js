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
}