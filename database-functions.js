const { Sequelize, DataTypes } = require('sequelize');

// Init the database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3'
  });

// Define database "models" (equiv to tables...)
const Game = sequelize.define('Game', {
    // Model attributes are defined here
    id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false
    },
    igdbID: {
    type: DataTypes.INTEGER,
    allowNull: false
    }
},{
    timestamps: false
});

const Episode = sequelize.define('Episode', {
  // Model attributes are defined here
  id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  primaryKey: true
  },
  name: {
  type: DataTypes.STRING,
  allowNull: false
  },
  date: {
  type: DataTypes.DATE,
  allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
    }
},{
  timestamps: false
});

const Mention = sequelize.define('Mention', {
  // Model attributes are defined here
  id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  primaryKey: true
  },
  game: {
  type: DataTypes.STRING,
  allowNull: false
  },
  episode: {
  type: DataTypes.INTEGER,
  allowNull: false
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false
    }
},{
  timestamps: false
});

/************************************  
 *   GENERAL FUNCTIONS
************************************/

async function findAllItems(Model){
  const items = await Model.findAll();
  //console.log(items.every(item => item instanceof Model)); // true
  return JSON.stringify(items,null,2);
}

async function findAllItemsSort1(Model, sort1, ORDER1){
  const items = await Model.findAll({order: [
    [sort1, ORDER1]
  ]});
  //console.log(items.every(item => item instanceof Model)); // true
  return JSON.stringify(items,null,2);
}

async function findAllItemsSort2(Model, sort1, ORDER1, sort2, ORDER2){
  const items = await Model.findAll({order: [
    [sort1, ORDER1],
    [sort2, ORDER2],
  ]});
  //console.log(items.every(item => item instanceof Model)); // true
  return JSON.stringify(items,null,2);
}

async function findItemByPrimaryKey(Model, key){
  const item = await Model.findByPk(key);
  if (item === null) {
    console.log('Not found!');
  } else {
    return item.toJSON();
  }
}

/************************************  
 *   GAME FUNCTIONS
************************************/

async function findAllGames(){
  return findAllItemsSort1(Game, "name", "ASC");
}

async function findGameByPrimaryKey(key){
  return findItemByPrimaryKey(Game, key)
}

/************************************  
 *   EPISODE FUNCTIONS
************************************/
async function findAllEps(){
  return findAllItems(Episode);
}

async function findEpByPrimaryKey(key){
  return findItemByPrimaryKey(Episode, key)
}
/************************************  
 *   MENTION FUNCTIONS
************************************/

async function findAllMentions(){
  return findAllItems(Mention);
}

async function findMentionByPrimaryKey(key){
  return findItemByPrimaryKey(Mention, key);
}

async function findMentionsWhereGameIs(game){
  const mentions = await Mention.findAll({ where: { game: game } });
  return JSON.stringify(mentions,null,2);
}

async function findMostRecentMentions(){
  let sortedMentions = await Mention.findAll({order: [
    ['episode', 'DESC'],
    ['game', 'ASC'],
  ]});
  sortedMentions = Object.values(sortedMentions).slice(0,5);
  return sortedMentions;
}

module.exports = {findAllGames, findGameByPrimaryKey, findAllEps, findEpByPrimaryKey, findAllMentions, findMentionByPrimaryKey, findMentionsWhereGameIs, findMostRecentMentions};
