.SILENT: ;
.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

hello: ## Hello make file
	echo hello

install: ## Install
	cd operations && npm install

deploy-core: install ## Deploy core
	pulumi up -C operations/core

deploy-infra: install ## Deploy infra
	pulumi up -C operations/infra
