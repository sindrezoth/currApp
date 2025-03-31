const mongoose = require('mongoose');
const Script = require('../models/Script.js');
const Client = require('../models/Client.js');

const createNewScript = async (req, res) => {
  const {info, list} = req.body;

  const client = await Client.findOne({email: info.clientEmail});
  if(client){
    const newScript = await Script.create({info, list});

    client.scripts.push(newScript._id);
    await client.save();
  }


  res.json({ client, status: 'ok'});
}

module.exports = { createNewScript }
