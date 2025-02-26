
import { onRequest, } from "firebase-functions/v2/https";
import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis'; // Importação correta de google
//import { OAuth2Client } from 'google-auth-library';
//import fs from 'fs'; // Importa o módulo fs com a sintaxe import
//import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import SMTPTransport from "nodemailer/lib/smtp-transport";

const { auth } = google;
const { OAuth2 } = auth;
//const secretManager = new SecretManagerServiceClient();


let transporter = nodemailer.createTransport({
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

export const enviarEmailWithGmail = onRequest({ cors: true }, async (req, res) => {
  try {
    const result = await sendEmailGmail();
    if (result.success) {
      res.status(200).send(result.message);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error: any) {
    console.error('Erro na função:', error);
    res.status(500).send(`Erro na função: ${error.message}`);
  }
});
/*
async function enviarEmailGmail(destinatario: string, assunto: string, mensagem: string): Promise<{ success: boolean, message: string }> {
  try {
    const authe = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/gmail.send'],
    });
    const client = await authe.getClient();
    const accessTokenResponse = await client.getAccessToken();
    const accessToken = accessTokenResponse.token;
    // Configura o cliente gmail com o token de acesso
    const oauth2Client = new OAuth2Client();
    oauth2Client.credentials = { access_token: accessToken }; // Atribui o token às credenciais

    const gmail = google.gmail({
      version: 'v1',
      auth: oauth2Client, // Passa o OAuth2Client configurado
    });

    console.log('client foi no try: ', (await client).credentials, "com token", JSON.stringify(oauth2Client.clientAuthentication), "outra credencial", JSON.stringify(oauth2Client.credentials));
    const email = `To: ${destinatario}\r\n` +
      `Subject: ${assunto}\r\n` +
      'Content-Type: text/plain; charset=utf-8\r\n\r\n' +
      mensagem;

    await gmail.users.messages.send({
      userId: 'game-code-482d3@appspot.gserviceaccount.com',
      requestBody: {
        raw: Buffer.from(email).toString('base64'),
      },

    });

    return { success: true, message: 'Email enviado com sucesso!' };
  } catch (error: any) {
    console.error('Erro ao enviar email:', error);
    const authe = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/gmail.send'],
    });
    const client = auth.getClient();
    const client2 = await authe.getClient();
    const accessTokenResponse = await client2.getAccessToken();
    const accessToken = accessTokenResponse.token;
    // Configura o cliente gmail com o token de acesso
    const oauth2Client = new OAuth2Client();
    oauth2Client.credentials = { access_token: accessToken }; // Atribui o token às credenciais


    console.log('client foi no catch: ', (await client).credentials, oauth2Client.clientAuthentication)
    const serviceAccountEmail = process.env.FUNCTION_IDENTITY; // Recupera o e-mail da conta de 
    const msg = (await client).credentials;
    const msg2 = `msg2: ${JSON.stringify(oauth2Client.clientAuthentication)}; ${JSON.stringify(oauth2Client.credentials)}; token foi: ${accessToken}`;
    const message = `Erro ao enviar email: ${error.message}, ${JSON.stringify(msg)},  email? ${serviceAccountEmail}, ${msg2}`;
    return { success: false, message: message };
  }
}
*/
/*
async function getSecret(secretName: string): Promise<string> {
  const [version] = await secretManager.accessSecretVersion({
    name: secretName,
  });

  if (!version.payload?.data) {
    throw new Error(`Secret ${secretName} has no data.`);
  }

  return version.payload.data.toString();
}
*/
export const sendEmailGmail = async () => {
  try {
    //const clientId = await getSecret('GMAIL_CLIENT_ID');
    //const clientId = "926044891412-rpse8ja7noenui525i98nim7tj26kre0.apps.googleusercontent.com";
    //const clientSecret = await getSecret('GMAIL_CLIENT_SECRET');
    //const clientSecret = "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";
    //const refreshToken = await getSecret('GMAIL_REFRESH_TOKEN');
    //const refreshToken = "1//04e_Sqnmfe8cTCgYIARAAGAQSNwF-L9Iru3KZCP30PFVKgF6ADqw0QNbK3QwhdkXs7vptLevkDfbH71TzhDkQQqyo7VBUEzZD6gE";

    const clientId = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
    const redirectUri = 'https://developers.google.com/oauthplayground';
    const userEmail = 'continuedesenvolvendo@gmail.com';

    const oAuth2Client = new OAuth2(clientId, clientSecret, redirectUri);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const accessToken = await oAuth2Client.getAccessToken();
    //const accessToken = "ya29.a0AeXRPp4BzSOOU3AJ-OSICGiJ6muvxD2JH1BrDnBovZqbRywDXHH5UxdldHjAlyfICT8Hsr1ONR5Ila3QbEm6uHQ_Oo8506JGyG6ts0NACWBLWCn9ZvtkINOK5lPLjj3eSUuW0PNh7j-b7Z2viPkYQHM4ooBk9DF-CSE636rcaCgYKATYSARESFQHGX2MiyvOzhH_qwmFSc10_1Fedaw0175";
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use 'gmail' aqui
      auth: {
        type: 'OAuth2',
        user: userEmail,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    } as SMTPTransport.Options); // Force o tipo SMTP

    const mailOptions = {
      from: userEmail,
      to: 'julopeson@gmail.com',
      subject: 'testando envio de email gmail',
      text: 'testado token dinamico e e variáveis de ambiente no gcp!',
    };

    await transporter.sendMail(mailOptions);
    return { message: 'Email enviado com sucesso! ' + clientId, success: true };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    const clientId = process.env.GMAIL_CLIENT_ID;
    return { message: 'Erro ao enviar email! ' + error + clientId, success: false };
  }
};