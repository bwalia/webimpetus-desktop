interface Item {
    id: string;
    startingDate: Date;
    startingTime: number;
}

export class IndexedDBService {
    private dbName: string;
    private dbVersion: number;
    private tableName: string;

    constructor(dbName: string, dbVersion: number, tableName: string) {
        this.dbName = dbName;
        this.dbVersion = dbVersion;
        this.tableName = tableName;

        this.initDatabase();
    }

    private async initDatabase() {
        const db = await this.openDatabase();
        db.close();
    }

    private async openDatabase(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                reject(new Error("Failed to open database"));
            };

            request.onsuccess = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.tableName)) {
                    db.createObjectStore(this.tableName, { keyPath: "id", autoIncrement: true });
                }
            };
        });
    }

    async addItem(item: Item): Promise<void> {
        const db = await this.openDatabase();
        const transaction = db.transaction([this.tableName], "readwrite");
        const store = transaction.objectStore(this.tableName);

        await new Promise<void>((resolve, reject) => {
            const request = store.add(item);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(new Error("Failed to add item"));
            };
        });

        transaction.oncomplete = () => {
            db.close();
        };
    }

    async getItem(id: string): Promise<Item | undefined> {
        const db = await this.openDatabase();
        const transaction = db.transaction([this.tableName], "readonly");
        const store = transaction.objectStore(this.tableName);

        return new Promise<Item | undefined>((resolve, reject) => {
            const request = store.get(id);
            request.onsuccess = (event) => {
                resolve((event.target as IDBRequest).result as Item);
              };
            request.onerror = () => {
                reject(new Error("Failed to get item"));
            };
        });
    }

    async getAllItems(): Promise<Item[]> {
        const db = await this.openDatabase();
        const transaction = db.transaction([this.tableName], "readonly");
        const store = transaction.objectStore(this.tableName);

        return new Promise<Item[]>((resolve, reject) => {
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result as Item[]);
            };

            request.onerror = () => {
                reject(new Error("Failed to get all items"));
            };
        });
    }

    async updateItem(item: Item): Promise<void> {
        const db = await this.openDatabase();
        const transaction = db.transaction([this.tableName], "readwrite");
        const store = transaction.objectStore(this.tableName);

        await new Promise<void>((resolve, reject) => {
            const request = store.put(item);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(new Error("Failed to update item"));
            };
        });

        transaction.oncomplete = () => {
            db.close();
        };
    }

    async deleteItem(id: string): Promise<void> {
        const db = await this.openDatabase();
        const transaction = db.transaction([this.tableName], "readwrite");
        const store = transaction.objectStore(this.tableName);

        await new Promise<void>((resolve, reject) => {
            const request = store.delete(id);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(new Error("Failed to delete item"));
            };
        });

        transaction.oncomplete = () => {
            db.close();
        };
    }
}


