const userModel = require('../models/userModels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).send({ message: 'User Already Exist', success: false })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body)
        await newUser.save();
        res.status(201).send({ message: 'Register Successfully', success: true });


    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Register Controller ${error.message}` })
    }
}
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({ message: `user not found`, success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: `Invalid Email or Password `, success: false })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.status(200).send({ message: "login successfull", success: true, token })


    } catch (error) {
        console.log(error)
        res.status(500).send({ message: `Error in loginController ${error.message}` })

    }
};




module.exports = { loginController, registerController }






// const userModel = require('../models/userModels');
// const bcrypt = require('bcrypt');

// const registerController = async (req, res) => {
//     try {
//         const existingUser = await userModel.findOne({ email: req.body.email });
//         if (existingUser) {
//             return res.status(409).send({ message: 'User Already Exists', success: false });
//         }
//         const password = req.body.password;
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         req.body.password = hashedPassword;
//         const newUser = new userModel(req.body);
//         await newUser.save();
//         res.status(201).send({ message: 'Registered Successfully', success: true });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ success: false, message: `Register Controller ${error.message}` });
//     }
// };

// const loginController = async (req, res) => {
//     // Implement login logic here
//     res.status(200).send({ message: 'Login endpoint' });
// };

// module.exports = { loginController, registerController };









// const userModel = require('../models/userModels');
// const bcrypt = require('bcrypt');

// const registerController = async (req, res) => {
//     try {
//         // Check if email and password are provided
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).send({ message: 'Email and password are required', success: false });
//         }

//         // Check if the user already exists
//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).send({ message: 'User Already Exists', success: false });
//         }

//         // Generate salt and hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create and save the new user
//         const newUser = new userModel({ ...req.body, password: hashedPassword });
//         await newUser.save();

//         res.status(201).send({ message: 'Registered Successfully', success: true });
//     } catch (error) {
//         console.error('Error in registerController:', error);
//         res.status(500).send({ success: false, message: `Register Controller Error: ${error.message}` });
//     }
// };

// const loginController = async (req, res) => {
//     // Implement login logic here
//     res.status(200).send({ message: 'Login endpoint' });
// };

// module.exports = { loginController, registerController };
