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