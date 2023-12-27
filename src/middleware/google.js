import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { User } from "../users/usersModel.js"

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_URL,
    },
    async function (_, __, profile, cb) {
        console.log(profile)

        let user = await User.findOne({ googleId: profile.id })

        if (!user) {
            user = await User.create({
                googleId: profile.id,
                name: profile.name.givenName + " " + profile.name.familyName,
                email: profile.emails[0].value,
            })
        }

        cb(null, user)
    }
)

export default googleStrategy
