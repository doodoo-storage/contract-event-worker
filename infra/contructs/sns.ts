import { Construct } from '@aws-cdk/core';
import { Topic } from '@aws-cdk/aws-sns';
import { SqsSubscription } from '@aws-cdk/aws-sns-subscriptions';
import { Queue } from '@aws-cdk/aws-sqs';

interface SnsProps {
  topicName: string;
  queueName: string;
  deadletterQueueName: string;
}

export class SnsConstruct extends Construct {
  constructor(scope: Construct, id: string, private props: SnsProps) {
    super(scope, id);

    const snsTopic = new Topic(this, 'Topic', { topicName: props.topicName });
    snsTopic.addSubscription(new SqsSubscription(
      new Queue(this, 'Queue', {
        queueName: props.queueName,
        deadLetterQueue: {
          queue: new Queue(this, 'DeadLetterQueue', {
            queueName: props.deadletterQueueName
          }),
          maxReceiveCount: 3
        }
      })
    ));
  }
}