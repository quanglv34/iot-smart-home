import app from "./modules/app";
import * as dotenv from 'dotenv'
import swaggerDoc from "./modules/swagger";
dotenv.config()

const port = 8000

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
    swaggerDoc(app, port)
})
