const { Model, DataTypes } = require('sequelize');
const connection = require('../../connection');

class Briefing extends Model {
    constructor(body) {
      super();
      this.dataValues = body;//padrão do sequelize
      this.errors = [];
      this.briefing = null;
    }
  
    async editar(id) {
      if (typeof id !== 'string') return;
      this.valida();
      if (this.errors.length > 0) return;
      await Briefing.update(this.body, { where: { id } });
      this.briefing = await Briefing.findByPk(id);
    }
  
    async registrar() {
      this.valida();
  
      if (this.errors.length > 0) return;
      //console.log(this.body);
      this.briefing = await Briefing.create(this.dataValues);
    }
  
    valida() {
        this.cleanUp();
  
      // Validação
      if (!this.dataValues.titulo) this.errors.push('Titulo é um campo obrigatório');
    }
  
    cleanUp() {
      for (const key in this.dataValues) {
        if (typeof this.dataValues[key] !== 'string') {
          this.dataValues[key] = '';
        }
      }
  
      this.dataValues = {
        titulo: this.dataValues.titulo,
        assunto: this.dataValues.assunto
      };
    }
  
    // Métodos estáticos
    static async buscaPorId(id) {
      if (typeof id !== 'string') return;
      const briefing = await Briefing.findByPk(id);
      return briefing;
    }
  
    static async deletar(id) {
      if (typeof id !== 'string') return;
      const briefing = await Briefing.destroy({ where: { id } });
      return briefing;
    }
  
    static async buscaBriefings() {
      //console.log('Chamando buscaBriefings...');
      try {
          const briefings = await Briefing.findAll({
              order: [['criadoEm', 'DESC']]
          });
          return briefings;
      } catch (error) {
          //console.error('Erro em buscaBriefings:', error);
          throw error;
      }
  }
  }

// Associe a classe ContatoClass ao modelo Contato
Briefing.init({ 
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assunto: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    criadoEm: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {sequelize: connection});

module.exports = Briefing;
