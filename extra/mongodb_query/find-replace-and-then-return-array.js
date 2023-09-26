db.getCollection('row-data-events-url-2023').aggregate([
    {
      $match: { "url": /2023/i }
    },
    {
      $project: {
        _id: 0,
        modified_url: {
          $replaceAll: { input: "$url", find: "2023", replacement: "2024" }
        }
      }
    },
    {
      $group: {
        _id: null,
        urls: { $push: "$modified_url" }
      }
    },
    {
      $project: {
        _id: 0
      }
    }
  ])
  