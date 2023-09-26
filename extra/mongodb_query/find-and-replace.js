db.getCollection('row-data-events-url-2023').aggregate([
    {
      $match: { "url": /2023/i }
    },
    {
      $project: {
        modified_url: {
          $replaceAll: { input: "$url", find: "2023", replacement: "2024" }
        }
      }
    }
  ])
  