import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432,
  dialectOptions: {
    ssl: {
      require: true, // Garante que SSL seja usado
      rejectUnauthorized: false, // Aceita certificados autoassinados
    },
  },
});

sequelize
  .authenticate()
  .then(() => console.log('📦 Banco de dados sincronizado.'))
  .catch((error) => console.error('Erro ao conectar ao banco de dados:', error));

export default sequelize;
