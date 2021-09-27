const Router = require('express').Router;
const database = require('../database');

const router = Router();

router.route('/')
  .get(async (request, response) => {
    const todos = database.all('SELECT * FROM todos', (err, rows) => {
      if (err) throw err;
      response.json(rows);
    });
  })
  .post(async (request, response) => {
    const { text } = request.body;
    if (!text) {
      response.json({ error: 'ERROR' });
      return;
    }
    database.run('INSERT INTO todos (text) VALUES (?)', [text], function (err) {
      if (err) throw err;
      return response.json({ id: this.lastID, text });
    });
  })

router.route('/:id')
  .get(async (request, response) => {
    const { id } = request.params;
    database.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
      if (err) throw err;
      response.json({ ...row });
    });
  })
  .patch(async (request, response) => {
    const { id } = request.params;
    const { text } = request.body;
    database.run('UPDATE todos SET text = ? WHERE id = ?', [text, id], function (err) {
      if (this.changes) {
        return response.json({ success: true, data: { id, text } });
      }
      response.json({ success: false });
    })
  })
  .delete(async (request, response) => {
    const { id } = request.params;
    database.run('DELETE FROM todos WHERE id = ?', id, function (err) {
      if (err) throw err;
      if (this.changes) {
        return response.json({ success: true, data: { id } });
      }
      response.json({ success: false });
    })
  })

module.exports = router;

