import express from 'express'

const file = express()

file.get("/movies", (req, res) => {
    res.send("this should be the notes")
})

file.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

file.listen(8080, () => {
    console.log('Server is running on port 8080')
})