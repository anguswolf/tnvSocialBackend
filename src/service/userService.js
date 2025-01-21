import userRepo from '../repository/userRepository.js'
import cryptoUtils from '../utils/cryptoUtils.js'
import mailer from 'nodemailer';
import {mailConfig} from '../const/const.js';
import LoginException from "../exception/LoginException.js";

const register = async (content) => {
  const  {password, salt} = cryptoUtils.hashPassword(content.password)
  content.password = password;
  content.salt = salt;
  content.registrationToken = cryptoUtils.generateUniqueCode(10)
  const result =  await userRepo.add(content);
  await sendRegistrationMail(content.email,
    buildRegistrationLink(result._id, content.registrationToken))
  return result;
}

const buildRegistrationLink = (id, token) => {
  return `http://localhost:8000/user/${id}/confirm/${encodeURIComponent(token)}`
}

const updateTokenAndSendMail = async (content) => {
	let result
	if (userRepo.checkEmailExists(content.email)) {
		  content.updatingToken = cryptoUtils.generateUniqueCode(10)
		  result =  await userRepo.update(content);
		  await sendRegistrationMail(content.email,
			buildPasswordUpdatingLink(result._id, content.updatingToken))
	}
  return result;
}

const buildPasswordUpdatingLink = (id, token) => {
  return `http://localhost:5173/user/${id}/updatepassword/${encodeURIComponent(token)}`
}

const sendRegistrationMail = async (email, link) => {
	const senderAddress = mailConfig.senderAddress;
	const subject = mailConfig.subject;
	const body = `Open this link to complete password reset ${link}`;
	const transport = {
	  host: mailConfig.host,
	  port: mailConfig.port,
	  secure: mailConfig.secure,
	  auth: {
		user: senderAddress,
		pass: mailConfig.smtpPassword, //creata ad hoc la password per le APP di Google
	  },
	};
	const mailData = {
	  from: `"todolist service" <${senderAddress}>`,
	  subject: subject,
	  text: body,
	  to: email,
	  html: mailConfig.html,
	};
	return await mailer.createTransport(transport).sendMail(mailData);
  }

  const confirmRegistration = async (id, token) => {
	return await userRepo.confirmRegistration(id, token);
  }

  const updateUserPassword = async (content) => {
	console.log(content.body)
	const  {password, salt} = cryptoUtils.hashPassword(content.body.password)
	  content.password = password;
	  content.salt = salt;
	return await userRepo.updateUserPassword(content);
  }

  const login = async (email, password) => {
	const user =  await userRepo.getByEmail(email);
  
	if (!cryptoUtils.compare(password, user.salt, user.password)) {
	  /*throw new UnauthorizedException('Unauthorized', 100201)*/
		throw new LoginException('Email o password non valide', 100201)
	}
	const {accessToken, refreshToken} = cryptoUtils.generateTokens(user)
	user.accessToken = accessToken
	user.refreshToken = refreshToken
	return user;
  }

  const checkEmailExists = async (email) => {
	  return await userRepo.checkEmailExists(email);
  }
  
  export {
	register,
	confirmRegistration,
	login,
	checkEmailExists,
	  updateUserPassword,
	  updateTokenAndSendMail
  }