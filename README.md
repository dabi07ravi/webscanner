
---

# MongoDB Docker Setup

This README guides you through starting a MongoDB instance in a Docker container and the process of backing up and restoring its database.

## Getting Started

1. **Start the MongoDB container**:
   ```bash
   docker-compose up -d
   ```

2. **Stop the MongoDB container**:
   ```bash
   docker-compose down
   ```

## Backing up and Restoring the Database

### Backup

1. **Dump the data**:
   ```bash
   docker exec -it event_tracker_container mongodump --out /data/db/backup
   ```

2. **Retrieve the backup to your host**:
   ```bash
   docker cp event_tracker_container:/data/db/backup ./database
   ```

### Restore

1. **Copy backup from host to container**:
   ```bash
   docker cp ./database event_tracker_container:/data/db/backup
   ```

2. **Restore the data**:
   ```bash
   docker exec -it event_tracker_container mongorestore /data/db/backup
   ```

---

Adjust the paths as needed if you change the backup location.