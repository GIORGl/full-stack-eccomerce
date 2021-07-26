const sgMail = require('@sendgrid/mail');


const api_key = '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';

sgMail.setApiKey(api_key);


const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to:email,
        from:'kechekhmadzegiorgi@gmail.com',
        subject:'Thanks for joining in',
        text: `Welcome to the app ${name}, let me know how are you getting along...`,
    })
}

module.exports = {sendWelcomeEmail}