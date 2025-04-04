const Client = require('../models/Client');
const Admin = require('../models/Admin');
const Note = require('../models/Note');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const getAllClients = async (req, res) => {
  // Get all users from MongoDB
  const users = await Client.find().lean().populate('trader').populate('scripts'); // Prevent picking password-field
  // If no users 
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' });
  }

  if(!req.admin.roles.includes('superadmin')){
    return res.json(users.filter(user => !user.deleted));
  }

  return res.json(users);
}

const createNewClient = async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

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

const updateClientNewTrader = async (req, res) => {
  const { id, trader, active } = req.body

  if (!id || typeof active !== 'boolean') {
    return res.status(400).json({ message: 'All fields except password are required' })
  }
  const newTrader = await Admin.findOne({ username: trader });

  const userRes = await Client.findByIdAndUpdate( { _id: id }, { $set: { 
    updatedAt: Date.now(),
    trader: newTrader._id
  }}, { new: true });

  console.log(userRes)
  console.log(trader)
  const user = userRes.toObject();

  if (!user) {
    return res.status(400).json({ message: 'Client not found' })
  }

  res.json({ message: `${user.username} updated` })
}

const updateClient = async (req, res) => {
  const { id, firstName, lastName, email, active, password, trader } = req.body
  const client = req.body;

  if (!id || typeof active !== 'boolean') {
    return res.status(400).json({ message: 'All fields except password are required' })
  }

  const user = await Client.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'Client not found' })
  }

  const duplicate = await Client.findOne({ email }).exec()

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate username' })
  }

  console.log('user-------------------------')
  console.log(user)
  console.log('client-------------------------')
  console.log(client)
  const mustbe = { ...user.toObject(), ...client, updatedAt: Date.now() };
  delete mustbe._id;
  console.log('mustbe-------------------------')
  console.log(mustbe)
  const updatedClient = await Client.findOneAndUpdate({ _id: new mongoose.ObjectId(req.body.id) }, mustbe, { overwrite: true, new: true });
  console.log('updatedClient-------------------------')
  console.log(updatedClient)

  if (password) {
    // Hash password 
    user.password = await bcrypt.hash(password, 10) // salt rounds 
  }

  user.save();

  res.json({ message: `${updatedClient.username} updated` })
}

const deleteClient = async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Client ID Required' })
  }

  const note = await Note.findOne({ user: id }).lean().exec()
  if (note) {
    return res.status(400).json({ message: 'Client has assigned notes' })
  }

  const user = await Client.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'Client not found' })
  }

  user.deleted = true;
  const result = await user.save();
  console.log(result);

  const reply = `Clientname ${result.username} with ID ${result._id} deleted`;

  res.json(reply)
}

module.exports = {
  getAllClients,
  createNewClient,
  updateClient,
  updateClientNewTrader,
  deleteClient
}
