deploy:
	serverless deploy

kubewatch:
	watch -n 3 kubectl get all --all-namespaces

curl:
	curl -L --data 'hello' localhost:8080/api/v1/namespaces/default/services/pig-latinize:8080/proxy/

bench:
	ab -n 1000 -c 100 -p texts/antony.txt http://localhost:8080/api/v1/namespaces/default/services/pig-latinize:8080/proxy/

main: curl