# CompileVortex Infrastructure Setup

This Terraform configuration sets up the complete infrastructure for the CompileVortex application on AWS.

## Architecture

- **EC2 Instance**: t3.medium with 20GB storage
- **Static IP**: Elastic IP for consistent access
- **Jenkins**: CI/CD pipeline for automated deployments
- **Docker**: Containerized application deployment
- **Security Groups**: Configured for web access and Jenkins

## Prerequisites

1. AWS CLI configured with your credentials
2. SSH key pair (`~/.ssh/id_rsa.pub` and `~/.ssh/id_rsa`)
3. Terraform installed

## AWS Credentials Setup

### Option 1: Using Environment File (Recommended)

1. Copy the example environment file:
   ```bash
   cp .env.deploy.example .env
   ```

2. Edit the `.env` file with your actual AWS credentials:
   ```bash
   AWS_ACCESS_KEY_ID=your_actual_access_key
   AWS_SECRET_ACCESS_KEY=your_actual_secret_key
   AWS_SESSION_TOKEN=your_actual_session_token
   ```

### Option 2: Using AWS CLI Configuration

If you have AWS CLI configured, you can skip the environment file setup:
```bash
aws configure
```

### Option 3: Export Environment Variables

```bash
export AWS_ACCESS_KEY_ID="your_access_key"
export AWS_SECRET_ACCESS_KEY="your_secret_key"
export AWS_SESSION_TOKEN="your_session_token"
```

## Deployment Steps

1. **Initialize Terraform**:
   ```bash
   cd terraform
   terraform init
   ```

2. **Plan the deployment**:
   ```bash
   terraform plan
   ```

3. **Apply the configuration**:
   ```bash
   terraform apply
   ```

4. **Get outputs**:
   ```bash
   terraform output
   ```

## Access Points

After deployment, you'll have access to:

- **Jenkins**: `http://<PUBLIC_IP>:8080`
- **CompileVortex App**: `http://<PUBLIC_IP>:3000`
- **SSH Access**: `ssh -i ~/.ssh/id_rsa ec2-user@<PUBLIC_IP>`

## Jenkins Setup

1. Access Jenkins at the provided URL
2. Get the initial admin password from EC2 instance logs:
   ```bash
   ssh -i ~/.ssh/id_rsa ec2-user@<PUBLIC_IP>
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```
3. Complete Jenkins setup wizard
4. The CompileVortex-Deploy job will be automatically created

## Application Deployment

The application will be automatically deployed via Jenkins when:
- Code is pushed to the master branch
- Manual trigger in Jenkins
- Scheduled builds (every 5 minutes)

## Cleanup

To destroy the infrastructure:
```bash
terraform destroy
```

## Security Notes

- Security groups are configured for web access
- Jenkins is accessible on port 8080
- Application runs on port 3000
- SSH access is available on port 22
- All traffic is properly secured with appropriate rules
