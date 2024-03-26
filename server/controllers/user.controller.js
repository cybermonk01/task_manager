// import { uploadOnCloudinary } from "../config/cloudinary.js";
// import asyncHandler from "../utils/asyncHandler";
// import ApiError from "../utils/ApiError";
// import ApiResponse from "../utils/ApiResponse";

// export const registerUser = asyncHandler(async (req, res) => {
//   /***
//    * get user details from frontend
//    * validation- not empty
//    * check if user already exists:usrname, email
//    * check for images, check for avatar
//    * upload them to cloudinary, avatar
//    * create user object -create entry in db
//    * remove password and referesh token field from response
//    * check for user creation
//    * return res
//    */

//   const { fullName, email, userName, password } = req.body;
//   console.log("email", email);

//   if (
//     [fullName, email, userName, password].some((field) => field?.trim() === "")
//   ) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const existedUser = await userName.findOne({
//     $or: [{ userName }, { email }],
//   });

//   if (existedUser) {
//     throw new ApiError(409, "User with email and username already exists");
//   }

//   const avatarLocalPath = req.files?.avatar[0]?.path;
//   const coverImageLocalPath = req.file?.coverImage[0]?.path;

//   if (!avatarLocalPath) {
//     throw new ApiError(400, "Avatar file is required");
//   }

//   const avatar = await uploadOnCloudinary(avatarLocalPath);
//   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

//   if (!avatar) {
//     throw new ApiError(400, "avatar is required");
//   }

//   User.create({
//     fullName,
//     avatar: avatar.url,
//     coverImage: coverImage?.url || "",
//     email,
//     password,
//     userName: userName.toLowerCase(),
//   });

//   const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   if (!createdUser) {
//     throw new ApiError(500, "Something went wrong registering the user");
//   }

//   return res
//     .status(201)
//     .json(new ApiResponse(200, createdUser, "User registered successully"));
// });
