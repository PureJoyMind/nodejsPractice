const mongoose = require('mongoose');


const id = new mongoose.Types.ObjectId();
const idStr = id.toString();

console.log("id ", idStr);