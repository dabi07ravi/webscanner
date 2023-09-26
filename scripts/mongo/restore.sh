# Restore the MongoDB data from the dump directory
sudo docker exec -it event_tracker_container mongorestore /mongodb_data

echo "Restoration completed!"
