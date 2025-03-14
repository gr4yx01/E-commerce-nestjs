import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5436,
    username: 'graeyyy',
    password: 'pyr_hornet0101',
    database: 'prograde',
    entities: [],
    synchronize: true
})

export async function initializeDataSource() {
    if(!dataSource.isInitialized) {
        await dataSource.initialize()
    }

    return dataSource
}

export default dataSource