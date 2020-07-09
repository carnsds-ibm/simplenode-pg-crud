## Simple Express App connecting to PostgreSQL
### HOW TO RUN
#### (If DB NEEDED)
`docker run --name tmp-postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=temp -p 5432:5432 -v $PWD/data:/var/lib/postgresql/data -d postgres`  

Specify DB credentials and host info in `config.js` or use the environment variables that config.js looks for. `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PORT`, & `DB_PASSWORD`

Just run `npm i && npm start` in root directory  

See commands.txt for basic examples to test CRUD  

