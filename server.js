const app = require('./src/app');
const connectDB = require('./src/config/db');
const { PORT } = require('./src/config/env');

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});
