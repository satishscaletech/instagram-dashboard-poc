aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 249373568965.dkr.ecr.ap-south-1.amazonaws.com
docker pull  249373568965.dkr.ecr.ap-south-1.amazonaws.com/instagram-dashboard-api:latest
docker rm -f instagram-dashboard-api
docker run -d --network host --env-file=.env/development.env --name=instagram-dashboard-api 249373568965.dkr.ecr.ap-south-1.amazonaws.com/instagram-dashboard-api:latest
