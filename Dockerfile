# 1) Node 이미지
FROM node:20

# 2) 작업 디렉토리
WORKDIR /usr/src/app

# 3) 패키지 먼저 복사 후 설치
COPY package*.json ./
RUN npm install --production

# 4) 소스 복사
COPY . .

# 5) 포트
EXPOSE 5000

# 6) 앱 실행
CMD ["node", "src/app.js"]
