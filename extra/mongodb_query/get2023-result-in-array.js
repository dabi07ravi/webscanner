db.getCollection('row-data-events-url-core').find({"url" : /2023/i},{_id : 0}).toArray(function(err, documents) {
    if (err) throw err;
    console.log(documents);
});
