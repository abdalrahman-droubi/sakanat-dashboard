const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./db');
const port = 8181;

// Middleware
app.use(cors());
app.use(express.json());

// ? -------------------------------- mais -------------------------------- 
//! Get users data
app.get('/usersData', async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//! Add user data
app.post('/addUser', async (req, res) => {
    try {
        const { user_name, user_email, user_password, role } = req.body;

        const addUser = await pool.query(
            "INSERT INTO users(user_name, user_email, user_password, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [user_name, user_email, user_password, role]
        );

        res.json(addUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
});


// ! soft delete users
app.put('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Instead of deleting the user, update the 'deleted' column to indicate it's soft deleted
        await pool.query("UPDATE users SET deleted = true WHERE user_id = $1", [id]);
        res.json('Your user has been soft deleted.');
    } catch (err) {
        console.error(err.message);
        res.status(500).json('An error occurred while soft deleting the user.');
    }
});

//! Update a Specific Record
app.put('/mais/:user_id', async function (req, res) {
    try {
        const { user_id } = req.params;
        let id0 = req.body.id;
        let role = req.body.role;
        console.log(id0)
        if (role == "serviceProvider") {
            role = "user"
        } else { role = "serviceProvider" }

        const record = await pool.query("UPDATE users SET role = $1 WHERE user_id = $2",
            [role, id0]);
        res.send("Updated Successfully");
    }
    catch (err) { console.log(err.message); }
});

// ! contact us form 


// Get contact data
app.get("/getContact", async (req, res) => {
    try {
        const allContactInfo = await pool.query("SELECT * FROM contactus");
        res.json(allContactInfo.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update contact information
app.put("/contactus00/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const { email, phone_number, location_link } = req.body;

        const updatedContact = await pool.query(
            "UPDATE contactus SET email = $1, phone_number = $2, location_link = $3 WHERE id = $4",
            [email, phone_number, location_link, id]
        );

        res.json(updatedContact.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




//! get about team data
app.get('/getTeam', async (req, res) => {
    try {
        const allTeamInfo = await pool.query("SELECT * FROM aboutus");
        res.json(allTeamInfo.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Failed to fetch team data' });
    }
});

// ! update about team data
app.put('/editTeam/:id', async function (req, res) {
    try {
        const { id } = req.params;
        const { name, role, github, linkedin } = req.body;

        await pool.query(
            "UPDATE aboutus SET name = $1, role = $2, github = $3, linkedin = $4 WHERE id = $5",
            [name, role, github, linkedin, id]
        );

        res.json({ message: 'Team data updated successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: 'Failed to update team data' });
    }
});



// //! updat vision about information
// app.put('/editVision/:id', async function (req, res) {
//     try {
//         const { id } = req.params;
//         const { title, vision } = req.body;
//         const user = await pool.query("UPDATE visionAbout SET title = $1 ,vision = $2 WHERE id = $3 ", [title, vision, id]);
//         res.json(user.rows);
//     } catch (error) {
//         console.log(error.message);

//     }
// })


// ? -------------------------------- mais -------------------------------- 


// * -------------------------------- majd --------------------------------
// ! get pitch
app.get('/bookings', async (req, res) => {

    try {

        const allbookings = await pool.query("SELECT * FROM bookings WHERE deleted = false ")
        res.json(allbookings)

    } catch (err) {
        console.error(err.message);
    }
})

// ! pitch update
app.put('/bookings/:id', async (req, res) => {
    const { id } = req.params;

    try {

        const softdeletebooking = await pool.query("UPDATE bookings SET deleted = true WHERE id=$1", [id])
        res.json('booking is deleted')
    } catch (err) {
        console.error(err.message);
    }
})

//! pitch delete
app.delete('pitch/:id', async (req, res) => {
    try {

        await pool.query("DELETE FROM pitch WHERE id =$1 ", [id])
        res.json('your pitch is declained ')
    } catch (err) {
        console.error(err.message);

    }
})
// * -------------------------------- majd --------------------------------



// ? ----------------------------- wesam & mufid --------------------------
// get pitches
app.get("/getdatas", (req, res) => {
    const query = "SELECT * FROM pitch;";

    pool
        .query(query)
        .then((result) => {
            const pitches = result.rows.map((pitch) => {
                const base64ImageDatas = pitch.images.map((imageData) =>
                    Buffer.from(imageData).toString("base64")
                );
                return { ...pitch, images: base64ImageDatas };
            });
            res.json(pitches);
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
            const errorMessage = "Error retrieving data";
            res.status(500).json({ error: errorMessage });
        });
});
// get pitch with user
app.get("/getpitchwithuser", (req, res) => {
    const query =
        "SELECT p.id, p.name, p.price, p.size, p.details, p.description, p.location, p.deleted, u.user_name " +
        "FROM pitch p " +
        "JOIN users u ON p.provider_id = u.user_id";

    pool
        .query(query)
        .then((result) => {
            const data = result.rows;
            res.json(data);
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
            res.status(500).send("Error retrieving data");
        });
});

// APPROVE
app.put("/pitch/:id/:isDeleted", async (req, res) => {
    const { id, isDeleted } = req.params;

    try {
        const client = await pool.connect();
        await client.query("BEGIN");

        const updateQuery = "UPDATE pitch SET deleted = $1 WHERE id = $2";
        await client.query(updateQuery, [isDeleted, id]);

        await client.query("COMMIT");
        res.status(200).json({ message: "Update successful" });
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Error updating pitch:", error);
        res
            .status(500)
            .json({ error: "An error occurred while updating the pitch" });
    }
});

// ? ----------------------------- wesam & mufid --------------------------



app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
