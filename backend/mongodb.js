const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'productsdb';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.error('Unable to connect to database');
  }

  console.log('Connection succussful !!');

  const db = client.db(dbName);

  db.collection('products').insertOne({
    name: 'Dell Latitude E4500',
    costPrice: 700,
    sellPrice: 850,
    quantity: 10,
  }, (error, result) => {
    if (error) {
      return console.error('Unable insert document in user !');
    }

    console.log(result.ops);
  });

});