const Client = require('../models/Client');
const Note = require('../models/Note');
const Script = require('../models/Script');

const getAllInvestments = async (req, res) => {
  const scripts = await Script.find({});
  const client = await Client.find({email: req.client.email});
  
  const filteredScripts = scripts.map(scriptMong => {
      const script = scriptMong.toObject();
      const {info, list } = script;
      const lastI = list.length - 1;
      if(list[lastI][0] < Date.now()) {
        info.status = 'finished';
      }
      else {
        info.status = 'inprocess';
      }

      return {id: script._id.toString(), info, list: list.filter(p => p[0] < Date.now()) }
    })
    .filter(script => script.clientId === client._id)

  //console.log(filteredScripts.length)

  res.json(filteredScripts);
}

module.exports = {
  getAllInvestments,
};
