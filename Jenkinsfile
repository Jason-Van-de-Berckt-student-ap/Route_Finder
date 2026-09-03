pipeline {
    agent any

    stages {
        stage('Docker Info') {
            steps {
                sh 'docker version'
            }
        }

        stage('Voorbereiding') {
            steps {
                sh 'touch .env.production'
            }
        }

        stage('Bouwen') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy op Host') {
            steps {
                echo 'Oude versie stoppen en nieuwe container starten op de host...'
                // Stop de oude draaiende instantie en start de nieuw gebouwde versie op de achtergrond
                sh 'docker compose down --remove-orphans || true'
                sh 'docker compose up -d'
            }
        }
    }
    // Geen 'docker compose down' in post: de container blijft nu permanent draaien op je host!
}