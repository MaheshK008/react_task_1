const employee = require("./models/employee");
const crypto = require("crypto");
const { secretKey, algorithm } = require("../../config");
const jwt = require("jsonwebtoken");
const projects = require("./models/projects");

module.exports.registerEmployee = async (req) => {
  try {
    const { name, employeeId, email, mobileNo, password } = req;
    let checkEmployeeId = await employee.findOne({
      employeeId,
      status: "active",
    });
    if (checkEmployeeId) {
      return {
        msg: "EmployeeId already Exists",
        status: 400,
        data: null,
      };
    }

    let checkEmail = await employee.findOne({ email, status: "active" });
    if (checkEmail)
      return {
        msg: "Email already Exists",
        status: 400,
        data: null,
      };

    let salt = crypto.randomBytes(16).toString("hex");
    let hashedPwd = crypto
      .pbkdf2Sync(password, salt, 100, 16, algorithm)
      .toString("hex");

    let newEmployee = new employee({
      name,
      employeeId,
      email,
      mobileNo,
      password: hashedPwd,
      salt,
    });

    let data = await newEmployee.save();

    return {
      msg: "Success",
      status: 200,
      data:"Success"
    };
  } catch (err) {
    return {
      msg: "Internal Server Error",
      status: 500,
      data: null,
    };
  }
};

module.exports.login = async (req) => {
  try {
    const { email, password } = req;
    const user = await employee.findOne({ email, status: "active" });
    if (!user) {
      return {
        msg: "User does not exist!",
        status: 400,
        data: null,
      };
    }

    let hashedPwd = crypto
      .pbkdf2Sync(password, user.salt, 100, 16, algorithm)
      .toString("hex");
    if (hashedPwd !== user.password) {
      return {
        msg: "Password incorrect, please try again!",
        status: 400,
        data: null,
      };
    }

    let payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: 3600000 });
    return {
      msg: "Login successfully",
      status: 200,
      data: {
        id: user._id,
        employeeId: user.employeeId,
        email: user.email,
        mobileNo: user.mobileNo,
        token,
      },
    };
  } catch (error) {
    return {
      msg: "Internal Server Error",
      status: 500,
      data: null,
    };
  }
};

module.exports.fetchProjects = async(req)=>{
  try {
    const user = await employee.findById(req.user.id);
    if(!user){
      return {
        msg: "User not found",
        status: 400,
        data: null,
      };
    }
    const projectsList = await projects.find({employeeId:user.employeeId,status:"active"},{_id:0,name:1,code:1});
    return {
      msg: "Success",
      status: 200,
      data: projectsList,
    };

  } catch (error) {
    console.log(error);
    return {
      msg: "Internal Server Error",
      status: 500,
      data: null,
    };
  }   
}
