build:
	docker build -t check-server .
run:
	docker run -p 5050:5050 --rm --name check-server check-server
compose:
	docker-compose up --build
stop:
	docker stop check-server
dev_postgres:
	docker run -p 5432:5432 --rm --name check-postgres -e POSTGRES_PASSWORD=postgressecret postgres