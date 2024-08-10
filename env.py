import os

# Cloudinary environment variables
os.environ['CLOUDINARY_CLOUD_NAME'] = 'dtjbfg6km'
os.environ['CLOUDINARY_API_KEY'] = '215299843564276'
os.environ['CLOUDINARY_API_SECRET'] = 'YWEpgllzlJTcA7vvJb72F8AVjDU'
os.environ['CLOUDINARY_URL'] = 'cloudinary://YWEpgllzlJTcA7vvJb72F8AVjDU@dtjbfg6km'

# Development flag
os.environ['DEV'] = '1'

# PostgreSQL environment variables
os.environ['PGHOST'] = 'ep-quiet-star-a2kmrmon.eu-central-1.aws.neon.tech'
os.environ['PGDATABASE'] = 'neondb'
os.environ['PGUSER'] = 'neondb_owner'
os.environ['PGPASSWORD'] = 'DQB7GkxSYe9W'
os.environ['DATABASE_URL'] = "postgresql://neondb_owner:DQB7GkxSYe9W@ep-quiet-star-a2kmrmon.eu-central-1.aws.neon.tech/neondb?sslmode=require"
