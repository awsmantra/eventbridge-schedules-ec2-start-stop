import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { Role } from "aws-cdk-lib/aws-iam";
import {CfnSchedule} from "aws-cdk-lib/aws-scheduler";

interface Ec2StartProps extends cdk.NestedStackProps {
    roleArn: string
}

export class Ec2Start extends cdk.NestedStack {
    private readonly role: Role;

    constructor(scope: Construct, id: string, props: Ec2StartProps) {
        super(scope, id, props);

        // Start all EC2 Instance 8 am Central Time
        new CfnSchedule(this,"ec2-start-scheduler", {
            name: "ec2-start-scheduler",
            flexibleTimeWindow: {
                mode: "OFF"
            },
            scheduleExpression: "cron(0 8 ? * * *)",
            scheduleExpressionTimezone: 'America/Chicago',
            description: 'Event that start EC2 instances',
            target: {
                arn: 'arn:aws:scheduler:::aws-sdk:ec2:startInstances',
                roleArn: props.roleArn,
                input: JSON.stringify({ InstanceIds: ['i-05c757e84518d5225','i-0e8cf751ca6d4ed34']}),
            },
        });
    }
}
