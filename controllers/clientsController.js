const Client = require('../models/Client');
const Note = require('../models/Note');
const bcrypt = require('bcrypt');

// @desc Get all users
// @route GET /users
// @access Private
const getAllClients = async (req, res) => {
    // Get all users from MongoDB
    const users = await Client.find().lean(); // Prevent picking password-field

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' });
    }

    res.json(users);
}

// @desc Create new user
// @route POST /users
// @access Private
const createNewClient = async (req, res) => {
    const { username, password, roles } = req.body;

    // Confirm data
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await Client.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hashedPwd }
        : { username, "password": hashedPwd, roles }

    // Create and store new user 
    const user = await Client.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

// @desc Update a user
// @route PATCH /users
// @access Private
const updateClient = async (req, res) => {
    const { id, firstName, lastName, email, active, password, trader } = req.body
  const client = req.body;
  console.log(trader);

    const updatedClient = await Client.findOneAndUpdate({ email }, { trader }, { new: true });
  console.log(updatedClient)

   return res.json({ message: `${updatedClient.username} updated` })
   

    // Confirm data 
    if (!id || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await Client.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'Client not found' })
    }

    // Check for duplicate 
    const duplicate = await Client.findOne({ email }).exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    const user2 = await Client.updateOne({ email }, { trader });

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    res.json({ message: `${updatedClient.username} updated` })
}

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteClient = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Client ID Required' })
    }

    // Does the user still have assigned notes?
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'Client has assigned notes' })
    }

    // Does the user exist to delete?
    const user = await Client.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'Client not found' })
    }

    const result = await user.deleteOne()

    const reply = `Clientname ${result.username} with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllClients,
    createNewClient,
    updateClient,
    deleteClient
}
