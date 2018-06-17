var type = require('graphql/type');
var GraphQLObjectType = type.GraphQLObjectType;
var GraphQLNonNull = type.GraphQLNonNull;
var GraphQLSchema = type.GraphQLSchema;
var GraphQLString = type.GraphQLString;
var GraphQLList = type.GraphQLList;
var GraphQLInt = type.GraphQLInt;
var GraphQLBoolean = type.GraphQLBoolean;
var ToDoMongo = require('../mongoose/todo');

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
function getProjection (fieldASTs) {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
            projections[selection.name.value] = true;
        return projections;
    }, {});
}

var todoType = new GraphQLObjectType({
        name: 'todo',
        description: 'todo item',
        fields: () => ({
            itemId: {
                type: (GraphQLString),
                description: 'The id of the todo.',
            },
            item: {
                type: GraphQLString,
                description: 'The name of the todo.',
            },
            completed: {
                type: GraphQLBoolean,
                description: 'Completed todo? '
            }
        }),
});

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            todo: {
                type: new GraphQLList(todoType),
                args: {
                    itemId: {
                        name: 'itemId',
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: (root, {itemId}, source, fieldASTs) => {
                    var projections = getProjection(fieldASTs);
                    var foundItems = new Promise((resolve, reject) => {
                        ToDoMongo.find({itemId}, projections,(err, todos) => {
                            err ? reject(err) : resolve(todos)
                        });
                    })

                    return foundItems;
                }
            },
            todos: {
                type: new GraphQLList(todoType),
                args: {
                    item: {
                        name: 'item',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, {item}, source, fieldASTs) => {
                    var projections = getProjection(fieldASTs);
                    var foundItems = new Promise((resolve, reject) => {
                            ToDoMongo.find({item}, projections,(err, todos) => {
                            err ? reject(err) : resolve(todos)
                        });
                })

                    return foundItems;
                }
            }
        }
    })
});

module.exports = schema;
