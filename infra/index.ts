import 'dotenv/config';

import env from 'env-var';
import { App, Construct, Stack, StackProps } from '@aws-cdk/core';

import { WorkerConstruct, SnsConstruct } from './contructs';

const app = new App();

const TOPIC_NAME = env.get('TOPIC_NAME').required().asString();

const ENVIRONMENT_NAME = env.get('ENVIRONMENT_NAME').required().asString();
const APPLICATION_NAME = env.get('APPLICATION_NAME').required().asString();

const QUEUE_NAME = env.get('QUEUE_NAME').required().asString();
const DL_QUEUE_NAME = env.get('DL_QUEUE_NAME').required().asString();

const DB_HOST = env.get('DB_HOST').required().asString();
const DB_PORT = env.get('DB_PORT').required().asString();
const DB_NAME = env.get('DB_NAME').required().asString();
const DB_USER = env.get('DB_USER').required().asString();
const DB_PASSWORD = env.get('DB_PASSWORD').required().asString();

class MarketplaceWorkerStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new SnsConstruct(this, 'SNS', {
      topicName: TOPIC_NAME,
      queueName: QUEUE_NAME,
      deadletterQueueName: DL_QUEUE_NAME
    });

    new WorkerConstruct(this, 'Worker', {
      appicationName: APPLICATION_NAME,
      environmentName: ENVIRONMENT_NAME,
      queueName: QUEUE_NAME,
      account: props.env?.account as string,
      database: {
        host: DB_HOST,
        name: DB_NAME,
        user: DB_USER,
        port: DB_PORT,
        password: DB_PASSWORD
      }
    })
  }
}

const marketplaceWorkerStack = new MarketplaceWorkerStack(app, 'WorkerStack', {
  env: {
    account: '',
    region: 'ap-northeast-2'
  }
});