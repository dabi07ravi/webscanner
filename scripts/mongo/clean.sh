#!/bin/bash

# Stop the MongoDB container
sudo docker stop mongodb_container

# Remove the MongoDB container
sudo docker rm mongodb_container

# Optionally remove the MongoDB image
read -p "Do you want to remove the MongoDB image (mongo:latest)? [y/N]: " remove_img
if [[ $remove_img == "y" || $remove_img == "Y" ]]; then
    sudo docker rmi mongo:latest
fi

# Optionally remove associated volumes
read -p "Do you want to remove associated volumes (e.g., mongodb_data)? [y/N]: " remove_vol
if [[ $remove_vol == "y" || $remove_vol == "Y" ]]; then
    echo "Listing all volumes:"
    sudo docker volume ls
    read -p "Enter the name of the volume you want to remove: " vol_name
    sudo docker volume rm $vol_name
fi

# Cleanup unused containers, networks, images, and build cache
read -p "Do you want to clean up unused resources (containers, networks, images)? [y/N]: " cleanup
if [[ $cleanup == "y" || $cleanup == "Y" ]]; then
    sudo docker system prune
fi

echo "Cleanup completed!"
