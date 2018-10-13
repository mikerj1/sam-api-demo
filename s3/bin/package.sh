#!/bin/bash
# Downloads the CF stack info and uses that to update our template with the ApiUrl of that stack
mkdir -p cf
aws cloudformation describe-stacks --stack-name $STACK_NAME > cf/stack.json
[ -s cf/stack.json ] || exit 1
export API_ENDPOINT=`node -p "require('./cf/stack.json').Stacks[0].Outputs.find(i => i.OutputKey === 'ApiUrl').OutputValue"`
sanitized=$(sed 's/[^a-zA-Z 0-9]/\\&/g' <<<"$API_ENDPOINT")
search='s/$INSERT_ENDPOINT_HERE/'$sanitized'/g'
mkdir -p public
sed $search <index_template.html >public/index.html