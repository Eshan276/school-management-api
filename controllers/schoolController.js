const pool = require("../config/db");

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate input
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const latLonRegex = /^-?\d+(\.\d+)?$/;

  if (!latLonRegex.test(latitude) || !latLonRegex.test(longitude)) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude must be valid numbers" });
  }
  // Ensure latitude and longitude are floats
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || isNaN(lon)) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude must be valid numbers" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, lat, lon]
    );
    res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  // Validate input
  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  // Regular expression to validate latitude and longitude
  const latLonRegex = /^-?\d+(\.\d+)?$/;

  if (!latLonRegex.test(latitude) || !latLonRegex.test(longitude)) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude must be valid numbers" });
  }
  console.log(latitude, longitude);
  // Ensure latitude and longitude are floats
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  try {
    const [schools] = await pool.query("SELECT * FROM schools");

    const sortedSchools = schools
      .map((school) => {
        const distance =
          calculateDistance(
            lat,
            lon,
            school.latitude,
            school.longitude
          ).toFixed(2) + " km";
        return { ...school, distance };
      })
      .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    res.json(sortedSchools);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};
