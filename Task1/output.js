const client = "mongodb://localhost:27017/";
const dbName = "demo";
collectionName = "test";
bucketSize = 2;

const submission = async (client, dbName, collectionName, bucketSize) => {
  var client = client;
  var dbName = dbName;
  var bucketSize = bucketSize

  let promise = new Promise((resolve, reject) => {
    //Code for data fetch and aggregation

    //Code end
    setTimeout(console.log("code"), 1000);
    // resolve("done!")
  })

  submission(client, dbName, collectionName, bucketSize).then(resolve("done"));

  let ans = await submission;

  console.log("loadash");
  //code for bucket from loadash

}

submission();