const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  const { nombre, email, mensaje } = JSON.parse(event.body);

  const msg = {
    to: 'tucorreo@ejemplo.com', // Receptor
    from: 'tucorreo@dominio.com', // Remitente (verificado en SendGrid)
    subject: `Nuevo mensaje de ${nombre}`,
    text: mensaje,
    replyTo: email
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Correo enviado' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
