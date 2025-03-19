const Admin = require('../models/Admin');
const Note = require('../models/Note');
const bcrypt = require('bcrypt');

const getAllAdmins = async (req, res) => {
    const users = await Admin.find().lean(); // Prevent picking password-field

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' });
    }

    res.json(users);
}

// @desc Create new user
// @route POST /users
// @access Private
const createNewAdmin = async (req, res) => {
    const { username, password, roles } = req.body;

    // Confirm data
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await Admin.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hashedPwd }
        : { username, "password": hashedPwd, roles }

    // Create and store new user 
    const user = await Admin.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

// @desc Update a user
// @route PATCH /users
// @access Private
const updateAdmin = async (req, res) => {
    const { id, firstName, lastName, username, roles, active, password, other } = req.body

    // Confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await Admin.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'Admin not found' })
    }

    // Check for duplicate 
    const duplicate = await Admin.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedAdmin = await user.save()

    res.json({ message: `${updatedAdmin.username} updated` })
}

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteAdmin = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Admin ID Required' })
    }

    // Does the user still have assigned notes?
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'Admin has assigned notes' })
    }

    // Does the user exist to delete?
    const user = await Admin.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'Admin not found' })
    }

    const result = await user.deleteOne()

    const reply = `Adminname ${result.username} with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllAdmins,
    createNewAdmin,
    updateAdmin,
    deleteAdmin
}
