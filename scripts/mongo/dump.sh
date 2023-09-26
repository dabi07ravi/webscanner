sudo docker exec -it mongodb_container mongodump -d event-tracker -o /mongodb_data
sudo docker cp mongodb_container:/mongodb_data/event-tracker ./mongodb_data
echo "Dump of 'event-tracker' completed!"
