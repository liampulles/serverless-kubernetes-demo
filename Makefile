deploy:
	serverless deploy

kubewatch:
	watch -n 3 kubectl get all --all-namespaces

curl-piglatin:
	curl -L --data 'hello' localhost:8080/api/v1/namespaces/default/services/pig-latinize:8080/proxy/

curl-box:
	curl -L --data 'hello' localhost:8080/api/v1/namespaces/default/services/box:8080/proxy/

curl-chain:
	curl -L --data 'hello' localhost:8080/api/v1/namespaces/default/services/chain:8080/proxy/

bench-piglatin:
	ab -n 1000 -c 100 -p texts/antony.txt http://localhost:8080/api/v1/namespaces/default/services/pig-latinize:8080/proxy/

bench-box:
	ab -n 1000 -c 100 -p texts/antony.txt http://localhost:8080/api/v1/namespaces/default/services/box:8080/proxy/

bench-chain:
	ab -n 1000 -c 100 -p texts/antony.txt http://localhost:8080/api/v1/namespaces/default/services/chain:8080/proxy/

main: curl