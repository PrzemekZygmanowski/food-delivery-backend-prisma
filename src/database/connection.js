import Knex from 'knex';
import knexfile from '../../knexfile.js';

const env = process.env.NODE_DEV || 'development';
export const knex = Knex(knexfile[env]);
