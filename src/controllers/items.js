const db = require('../db');

exports.getAll  = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM items');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.getOne  = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM items WHERE id=$1', [req.params.id]);
    rows.length ? res.json(rows[0]) : res.status(404).json({ error: 'Not found' });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.create  = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { rows } = await db.query(
      'INSERT INTO items(name,description) VALUES($1,$2) RETURNING *', [name, description]);
    res.status(201).json(rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.update  = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { rows } = await db.query(
      'UPDATE items SET name=$1,description=$2 WHERE id=$3 RETURNING *', [name, description, req.params.id]);
    rows.length ? res.json(rows[0]) : res.status(404).json({ error: 'Not found' });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.remove  = async (req, res) => {
  try {
    await db.query('DELETE FROM items WHERE id=$1', [req.params.id]);
    res.status(204).send();
  } catch (e) { res.status(500).json({ error: e.message }); }
};
