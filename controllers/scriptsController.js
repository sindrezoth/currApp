const mongoose = require('mongoose');
const Script = require('../models/Script.js');
const Client = require('../models/Client.js');
const Admin = require('../models/Admin.js');

const getAllScripts = async (req, res) => {
  const scripts = await Script.find({})
    //.populate('trader')
    //.populate('client');

  if (scripts) {
    return res.json(
      scripts.map(script => {
        const {_id, start, duration} = script;
        script.id = _id;
        if(start + duration < Date.now()) {
          script.finished = false;
        }
        else { 
          script.finished = true;
        }

        
        return script;
      })
    );
  }

  return res.json({ message: 'Скрипты не найдены.' })
}

const createNewScript = async (req, res) => {
  const {admin: adminus} = req;
  const {info, list} = req.body;

  console.log(info);
  const admin = await Admin.findOne({username: adminus.username});

  info.creatorId = admin._id.toString();
  const client = await Client.findOne({email: info.clientEmail});
  if(client){
    const newScript = await Script.create({info, list});

    client.scripts.push(newScript._id);
    await client.save();
  }
  res.json({ client, status: 'ok'});
}

const deleteScript = async (req, res) => {
  const {admin} = req;
  const scriptId = req.body.id;

  const resu = await Script.findByIdAndRemove(scriptId);

  res.status(204);
  res.json({ scriptId, status: 'removed'});
}

module.exports = { 
  getAllScripts, 
  createNewScript,
  deleteScript
};
