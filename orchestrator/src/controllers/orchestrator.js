const service = require("../services/service");

module.exports = {
  init,
};

async function init(req, res) {
  const body = req.body;
  const result = await service.init(body);
  
  if (result.success) {
    res.status(201).json({ 
      message: result.message, 
      data: result.data,
      status: result.status,
    });
  } else {
    res.status(500).json({ 
      message: result.message, 
      error: result.error 
    });
  }
}
