import User from './User.js';
import Task from './Task.js';

const setupAssociations = () => {
  // Relacionamento: um usuário pode ter várias tarefas
  User.hasMany(Task, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
  Task.belongsTo(User, {
    foreignKey: 'userId',
  });
};

export default setupAssociations;
