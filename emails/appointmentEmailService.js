import { createTransport } from "../config/nodemailer.js"


export async function sendEmailNewAppointment({date, time}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
    )


    await transporter.sendMail({
        from: 'Barbershopt <citas@barbershopapp923942.com>',
        to: 'admin@adminsalon.com',
        subject: 'Barbershop - Nueva cita',
        text: 'Barbershop - Nueva cita',
        html: `<p>Hola Admin, tienes una nueva cita.</p>
            <p>La cita será el día: ${date} a las ${time} horas.</p>
            `
    })
}


export async function sendEmailUpdateAppointment({date, time}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
    )


    await transporter.sendMail({
        from: 'Barbershopt <citas@barbershopapp923942.com>',
        to: 'admin@adminsalon.com',
        subject: 'Barbershop - Cita Actualizada',
        text: 'Barbershop - Cita Actualizada',
        html: `<p>Hola Admin, un usuario ha modificado una cita.</p>
            <p>La nueva cita será el día: ${date} a las ${time} horas.</p>
            `
    })
}

export async function sendEmailCancelledAppointment({date, time}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
    )


    await transporter.sendMail({
        from: 'Barbershopt <citas@barbershopapp923942.com>',
        to: 'admin@adminsalon.com',
        subject: 'Barbershop - Cita Cancelada',
        text: 'Barbershop - Cita Cancelada',
        html: `<p>Hola Admin, un usuario ha cancelado una cita.</p>
            <p>La cita estaba programada para el día: ${date} a las ${time} horas.</p>
            `
    })
}