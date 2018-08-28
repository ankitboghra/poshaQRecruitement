const client = "mongodb://localhost:27017/";
const dbName = "demo";
collectionName = "test";
bucketSize = 2;

const submission = async (client, dbName, collectionName, bucketSize) => {
  // var client = client;
  // var dbName = dbName;
  // var bucketSize = bucketSize

  let promise = new Promise((resolve, reject) => {
    //Code for connection
    //Connection
    const connection = await MongoClient.connect(client, { useNewUrlParser: true });
    const db = connection.db(dbName);
    //Code ends for connection
  })
  //Code for data fetch
  let promise1 = new Promise((resolve, reject) => {
    db.collection(collectionName, function (err, collection) {
      collection
        .find()
        .toArray(function (err, data) {
          let cary = {};
          data.map(curData => {
            cary[curData.category] = [...(cary[curData.category] || []),
            curData._id];
          });
        })
    })
  })
  //Code ends for data fetch

  //Code for data aggregation using loadash.js
  let promise2 = new Promise((resolve, reject) => {
    Object.keys(cary).map(ans => {
      let tempAns = {
        category: ans,
        id: cary[ans]
      };
      console.log(tempAns.category);
      console.log(_lodash.chunk(tempAns.id, bucketSize));
    });
  });
  //Code ends for data aggregation using loadash.js
}
submission();

connection.close();