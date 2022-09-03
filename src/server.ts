import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {deleteLocalFiles, filterImageFromURL} from './util/util';

(async () => {

    // Init the Express application
    // const cors = require('cors');
    const app = express();
    // app.use(cors())

    // Set the network port
    const port = process.env.PORT || 8082;

    // Use the body parser middleware for post requests
    app.use(bodyParser.json());


    /**************************************************************************** */
    app.get("/filteredimage/", async (req: Request, res: Response) => {
        const {image_url} = req.query;
        if (!image_url) {
            res.status(400).send("image url is required");
        }
        const filtered_image = await filterImageFromURL(image_url);
        res.status(200).sendFile(filtered_image, () => {
            deleteLocalFiles([filtered_image]);
        });
    });


    //! END @TODO1

    // Root Endpoint
    // Displays a simple message to the user
    app.get("/", async (req, res) => {
        res.send("try GET /filteredimage?image_url={{}}")
    });


    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
})();