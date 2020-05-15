# Extract deploy key from environment variable.
echo "$(ruby -e 'require "base64"; puts Base64.urlsafe_decode64(ARGV[0])' -- $DATA_DEPLOY_PRIVATE_KEY)" > ./.ssh/deploy_rsa
chmod 0600 ./.ssh/deploy_rsa

echo "$(ruby -e 'require "base64"; puts Base64.urlsafe_decode64(ARGV[0])' -- $DATA_DEPLOY_PUBLIC_KEY)" > ./.ssh/deploy_rsa.pub
chmod 0644 ./.ssh/deploy_rsa.pub
