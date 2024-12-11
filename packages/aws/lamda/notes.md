instructions, 

create a lambda function
```bash
aws lambda create-function \
  --function-name MyJavaScriptFunction \
  --runtime nodejs18.x  \
  --role arn:aws:iam::183295451162:role/lambda-ex \
  --handler index.handler \
  --timeout 15 \
  --memory-size 128  \
  --zip-file fileb://function.zip
```


https://docs.aws.amazon.com/lambda/latest/dg/lambda-invocation.html

invoking lambda:
 - lambda console (internet)
 - aws sdk (call lambda from nodejs)
 - aws cli (oh really) `aws lambda invoke`
 - furl (function url endpoint)
 - event based, like SQS, DynampDB (yes, dynamodb can emit events) (with batches of records)

https://docs.aws.amazon.com/lambda/latest/dg/response-streaming-tutorial.html


https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html#permissions-executionrole-api

aws iam create-role \
  --role-name lambda-ex \
  --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}'

aws iam attach-role-policy --role-name lambda-ex --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole


consume events from SQS queues
-- arrival_at_point_events
-- departure_from_point_events

