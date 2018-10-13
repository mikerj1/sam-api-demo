#!/bin/bash
# Deploy the new index file to the S3 bucket and create a CloudFront invalidation
aws s3 sync ./public s3://$SITE_BUCKET
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DIST_ID --paths '/index.html'