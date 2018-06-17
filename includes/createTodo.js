var ToDo = require('../mongoose/todo');
var uniqid = require('uniqid');
function createTodo(req, res){
    var todoItem = new ToDo({
        itemId: uniqid(),
        item: req.body.item,
        completed: false
    });

    todoItem.save((err, result) => {
        if (err) {
            console.log("---TodoItem save failed " + err)
        }
        console.log("+++TodoItem saved successfully " + todoItem.item)

        res.redirect('/');
    });
}
module.exports = createTodo;