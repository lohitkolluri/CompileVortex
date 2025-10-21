#!/bin/bash

# CompileVortex Infrastructure Deployment Script
set -e

echo "🚀 Starting CompileVortex Infrastructure Deployment..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform is not installed. Please install it first."
    exit 1
fi

# Load environment variables
if [ -f .env ]; then
    echo "📋 Loading environment variables..."
    export $(cat .env | xargs)
else
    echo "⚠️  .env file not found. Using system AWS credentials."
fi

# Verify AWS credentials
echo "🔐 Verifying AWS credentials..."
aws sts get-caller-identity > /dev/null 2>&1 || {
    echo "❌ AWS credentials not configured properly."
    exit 1
}
echo "✅ AWS credentials verified."

# Initialize Terraform
echo "🔧 Initializing Terraform..."
terraform init

# Plan the deployment
echo "📋 Planning Terraform deployment..."
terraform plan -out=tfplan

# Ask for confirmation
echo "🤔 Do you want to proceed with the deployment? (y/N)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "🚀 Applying Terraform configuration..."
    terraform apply tfplan
    
    echo "✅ Deployment completed successfully!"
    echo ""
    echo "📊 Deployment Summary:"
    echo "===================="
    terraform output
    
    echo ""
    echo "🔗 Access URLs:"
    echo "==============="
    echo "Jenkins: $(terraform output -raw jenkins_url)"
    echo "App: $(terraform output -raw app_url)"
    echo "SSH: $(terraform output -raw ssh_connection)"
    
    echo ""
    echo "📝 Next Steps:"
    echo "=============="
    echo "1. SSH into the instance to get Jenkins initial password:"
    echo "   $(terraform output -raw ssh_connection)"
    echo "   sudo cat /var/lib/jenkins/secrets/initialAdminPassword"
    echo ""
    echo "2. Access Jenkins and complete the setup wizard"
    echo "3. The CompileVortex-Deploy job will be automatically created"
    echo "4. Your application will be accessible at the App URL above"
    
else
    echo "❌ Deployment cancelled."
    exit 1
fi
