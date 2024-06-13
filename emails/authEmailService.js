import { createTransport } from "../config/nodemailer.js"

export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransport(
        'sandbox.smtp.mailtrap.io',
        2525,
        'b743a168934caa',
        "47d00fda9d0dc0"
    )

    const info = await transporter.sendMail({
        from: 'Barbershopt',
        to: email,
        subject: 'Barbershop - Confirma tu cuenta',
        text: 'Barbershop - Confirma tu cuenta',
        html: `<p>Hola ${name}, Confirma tu cuenta en Barbershop.</p>
            <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace.</p>
            <a href="http://localhost:4000/apiv1/auth/verify/${token}">Confirmar cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar este correo.</p>
            `
    })

    console.log('Mensaje enviado', info.messageId)
}