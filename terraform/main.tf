# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}

# Data source to get the latest Amazon Linux 2 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# VPC and Networking
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "CompileVortex-VPC"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "CompileVortex-IGW"
  }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "CompileVortex-Public-Subnet"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "CompileVortex-Public-RT"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# Security Group for EC2
resource "aws_security_group" "compilevortex_sg" {
  name_prefix = "compilevortex-"
  vpc_id      = aws_vpc.main.id

  # SSH access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP access
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS access
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Jenkins access
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Node.js app access
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # All outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "CompileVortex-SecurityGroup"
  }
}

# Elastic IP for static IP
resource "aws_eip" "compilevortex_eip" {
  domain = "vpc"
  tags = {
    Name = "CompileVortex-EIP"
  }
}

# Key Pair for SSH access
resource "aws_key_pair" "compilevortex_key" {
  key_name   = "compilevortex-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

# EC2 Instance
resource "aws_instance" "compilevortex_server" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = "t3.medium"
  key_name              = aws_key_pair.compilevortex_key.key_name
  vpc_security_group_ids = [aws_security_group.compilevortex_sg.id]
  subnet_id              = aws_subnet.public.id

  # Root volume with 20GB
  root_block_device {
    volume_size = 20
    volume_type = "gp3"
    encrypted   = true
  }

  user_data = file("user_data.sh")

  tags = {
    Name = "CompileVortex-Server"
  }
}

# Associate Elastic IP with EC2 instance
resource "aws_eip_association" "compilevortex_eip_assoc" {
  instance_id   = aws_instance.compilevortex_server.id
  allocation_id = aws_eip.compilevortex_eip.id
}

