const express = require("express");
const path = require("path");
const { createDbConnection, insertRow, updateRow } = require("./db");

const db = createDbConnection();
const PORT = 3000 || process.env.PORT;

const app = express();

app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

app.get("/info/:id", (req, res, next) => {
    const id = parseInt(req.params['id']);
    db.serialize(() => {
        db.all("SELECT * FROM info WHERE id = ?", [id], (err, row) => {
            if (err) {
                console.log(err.message);
            }
            res.status(200).send({ row });
        })
    })
})



app.post("/info", (req, res, next) => {
    const { id, battery_percentage, latitude, longitude } = req.body;


    db.serialize(() => {
        db.all(
            `UPDATE info SET battery_percentage = ?, latitude = ? , longitude = ? WHERE id = ?`,
            [battery_percentage,latitude,longitude,id],
            (error) => {
                if(error)
                    console.error(error.message);
                res.status(200).send({ "message": "success" });
            }
        )
    });

})


app.listen(PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:/${PORT}`)
})