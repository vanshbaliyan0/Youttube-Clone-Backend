import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user .models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullname, email, username, password} = req.body //to get user details from frontend
    console.log("email:", email)

    if(
        [fullname, email, username, password].some((field) => 
        field?.trim === "")
    ) {
        throw new ApiError(400, "All fields are required")  //to check validation not empty
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if(existingUser){
        throw new ApiError(409, "User with email or username already exists")  
    } //check if user already exists: username, email

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required") //checks for images, checks for avatar
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath) 
    const coverImage = await uploadOnCloudinary(coverImageLocalPath) //upload them to cloudinary

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required") //checks for avatar again as it is required field
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    }) //create user object - create entry in db

    const createdUser = await User.findById(user._id).select( 
        "-password -refreshToken" //remove password and refresh token field from response(additional benifit of above code)
    )

    if (!createdUser) { //check for user creation
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    
     return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    ) // return res
})

export {registerUser}


