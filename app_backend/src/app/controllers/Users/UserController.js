import UserService from "../../service/user/UserService.js";

export const signUp = async (req, res) => {

    try {
        
        const {fullName, mobileNumber, email, password, confirmPassword} = req.body;

        if(!fullName || !email || !password || !confirmPassword || !mobileNumber) {
            return res.status(422).json({status: 422, message: "All fields are required"});
        }

        if(password.length < 6) {
            return res.status(422).json({status: 422, message: "Password must be at least 6 characters long"});
        }

        if(password !== confirmPassword) {
            return res.status(422).json({status: 422, message: "Passwords do not match"});
        }

        const userService = new UserService()
        const createdUser = await userService.userSignUp(fullName, email, password, confirmPassword, mobileNumber, res)
        
        if(createdUser.status != 200){
            return res.status(createdUser.status).json({status: createdUser.status, message: createdUser.message})
        }

        return res.status(createdUser.status).json({status: createdUser.status, message: createdUser.message, data: createdUser.data});
    } catch (error) {
        console.log('Error in UserController signUp:', error.message);
        return res.status(500).json({status: 500, message: "Internal Server Error"});
    }
}

export const signIn = async (req, res) => {

    try {

        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(422).json({status: 422, message: "Email and password are required"});
        }

        const userService = new UserService()
        const getSignInDetail = await userService.userSignIn(email, password, res)
        if(getSignInDetail.status !== 200){
            return res.status(getSignInDetail.status).json({status: getSignInDetail.status, message: getSignInDetail.message})
        }

        return res.status(getSignInDetail.status).json({status: getSignInDetail.status, message: getSignInDetail.message, data: getSignInDetail.data});
        
    } catch (error) {
        console.log('Error in UserController signIn:', error.message);
        return res.status(500).json({status: 500, message: "Internal Server Error"});
    }
}

export const logout = async (req, res) => {
    try {

        const requestCookie = req.cookies.jwt_token;
        if(!requestCookie){
            return res.status(422).json({status: 422, message: `User not logged in`})
        }
        
        res.clearCookie('jwt_token')
        console.log(`User cookie remoced successfully`);

        return res.status(200).json({status: 200, message: `User logged out successfully`})
    } catch (error) {
        console.log(`Error in UserController -> logout: `, error.message);
        return res.status(500).json({status: 500, message: `Internal server error`})
    }
}

export const checkAuth = async (req, res) => {

    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log(`Error in UserController -> checkAuth: `, error.message);
        return res.status(500).json({status: 500, message: `Internal server error`})
    }
}