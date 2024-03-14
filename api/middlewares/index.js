const { verify } = require('jsonwebtoken')
const User = require('../models/user.model')

const isAuth = (req, res, next) => {
  try {
    if (!req.headers.token) { 
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }

    verify(req.headers.token, process.env.JWT_SECRET, async (err, data) => {
      if (err) { 
        return res
          .status(401)
          .send({ success: false, message: "Unauthorized" });
      }
      
      const email = data.email;
      const user = await User.findOne({ email });

      if(!user) { 
        return res.status(500).send({ success: false, message:'Unauthorized' });
      }
  
      res.locals.user = user;
      next();
    });
  } catch(error) {
    res.status(500).send({
      success: false,
      message: "Unauthorized",
      description: error.message,
    });
  }
  
}

const isAdmin = async (req, res, next) => {
  if(res.locals.user.role === 'worker') { 
    return res.status(500).send({ success: false, message: "Unauthorized" });
  }

  next();
}

const isWizard = async (req, res, next) => {
  if(res.locals.user.role !== 'wizard') { 
    return res.status(500).send({ message:'Unauthorized' });
  }

  next();
}

module.exports = { 
  isAuth,
  isAdmin,
  isWizard
}