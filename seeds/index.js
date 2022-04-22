const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/Campground');

main().then(() => { console.log("Database connected"); })
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}

const sample = array=>array[Math.floor(Math.random()*array.length)];

const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i=0; i<300;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
       const camp =  new Campground({
           author: '625daf8c70b5fc7658a1e7cc',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum sequi qui facilis in vel non amet, quibusdam dolore dignissimos a ipsum quis ex placeat velit inventore voluptas exercitationem quod incidunt.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
                ]

            },
            images: [
                {
                    url: 'https://res.cloudinary.com/shrey1012/image/upload/v1650468001/YelpCamp/q7d2as9ufknmowwpelqq.jpg',
                    filename: 'YelpCamp/q7d2as9ufknmowwpelqq',
              
                },
                {
                    url: 'https://res.cloudinary.com/shrey1012/image/upload/v1650490491/YelpCamp/m6vukqymoyhfltltjlke.jpg',
                    filename: 'YelpCamp/m6vukqymoyhfltltjlke'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});