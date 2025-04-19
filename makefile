.PHONY: build run stop clean list

list:
	@grep -E '^[a-zA-Z0-9][^:]*:' Makefile | \
		grep -vE '^(#| |\.PHONY:)' | \
		cut -d: -f1 | \
		sort | \
		uniq

build:
	docker build -t express-app .

run:
	docker run -d --name express-container --env-file .env -p 3000:3000 express-app

stop:
	docker stop express-container && docker rm express-container

clean:
	docker rmi express-app