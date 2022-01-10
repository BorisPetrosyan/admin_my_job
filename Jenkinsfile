pipeline  {
    agent any
    stages {


    stage('Cloning Git') {
        steps {
            checkout scm
        }
    }
    
    stage('ENV config') {
        steps {
            sh "cp /home/api/admin/.env /var/lib/jenkins/workspace/admin-react"
        }
    }
    
    stage('Configuring Docker Image') {
        steps {
            sh "docker build -t admin-react:latest ."
        }
    }
    
    stage('Docker Publish New Container') {
        steps {
            sh "docker rm -f admin-react"
            sh 'docker run -itd --restart unless-stopped --name admin-react -p 3000:80 admin-react'
        }
    }

    stage('Clearing Old Dependency cache') {
        steps {
            sh "docker image prune -a -f | true"
        }
    }

}
}

