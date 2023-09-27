
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

1. **Clear previous backup in the container (to avoid duplicates)**:
   ```bash
   docker exec -it event_tracker_container rm -rf /data/backup/*
   ```

2. **Dump the data**:
   ```bash
   docker exec -it event_tracker_container mongodump --out /data/backup
   ```

3. **Clear any previous backup on the host**:
   ```bash
   rm -rf ./database/*
   ```

4. **Retrieve the backup to your host**:
   ```bash
   docker cp event_tracker_container:/data/backup ./database
   ```

### Restore

1. **Copy backup from host to container**:
   ```bash
   docker cp ./database event_tracker_container:/data/backup
   ```

2. **Restore the data**:
   ```bash
   docker exec -it event_tracker_container mongorestore /data/backup
   ```

---

Note: The added steps ensure that both your host machine and the Docker container directories are clear of old backups before you start a new backup process. This should help prevent the duplicate data issue you encountered. Always make sure you're comfortable with the directories you're deleting before using commands like `rm -rf`.