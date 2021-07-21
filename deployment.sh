#!/bin/bash
docker login -u neekit -p Nikit@123
docker pull neekit/countsystemui || true
docker build --cache-from countsystemui -t neekit/countsystemui .
docker push neekit/countsystemui
ssh -i countSystem.pem -o StrictHostKeyChecking=no ubuntu@18.116.48.227 "docker login -u neekit -p Nikit@123; docker stop countsystemui || true; docker rm countsystemui || true; docker pull neekit/countsystemui || true; docker run -d --name countsystemui -p 4001:4001 --restart=always neekit/countsystemui; docker system prune -f;"
