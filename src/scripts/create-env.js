const fs = require('fs')

fs.writeFileSync(
  './.env.production',
  `UNSPLASH_API_ACCESS=${
    process.env.UNSPLASH_API_ACCESS
  }\nUNSPLASH_API_SECRET=${process.env.UNSPLASH_API_SECRET}`,
)
