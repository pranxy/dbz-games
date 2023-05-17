import ErrnoException = NodeJS.ErrnoException;

const { writeFile } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';

if (!process.env.ANGULAR_APP_SUPABASE_URL || !process.env.ANGULAR_APP_SUPABASE_KEY) {
    console.error('All the required environment variables were not provided!');
    process.exit(-1);
}

// Configure Angular `environment.ts` file path
const targetPath = isProduction ? `./src/environments/environment.prod.ts` : `./src/environments/environment.dev.ts`;

// read environment variables from .env file
require('dotenv').config();

// `environment.ts` file structure
const envConfigFile = `export const environment = {
   production: ${isProduction},
   supabaseUrl: '${process.env.ANGULAR_APP_SUPABASE_URL}',
   supabaseKey: '${process.env.ANGULAR_APP_SUPABASE_KEY}'
  };
`;

writeFile(targetPath, envConfigFile, function (err: ErrnoException | null) {
    if (err) {
        throw console.error(err);
    }
});
