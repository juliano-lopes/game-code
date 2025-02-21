
import { onRequest, } from "firebase-functions/v2/https";
import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'contato@julianolopes.com.br',
    pass: 'pystLeJua96@0.C_E'
  }
});

export const sendEmail = onRequest({ cors: true }, async (req, res) => {
  try {
    // Dados do email
    const mailOptions = {
      from: 'contato@julianolopes.com.br',
      to: 'julopeson@gmail.com',
      subject: 'Testando função firebase',
      text: 'Testado função firebase!'
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.response);

    res.send({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).send({ message: 'Erro ao enviar email.' });
  }
});

export const helloWorld3 = onRequest({ cors: true }, (request, response) => {
  response.status(200).send({ message: 'Olá, Mundo3!' });
});

export const completionRegistered = onDocumentWritten("resolution/{resolutionId}", async (event) => {

  try {
    // Dados do email
    const data = JSON.stringify(event.data?.after.data());
    const mailOptions = {
      from: 'contato@julianolopes.com.br',
      to: 'julopeson@gmail.com',
      subject: 'Testando função firebase, documento ' + event.params.resolutionId,
      text: 'Foi testado mesmo! ' + data
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.response);
    return true;

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
});
