#Starts an apache docker container to host the game page
sudo docker stop traverse-apache-app
sudo docker rm traverse-apache-app
sudo docker run -dit --name traverse-apache-app -p 1337:80 -v /home/boop/Documents/GoshDarnGames/Traverse2:/usr/local/apache2/htdocs/ httpd:2.4
