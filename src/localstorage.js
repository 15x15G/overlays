
function saveItem(namespace, key, value) {
    let storage = localStorage.getItem(namespace);
    if (!storage) {
        storage = {};
    } else {
        storage = JSON.parse(storage);
    }
    storage[key] = value;
    localStorage.setItem(namespace, JSON.stringify(storage));
}
function loadItem(namespace, key, def = undefined) {
    const storage = localStorage.getItem(namespace);
    return storage ? JSON.parse(storage)[key] || def : def;
}
function loadAll(namespace) {
    const storage = localStorage.getItem(namespace);
    return JSON.parse(storage);
}
function removeItem(namespace, key) {
    const storage = localStorage.getItem(namespace);
    if (storage) {
        delete JSON.parse(storage)[key]
    }
}
export {
    saveItem,
    loadItem,
    loadAll,
    removeItem
};
