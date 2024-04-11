const ErrorLogger = require('../models/ErrorLogger');

function requestLogger(req, res, next) {
  const { method, originalUrl } = req;
  const userAgent = req.get('User-Agent');
  const ip = req.ip;

  // Logar informações da requisição
  const logMessage = `${method} ${originalUrl} - IP: ${ip} - User-Agent: ${userAgent}`;

  ErrorLogger.logInfo(logMessage);

  next(); // Chamar o próximo middleware
}

module.exports = requestLogger;
