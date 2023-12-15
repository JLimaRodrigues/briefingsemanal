const { Model, DataTypes } = require('sequelize');
const connection = require('../../connection');

//define BriefingSchema
const BrifiengSchema = sequelize.define('usuarios',  {
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
    }
});

//class Briefing
class Briefing {
    constructor(body) {
      this.body = body;//padrão do sequelize
      this.errors = [];
      this.briefing = null;
    }
  
    async editar(id) {
      if (typeof id !== 'string') return;
      this.valida();
      if (this.errors.length > 0) return;
      await Briefing.update(this.body, { where: { id } });
      this.briefing = await BriefingSchema.findByPk(id);
    }
  
    async registrar() {
      this.valida();
  
      if (this.errors.length > 0) return;
      //console.log(this.body);
      this.briefing = await BriefingSchema.create(this.body);
    }
  
    valida() {
        this.cleanUp();
  
      // Validação
      if (!this.body.titulo) this.errors.push('Titulo é um campo obrigatório');
    }
  
    cleanUp() {
      for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
          this.body[key] = '';
        }
      }
  
      this.body = {
        titulo: this.body.titulo,
        assunto: this.body.assunto
      };
    }
  
    // Métodos estáticos
    static async buscaPorId(id) {
      if (typeof id !== 'string') return;
      const briefing = await BriefingSchema.findByPk(id);
      return briefing;
    }
  
    static async deletar(id) {
      if (typeof id !== 'string') return;
      const briefing = await BriefingSchema.destroy({ where: { id } });
      return briefing;
    }
  
    static async buscaBriefings() {
      //console.log('Chamando buscaBriefings...');
      try {
          const briefings = await BriefingSchema.findAll({
              order: [['criadoEm', 'DESC']]
          });
          return briefings;
      } catch (error) {
          //console.error('Erro em buscaBriefings:', error);
          throw error;
      }
  }
  }

module.exports = Briefing;
