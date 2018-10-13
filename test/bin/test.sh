#!/bin/bash
# Downloads the CF stack info and uses that to update our template with the ApiUrl of that stack
mkdir -p cf
aws cloudformation describe-stacks --stack-name $STACK_NAME > cf/stack.json
[ -s cf/stack.json ] || exit 1
export API_ENDPOINT=`node -p "require('./cf/stack.json').Stacks[0].Outputs.find(i => i.OutputKey === 'ApiUrl').OutputValue"`
npm test