pipeline {
  agent any

  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM',
          branches: [[name: GIT_BUILD_REF]],
          userRemoteConfigs: [[
                    url: GIT_REPO_URL,
                      credentialsId: CREDENTIALS_ID
                    ]]])
      }
    }

    stage('切换 Node.js 版本') {
      steps {
        sh 'curl -fsSL https://deb.nodesource.com/setup_14.x | bash -'
        sh 'apt-get install -y nodejs'
        sh 'npm install -g npm'
      }
    }

    stage('版本') {
      steps {
        sh 'node -v'
        sh 'npm -v'
      }
    }

    stage('安装依赖') {
      steps {
        sh 'cd ./packages/shared && npm install'
        sh 'cd ./packages/analytics-front && npm install'
        sh 'cd ./packages/client && npm install'
        sh 'cd ./packages/server && npm install'
        sh 'npm install'
      }
    }

    stage('测试') {
      steps {
        sh 'npm test'
      }
    }

    stage('依赖漏洞扫描') {
      steps {
        npmAuditInDir(directory: '/', collectResult: true)
        npmAuditInDir(directory: '/packages/shared', collectResult: true)
        npmAuditInDir(directory: '/packages/analytics-front', collectResult: true)
        npmAuditInDir(directory: '/packages/client', collectResult: true)
        npmAuditInDir(directory: '/packages/server', collectResult: true)
      }
    }
    // https://issues.jenkins.io/browse/JENKINS-41051
    // withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: params.JP_DockerMechIdCredential, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
    //     usr = USERNAME
    //     pswd = PASSWORD
    // }
    // docker.withRegistry("http://ourhost:5100", params.JP_DockerMechIdCredential) {
    //     sh "docker login -u ${usr} -p ${pswd} http://ourhost:5100"
    //     def    image = docker.build("com.att.sharedservices/tomee-uslmonitor")
    //     image.push 'latest'
    // }
    stage('构建 Docker 镜像') {
      steps {
        script {
          if (env.TAG_NAME ==~ /.*/ ) {
            DOCKER_IMAGE_VERSION = "${env.TAG_NAME}"
          } else if (env.MR_SOURCE_BRANCH ==~ /.*/ ) {
            DOCKER_IMAGE_VERSION = "mr-${env.MR_RESOURCE_ID}-${env.GIT_COMMIT_SHORT}"
          } else {
            DOCKER_IMAGE_VERSION = "${env.BRANCH_NAME.replace('/', '-')}-${env.GIT_COMMIT_SHORT}"
          }
          // 注意：创建项目时链接标识不要使用下划线，而是连字符，比如 My Project 的标识应为 my-project
          CODING_DOCKER_IMAGE_NAME = "${env.PROJECT_NAME.toLowerCase()}/server"
          // 本项目内的制品库已内置环境变量 CODING_ARTIFACTS_CREDENTIALS_ID，无需手动设置
          docker.withRegistry("${CCI_CURRENT_WEB_PROTOCOL}://${env.CCI_CURRENT_TEAM}-docker.pkg.coding.net", "${env.CODING_ARTIFACTS_CREDENTIALS_ID}") {
            def dockerImage = docker.build("${CODING_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}", "-f ${DOCKERFILE_PATH} ${DOCKER_BUILD_CONTEXT}")
            dockerImage.push()
          }
        }
      }
    }
  }
  environment {
    CODING_DOCKER_REG_HOST = "${CCI_CURRENT_TEAM}-docker.pkg.${CCI_CURRENT_DOMAIN}"
    CODING_DOCKER_IMAGE_NAME = "${PROJECT_NAME.toLowerCase()}/${DOCKER_REPO_NAME}/${DOCKER_IMAGE_NAME}"
  }
}
