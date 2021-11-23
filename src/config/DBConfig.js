export const DBConfig = {
    name: "MyDB",
    version: 1,
    objectStoresMeta: [
      {
        store: "baby",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "fullName", keypath: "fullName", options: { unique: false } },
          { name: "createdAt", keypath: "createdAt", options: { unique: false } }
        ]
      }
    ]
  };
  