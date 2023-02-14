## Fine Tuner
This project contains a full-stack application to help with fine tuning OpenAI's LLM's.
This is project is a side project and still in development. If something seems wrong, there is a good chance it is :) Just reach out to me if you need a hand.

### Installation
The easiest way to get the system running in your environment is to ensure docker-compose is installed and then run the following command:

```shell
docker-compose up
```

This will spin up a number of services. The code and details for each server can be found in their respective subfolders. The services, as defined in the docker-compose.yaml file are:

- `frontend`: This is an nginx server that serves up a react app on port 3000
- `api`: The backend Flask REST API that provides connection to the db and rabbitmq
- `db`: A postres database that stores the data
- `rabbitmq`: A queue to hold job information
- `consumer`: This service is a sham! It should be the consumer of the queue, but it is not yet implemented. It is a placeholder for now. Instead you should manually run the "consumer.py" file from the api subfolder. 

You'll also need to run the ACTUAL consumer. This is a python script that will run the actual fine tuning. To do this, you'll need to run the following script:

```shell

```shell
export OPENAI_API_KEY=<your key>
export OPENAI_ORGANIZATION=<your org id>
python ./api/workers/consumer.py
```