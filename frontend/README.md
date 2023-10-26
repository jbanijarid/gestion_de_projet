# frontend 

## Dockerfie :
- **build** : creat the image : 
```sh
docker build -t <frontend-app> .
```

- **run**: 
```sh
docker run -p 8080:8080 -d frontend-app
```

- **see all runing images**:
```sh
docker ps
```

- **log a runing image** : 
```sh
docker logs <imageId>
```