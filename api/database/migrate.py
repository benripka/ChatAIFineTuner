from peewee_migrate import Router
from peewee import SqliteDatabase, PostgresqlDatabase

router = Router(PostgresqlDatabase('database', user='user', password='password', host='localhost', port=5432))

# Create migration
router.create('migration_name')

# Run migration/migrations
router.run('migration_name')

# Run all unapplied migrations
router.run()