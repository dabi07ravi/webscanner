sudo docker exec -it event_tracker_container mongodump -d event-tracker -o /mongodb_data
sudo docker cp event_tracker_container:/mongodb_data/event-tracker ./mongodb_data
echo "Dump of 'event-tracker' completed!"
