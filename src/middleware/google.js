import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { User } from "../users/usersModel.js"

const googleStrategy = new GoogleStrategy(
    {
        clientID:
            "59927620494-d0rf8vq0akhc423iphambmbir7nevuhi.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3030/api/profile/oauth-callback",
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
