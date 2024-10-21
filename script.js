class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        // Validate input
        if (typeof key !== 'string') {
            throw new Error("Key must be a string");
        }

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let pairs of bucket) {
            if (pairs[0] === key) {
                pairs[1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size >= this.loadFactor * this.capacity) {
            this.increaseSize();
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let pairs of bucket) {
            if (pairs[0] === key) {
                return pairs[1];
            }
        }
        return null;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let pairs of bucket) {
            if (pairs[0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    entries() {
        const entriesArray = [];
        for (let bucket of this.buckets) {
            for (let pairs of bucket) {
                entriesArray.push(pairs);
            }
        }
        return entriesArray;
    }

    keys() {
        const keysArray = [];
        for (let bucket of this.buckets) {
            for (let pairs of bucket) {
                keysArray.push(pairs[0]);
            }
        }
        return keysArray;
    }

    values() {
        const valuesArray = [];
        for (let bucket of this.buckets) {
            for (let pairs of bucket) {
                valuesArray.push(pairs[1]);
            }
        }
        return valuesArray;
    }

    increaseSize() {
        const currentBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        for (let bucket of currentBuckets) {
            for (let pairs of bucket) {
                this.set(pairs[0], pairs[1]);
            }
        }
    }
}

module.exports = HashMap;
