pipeline {
    agent any

    environment {
        NEXT_PUBLIC_API_URL = "http://44.208.219.130:8000"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
            }
        }

        stage('Set Environment Variables') {
            steps {
                // Inject RapidAPI key from Jenkins credential
                withCredentials([string(credentialsId: 'rapidapi-key', variable: 'REACT_APP_RAPID_API_KEY')]) {
                    sh '''
                        echo "REACT_APP_RAPID_API_HOST=judge0-ce.p.rapidapi.com" >> .env
                        echo "REACT_APP_RAPID_API_KEY=$REACT_APP_RAPID_API_KEY" >> .env
                        echo "REACT_APP_RAPID_API_URL=https://judge0-ce.p.rapidapi.com/submissions" >> .env
                    '''
                }
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                // Use EC2 username/password credential
                withCredentials([usernamePassword(credentialsId: 'ec2-key', usernameVariable: 'EC2_USER', passwordVariable: 'EC2_PASS')]) {
                    sh '''
                        which sshpass || sudo yum install -y sshpass

                        # Copy build folder to EC2
                        sshpass -p $EC2_PASS scp -o StrictHostKeyChecking=no -r ./build $EC2_USER@44.208.219.130:/var/www/compilevortex/

                        # Restart nginx
                        sshpass -p $EC2_PASS ssh -o StrictHostKeyChecking=no $EC2_USER@44.208.219.130 'sudo systemctl restart nginx'
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                echo "Health check skipped. You can add curl commands to verify deployment."
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed! Check logs for details.'
        }
    }
}
