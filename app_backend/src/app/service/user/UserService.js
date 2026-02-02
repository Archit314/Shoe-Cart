import bcrypt from 'bcryptjs' // Importing bcrypt for hashing passwords
import jwt from 'jsonwebtoken' // Importing jsonwebtoken for creating JWT tokens

const db = await import('../../../models/index.js')
const {User} = db.default

export default class UserService{

    async generateHashPassword(password){

        try {
            const salt = await bcrypt.genSalt(10)   // This method is to generate a random string called a "salt" which is added to a password before hashing, making the resulting hash unique and more secure against rainbow table attacks
            const encryptedPassword = await bcrypt.hash(password, salt)

            console.log('Password hashed successfully');
            return encryptedPassword
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async generateJwtToken(tokenPayload, res){

        // Creating JWT token:
        const jwtToken = await jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        })

        // Setting jwt token in user cookies:
        await res.cookie("jwt_token", jwtToken, {
            maxAge: 3600000, // 1 hour (60 * 60 * 1000)
            httpOnly: true, // Prevent xss attacks cross-site scripting attacks
            sameSite: process.env.NODE_ENV !== "development"? "none": "lax", // CSRF attacks cross-site request forgery attacks or // Allows cross-site requests
            secure: process.env.NODE_ENV !== "development" // Ensures cookie is only sent over HTTPS
        })

        console.log('Token generated successfully');
        return jwtToken
    }

    async userSignUp(fullName, email, password, confirmPassword, mobileNumber, res){

        // Safety checks it user already exist with email or mobile number
        const existUserWithEmail = await User.findOne({ where: { email } });
        if(existUserWithEmail){
            return {status: 422, message: `Usre already exist with email: ${email}`}
        }

        if(mobileNumber){
            const existUserWithMobile = await User.findOne({ where: { mobile_number: mobileNumber } });
            if(existUserWithMobile){
                return {status: 422, message: `User already exist with mobile number: ${mobileNumber}`}
            }
        }

        const encryptedPassword = await this.generateHashPassword(password)
        if(!encryptedPassword){
            return {status: 500, message: `User signup process failed`}
        }

        // Creating new user on mongo DB cluster:
        const newUser = new User({
            name: fullName,
            mobile_number: mobileNumber,
            email: email,
            password: encryptedPassword,
            confirmPassword: confirmPassword
        })

        if(newUser){
            // Generating new JWT token:
            const generatedJwtToken = await this.generateJwtToken({userId: newUser.id, mobileNumber: newUser.mobile_number, email: newUser.email}, res)
            if(!generatedJwtToken){
                return {status: 422, message: `User registration failed`}
            }
            // Saving new user on mongoDB cluster:
            await newUser.save()
            console.log('user generated successfully');

            // Generating response for frontend:
            const response = {
                userId: newUser.id,
                name: newUser.name,
                mobileNumber: newUser.mobile_number,
                email: newUser.email,
                accessToken: generatedJwtToken
            }
            return {status: 200, message: `User signup successfully`, data: response}
        }
        else{
            return {status: 422, message: `Failed to signup user into our system`}
        }
    }

    async getJwtToken(password, encryptedPassword, tokenObject, res){

        const passwordCorrect = await bcrypt.compare(password, encryptedPassword)
        if (!passwordCorrect) {
            return false
        }
        console.log('Enter password and encrypted password are equal');

        // Generating JWT token:
        const generatedToken = await this.generateJwtToken(tokenObject, res)
        if(!generatedToken){
            return false
        }

        return generatedToken
    }

    async userSignIn(email, password, res){

        const user = await User.findOne({ where: { email } });
        if(!user){
            return {status: 422, message: `User not exist with email: ${email}`}
        }

        const tokenObject = {
            userId: user.id,
            email: user.email,
            mobileNumber: user.mobile_number
        }

        const getJwtToken = await this.getJwtToken(password, user.password, tokenObject, res)
        if(!getJwtToken){
            return {status: 422, message: `Incorrect credentials`}
        }

        return {status: 200, message: `User sign-in successfully`, data: getJwtToken}
    }
}