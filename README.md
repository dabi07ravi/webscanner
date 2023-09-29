
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

---

## Importing Postman Collection for Express Node.js API

To easily interact with the Express Node.js API, a Postman collection has been provided. Follow these steps to import and use the collection:

1. **Open Postman**: Launch the Postman application on your local machine.

2. **Navigate to Import**: At the top left corner of the Postman window, you will see the "Import" button. Click on it.

3. **Select File**: In the pop-up dialog, choose the 'File' tab, then locate and select the provided `.json` Postman collection file from your local directory.

4. **Confirm the Import**: Once the file is chosen, click the 'Import' button. Postman will process the file and, upon successful import, the requests will appear under the Collections tab on the left sidebar.

5. **Using the Collection**: With the collection imported, you can now click on individual requests to see their details. From here, you can send requests to your Express Node.js API, which will interact with the MongoDB.

---

Note: Postman collections are a set of saved requests. Ensure you understand each request before sending it, especially if your API interacts with a live database. Always be cautious with requests that modify data to prevent unintended changes.


---

# Event Tracker


## Getting Started

Follow the instructions below to set up the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have `yarn` installed. If not, install it using the following:

```
sudo npm install -g yarn
```

### Installation

1. Navigate to the project directory:

```
cd event-tracker
```

2. Install the required dependencies:

```
yarn install
```

### Running the Project

To run the project on your local machine:

```
yarn start
```

Happy coding!
---