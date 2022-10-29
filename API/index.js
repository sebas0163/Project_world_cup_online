const dotenv = require('dotenv');
const app = require("./server.js");

dotenv.config()

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server running on port ${port}`));