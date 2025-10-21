variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.medium"
}

variable "storage_size" {
  description = "Storage size in GB"
  type        = number
  default     = 20
}

variable "key_pair_name" {
  description = "Name of the AWS key pair"
  type        = string
  default     = "compilevortex-key"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "CompileVortex"
}
