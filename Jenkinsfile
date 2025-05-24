pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKERHUB_USERNAME = 'hemanandj'
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/ngo-frontend"
        BACKEND_IMAGE = "${DOCKERHUB_USERNAME}/ngo-backend"
        NAMESPACE = 'namespace'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/hemanand24/NGO-Donation-Tracker.git', branch: 'main'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE:latest .'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $BACKEND_IMAGE:latest .'
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh '''
                        echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin
                        docker push $FRONTEND_IMAGE:latest
                        docker push $BACKEND_IMAGE:latest
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
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
