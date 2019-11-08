exports.up = function(knex) {
    return knex.schema
        .createTable('projects', table => {
            table.increments();
            table.text('name').notNullable();
            table.text('description')
            table.boolean('completed').defaultTo(0);
        })
        .createTable('resources', table => {
            table.increments();
            table.text('name').unique().notNullable();
            table.text('description')
        })
        .createTable('projects_resources', table => {
            table.integer('project_id').unsigned().notNullable().references('id').inTable('projects')
            table.integer('resource_id').unsigned().notNullable().references('id').inTable('resources')
            table.primary(['project_id', 'resource_id']);
        })
        .createTable('tasks', table => {
            table.increments();
            table.text('description').notNullable();
            table.text('notes')
            table.boolean('completed').defaultTo(0);
            table.integer('project_id').unsigned().notNullable().references('id').inTable('projects')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('tasks')
        .dropTableIfExists('projects_resources')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};
