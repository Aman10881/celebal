function fetchData(callback) {
    setTimeout(() => {
        // Simulating a network request
        const data = { name: 'John', age: 30 };
        callback(null, data);
    }, 1000);
}

function fetchAdditionalData(data, callback) {
    setTimeout(() => {
        // Simulating another network request
        if (data.name) {
            data.address = '123 Main St';
            callback(null, data);
        } else {
            callback(new Error('Name not found'), null);
        }
    }, 1000);
}

function processData(callback) {
    fetchData((err, data) => {
        if (err) {
            return callback(err);
        }
        fetchAdditionalData(data, (err, updatedData) => {
            if (err) {
                return callback(err);
            }
            callback(null, updatedData);
        });
    });
}

processData((err, result) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Result:', result);
    }
});

// Refactored Code Using Promises and Async/Await

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulating a network request
            const data = { name: 'John', age: 30 };
            resolve(data);
        }, 1000);
    });
}

function fetchAdditionalData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulating another network request
            if (data.name) {
                data.address = '123 Main St';
                resolve(data);
            } else {
                reject(new Error('Name not found'));
            }
        }, 1000);
    });
}

async function processData() {
    try {
        const data = await fetchData();
        const updatedData = await fetchAdditionalData(data);
        return updatedData;
    } catch (err) {
        throw err;
    }
}

(async () => {
    try {
        const result = await processData();
        console.log('Result:', result);
    } catch (err) {
        console.error('Error:', err);
    }
})();
