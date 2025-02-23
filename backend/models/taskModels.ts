import pool from '../config/db';

export interface Task {
    id?: number;
    title: string;
    description?: string;
    isComplete?: boolean;
    created_at?: Date;
}

export const getAllTasks = async (userId: number) => {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
};

export const getTaskById = async (id: number) => {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
};

export const createTask = async (title: string, description: string | undefined, userId: number) => {
    const result = await pool.query(
        'INSERT INTO tasks (title, description, isComplete, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, false, userId]
    );
    return result.rows[0];
};

export const updateTask = async (id: number, userId: number, title?: string, description?: string, isComplete?: boolean) => {
    const result = await pool.query(
        'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), isComplete = COALESCE($3, isComplete) WHERE id = $4 AND user_id = $5 RETURNING *',
        [title, description, isComplete, id, userId]
    );
    return result.rows[0];
};

export const deleteTask = async (id: number, userId: number) => {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    return result.rows[0]; 
};