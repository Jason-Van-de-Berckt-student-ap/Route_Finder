pipeline {
    agent any

    options {
        // Voorkom dubbele checkout en ruim de workspace op vóór de build start
        skipDefaultCheckout(false)
    }

    stages {
        // Geen losse 'stage Checkout' met 'checkout scm' nodig; Jenkins doet dit al automatisch!
        stage('Docker Info') {
            steps {
                echo 'Docker verbinding testen...'
                sh 'docker version'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Bouwen van het project...'
                // Als je compose gebruikt:
                sh 'docker compose build'
                // Of als je een gewone Dockerfile gebruikt:
                // sh 'docker build -t route_finder:latest .'
            }
        }

        stage('Test run') {
            steps {
                echo 'Opstarten testen...'
                sh 'docker compose up -d'
                sh 'docker compose ps'
            }
        }
    }

    post {
        always {
            // Voer alleen uit als de workspace daadwerkelijk bestaat
            node('built-in') {
                sh 'docker compose down --volumes --remove-orphans || true'
            }
        }
    }
}