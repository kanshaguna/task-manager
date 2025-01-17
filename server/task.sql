CREATE TABLE task_table (
    task_id SERIAL PRIMARY KEY,
    task_desc VARCHAR(255),
    task_completed BOOLEAN DEFAULT false
);
