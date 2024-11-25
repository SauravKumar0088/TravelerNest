const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
app.use(express.static('public'));

app.use(express.static(path.join(__dirname,"/public")));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:/TravelerNest");
}
main()
  .then(() => {
    console.log("connecting to Mongo");
  })
  .catch((err) => {
    console.log("Failed to connect to Mongo");
    console.log(err);
  });

// app.get("/testlistings", async (req, res) => {
//     try {
//         let sample = new Listing({
//             title: "My new villa",
//             description: "This is a sample listing.",
//             price: 1500,
//             location: "New Delhi",
//             country: "India",
//         });

//         await sample.save();
//         console.log("Listing saved successfully");
//         res.send("Listing saved successfully");
//     } catch (error) {
//         console.error("Error saving listing:", error);
//         res.status(500).send("Error saving listing");
//     }
// });

//! create or index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { items: allListings });
});

//!ContctUs

app.get("/AboutUs", (req, res) => {
  res.render("listings/About");
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

// ! New or Add route
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

//! Create or Save route
app.post("/listings", async (req, res) => {
  let newListings = new Listing(req.body.listing);
  await newListings.save();
  console.log(req.body.listing);
  res.redirect("/listings");
});

//! show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/show", { item: listing });
});

//!Edit route
app.get('/listings/:id/edit', async (req, res) => {
    let { id } = req.params;
  let listing = await Listing.findById(id);
res.render("listings/edit", { item: listing});
})
//!Update route
app.put('/listings/:id', async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });  //(id, req.body.listing, {new: true});
    res.redirect(`/listings/${id}`);
});

//!DELETE route
app.delete('/listings/:id', async (req, res) => {
    let { id } = req.params;
    console.log(`ID received: ${id}`);
        let deletelisting = await Listing.findByIdAndDelete(id);
        console.log(deletelisting);
        res.redirect('/listings');

});

app.get("/", (req, res) => {
  res.redirect("/listings");
});
app.listen(8080);

