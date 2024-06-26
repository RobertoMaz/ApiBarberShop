import { createTransport } from "../config/nodemailer.js"

export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
    )

    const info = await transporter.sendMail({
        from: 'Barbershopt <barbershor2381723@barbershopapp923942.com>',
        to: email,
        subject: 'Barbershop - Confirma tu cuenta',
        text: 'Barbershop - Confirma tu cuenta',
        html: `<p>Hola ${name}, Confirma tu cuenta en Barbershop.</p>
            <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace.</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar este correo.</p>
            `
    })

}

export async function sendEmailPasswordReset({name, email, token}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
    )

    const info = await transporter.sendMail({
        from: 'Barbershopt <barbershor2381723@barbershopapp923942.com>',
        to: email,
        subject: 'Barbershop - Reestablecer password',
        text: 'Barbershop - Reestablecer password',
        html: `<p>Hola ${name}, has solicitado reestablecer tu password.</p>
            <p>Has click en el siguiente enlace para generar un nuevo password: </p>
            <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Reestablecer Password</a>
            <p>Si tu no solicitaste reestablecer tu password, puedes ignorar este correo.</p>
            `
    })

}