#!/bin/bash

# Update system
yum update -y

# Install Docker
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

# Install Git
yum install -y git

# Install Jenkins
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
yum install -y jenkins

# Start and enable Jenkins
systemctl start jenkins
systemctl enable jenkins

# Add jenkins user to docker group
usermod -a -G docker jenkins

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install

# Install Terraform
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
mv terraform /usr/local/bin/
chmod +x /usr/local/bin/terraform

# Create application directory
mkdir -p /opt/compilevortex
chown jenkins:jenkins /opt/compilevortex

# Create deployment script
cat > /opt/deploy.sh << 'EOF'
#!/bin/bash
set -e

APP_DIR="/opt/compilevortex"
REPO_URL="https://github.com/lohitkolluri/CompileVortex.git"

echo "Starting deployment..."

# Navigate to app directory
cd $APP_DIR

# Pull latest changes
git pull origin master

# Install dependencies
npm install

# Build the application
npm run build

# Stop any existing containers
docker-compose down || true

# Start the application with Docker Compose
docker-compose up -d

echo "Deployment completed successfully!"
EOF

chmod +x /opt/deploy.sh
chown jenkins:jenkins /opt/deploy.sh

# Create Docker Compose file for the application
cat > /opt/compilevortex/docker-compose.yml << 'EOF'
version: '3.8'

services:
  compilevortex:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    volumes:
      - ./build:/app/build
EOF

# Create Dockerfile for the application
cat > /opt/compilevortex/Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
EOF

# Create Jenkins job configuration
mkdir -p /var/lib/jenkins/jobs/CompileVortex-Deploy
cat > /var/lib/jenkins/jobs/CompileVortex-Deploy/config.xml << 'EOF'
<?xml version='1.1' encoding='UTF-8'?>
<project>
  <description>Deploy CompileVortex Application</description>
  <keepDependencies>false</keepDependencies>
  <properties/>
  <scm class="hudson.plugins.git.GitSCM" plugin="git@4.15.0">
    <configVersion>2</configVersion>
    <userRemoteConfigs>
      <hudson.plugins.git.UserRemoteConfig>
        <url>https://github.com/lohitkolluri/CompileVortex.git</url>
      </hudson.plugins.git.UserRemoteConfig>
    </userRemoteConfigs>
    <branches>
      <hudson.plugins.git.BranchSpec>
        <name>*/master</name>
      </hudson.plugins.git.BranchSpec>
    </branches>
    <doGenerateSubmoduleConfigurations>false</doGenerateSubmoduleConfigurations>
    <submoduleCfg class="list"/>
    <extensions/>
  </scm>
  <canRoam>true</canRoam>
  <disabled>false</disabled>
  <blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
  <blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
  <triggers>
    <hudson.triggers.SCMTrigger>
      <spec>H/5 * * * *</spec>
    </hudson.triggers.SCMTrigger>
  </triggers>
  <concurrentBuild>false</concurrentBuild>
  <builders>
    <hudson.tasks.Shell>
      <command>/opt/deploy.sh</command>
    </hudson.tasks.Shell>
  </builders>
  <publishers/>
  <buildWrappers/>
</project>
EOF

# Set proper permissions
chown -R jenkins:jenkins /var/lib/jenkins/jobs/CompileVortex-Deploy

# Restart Jenkins to apply changes
systemctl restart jenkins

# Get Jenkins initial admin password
echo "Jenkins initial admin password:"
cat /var/lib/jenkins/secrets/initialAdminPassword

# Create a simple health check script
cat > /opt/health-check.sh << 'EOF'
#!/bin/bash
# Health check script for the application
curl -f http://localhost:3000 || exit 1
EOF

chmod +x /opt/health-check.sh

echo "Setup completed successfully!"
echo "Jenkins URL: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8080"
echo "Application URL: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
