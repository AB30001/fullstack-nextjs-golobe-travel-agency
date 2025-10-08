#!/bin/bash

# Auto-generated secrets
export AUTH_SECRET="4a656fae75b24d07a3807053b58395c1eba1afb4ba4ee1e1477d44be9b15cfee"
export API_SECRET_TOKEN="87e9cafb2806954c15bfdacaae38c23034ee4b35720bcf5402b7fb61732a6061"
export CRON_SECRET="bd0058230aa790af720cca929baf7c6589d6cfc252f33159b5ff02d39e91f69b"

# Replit-specific configuration
export NEXT_PUBLIC_BASE_URL="https://${REPLIT_DEV_DOMAIN}"
export NEXT_PUBLIC_REVALIDATION_TIME="600"
export AUTH_TRUST_HOST="true"

echo "✅ Environment variables configured!"
echo "⚠️  You still need to set MONGODB_URI for database connection"
