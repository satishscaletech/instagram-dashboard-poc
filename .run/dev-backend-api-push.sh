aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 249373568965.dkr.ecr.ap-south-1.amazonaws.com
DOCKER_BUILDKIT=1 docker build -t instagram-dashboard-api:latest -f .docker/Dockerfile.backend .
docker tag instagram-dashboard-api:latest 249373568965.dkr.ecr.ap-south-1.amazonaws.com/instagram-dashboard-api:latest
docker push 249373568965.dkr.ecr.ap-south-1.amazonaws.com/instagram-dashboard-api:latest