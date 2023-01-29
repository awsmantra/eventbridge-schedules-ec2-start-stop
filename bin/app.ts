#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { EC2InstanceStartStopStack } from '../lib/ec2-instance-start-stop-stack';

const app = new cdk.App();
new EC2InstanceStartStopStack(app, 'EC2InstanceStartStopStack');
