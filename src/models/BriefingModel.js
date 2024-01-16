const { Model, DataTypes } = require('sequelize');
const connection = require('../../connection');

//define BriefingSchema
const BriefingSchema = connection.define('briefings',  {
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
      try {
          const briefings = await BriefingSchema.findAll({
              order: [['createdAt', 'DESC']]
          });
          return briefings;
      } catch (error) {
          throw error;
      }
  }
  }

module.exports = Briefing;
