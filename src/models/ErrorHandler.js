const errorLogger = require('./ErrorLogger');

class ErrorHandler {
  static logAndRenderError(err, res, view) {
    // Loga o erro
    errorLogger.logError(err);

    // Renderiza a página de erro
    res.status(500).render(view || '404');
  }
}

module.exports = ErrorHandler;