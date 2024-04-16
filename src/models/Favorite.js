import mongoose from "mongoose";

const NewFavorliteSchema = new mongoose.Schema(
  {
    uid: String,
    accountID: String,
    backdrop_path: String,
    poster_path: String,
    movieID: Number,
    type: String,
  },
  { timestamps: true }
);

const Favorites =
  mongoose.models.Favorites || mongoose.model("Favorites", NewFavorliteSchema);

export default Favorites;
