pipeline {
    agent any
    parameters{
        choice(name:'VERSION', choices:['1.1.0', '1.2.0', '1.3.0'], description: '')
        booleanParam(name:'executeTests', defaultValue: true, description: '')
    }
    triggers {
        pollSCM '* * * * *'
        // 每一分鐘偵測是否有更新push
    }
    stages {
        stage('Build') {
            steps {
                echo "Building.."
            }
        }
        stage('Test') {
            when{
                expression{
                    params.executeTests
                }
            }
            steps {
                echo "Testing.."
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy....'
                echo "deploying version ${params.VERSION}"
            }
        }
    }
}