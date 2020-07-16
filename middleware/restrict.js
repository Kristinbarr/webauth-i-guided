// const bcrypt = require('bcryptjs')
// const Users = require('../users/users-model')

function restrict() {
    const authError = {
        message: "Invalid Credentials",
    }

	return async (req, res, next) => {
        try {
            // const { username, password } = req.headers
            
            // // make sure values aren't empty
            // if (!username  || !password) {
            //     return res.status(401).json(authError)
            // }

            // // make sure user exists in database
            // const user = await Users.findBy({ username }).first()
            // if (!user) {
            //     return res.status(401).json(authError)
            // }
            
            // // hash the password again and see if it matches what we have in the database
            // const passwordValid = await bcrypt.compare(password, user.password)
            // if (!passwordValid) {
            //     return res.status(401).json(authError)
            // }

            // checking session instead of rehashing password
            if (!req.session || !req.session.user) {
                return res.status(401).json(authError)
            }

            // if we reach this point in the code, the user is authorized
            next()
        } catch (err) {
            next(err)
        }
    }
}

module.exports = restrict