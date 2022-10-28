import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"

import { User } from "../models/User.js"

// Estrategia local
passport.use(new LocalStrategy({
        usernameField: "email",
    },
    async (email, password, done) => {
        const user = await User.findOne({ email: email })
        if (!user) {
            return done(null, false, { message: "Usuario no encontrado" })
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return done(null, false, { message: "Contraseña incorrecta" })
        }
        return done(null, user)
    }
))

// Config para mantener la session 
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
