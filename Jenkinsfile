pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }

    environment {
        PALETHOEVE_ENV_FILE = '/opt/palethoeve/.env.production'
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Docker Info') {
            steps {
                sh 'docker version'
            }
        }

        stage('Voorbereiding') {
            steps {
                sh '''
                    ENV_FILE="${PALETHOEVE_ENV_FILE:-.env.production}"
                    if [ ! -s "$ENV_FILE" ]; then
                        echo "FOUT: $ENV_FILE ontbreekt of is leeg. Configureer PALETHOEVE_ENV_FILE naar een persistente serverlocatie en vul DATABASE_URL, POSTGRES_PASSWORD, AUTH_SECRET en de initiële wachtwoorden in."
                        exit 1
                    fi
                '''
            }
        }

        stage('Bouwen') {
            steps {
                sh 'docker compose --env-file "$PALETHOEVE_ENV_FILE" build --progress=plain'
            }
        }

        stage('Deploy op Host') {
            steps {
                echo 'Oude versie stoppen en nieuwe container starten op de host...'
                // Stop de oude draaiende instantie en start de nieuw gebouwde versie op de achtergrond
                sh 'docker compose --env-file "$PALETHOEVE_ENV_FILE" down --remove-orphans || true'
                sh 'docker compose --env-file "$PALETHOEVE_ENV_FILE" up -d'
            }
        }
    }
    // Geen 'docker compose down' in post: de container blijft nu permanent draaien op je host!
}