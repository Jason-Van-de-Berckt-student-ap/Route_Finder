pipeline {
    agent any

    environment {
        IMAGE_NAME = "route-finder"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Code ophalen...'
                checkout scm
            }
        }
        stage('Docker Build') {
            steps {
                echo 'Docker container bouwen...'
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }
        stage('Test Run') {
            steps {
                echo 'Testen of de container start...'
                sh "docker run --rm -d --name rf_test_${BUILD_NUMBER} ${IMAGE_NAME}:${BUILD_NUMBER}"
                sh "docker ps | grep rf_test_${BUILD_NUMBER}"
            }
        }
    }
    post {
        always {
            sh "docker stop rf_test_${BUILD_NUMBER} || true"
            sh "docker rmi ${IMAGE_NAME}:${BUILD_NUMBER} || true"
        }
    }
}