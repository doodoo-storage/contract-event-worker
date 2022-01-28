import { CfnApplication, CfnEnvironment } from '@aws-cdk/aws-elasticbeanstalk';
import { Construct } from '@aws-cdk/core';

interface DatabaseProps {
  host: string;
  name: string;
  user: string;
  port: string;
  password: string;
};

interface WorkerProps {
  appicationName: string;
  environmentName: string;
  queueName: string;
  account: string;
  database: DatabaseProps;
}

export class WorkerConstruct extends Construct {
  constructor(scope: Construct, id: string, private props: WorkerProps) {
    super(scope, id);

    const workerApplication = new CfnApplication(this, 'Application', {
      applicationName: props.appicationName
    });

    const workerEnvironmentOption: CfnEnvironment.OptionSettingProperty[] = [
      {
        namespace: 'aws:ec2:instances',
        optionName: 'InstanceTypes',
        value: 't3.micro',
      },
      {
        namespace: 'aws:autoscaling:launchconfiguration',
        optionName: 'IamInstanceProfile',
        value: 'event-worker-role',
      },
      {
        namespace: 'aws:elasticbeanstalk:sqsd',
        optionName: 'WorkerQueueURL',
        value: `https://sqs.ap-northeast-2.amazonaws.com/${props.account}/${props.queueName}`
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        optionName: 'PORT',
        value: '3000',
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        optionName: 'DB_HOST',
        value: props.database.host,
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        optionName: 'DB_PORT',
        value: props.database.port,
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        optionName: 'DB_NAME',
        value: props.database.name,
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        optionName: 'DB_USER',
        value: props.database.user,
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        optionName: 'DB_PASSWORD',
        value: props.database.password,
      },
      {
        namespace: 'aws:autoscaling:asg',
        optionName: 'MinSize',
        value: '1'
      },
      {
        namespace: 'aws:autoscaling:asg',
        optionName: 'MaxSize',
        value: '1'
      }
    ]

    const environment = new CfnEnvironment(this, 'Environment', {
      environmentName: props.environmentName,
      applicationName: workerApplication.applicationName as string,
      solutionStackName: '64bit Amazon Linux 2 v5.4.9 running Node.js 14',
      optionSettings: workerEnvironmentOption,
      tier: {
        name: 'Worker',
        type: 'SQS/HTTP'
      }
    });

    environment.addDependsOn(workerApplication);
  }
}