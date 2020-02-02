const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123456',
    database: 'firstapi',
    port: '5432'
});

const getUsers = async(req, res) => {
    // Manda a imprimir algo en pantalla como una prueba  
    /* res.send('users');
     */
    const response = await pool.query("SELECT * FROM users");
    res.status(200).json(response.rows);
};

const getUserById = async(req, res) => {
    //req.params.id - para acceder al id de la url 
    // res.send("Entro");
    const id = req.params.id;
    const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.status(200).json(response.rows);
};

const deleteUser = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({
        status: 1,
        message: `User ${id} Eliminado`
    });
};

const createUsers = async(req, res) => {
    // Muestra la informacion enviada en consola  
    // console.log(req.body);
    const { name, email } = req.body;
    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);

    res.json({
        status: 1,
        message: 'Usuario Creado',
        data: {
            user: { name, email }
        }
    });
};

const updateUser = async(req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    const response = await pool.query("UPDATE users SET name = $2, email = $3 WHERE id = $1", [id, name, email]);
    res.json({
        status: 1,
        message: `User ${name} Actualizado`,
        data: {
            user: {
                name,
                email
            }
        }
    });
};

module.exports = {
    getUsers,
    createUsers,
    getUserById,
    deleteUser,
    updateUser
};