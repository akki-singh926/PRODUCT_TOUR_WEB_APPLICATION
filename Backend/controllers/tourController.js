import Tour from "../models/Tour.js";

// Create a new tour
export const createTour = async (req, res) => {
  try {
    const { title, description, isPublic } = req.body;

    const tour = await Tour.create({
      user: req.user._id,
      title,
      description,
      steps: [], // initially empty
      isPublic
    });

    res.status(201).json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all tours for a user
export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find({ user: req.user._id });
    res.json(tours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get single tour by ID
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    // Increment views
    tour.views += 1;
    await tour.save();

    res.json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a tour
// Update a tour
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    tour.title = req.body.title || tour.title;
    tour.description = req.body.description || tour.description;
    tour.isPublic = req.body.isPublic ?? tour.isPublic;

    // ✅ Make sure steps get saved
    if (req.body.steps) {
      tour.steps = req.body.steps;
    }

    const updatedTour = await tour.save();
    res.json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a tour
export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    if (tour.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    await tour.deleteOne();
    res.json({ message: "Tour removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Add step to a tour
export const addStep = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    // Multer saved the file to uploads/steps
    const imageUrl = `/uploads/steps/${req.file.filename}`;
    const step = { imageUrl, annotation: req.body.annotation || "" };

    tour.steps.push(step);
    await tour.save();

    res.status(201).json(tour.steps[tour.steps.length - 1]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
