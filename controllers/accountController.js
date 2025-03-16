const Client = require('../models/Client');
const Note = require('../models/Note');
const bcrypt = require('bcrypt');

const accountDetails = async (req, res) => {
  const email = req.client.email;
  const client = await Client.findOne({ email }).select('-password').lean(); // Prevent picking password-field

  if(!client) {
    res.status(404).json({ message: 'Cannot find client with this email: ' + email })
  }

  res.json(client);
}

const updateAccount = async (req, res) => {
  const { email, phone, country, firstname, lastname } = req.body;
  console.log(req.body)

  if (!email || !phone || !country) {
    return res.status(400).json({ message: 'Почта, телефон, и страна проживания должны быть заполнены.' });
  }

  const client = await Client.findOne({ email }).select('-password').lean().exec(); // Prevent picking password-field

  if (!client) {
    return res.status(400).json({ message: 'Client not found' });
  }

  const clientWithId = await Client.findById(client._id).exec();

  clientWithId.email = email;
  clientWithId.phone = phone;
  clientWithId.country = country;
  clientWithId.firstname = firstname;
  clientWithId.lastname = lastname;

  const updatedClient = await clientWithId.save();

  res.json({ email: updatedClient.email,
    country: updatedClient.country,
    phone: updatedClient.phone,
    firstname: updatedClient.firstname,
    lastname: updatedClient.lastname
  });
}

const deleteAccount = async (req, res) => {

  res.json({ message: 'deleteAccount' });
}

const updateClient = async (req, res) => {
    const { id, firstName, lastName, username, roles, active, password, other } = req.body

    // Confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await Client.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'Client not found' })
    }

    // Check for duplicate 
    const duplicate = await Client.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

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

    const updatedClient = await user.save()

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
  accountDetails,
  updateAccount,
  deleteAccount
};
