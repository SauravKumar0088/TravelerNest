const mongoose = require('mongoose')
const initdata = require('./data.js')
const Listing = require('../models/listing.js')

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/TravelerNest')
}
main().then(()=>{
    console.log('Connected to MongoDB')
})
.catch(err => console.log(err))

const initDB = async function (){
    await Listing.deleteMany({})
    await Listing.insertMany(initdata.data)
    console.log('Data inserted successfully')
}
initDB();