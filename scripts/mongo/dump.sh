sudo docker exec -it mongodb_container mongodump -d secure -o /mongodb_data
sudo docker cp mongodb_container:/mongodb_data/secure ./mongodb_data
echo "Dump of 'secure' completed!"
