pipeline {
    agent any

    options {
        skipDefaultCheckout(false)
    }

    stages {
        stage('Docker Info') {
            steps {
                echo 'Docker verbinding controleren...'
                sh 'docker version'
                sh 'docker compose version'
            }
        }

        stage('Voorbereiding Environment') {
            steps {
                echo 'Controleren op .env.production...'
                // Als .env.production niet bestaat, maak een leeg bestand aan zodat docker compose niet crasht
                sh 'touch .env.production'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Applicatie bouwen...'
                sh 'docker compose build'
            }
        }

        stage('Test Run') {
            steps {
                echo 'Containers testen...'
                sh 'docker compose up -d'
                sh 'docker compose ps'
            }
        }
    }

    post {
        always {
            sh 'docker compose down --volumes --remove-orphans || true'
        }
    }
}