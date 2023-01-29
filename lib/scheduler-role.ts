import { StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import {Effect, PolicyStatement, Role, ServicePrincipal} from "aws-cdk-lib/aws-iam";

export class SchedulesRole extends cdk.NestedStack  {
    private readonly _role: Role;
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);


        // Add scheduler assumeRole
        this._role  = new Role(this,  "scheduler-ec2-start-stop", {
            assumedBy: new ServicePrincipal('scheduler.amazonaws.com'),
            roleName: "scheduler-ec2-start-stop"
        })

        // Add policy
        this._role.addToPolicy(  new PolicyStatement( {
            sid: 'EC2StartStopPermissions',
            effect: Effect.ALLOW,
            actions: [
                "ec2:DescribeInstances",
                "ec2:StartInstances",
                "ec2:StopInstances"
            ],
            resources: ["*"], //Give the least privileges
        }))
    }

    get roleArn(): string {
        return this._role.roleArn;
    }
}
