import asyncHandler from "express-async-handler";
import Property from "../models/propertyModel.js";
import User from "../models/userModel.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description controller function for fetching all properties
 */
export const getAllProperties = asyncHandler(async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(201).json({
      message: "Fetched properties successfully",
      payload: {
        properties,
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error(`Could not fetch properties - ${error.message}`);
  }
});

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description controller function for adding property
 */
export const addProperty = asyncHandler(async (req, res) => {
  const {
    propertyName,
    rent,
    rentType,
    propertyType,
    location,
    numberOfBedrooms,
    numberOfBathrooms,
    length,
    breadth,
  } = req.body;
  const owner = await User.findById(req.user._id);
  if (!owner) {
    res.status(400);
    throw new Error("Owner not found!");
  }
  const propertyExists = await Property.findOne({ propertyName });
  if (propertyExists) {
    res.status(400);
    throw new Error("Property exists with same name");
  }
  try {
    const newProperty = await Property.create({
      propertyName,
      rent,
      rentType,
      propertyType,
      location,
      numberOfBedrooms,
      numberOfBathrooms,
      length,
      breadth,
      owner: owner._id,
    });
    owner.properties.push(newProperty);
    await owner.save();
    res.status(200).send({
      message: "Property Added successfully",
    });
  } catch (error) {
    res.status(400);
    throw new Error(`Could not create property - ${error.message}`);
  }
});

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description controller function for fetching properties which belongs to certain users
 */
export const getUserProperties = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id)
    .select("-password")
    .populate("properties");

  if (!currentUser) {
    res.status(400);
    throw new Error("User not found!");
  }

  res.status(200).json({
    message: "Fetched properties for this user",
    payload: {
      properties: currentUser.properties,
    },
  });
});

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description controller function for updating properties which belongs to certain users
 */
export const updateProperty = asyncHandler(async (req, res) => {
  const { id: propertyId } = req.params;
  const currentUser = await User.findById(req.user._id);
  if (!currentUser) {
    res.status(400);
    throw new Error("User not found!");
  }

  const propertyBelongsToUser = currentUser.properties.find(
    (property) => property._id === propertyId
  );
  if (!propertyBelongsToUser) {
    res.status(400);
    throw new Error("Property does not belong to this user!");
  }

  const property = await Property.findById(propertyId);
  if (!property) {
    res.status(400);
    throw new Error("Property does not exist");
  }
  const {
    propertyName,
    rent,
    rentType,
    propertyType,
    location,
    numberOfBedrooms,
    numberOfBathrooms,
    length,
    breadth,
  } = req.body;

  property.propertyName = propertyName || property.propertyName;
  property.rent = rent || property.rent;
  property.rentType = rentType || property.rentType;
  property.propertyType = propertyType || property.propertyType;
  property.location = location || property.location;
  property.numberOfBathrooms = numberOfBathrooms || property.numberOfBathrooms;
  property.numberOfBedrooms = numberOfBedrooms || property.numberOfBedrooms;
  property.length = length || property.length;
  property.breadth = breadth || property.breadth;

  const updatedProperty = await property.save();

  res.status(201).json({
    message: "Property updated successfully!",
    payload: {
      property: updatedProperty,
    },
  });
});

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description controller function for updating properties which belongs to certain users
 */
export const deleteProperty = asyncHandler(async (req, res) => {
  const { id: propertyId } = req.params;
  const currentUser = await User.findById(req.user._id);
  if (!currentUser) {
    res.status(400);
    throw new Error("User not found!");
  }

  const propertyBelongsToUser = currentUser.properties.find(
    (property) => property._id === propertyId
  );
  if (!propertyBelongsToUser) {
    res.status(400);
    throw new Error("Property does not belong to this user!");
  }
  await Property.deleteOne({ _id: propertyId });
  res.status(200).json({
    message: `Property with id ${propertyId} deleted successfully`,
  });
});
