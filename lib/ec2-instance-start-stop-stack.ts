import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {SchedulesRole} from "./scheduler-role";
import {Ec2Start} from "./ec2-start";
import {Ec2Stop} from "./ec2-stop";

export class EC2InstanceStartStopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    // Create Role
    const schedulesRole = new SchedulesRole(this,"SchedulerRoleStack")

    // Create EC2Start schedules
    const ec2Start = new Ec2Start(this,"Ec2Start", {
      roleArn: schedulesRole.roleArn,
    })

    // Create EC2Stop schedules
    const ec2Stop = new Ec2Stop(this,"Ec2Stop", {
      roleArn: schedulesRole.roleArn,
    })

  }
}
