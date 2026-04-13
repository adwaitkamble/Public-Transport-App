const mongoose = require("mongoose");
require("dotenv").config();

const Bus = require("./models/Bus");
const Route = require("./models/Route");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await Bus.deleteMany({});
    await Route.deleteMany({});

    // Seed Buses
    const buses = await Bus.insertMany([
      {
        busNumber: "21A",
        routeName: "Station → City Center",
        crowdLevel: "Medium",
        eta: "5 min",
        isOnTime: true,
        distance: "7.2 KM",
        duration: "25 min",
        totalStops: 5,
        stops: [
          { name: "Station", time: "10:00 AM", isActive: false },
          { name: "Park Street", time: "10:07 AM", isActive: false },
          { name: "MG Road", time: "10:12 AM", isActive: true },
          { name: "City Hospital", time: "10:18 AM", isActive: false },
          { name: "City Center", time: "10:25 AM", isActive: false },
        ],
      },
      {
        busNumber: "45B",
        routeName: "Suburb → Downtown",
        crowdLevel: "High",
        eta: "2 min",
        isOnTime: true,
        distance: "12.5 KM",
        duration: "40 min",
        totalStops: 8,
        stops: [
          { name: "Suburb Terminal", time: "10:00 AM", isActive: false },
          { name: "Green Park", time: "10:08 AM", isActive: false },
          { name: "Lake View", time: "10:15 AM", isActive: true },
          { name: "Tech Park", time: "10:22 AM", isActive: false },
          { name: "Central Mall", time: "10:30 AM", isActive: false },
          { name: "Old Town", time: "10:35 AM", isActive: false },
          { name: "Market Square", time: "10:38 AM", isActive: false },
          { name: "Downtown", time: "10:40 AM", isActive: false },
        ],
      },
      {
        busNumber: "12C",
        routeName: "Airport → City Center",
        crowdLevel: "High",
        eta: "8 min",
        isOnTime: false,
        distance: "18.0 KM",
        duration: "58 min",
        totalStops: 10,
        stops: [
          { name: "Airport", time: "09:30 AM", isActive: false },
          { name: "Highway Junction", time: "09:40 AM", isActive: false },
          { name: "Industrial Area", time: "09:48 AM", isActive: true },
          { name: "Ring Road", time: "09:55 AM", isActive: false },
          { name: "University", time: "10:02 AM", isActive: false },
          { name: "Stadium", time: "10:08 AM", isActive: false },
          { name: "Hospital Road", time: "10:15 AM", isActive: false },
          { name: "MG Road", time: "10:20 AM", isActive: false },
          { name: "Station", time: "10:25 AM", isActive: false },
          { name: "City Center", time: "10:28 AM", isActive: false },
        ],
      },
      {
        busNumber: "33D",
        routeName: "Station → Mall",
        crowdLevel: "Low",
        eta: "12 min",
        isOnTime: true,
        distance: "5.5 KM",
        duration: "24 min",
        totalStops: 6,
        stops: [
          { name: "Station", time: "11:00 AM", isActive: false },
          { name: "Park Avenue", time: "11:05 AM", isActive: false },
          { name: "Library", time: "11:10 AM", isActive: true },
          { name: "School Road", time: "11:14 AM", isActive: false },
          { name: "Sports Complex", time: "11:18 AM", isActive: false },
          { name: "City Mall", time: "11:24 AM", isActive: false },
        ],
      },
      {
        busNumber: "19A",
        routeName: "Suburb → Station",
        crowdLevel: "Low",
        eta: "15 min",
        isOnTime: true,
        distance: "9.0 KM",
        duration: "30 min",
        totalStops: 7,
        stops: [
          { name: "Suburb Terminal", time: "10:30 AM", isActive: false },
          { name: "Residential Area", time: "10:36 AM", isActive: false },
          { name: "School Road", time: "10:42 AM", isActive: true },
          { name: "Market", time: "10:47 AM", isActive: false },
          { name: "Temple Road", time: "10:52 AM", isActive: false },
          { name: "Bus Stand", time: "10:56 AM", isActive: false },
          { name: "Station", time: "11:00 AM", isActive: false },
        ],
      },
    ]);

    console.log(`✅ Seeded ${buses.length} buses`);

    // Seed Routes
    const routes = await Route.insertMany([
      {
        from: "Station",
        to: "City Center",
        buses: ["21A", "45B"],
        transfers: 1,
        departureTime: "10:25 AM",
        arrivalTime: "11:00 AM",
        estimatedTime: "35 min",
        crowdLevel: "Medium",
        isRecommended: true,
      },
      {
        from: "Station",
        to: "City Center",
        buses: ["21A", "45B"],
        transfers: 1,
        departureTime: "10:25 AM",
        arrivalTime: "11:00 AM",
        estimatedTime: "35 min",
        crowdLevel: "Medium",
        isRecommended: false,
      },
      {
        from: "Station",
        to: "City Center",
        buses: ["12C"],
        transfers: 0,
        departureTime: "10:30 AM",
        arrivalTime: "11:00 AM",
        estimatedTime: "30 min",
        crowdLevel: "High",
        isRecommended: false,
      },
      {
        from: "Station",
        to: "City Center",
        buses: ["21A", "19A"],
        transfers: 1,
        departureTime: "10:25 AM",
        arrivalTime: "11:05 AM",
        estimatedTime: "40 min",
        crowdLevel: "Low",
        isRecommended: false,
      },
      {
        from: "Airport",
        to: "City Center",
        buses: ["12C"],
        transfers: 0,
        departureTime: "09:30 AM",
        arrivalTime: "10:28 AM",
        estimatedTime: "58 min",
        crowdLevel: "High",
        isRecommended: true,
      },
      {
        from: "Suburb",
        to: "Downtown",
        buses: ["45B"],
        transfers: 0,
        departureTime: "10:00 AM",
        arrivalTime: "10:40 AM",
        estimatedTime: "40 min",
        crowdLevel: "High",
        isRecommended: true,
      },
      {
        from: "Station",
        to: "Mall",
        buses: ["33D"],
        transfers: 0,
        departureTime: "11:00 AM",
        arrivalTime: "11:24 AM",
        estimatedTime: "24 min",
        crowdLevel: "Low",
        isRecommended: true,
      },
    ]);

    console.log(`✅ Seeded ${routes.length} routes`);
    console.log("\n🎉 Database seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedData();
