const OS = require('../models/ordem-servico.js');
//const sequelize = ('../app');

exports.post = async(data) =>{
    const os = new OS(data);
    await os.save();
}

