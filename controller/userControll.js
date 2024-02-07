// const userModel=require('../model/user')
// const jwt=require('jsonwebtoken')
// const bcrypt = require('bcrypt');
// const secretKey = process.env.JWT_SECRET;
//
// const users = [];
//
// const signUp = async (req, res) => {
//     const { username, password, role } = req.body;
//
//     try {
//         // Check if the user already exists in the mock database
//         const existingUser = users.find((user) => user.username === username);
//
//         if (existingUser) {
//             res.status(409).json({ success: false, message: 'User with this username already exists' });
//         } else {
//             // Hash the password
//             const hashedPassword = await bcrypt.hash(password, 10);
//
//             // Simulate creating a user in the mock database
//             const newUser = {
//                 id: users.length + 1, // Replace with your actual ID generation logic
//                 username: username,
//                 password: hashedPassword,
//                 role: role
//             };
//
//             users.push(newUser);
//
//             // Generate a JWT token
//             const token = jwt.sign({ userId: newUser.id, username: newUser.username, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//
//             res.status(201).json({ success: true, message: 'User created successfully', token: token });
//         }
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ success: false, message: 'Error creating user.' });
//     }
// };
//
// const signIn=(req ,res=>{
//
// })
//
// module.exports={signUp,signIn};
