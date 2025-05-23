pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKERHUB_USERNAME = 'hemanandj'
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/ngo-donation-tracker-frontend"
        BACKEND_IMAGE = "${DOCKERHUB_USERNAME}/ngo-donation-tracker-backend"
        NAMESPACE = 'namespace'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/hemanand24/NGO-Donation-Tracker.git', branch: 'master'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    bat 'docker build -t %FRONTEND_IMAGE%:latest .'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    bat 'docker build -t %BACKEND_IMAGE:latest .'
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    bat '''
                        echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin
                        docker push $FRONTEND_IMAGE:latest
                        docker push $BACKEND_IMAGE:latest
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                    kubectl set image deployment/frontend-deployment frontend-container=$FRONTEND_IMAGE:latest -n $NAMESPACE
                    kubectl set image deployment/backend-deployment backend-container=$BACKEND_IMAGE:latest -n $NAMESPACE
                '''
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed.'
        }
        success {
            echo 'Deployment succeeded!'
        }
    }
}
