output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_eip.compilevortex_eip.public_ip
}

output "instance_public_dns" {
  description = "Public DNS name of the EC2 instance"
  value       = aws_instance.compilevortex_server.public_dns
}

output "jenkins_url" {
  description = "Jenkins web interface URL"
  value       = "http://${aws_eip.compilevortex_eip.public_ip}:8080"
}

output "app_url" {
  description = "CompileVortex application URL"
  value       = "http://${aws_eip.compilevortex_eip.public_ip}:3000"
}

output "ssh_connection" {
  description = "SSH connection command"
  value       = "ssh -i ~/.ssh/id_rsa ec2-user@${aws_eip.compilevortex_eip.public_ip}"
}

output "jenkins_initial_password" {
  description = "Jenkins initial admin password (check EC2 instance logs)"
  value       = "Check EC2 instance logs for Jenkins initial admin password"
}
