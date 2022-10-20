const Todo = require('./models/todo.js')
const Boom = require('boom')

const TodoApi = {
    create: {
        async handler(request) {
            try {
                const todo = await new Todo({
                    name: request.payload.name,
                    checked: request.payload.checked
                })
                await todo.save()
                return { message: "Todo has been created", todo }

            } catch (err) {
                console.log(err)
                Boom.badRequest(err)
            }
        }
    },
    get: {
        async handler(request) {
            try {
                const todo = request.params.todo
                return await Todo.findOne({
                    _id: todo
                });

            } catch (err) {
                console.log(err)
                Boom.badRequest(err)
            }
        }
    },
    update: {
        async handler(request) {
            try {
                const todo = request.params.todo
                const updates = request.payload
                await Todo.findById(todo).updateOne(updates)
                return { success: true, message: 'Todo has been updated!' }

            } catch (err) {
                console.log(err)
                Boom.badRequest(err)
            }
        }
    },
    delete: {
        async handler(request){
            try {
                await Todo.findById(request.params.todo).deleteOne()
                return { success: true, message: 'Todo has been removed' }

            } catch (err) {
                console.log(err)
                Boom.badRequest(err)
            }
        }
    },
    all: {
        async handler() {
            try {
                return await Todo.find({}).sort({ createdAt: 'asc' })
            } catch (err) {
                console.log(err)
                Boom.badRequest(err)
            }
        }
    },
};

module.exports = TodoApi
